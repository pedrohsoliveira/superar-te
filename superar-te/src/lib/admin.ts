export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const allowed = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  return allowed
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}
