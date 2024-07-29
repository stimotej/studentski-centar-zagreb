export default function convertToProxyUrl(fullUrl: string): string {
  const url = new URL(fullUrl);

  const path = url.pathname.replace(/^\/wp-content\/uploads\//, "");

  return `/api/images/${path}`;
}
