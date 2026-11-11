export default function SectionHeading({ index, children }) {
  return (
    <h1 className="section-heading">
      {index ? <span className="section-index">{index}</span> : null}
      {children}
    </h1>
  )
}
