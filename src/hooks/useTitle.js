import { useEffect } from "react"

export function useTitle(page) {
  useEffect(() => {
    document.title = page ? `${page} · Kathan Patel` : "Kathan Patel · Fullstack Developer"
  }, [page])
}
