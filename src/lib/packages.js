import { featured } from "../content.js"

const TTL = 30_000

const specs = featured.map((item) => ({
  name: item.name,
  version: item.fallback.version,
  license: item.fallback.license,
}))

let cache = null
let inflight = null

function licenseOf(meta, packument, fallback) {
  const raw = meta.license || packument.license || fallback
  if (typeof raw === "string") return raw
  if (raw && typeof raw === "object" && typeof raw.type === "string") return raw.type
  return fallback
}

function fallbackFor(spec) {
  return {
    name: spec.name,
    version: spec.version,
    license: spec.license,
    downloads: null,
    publishedAt: null,
    dependencies: null,
    history: [],
    live: false,
  }
}

export function fallbackPackages() {
  return specs.map(fallbackFor)
}

export function readCachedPackages() {
  if (cache && Date.now() - cache.at < TTL) return cache.data
  return null
}

export function findPackage(list, name) {
  return list.find((item) => item.name === name) || null
}

export function packageStatus(list) {
  if (list.every((item) => item.live)) return "live"
  if (list.some((item) => item.live)) return "partial"
  return "offline"
}

function previousReleases(time, current) {
  return Object.entries(time || {})
    .filter(([key, value]) => {
      if (key === "created" || key === "modified" || key === current) return false
      return !Number.isNaN(new Date(value).getTime())
    })
    .sort((a, b) => new Date(b[1]) - new Date(a[1]))
    .slice(0, 3)
    .map(([version, publishedAt]) => ({ version, publishedAt }))
}

async function fetchOne(spec) {
  const [packRes, downRes] = await Promise.all([
    fetch(`https://registry.npmjs.org/${spec.name}`, { cache: "reload" }),
    fetch(`https://api.npmjs.org/downloads/point/last-week/${spec.name}`, {
      cache: "reload",
    }),
  ])

  if (!packRes.ok) {
    throw new Error(`Registry responded ${packRes.status} for ${spec.name}`)
  }

  const packument = await packRes.json()
  const version = packument["dist-tags"]?.latest || spec.version
  const meta = packument.versions?.[version] || {}
  let downloads = null

  if (downRes.ok) {
    const body = await downRes.json()
    if (typeof body.downloads === "number") downloads = body.downloads
  }

  return {
    name: spec.name,
    version,
    license: licenseOf(meta, packument, spec.license),
    downloads,
    publishedAt: packument.time?.[version] || null,
    dependencies: Object.keys(meta.dependencies || {}).length,
    history: previousReleases(packument.time, version),
    live: true,
  }
}

export function loadPackages() {
  if (cache && Date.now() - cache.at < TTL) return Promise.resolve(cache.data)
  if (inflight) return inflight

  inflight = Promise.all(
    specs.map((spec) => fetchOne(spec).catch(() => fallbackFor(spec))),
  )
    .then((data) => {
      if (data.some((item) => item.live)) cache = { at: Date.now(), data }
      return data
    })
    .finally(() => {
      inflight = null
    })

  return inflight
}
