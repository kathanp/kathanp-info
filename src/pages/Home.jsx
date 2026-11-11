import { Link } from "react-router-dom"
import { featured, profile } from "../content.js"
import { useTitle } from "../hooks/useTitle.js"

export function Intro() {
  const fullshield = featured[0]
  const hubvik = featured[1]

  return (
    <div className="page about">
      <div className="about-marks" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <h1 className="about-hello">Hi, I'm Kathan.</h1>
      <div className="about-marks about-marks-under" aria-hidden="true">
        <span />
        <span />
      </div>
      <p>
        I'm a fullstack developer in {profile.location}. I like building things other people can
        pick up and use: a package you install, a tool that does one job, a report you can read
        and decide what to do with. I like software that stays out of the way until you ask it to
        change something. Right now that means open source for the community. I worked at{" "}
        <a href="https://www.usaa.com/" target="_blank" rel="noreferrer noopener">
          {profile.company}
        </a>
        , and in the open I'm maintaining{" "}
        <a href={fullshield.npm} target="_blank" rel="noreferrer noopener">
          fullshield
        </a>{" "}
        and{" "}
        <a href={hubvik.npm} target="_blank" rel="noreferrer noopener">
          hubvik
        </a>
        .
      </p>
      <p>
        If you want to know what I'm working on, how to use it, or you just have a question,{" "}
        <Link to="/contact">ask</Link>. I like those conversations.
      </p>
    </div>
  )
}

export default function Home() {
  useTitle()
  return <Intro />
}
