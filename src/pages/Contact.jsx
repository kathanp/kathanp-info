import { useState } from "react"
import SectionHeading from "../components/SectionHeading.jsx"
import { profile } from "../content.js"
import { useTitle } from "../hooks/useTitle.js"

const kinds = ["Company", "Organizer", "Small project", "Freelance or other work", "Someone else"]

function requiresOrganization(kind) {
  return kind === "Company" || kind === "Organizer"
}

const empty = {
  name: "",
  email: "",
  organization: "",
  kind: "Company",
  message: "",
  honey: "",
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = "Add your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Add an email so I can reply."
  }
  if (requiresOrganization(values.kind) && !values.organization.trim()) {
    errors.organization = "Add the company or organization."
  }
  if (values.message.trim().length < 12) errors.message = "Write a short message, at least a sentence."
  return errors
}

export default function Contact() {
  useTitle("Contact")
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      const next = { ...current, [name]: undefined }
      if (name === "kind" && !requiresOrganization(value)) next.organization = undefined
      return next
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    if (values.honey) {
      setStatus("sent")
      return
    }

    const name = values.name.trim()
    const email = values.email.trim()
    const organization = values.organization.trim()
    const message = values.message.trim()
    const subject = `Hire me — ${name} (${values.kind})`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company, organization, or project: ${organization || "None given"}`,
      `From: ${values.kind}`,
      "",
      message,
    ].join("\n")

    setStatus("sent")
    window.setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }, 0)
  }

  return (
    <div className="page">
      <SectionHeading>Contact</SectionHeading>
      <p className="lede">
        A company, an organizer, or anyone with a small project, freelance work, or anything else can send a message here. I'm in {profile.location}.
      </p>

      {status === "sent" ? (
        <div className="form-success" role="status">
          <p className="form-success-title">Message ready</p>
          <p>Your email app should open with this message already written. Send it from there and it reaches me.</p>
          <button className="hire-button" type="button" onClick={() => setStatus("idle")}>
            Write another
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="honey" aria-hidden="true">
            <label htmlFor="honey">
              Leave this empty
              <input id="honey" name="honey" value={values.honey} onChange={update} tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <fieldset className="kind">
            <legend>I am</legend>
            <div className="kind-grid">
              {kinds.map((kind) => (
                <label key={kind} className={values.kind === kind ? "kind-option is-selected" : "kind-option"}>
                  <input
                    type="radio"
                    name="kind"
                    value={kind}
                    checked={values.kind === kind}
                    onChange={update}
                  />
                  <span>{kind}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={update}
                autoComplete="name"
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name ? <p id="name-error">{errors.name}</p> : null}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={update}
                autoComplete="email"
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email ? <p id="email-error">{errors.email}</p> : null}
            </div>
          </div>

          <div className="field">
            <div className="field-head">
              <label htmlFor="organization">Company, organization, or project</label>
              {requiresOrganization(values.kind) ? null : <span className="field-note">Optional</span>}
            </div>
            <input
              id="organization"
              name="organization"
              value={values.organization}
              onChange={update}
              autoComplete="organization"
              aria-invalid={errors.organization ? "true" : undefined}
              aria-describedby={errors.organization ? "organization-error" : undefined}
            />
            {errors.organization ? <p id="organization-error">{errors.organization}</p> : null}
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={values.message}
              onChange={update}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message ? <p id="message-error">{errors.message}</p> : null}
          </div>

          <button className="hire-button submit" type="submit">
            Send message
          </button>
        </form>
      )}
    </div>
  )
}
