/** @type {import('next').NextConfig} */

// Origins that are allowed to iframe shadicards pages (notably the
// /subscribe Razorpay-Checkout bridge for streamcorn.com). Override via env
// in deployment if you need to add preview / staging domains.
const STREAMCORN_FRAME_ORIGINS = (
  process.env.STREAMCORN_FRAME_ORIGINS ||
  'https://streamcorn.com https://www.streamcorn.com http://localhost:3000 http://localhost:3001'
).trim()

const SUBSCRIBE_CSP = `frame-ancestors 'self' ${STREAMCORN_FRAME_ORIGINS}`

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gicvribyqmexntgfahji.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.stockcake.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        // /subscribe is the Razorpay-Checkout bridge embedded in
        // streamcorn's paywall iframe. CSP frame-ancestors overrides
        // X-Frame-Options on modern browsers, so we don't ship XFO at all
        // — that prevents a DENY default from sneaking past the CSP.
        source: '/subscribe',
        headers: [
          { key: 'Content-Security-Policy', value: SUBSCRIBE_CSP },
          // Razorpay Checkout dispatches UPI app handovers; Permissions-
          // Policy must allow `payment` inside this frame.
          { key: 'Permissions-Policy', value: 'payment=*' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
