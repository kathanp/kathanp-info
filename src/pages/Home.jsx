import { Link } from "react-router-dom"
import { featured, profile, projects } from "../content.js"
import { useTitle } from "../hooks/useTitle.js"

export function Intro() {
  const fullshield = featured.find((item) => item.name === "fullshield")
  const hubvik = featured.find((item) => item.name === "hubvik")
  const apiversa = projects.find((item) => item.name === "apiversa")

  return (
    <div className="file">
      <header className="file-tab">
        <span className="file-name">readme.md</span>
        <span className="file-meta">{profile.location}</span>
      </header>
      <p className="prompt">
        <span>$</span> whoami
      </p>
      <h1 className="prompt-name">{profile.name}</h1>
      <p className="prompt-role">
        {profile.role} · {profile.location}
      </p>
      <p>
        I'm a fullstack developer in {profile.location}. I like building things other people can
        pick up and use: a package you install, a tool that does one job, a report you can read
        and decide what to do with. I like software that stays out of the way until you ask it to
        change something. Right now that means open source for the community. I worked at{" "}
        <a href="https://www.usaa.com/" target="_blank" rel="noreferrer noopener">
          {profile.company}
        </a>
        , and in the open I'm maintaining HaltPath,{" "}
        <a href={apiversa.repo} target="_blank" rel="noreferrer noopener">
          apiversa
        </a>
        ,{" "}
        <a href={fullshield.npm} target="_blank" rel="noreferrer noopener">
          fullshield
        </a>
        , and{" "}
        <a href={hubvik.npm} target="_blank" rel="noreferrer noopener">
          hubvik
        </a>
        .
      </p>
      <p>
        If you want to know what I'm working on, how to use it, or you just have a question,{" "}
        <Link to="/contact">ask</Link>. I like those conversations.
      </p>
      <p className="prompt-next">
        <Link to="/about">about</Link>
        <Link to="/projects">projects</Link>
        <Link to="/contact">ask</Link>
      </p>
    </div>
  )
}

export default function Home() {
  useTitle()
  return <Intro />
}
