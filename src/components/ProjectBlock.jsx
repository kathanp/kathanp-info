import { Link } from "react-router-dom"
import { GitHubIcon, NpmIcon } from "./Icons.jsx"
import InstallLine from "./InstallLine.jsx"
import LiveMeta from "./LiveMeta.jsx"
import { formatRelative } from "../lib/format.js"

export default function ProjectBlock({ project, data, detailed = false }) {
  const info = project.npm
    ? data || {
        version: project.fallback.version,
        license: project.fallback.license,
        live: false,
        history: [],
      }
    : null
  const history = info?.history || []
  const titleHref = project.npm || project.repo || null

  return (
    <article className={detailed ? "project" : "project is-compact"} id={detailed ? project.name : undefined}>
      <div className="project-top">
        <h3>
          {detailed && titleHref ? (
            <a href={titleHref} target="_blank" rel="noreferrer noopener">
              {project.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : detailed ? (
            project.name
          ) : (
            <Link to={`/projects#${project.name}`}>{project.name}</Link>
          )}
        </h3>
        {project.repo || project.npm ? (
          <p className="project-links">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} on GitHub, opens in a new tab`}
              >
                <GitHubIcon size={18} />
              </a>
            ) : null}
            {project.npm ? (
              <a
                href={project.npm}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} on npm, opens in a new tab`}
              >
                <NpmIcon size={18} />
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
      <p className="project-summary">{detailed ? project.summary : project.blurb}</p>
      {info ? <LiveMeta data={info} /> : null}
      {!info && project.facts?.length ? (
        <p className="live-meta">
          {project.facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </p>
      ) : null}
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
      {detailed && history.length > 0 ? (
        <div className="history">
          <p>Previous releases</p>
          <ol>
            {history.map((item) => (
              <li key={item.version}>
                <span>{item.version}</span>
                <span>{formatRelative(item.publishedAt)}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      {detailed && project.npm ? <InstallLine name={project.name} /> : null}
    </article>
  )
}
