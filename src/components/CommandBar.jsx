import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { archive, nav, projects } from "../content.js"

export function archiveId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const featured = new Set(projects.map((project) => project.name.toLowerCase()))

const commands = [
  { label: "readme", kind: "file", to: "/" },
  ...nav.map((item) => ({ label: item.label.toLowerCase(), kind: item.index, to: item.to })),
  { label: "archive", kind: "file", to: "/archive" },
  ...projects.map((project) => ({
    label: project.name,
    kind: "project",
    to: `/projects#${project.name}`,
  })),
  ...archive
    .filter((item) => !featured.has(item.name.toLowerCase()))
    .map((item) => ({
      label: item.name,
      kind: item.year,
      to: `/archive#${archiveId(item.name)}`,
    })),
]

function rank(command, query) {
  if (!query) return 1
  const label = command.label.toLowerCase()
  const kind = command.kind.toLowerCase()
  if (label.startsWith(query)) return 3
  if (label.includes(query) || kind.includes(query)) return 2
  return 0
}

function typingTarget(target) {
  return target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
}

export default function CommandBar() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return commands
      .map((command, index) => ({ command, index, score: rank(command, needle) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map((item) => item.command)
  }, [query])

  useEffect(() => {
    function onKey(event) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return
      if (open || typingTarget(event.target)) return
      event.preventDefault()
      setQuery("")
      setActive(0)
      setOpen(true)
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    function onKey(event) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    const node = listRef.current?.querySelector("[aria-selected='true']")
    node?.scrollIntoView({ block: "nearest" })
  }, [active, results])

  function go(command) {
    if (!command) return
    setOpen(false)
    setQuery("")
    navigate(command.to)
  }

  function onInputKey(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((current) => (results.length === 0 ? 0 : (current + 1) % results.length))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((current) => (results.length === 0 ? 0 : (current - 1 + results.length) % results.length))
    } else if (event.key === "Enter") {
      event.preventDefault()
      go(results[active])
    }
  }

  return (
    <>
      <button
        type="button"
        className="command-hint"
        onClick={() => {
          setQuery("")
          setActive(0)
          setOpen(true)
        }}
      >
        press /
      </button>
      {open ? (
        <div
          className="command-layer"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="command-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Jump to a page or project"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <label className="command-field">
              <span className="command-prompt" aria-hidden="true">
                /
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKey}
                placeholder="page or project"
                aria-controls="command-list"
                aria-activedescendant={results[active] ? `command-option-${active}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            {results.length > 0 ? (
              <ul id="command-list" className="command-list" role="listbox" ref={listRef}>
                {results.map((command, index) => (
                  <li key={command.to} id={`command-option-${index}`} role="option" aria-selected={index === active}>
                    <button type="button" onMouseEnter={() => setActive(index)} onClick={() => go(command)}>
                      <span className="command-kind">{command.kind}</span>
                      <span className="command-label">{command.label}</span>
                      <span className="command-path">{command.to}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="command-empty">Nothing matches.</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
