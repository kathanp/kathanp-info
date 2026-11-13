import { Link } from "react-router-dom"
import { archiveId } from "../components/CommandBar.jsx"
import { archive } from "../content.js"
import { useTitle } from "../hooks/useTitle.js"

export default function Archive() {
  useTitle("Archive")

  return (
    <div className="page archive-page">
      <p className="archive-back">
        <Link to="/projects">Projects</Link>
      </p>
      <h1 className="archive-title">All projects</h1>
      <table className="catalog">
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Project</th>
            <th scope="col">Made at</th>
            <th scope="col">Built with</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {archive.map((item) => (
            <tr key={item.name} id={archiveId(item.name)}>
              <td className="catalog-year" data-label="Year">
                {item.year}
              </td>
              <td data-label="Project">
                <span className="catalog-name">{item.name}</span>
              </td>
              <td className="catalog-where" data-label="Made at">
                {item.where}
              </td>
              <td data-label="Built with">
                {item.built.length > 0 ? (
                  <ul className="pills">
                    {item.built.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="catalog-empty">—</span>
                )}
              </td>
              <td data-label="Link">
                {item.url ? (
                  <a className="catalog-link" href={item.url} target="_blank" rel="noreferrer noopener">
                    {item.url.includes("github.com") ? "GitHub" : "Site"}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="catalog-empty">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
