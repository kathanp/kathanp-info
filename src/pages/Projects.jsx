import { Link } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import ProjectBlock from "../components/ProjectBlock.jsx"
import { archive, projects } from "../content.js"
import { usePackages } from "../hooks/usePackages.js"
import { useTitle } from "../hooks/useTitle.js"
import { findPackage } from "../lib/packages.js"

const shown = new Set(projects.map((project) => project.name.toLowerCase()))

export default function Projects() {
  useTitle("Projects")
  const { packages } = usePackages()
  const tools = projects.filter((project) => !project.npm)
  const packagesOnNpm = projects.filter((project) => project.npm)
  const earlier = archive.filter((item) => !shown.has(item.name.toLowerCase()))

  return (
    <div className="page">
      <SectionHeading index="03">Projects</SectionHeading>
      <p className="lede">
        Each tool is written the same way: who it is for, what it does, and what it leaves alone.
        HaltPath traces one business id across Kafka. apiversa keeps old API clients working.
        fullshield and hubvik are on npm, so their version, weekly downloads, and releases are
        filled in from the registry.
      </p>
      <div className="project-list is-tools">
        {tools.map((project) => (
          <ProjectBlock key={project.name} project={project} detailed />
        ))}
      </div>
      <div className="project-list is-continued">
        {packagesOnNpm.map((project) => (
          <ProjectBlock
            key={project.name}
            project={project}
            data={findPackage(packages, project.name)}
            detailed
          />
        ))}
      </div>
      <h2 className="subhead">Earlier work</h2>
      <div className="earlier-list">
        {earlier.map((item) => (
          <article className="earlier" key={item.name}>
            <div className="project-top">
              <h3>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer noopener">
                    {item.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              <span className="archive-year">{item.year}</span>
            </div>
            {item.line ? <p className="project-summary">{item.line}</p> : null}
            {item.built.length > 0 ? <p className="earlier-built">{item.built.join(" · ")}</p> : null}
            {item.where ? <p className="earlier-where">{item.where}</p> : null}
          </article>
        ))}
      </div>
      <p className="follow">
        <Link to="/archive">View full project archive</Link>
      </p>
    </div>
  )
}
