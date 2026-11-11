import { useEffect } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { nav, profile } from "../content.js"
import { CodePenIcon, GitHubIcon, GitLabIcon, InstagramIcon, LinkedInIcon, NpmIcon } from "./Icons.jsx"
import SignalBar from "./SignalBar.jsx"

const icons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  CodePen: CodePenIcon,
  Instagram: InstagramIcon,
  GitLab: GitLabIcon,
  npm: NpmIcon,
}

const footerOrder = ["GitHub", "LinkedIn", "CodePen", "Instagram", "GitLab", "npm"]

export default function Shell() {
  const { pathname, hash } = useLocation()

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
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="navbar">
        <Link to="/" className="navbar-title">
          {profile.name}
        </Link>
        <div className="navbar-actions">
          <nav aria-label="Primary">
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
                  >
                    <span className="navbar-index">{item.index}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "hire-button active" : "hire-button")}
          >
            Hire me
          </NavLink>
        </div>
      </header>
      <SignalBar />
      <main id="content" className="stage" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer">
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
                  <Icon size={20} />
                </a>
              </li>
            )
          })}
        </ul>
        <p className="copyright">
          <Link to="/">© {new Date().getFullYear()} {profile.name}</Link>
        </p>
      </footer>
    </div>
  )
}
