export function formatDate(str: string | Date) {
  const date = typeof str === "string" ? new Date(str) : str;
  return date.toDateString()
}
