const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

function normalizeBasePath(value: string): string {
  if (!value || value === "/") {
    return "";
  }

  const prefixed = value.startsWith("/") ? value : `/${value}`;
  return prefixed.replace(/\/+$/, "");
}

export const basePath = normalizeBasePath(rawBasePath);

export function withBasePath(path: string): string {
  if (
    !path ||
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  if (!basePath) {
    return path;
  }

  if (path === "/") {
    return basePath;
  }

  if (path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return path.startsWith("/") ? `${basePath}${path}` : `${basePath}/${path}`;
}