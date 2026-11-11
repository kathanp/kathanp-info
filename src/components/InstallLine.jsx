import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "./Icons.jsx"

export default function InstallLine({ name }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  const command = `npm install ${name}`

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className="install"
      onClick={copy}
      aria-label={copied ? "Copied install command" : `Copy ${command}`}
    >
      <code>{command}</code>
      <span>{copied ? <CheckIcon /> : <CopyIcon />}</span>
    </button>
  )
}
