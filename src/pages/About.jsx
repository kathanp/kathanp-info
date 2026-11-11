import { Intro } from "./Home.jsx"
import { useTitle } from "../hooks/useTitle.js"

export default function About() {
  useTitle("About")
  return <Intro />
}
