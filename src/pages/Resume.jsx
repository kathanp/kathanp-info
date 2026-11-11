import { useTitle } from "../hooks/useTitle.js"

const resumePdf = "/KathanP_Resume1.pdf"

export default function Resume() {
  useTitle("Resume")

  return (
    <div className="page">
      <div className="resume-actions">
        <a className="print-button" href={resumePdf} download="KathanP_Resume1.pdf">
          Download PDF
        </a>
        <a className="print-button" href={resumePdf} target="_blank" rel="noreferrer">
          Open PDF
        </a>
      </div>
      <iframe
        className="resume-frame"
        src={`${resumePdf}#toolbar=0&navpanes=0&view=FitH`}
        title="Kathan Patel resume"
      />
    </div>
  )
}
