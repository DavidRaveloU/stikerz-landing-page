const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  const prefixed = value.startsWith("/") ? value : `/${value}`;
  return prefixed.replace(/\/+$/, "");
}

const basePath = normalizeBasePath(rawBasePath);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
