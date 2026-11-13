import { useEffect, useRef, useState } from "react"
import SectionHeading from "../components/SectionHeading.jsx"
import { profile } from "../content.js"
import { useTitle } from "../hooks/useTitle.js"

const kinds = [
  { value: "Company", label: "company" },
  { value: "Organizer", label: "organizer" },
  { value: "Small project", label: "project" },
  { value: "Freelance or other work", label: "freelance" },
  { value: "Someone else", label: "other" },
]

const steps = ["name", "email", "kind", "organization", "message"]

function requiresOrganization(kind) {
  return kind === "Company" || kind === "Organizer"
}

function matchKind(text) {
  const query = text.trim().toLowerCase()
  if (!query) return null
  const exact = kinds.find((kind) => kind.label === query || kind.value.toLowerCase() === query)
  if (exact) return exact
  const prefix = kinds.filter(
    (kind) => kind.label.startsWith(query) || kind.value.toLowerCase().startsWith(query),
  )
  return prefix.length === 1 ? prefix[0] : null
}

function question(step, values) {
  if (step === "name") return "What is your name?"
  if (step === "email") return "What email should I reply to?"
  if (step === "kind") return "Which one are you?"
  if (step === "organization") {
    if (values.kind === "Company") return "What is the company name?"
    if (values.kind === "Organizer") return "What is the organization?"
    return "What is the project? Press enter to skip."
  }
  return "What do you want to say?"
}

function shownAnswer(step, values) {
  if (step === "kind") return kinds.find((kind) => kind.value === values.kind)?.label || values.kind
  if (step === "organization" && !values.organization) return "skipped"
  return values[step]
}

function check(step, text, values) {
  if (step === "name") return text ? "" : "Add your name."
  if (step === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? "" : "Add an email so I can reply."
  if (step === "kind") return matchKind(text) ? "" : "Type company, organizer, project, freelance, or other."
  if (step === "organization") {
    if (requiresOrganization(values.kind) && !text) return "Add the company or organization."
    return ""
  }
  if (text.length < 12) return "Write a short message, at least a sentence."
  return ""
}

function loginStamp() {
  return new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function promptText(known) {
  if (known.email && known.name) return `${known.name}@localhost:~ $`
  if (known.name) return `localhost:~ ${known.name}$`
  return "localhost:~ $"
}

function knownBefore(step, values) {
  const index = steps.indexOf(step)
  const known = {}
  steps.slice(0, index).forEach((id) => {
    if (values[id]) known[id] = values[id]
  })
  return known
}

export default function Contact() {
  useTitle("Contact")
  const inputRef = useRef(null)
  const [login] = useState(loginStamp)
  const [values, setValues] = useState({
    name: "",
    email: "",
    organization: "",
    kind: "",
    message: "",
    honey: "",
  })
  const [cursor, setCursor] = useState(0)
  const [draft, setDraft] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)

  const step = steps[cursor]
  const finished = sent || cursor >= steps.length

  useEffect(() => {
    if (!finished) inputRef.current?.focus()
  }, [cursor, finished])

  function openMail(next) {
    setSent(true)
    if (next.honey) return
    const name = next.name.trim()
    const email = next.email.trim()
    const organization = next.organization.trim()
    const message = next.message.trim()
    const subject = `Hire me — ${name} (${next.kind})`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company, organization, or project: ${organization || "None given"}`,
      `From: ${next.kind}`,
      "",
      message,
    ].join("\n")
    window.setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }, 0)
  }

  function accept(raw) {
    const text = raw.trim()
    const problem = check(step, text, values)
    if (problem) {
      setError(problem)
      return
    }

    const next = { ...values }
    if (step === "kind") next.kind = matchKind(text).value
    else next[step] = text

    setValues(next)
    setDraft("")
    setError("")
    setCursor((current) => current + 1)
    if (step === "message") openMail(next)
  }

  function reset() {
    setValues({ name: "", email: "", organization: "", kind: "", message: "", honey: "" })
    setCursor(0)
    setDraft("")
    setError("")
    setSent(false)
  }

  return (
    <div className="page">
      <SectionHeading index="05">Contact</SectionHeading>

      <div className="term">
        <div className="term-titlebar">
          <span className="term-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="term-title">zsh</span>
          <span />
        </div>

        <div
          className="term-screen"
          onMouseDown={(event) => {
            if (event.target.closest("button, input, a")) return
            inputRef.current?.focus()
          }}
        >
          <p className="term-boot">Last login: {login} on console</p>

          {steps.slice(0, cursor).map((id) => (
            <div key={id} className="term-turn">
              <p className="term-q">{question(id, values)}</p>
              <p className="term-line">
                <span className="term-prompt">{promptText(knownBefore(id, values))}</span>
                <span className="term-answer">{shownAnswer(id, values)}</span>
              </p>
            </div>
          ))}

          {finished ? (
            <div className="term-turn" role="status">
              <p className="term-q">Opening your mail app. Send it from there and it reaches me in {profile.location}.</p>
              <button className="term-line term-again" type="button" onClick={reset}>
                <span className="term-prompt">{promptText(values)}</span>
                <span className="term-answer">clear</span>
              </button>
            </div>
          ) : (
            <form
              className="term-turn"
              onSubmit={(event) => {
                event.preventDefault()
                accept(draft)
              }}
            >
              <div className="honey" aria-hidden="true">
                <label htmlFor="honey">
                  Leave this empty
                  <input
                    id="honey"
                    value={values.honey}
                    onChange={(event) => setValues((current) => ({ ...current, honey: event.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>
              <p className="term-q" id="term-ask">
                {question(step, values)}
              </p>
              {step === "kind" ? (
                <label className="term-line" htmlFor="term-kind">
                  <span className="term-prompt">{promptText(knownBefore(step, values))}</span>
                  <select
                    id="term-kind"
                    ref={inputRef}
                    className="term-select"
                    defaultValue=""
                    aria-labelledby="term-ask"
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? "term-error" : undefined}
                    onChange={(event) => {
                      if (event.target.value) accept(event.target.value)
                    }}
                  >
                    <option value="" disabled>
                      choose
                    </option>
                    {kinds.map((kind) => (
                      <option key={kind.value} value={kind.label}>
                        {kind.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <label className="term-line" htmlFor="term-input">
                  <span className="term-prompt">{promptText(knownBefore(step, values))}</span>
                  <span className="term-entry">
                    <span className="term-typed" aria-hidden="true">
                      {draft}
                    </span>
                    <span className="term-cursor" aria-hidden="true" />
                    <input
                      id="term-input"
                      ref={inputRef}
                      className="term-input"
                      value={draft}
                      onChange={(event) => {
                        setDraft(event.target.value)
                        setError("")
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return
                        event.preventDefault()
                        accept(event.currentTarget.value)
                      }}
                      aria-labelledby="term-ask"
                      aria-invalid={error ? "true" : undefined}
                      aria-describedby={error ? "term-error" : undefined}
                      autoComplete={step === "name" ? "name" : step === "email" ? "email" : step === "organization" ? "organization" : "off"}
                      spellCheck={step === "message"}
                    />
                  </span>
                </label>
              )}
              {error ? (
                <p id="term-error" className="term-error" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
