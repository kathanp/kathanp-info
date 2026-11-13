import { useEffect } from "react"

const clickable = [
  "a[href]",
  "button:not(:disabled)",
  "summary",
  "[role='button']:not([aria-disabled='true'])",
  "[role='link']",
  "input[type='button']:not(:disabled)",
  "input[type='submit']:not(:disabled)",
  "input[type='checkbox']:not(:disabled)",
  "input[type='radio']:not(:disabled)",
  "select:not(:disabled)",
  "label:has(input[type='checkbox']:not(:disabled))",
  "label:has(input[type='radio']:not(:disabled))",
].join(", ")

function playClick(ctx, noise) {
  const t = ctx.currentTime

  const tick = ctx.createOscillator()
  const tickGain = ctx.createGain()
  tick.type = "triangle"
  tick.frequency.setValueAtTime(2100, t)
  tick.frequency.exponentialRampToValueAtTime(320, t + 0.03)
  tickGain.gain.setValueAtTime(0.0001, t)
  tickGain.gain.exponentialRampToValueAtTime(0.16, t + 0.003)
  tickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04)
  tick.connect(tickGain)
  tickGain.connect(ctx.destination)
  tick.start(t)
  tick.stop(t + 0.045)

  const snap = ctx.createBufferSource()
  snap.buffer = noise
  const filter = ctx.createBiquadFilter()
  filter.type = "highpass"
  filter.frequency.value = 1600
  const snapGain = ctx.createGain()
  snapGain.gain.setValueAtTime(0.28, t)
  snapGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025)
  snap.connect(filter)
  filter.connect(snapGain)
  snapGain.connect(ctx.destination)
  snap.start(t)
}

export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!fine) return

    const AudioCtx = window.AudioContext || window.webkitAudioContext
    let ctx = null
    let noise = null

    function onDown(event) {
      if (event.button !== 0 || !AudioCtx) return
      if (!event.target.closest?.(clickable)) return
      if (!ctx) {
        ctx = new AudioCtx()
        const length = Math.max(1, Math.floor(ctx.sampleRate * 0.02))
        noise = ctx.createBuffer(1, length, ctx.sampleRate)
        const data = noise.getChannelData(0)
        for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1
      }
      if (ctx.state === "suspended") ctx.resume()
      playClick(ctx, noise)
    }

    window.addEventListener("pointerdown", onDown, true)

    return () => {
      window.removeEventListener("pointerdown", onDown, true)
      ctx?.close()
    }
  }, [])

  return null
}
