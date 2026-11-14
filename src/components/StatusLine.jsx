import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const files = {
  "/": { name: "readme.md", type: "markdown" },
  "/about": { name: "about.md", type: "markdown" },
  "/experience": { name: "experience.md", type: "markdown" },
  "/projects": { name: "projects.md", type: "markdown" },
  "/archive": { name: "archive.md", type: "markdown" },
  "/resume": { name: "resume.pdf", type: "pdf" },
  "/contact": { name: "contact", type: "zsh" },
}

const lineSelector = "h1, h2, h3, h4, p, li, tr, header"

function lineCount(root) {
  return [...root.querySelectorAll(lineSelector)].filter((el) => {
    if (el.querySelector(lineSelector)) return false
    return (el.textContent || "").trim().length > 0
  }).length
}

export default function StatusLine() {
  const { pathname } = useLocation()
  const file = files[pathname] || { name: "readme.md", type: "markdown" }
  const [lines, setLines] = useState(0)

  useEffect(() => {
    const root = document.getElementById("content")
    if (!root || file.type === "pdf") {
      setLines(0)
      return
    }

    const count = () => setLines(lineCount(root))
    count()
    const observer = new MutationObserver(count)
    observer.observe(root, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [pathname, file.type])

  return (
    <div className="statusline" aria-label={`${file.name}, ${file.type}${lines ? `, ${lines} lines` : ""}`}>
      <span>{file.name}</span>
      <span className="statusline-meta">
        <span>{file.type}</span>
        {lines > 0 ? <span>{lines}L</span> : null}
      </span>
    </div>
  )
}
