import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Extra origins allowed to fetch dev-only resources (e.g. /_next/hmr), so the
// app can be opened from another device on the LAN. Comma-separated hostnames
// only (no scheme, no port). The value is machine-specific, so it lives in
// .env.local (gitignored) as DEV_ALLOWED_ORIGINS rather than in this file.
const allowedDevOrigins = (process.env.DEV_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(allowedDevOrigins.length > 0 ? { allowedDevOrigins } : {}),
};

export default withNextIntl(nextConfig);
