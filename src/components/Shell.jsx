import { useEffect } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { nav, profile } from "../content.js"
import { CodePenIcon, GitHubIcon, GitLabIcon, LinkedInIcon, NpmIcon } from "./Icons.jsx"
import Cursor from "./Cursor.jsx"
import SignalBar from "./SignalBar.jsx"

const icons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  CodePen: CodePenIcon,
  GitLab: GitLabIcon,
  npm: NpmIcon,
}

const footerOrder = ["GitHub", "LinkedIn", "CodePen", "GitLab", "npm"]

export default function Shell() {
  const { pathname, hash } = useLocation()
  const here = pathname === "/" ? "~" : `~${pathname}`

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (hash) {
      const node = document.getElementById(hash.slice(1))
      if (node) {
        node.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="shell">
      <Cursor />
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="titlebar">
        <p className="titlebar-path">
          <span>kathan@localhost</span>
          <span>:{here}</span>
        </p>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "hire-button active" : "hire-button")}
        >
          Hire me
        </NavLink>
      </header>
      <div className="workspace">
        <aside className="rail">
          <Link to="/" className="rail-name">
            {profile.name}
          </Link>
          <p className="rail-role">{profile.role}</p>
          <nav aria-label="Primary">
            <p className="rail-label">files</p>
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? "rail-link active" : "rail-link")}
                  >
                    <span>{item.index}</span>
                    {item.label.toLowerCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="desk">
          <main
            id="content"
            className={
              pathname === "/" || pathname === "/about" ? "stage stage-center" : "stage"
            }
            tabIndex={-1}
          >
            <Outlet />
          </main>
          <footer className="dock">
            <SignalBar />
            <div className="dock-end">
              <ul className="socials">
                {footerOrder.map((label) => {
                  const link = profile.links.find((item) => item.label === label)
                  const Icon = icons[label]
                  return (
                    <li key={label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${label}, opens in a new tab`}
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  )
                })}
              </ul>
              <p className="copyright">
                <Link to="/">© {new Date().getFullYear()} {profile.name}</Link>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
