import { Link } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import ProjectBlock from "../components/ProjectBlock.jsx"
import { featured } from "../content.js"
import { usePackages } from "../hooks/usePackages.js"
import { useTitle } from "../hooks/useTitle.js"
import { findPackage } from "../lib/packages.js"

export default function Projects() {
  useTitle("Projects")
  const { packages } = usePackages()

  return (
    <div className="page">
      <SectionHeading index="03">Projects</SectionHeading>
      <p className="lede">
        Each package is written out the way it ships: who it is for, what it does, and what it
        refuses to do. The version, the license count, the weekly downloads, and the release list
        are filled in from the registry.
      </p>
      <div className="project-list">
        {featured.map((project) => (
          <ProjectBlock
            key={project.name}
            project={project}
            data={findPackage(packages, project.name)}
            detailed
          />
        ))}
      </div>
      <p className="follow">
        <Link to="/archive">View full project archive</Link>
      </p>
    </div>
  )
}
