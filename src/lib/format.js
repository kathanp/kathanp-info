export function formatRelative(iso) {
  if (!iso) return null
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return null

  const delta = Date.now() - then
  if (delta < 45_000) return "just now"

  const minutes = Math.floor(delta / 60_000)
  const hours = Math.floor(delta / 3_600_000)
  const days = Math.floor(delta / 86_400_000)

  if (minutes < 1) return "1 minute ago"
  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
  }
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`
  if (days < 14) return days === 1 ? "1 day ago" : `${days} days ago`

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso))
}

export function formatDownloads(value) {
  if (typeof value !== "number") return null
  return new Intl.NumberFormat("en-US").format(value)
}
