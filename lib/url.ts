export function isSafeExternalUrl(raw: string | undefined | null): boolean {
  if (!raw) return false;
  const s = raw.trim();
  if (!s) return false;
  const lower = s.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  )
    return false;
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    if (!u.hostname) return false;
    return true;
  } catch (e) {
    return false;
  }
}

export function hostnameOf(raw: string | undefined | null): string {
  if (!raw) return "";
  try {
    const u = new URL(raw);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return raw;
  }
}
