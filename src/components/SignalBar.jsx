import { Link } from "react-router-dom"
import { featured } from "../content.js"
import { usePackages } from "../hooks/usePackages.js"
import { formatRelative } from "../lib/format.js"
import { findPackage } from "../lib/packages.js"

const stateLabel = {
  loading: "Reading",
  live: "Live",
  partial: "Partial",
  offline: "Offline",
}

export default function SignalBar() {
  const { packages, status } = usePackages()

  return (
    <div className="signal" aria-label="Live package versions">
      {featured.map((project) => {
        const data = findPackage(packages, project.name)
        const version = data?.version || project.fallback.version
        const when = data?.live ? formatRelative(data.publishedAt) : "—"
        return (
          <Link key={project.name} className="signal-item" to={`/projects#${project.name}`}>
            <span>{project.name}</span>
            <strong>v{version}</strong>
            <span>{when}</span>
          </Link>
        )
      })}
      <span className={status === "live" ? "signal-state is-live" : "signal-state"}>
        {stateLabel[status] || "Reading"}
      </span>
    </div>
  )
}
