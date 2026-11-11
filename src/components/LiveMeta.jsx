import { formatDownloads, formatRelative } from "../lib/format.js"

export default function LiveMeta({ data }) {
  if (!data) return null
  const when = data.live ? formatRelative(data.publishedAt) : null
  const downloads = data.live ? formatDownloads(data.downloads) : null
  const deps = data.live ? data.dependencies : null

  return (
    <p className="live-meta" aria-live="polite">
      <span className={data.live ? "live-version" : "live-version is-pending"}>v{data.version}</span>
      {data.license ? <span>{data.license}</span> : null}
      {deps === 0 ? <span>0 dependencies</span> : null}
      {typeof deps === "number" && deps > 0 ? (
        <span>
          {deps} {deps === 1 ? "dependency" : "dependencies"}
        </span>
      ) : null}
      {downloads != null ? <span>{downloads} this week</span> : null}
      {when ? <span>{when}</span> : null}
    </p>
  )
}
