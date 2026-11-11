import { Link } from "react-router-dom"
import { GitHubIcon, NpmIcon } from "./Icons.jsx"
import InstallLine from "./InstallLine.jsx"
import LiveMeta from "./LiveMeta.jsx"
import { formatRelative } from "../lib/format.js"

export default function ProjectBlock({ project, data, detailed = false }) {
  const info = data || {
    version: project.fallback.version,
    license: project.fallback.license,
    live: false,
    history: [],
  }
  const history = info.history || []

  return (
    <article className={detailed ? "project" : "project is-compact"} id={detailed ? project.name : undefined}>
      <div className="project-top">
        <h3>
          {detailed ? (
            <a href={project.npm} target="_blank" rel="noreferrer noopener">
              {project.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link to={`/projects#${project.name}`}>{project.name}</Link>
          )}
        </h3>
        <p className="project-links">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.name} on GitHub, opens in a new tab`}
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={project.npm}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.name} on npm, opens in a new tab`}
          >
            <NpmIcon size={18} />
          </a>
        </p>
      </div>
      <p className="project-summary">{detailed ? project.summary : project.blurb}</p>
      <LiveMeta data={info} />
      {detailed && project.notes ? (
        <dl className="case">
          {project.notes.map((note) => (
            <div key={note.label}>
              <dt>{note.label}</dt>
              <dd>{note.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {detailed ? (
        <div className="history">
          {history.length > 0 ? (
            <>
              <p>Previous releases</p>
              <ol>
                {history.map((item) => (
                  <li key={item.version}>
                    <span>{item.version}</span>
                    <span>{formatRelative(item.publishedAt)}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </div>
      ) : null}
      {detailed ? <InstallLine name={project.name} /> : null}
    </article>
  )
}
