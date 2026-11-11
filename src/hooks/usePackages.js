import { useEffect, useState } from "react"
import { fallbackPackages, loadPackages, packageStatus, readCachedPackages } from "../lib/packages.js"

export function usePackages() {
  const cached = readCachedPackages()
  const [packages, setPackages] = useState(cached || fallbackPackages)
  const [status, setStatus] = useState(cached ? packageStatus(cached) : "loading")

  useEffect(() => {
    let cancel = false
    loadPackages().then((data) => {
      if (cancel) return
      setPackages(data)
      setStatus(packageStatus(data))
    })
    return () => {
      cancel = true
    }
  }, [])

  return { packages, status }
}
