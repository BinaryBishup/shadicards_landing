'use client'

import Script from 'next/script'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface SubscribeParams {
  subscription_id?: string
  key_id?: string
  plan_label?: string
  effective_price?: string
  trial_eligible?: string
  user_phone?: string
  return_origin?: string
  embed?: string
  user_id?: string
  plan_id?: string
}

interface RazorpayCheckout {
  open(): void
  close(): void
  on(event: string, cb: (...args: unknown[]) => void): void
}
interface RazorpayCtor {
  new (options: Record<string, unknown>): RazorpayCheckout
}
declare global {
  interface Window {
    Razorpay?: RazorpayCtor
  }
}

type Status =
  | 'preparing'        // waiting for checkout.js
  | 'opening'          // calling .open() on the modal
  | 'awaiting_payment' // user is inside the modal
  | 'success'          // payment authorized
  | 'dismissed'        // user closed the modal without paying
  | 'error'            // hard error (missing params, RZP error)

/**
 * Strict-origin postMessage helper. Only posts to the exact return_origin
 * that streamcorn passed in — never broadcasts to '*'. If the param is
 * missing (e.g. someone hit /subscribe directly without going through
 * streamcorn) we silently no-op the message; the page still works as a
 * standalone Razorpay-checkout surface.
 */
function postToParent(returnOrigin: string | undefined, payload: Record<string, unknown>) {
  if (!returnOrigin) return
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, returnOrigin)
    }
    if (window.opener) {
      window.opener.postMessage(payload, returnOrigin)
    }
  } catch {
    // Cross-origin postMessage with a non-matching targetOrigin throws —
    // safe to swallow; the parent will fall back to its polling loop.
  }
}

export default function SubscribeClient({ params }: { params: SubscribeParams }) {
  const {
    subscription_id,
    key_id,
    plan_label,
    effective_price,
    trial_eligible,
    user_phone,
    return_origin,
  } = params

  const [rzpLoaded, setRzpLoaded] = useState(false)
  const [status, setStatus] = useState<Status>('preparing')
  const [error, setError] = useState<string | null>(null)
  const openedRef = useRef(false)

  // Validate required params once — anything missing is a hard error and
  // we shouldn't try to open Checkout without it.
  const missing = useMemo(() => {
    const fields: string[] = []
    if (!subscription_id) fields.push('subscription_id')
    if (!key_id) fields.push('key_id')
    return fields
  }, [subscription_id, key_id])

  const openCheckout = useCallback(() => {
    if (openedRef.current) return
    if (!subscription_id || !key_id) {
      setStatus('error')
      setError(`Missing required parameter${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`)
      return
    }
    if (typeof window === 'undefined' || typeof window.Razorpay !== 'function') {
      setStatus('error')
      setError('Razorpay Checkout failed to load. Please refresh.')
      return
    }
    openedRef.current = true
    setStatus('opening')

    const phone = (user_phone ?? '').trim()
    const digits = phone.replace(/^\+?/, '').replace(/\D/g, '')
    const prefillEmail = digits ? `${digits}@streamcorn.app` : undefined

    const description = plan_label
      ? `${plan_label} — ₹${effective_price ?? ''}/mo`.replace(/—\s*₹\/mo$/, '').trim()
      : 'Streamcorn subscription'

    const options: Record<string, unknown> = {
      key: key_id,
      subscription_id,
      recurring: 1,
      currency: 'INR',
      name: 'Streamcorn',
      description,
      theme: { color: '#e50914' },
      notes: { reference_id: subscription_id, source: 'shadicards-bridge' },
      retry: { enabled: true, max_count: 2 },
      handler: () => {
        setStatus('success')
        postToParent(return_origin, {
          type: 'streamcorn:subscribe:success',
          subscription_id,
        })
      },
      modal: {
        ondismiss: () => {
          // Fires when the user X-closes the modal. If we already saw
          // `handler` (success), don't override.
          setStatus((current) => (current === 'success' ? current : 'dismissed'))
          postToParent(return_origin, {
            type: 'streamcorn:subscribe:dismiss',
            subscription_id,
          })
        },
      },
    }
    if (phone) {
      options.prefill = { contact: phone, email: prefillEmail }
      options.readonly = { contact: true, email: true }
      options.hidden = { contact: true, email: true }
    }

    const checkout = new window.Razorpay!(options)
    checkout.on('payment.failed', (resp: unknown) => {
      setStatus('error')
      const message =
        typeof resp === 'object' && resp && 'error' in resp
          ? ((resp as { error?: { description?: string } }).error?.description ??
            'Payment failed.')
          : 'Payment failed.'
      setError(message)
      postToParent(return_origin, {
        type: 'streamcorn:subscribe:failed',
        subscription_id,
        error: message,
      })
    })
    setStatus('awaiting_payment')
    checkout.open()
  }, [
    subscription_id,
    key_id,
    user_phone,
    plan_label,
    effective_price,
    return_origin,
    missing,
  ])

  // Auto-open the modal as soon as checkout.js finishes loading — that's
  // the whole point of this bridge page.
  useEffect(() => {
    if (rzpLoaded && missing.length === 0 && !openedRef.current) {
      openCheckout()
    }
  }, [rzpLoaded, missing.length, openCheckout])

  // Hard-fail early when params are missing so we don't wait forever.
  useEffect(() => {
    if (missing.length > 0) {
      setStatus('error')
      setError(
        `Missing required parameter${missing.length > 1 ? 's' : ''}: ${missing.join(
          ', ',
        )}. Please return to Streamcorn and try again.`,
      )
    }
  }, [missing])

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRzpLoaded(true)}
        onError={() => {
          setStatus('error')
          setError('Could not load Razorpay Checkout. Check your connection and refresh.')
        }}
      />
      <main className="relative min-h-screen w-full overflow-hidden bg-[#070707] text-white flex flex-col items-center justify-center px-6">
        {/* Soft red glow centre-piece — keeps the empty page from feeling
            broken while Razorpay's modal loads on top of us. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,9,20,0.18),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(229,9,20,0.08),transparent_50%)]"
        />

        <div className="relative z-10 flex max-w-md flex-col items-center text-center gap-5">
          {/* Wordmark */}
          <div className="flex items-baseline gap-1 text-2xl font-black tracking-tight">
            <span className="text-[#e50914]">stream</span>
            <span>corn</span>
          </div>

          {plan_label && (
            <div className="rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-4 py-1.5 text-xs font-semibold text-white/80">
              {plan_label}
              {effective_price ? ` · ₹${effective_price}/mo` : ''}
              {trial_eligible === 'true' ? ' · 14-day trial' : ''}
            </div>
          )}

          <StatusBlock status={status} error={error} onRetry={() => {
            setError(null)
            openedRef.current = false
            openCheckout()
          }} />

          <div className="text-[11px] text-white/35 leading-relaxed max-w-xs">
            Payment is processed securely by Razorpay on our merchant-approved domain. No card details touch Streamcorn.
          </div>

          {/* Deploy marker — change this string on each iteration so we can
              tell from a screenshot whether the live page reflects the
              latest push or is being served by a stale Vercel deployment. */}
          <div data-deploy="streamcorn-bridge-v1" className="text-[9px] text-white/20 tracking-widest uppercase">
            v1
          </div>
        </div>
      </main>
    </>
  )
}

function StatusBlock({
  status,
  error,
  onRetry,
}: {
  status: Status
  error: string | null
  onRetry: () => void
}) {
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e50914] shadow-[0_0_60px_rgba(229,9,20,0.6)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-base font-bold">Payment authorised</div>
        <div className="text-xs text-white/55">Hop back to Streamcorn — we&apos;re activating your account.</div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.05] px-5 py-4 backdrop-blur w-full">
        <div className="text-sm font-bold text-red-200">Couldn&apos;t open checkout</div>
        <div className="text-xs text-white/65 leading-relaxed">{error}</div>
        <button
          onClick={onRetry}
          className="mt-1 rounded-full bg-white text-black font-semibold text-xs px-4 py-1.5 hover:bg-white/85"
        >
          Try again
        </button>
      </div>
    )
  }

  if (status === 'dismissed') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur w-full">
        <div className="text-sm font-bold">Checkout closed</div>
        <div className="text-xs text-white/55">No charge was made. Reopen the modal to continue.</div>
        <button
          onClick={onRetry}
          className="mt-1 rounded-full bg-[#e50914] text-white font-semibold text-xs px-4 py-1.5 hover:bg-[#f40612]"
        >
          Reopen checkout
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-9 w-9 animate-spin rounded-full border-[2.5px] border-white/15 border-t-[#e50914]" />
      <div className="text-sm font-semibold">
        {status === 'awaiting_payment' ? 'Waiting for your payment…' : 'Opening secure checkout…'}
      </div>
      <div className="text-[11px] text-white/45">Razorpay UPI Autopay</div>
    </div>
  )
}
