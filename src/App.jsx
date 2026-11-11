import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Shell from "./components/Shell.jsx"
import About from "./pages/About.jsx"
import Experience from "./pages/Experience.jsx"
import Contact from "./pages/Contact.jsx"
import Home from "./pages/Home.jsx"
import Archive from "./pages/Archive.jsx"
import Projects from "./pages/Projects.jsx"
import Resume from "./pages/Resume.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="archive" element={<Archive />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
