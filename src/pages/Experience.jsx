import SectionHeading from "../components/SectionHeading.jsx"
import { experience } from "../content.js"
import { useTitle } from "../hooks/useTitle.js"

export default function Experience() {
  useTitle("Experience")

  return (
    <div className="page">
      <SectionHeading index="02">Experience</SectionHeading>
      <p className="lede">
        HaltPath, apiversa, fullshield, and hubvik are the tools I publish in the open. Software
        engineer at USAA in
        Dallas from January 2021 to June 2022. Before that, junior software engineer at Synchrony
        Finance in Illinois. From
        December 2016 to April 2017, Java developer trainee at SculpSoft in Ahmedabad. From 2014 to
        2017, fundraising coordinator at Udaan, The Joy of Giving.
      </p>
      <ol className="jobs">
        {experience.map((job) => (
          <li className="job" key={job.company}>
            <p className="job-when">{job.when}</p>
            <div>
              <h3>
                {job.title}
                <span className="job-at"> · </span>
                <a href={job.url} target="_blank" rel="noreferrer noopener">
                  {job.company}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>
              {job.location ? <p className="job-where">{job.location}</p> : null}
              {job.points?.length ? (
                <ul className="job-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="job-summary">{job.summary}</p>
              )}
              {job.tools.length > 0 ? (
                <ul className="pills">
                  {job.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
