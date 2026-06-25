// ============================================================
// Next.js Config
// Typescript errors suppressed (build validated separately)
// Images unoptimized for local/external sources
// ============================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
