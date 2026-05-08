/**
 * Streamcorn ↔ shadicards subscribe bridge.
 *
 * Streamcorn (streamcorn.com) is not approved as a Razorpay merchant on its
 * own domain. The subscription itself is created server-side on streamcorn
 * (via its `razorpay-subscribe` edge function, which uses the shadicards
 * Razorpay account credentials) — but the actual Razorpay Checkout modal
 * has to render on shadicards.com because that's the merchant-approved
 * domain.
 *
 * Streamcorn's paywall opens this page inside an iframe ("webview" style)
 * with the Razorpay subscription_id already created. We:
 *   1. Load checkout.js
 *   2. Auto-open Razorpay Checkout with the supplied subscription_id +
 *      public key
 *   3. On success, postMessage back to the parent so streamcorn can flip
 *      to its verifying overlay and refresh
 *   4. On dismiss / failure, postMessage so the parent can clean up
 *
 * Zero DB writes happen here. Subscription state lives in streamcorn's
 * Supabase project and is flipped by the streamcorn-side `razorpay-verify`
 * edge function (or the Razorpay webhook).
 *
 * Query params (all sent by streamcorn paywall):
 *   subscription_id  – Razorpay subscription id, already created
 *   key_id           – Razorpay public key
 *   plan_label       – e.g. "2 Screens"
 *   effective_price  – number; final ₹/mo after coupon (used for description)
 *   trial_eligible   – "true" | "false"
 *   user_phone       – E.164 if available; used for prefill
 *   return_origin    – exact origin we should postMessage back to
 *   embed            – "1" if rendered inside streamcorn iframe
 */

export const dynamic = 'force-dynamic'

import SubscribeClient from './subscribe-client'

interface SubscribeSearchParams {
  subscription_id?: string
  key_id?: string
  plan_label?: string
  effective_price?: string
  trial_eligible?: string
  user_phone?: string
  return_origin?: string
  embed?: string
  // Backwards-compat — the streamcorn paywall used to send these before we
  // moved subscription creation to its own /api/subscribe/initiate route.
  user_id?: string
  plan_id?: string
}

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<SubscribeSearchParams>
}) {
  const params = await searchParams
  return <SubscribeClient params={params} />
}
