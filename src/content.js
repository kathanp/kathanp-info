// Edit this file to change the words on the site.
// For a project with an npm link, version, publish time, downloads, and
// dependency count come from the registry. The others use the facts below.

export const profile = {
  name: "Kathan Patel",
  role: "Fullstack Developer",
  tagline: "I build open source for the community.",
  location: "Dallas",
  company: "USAA",
  email: "patelkathan244@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/kathanp" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kkp244/" },
    { label: "CodePen", href: "https://codepen.io/kathanp" },
    { label: "GitLab", href: "https://gitlab.com/kathanp" },
    { label: "npm", href: "https://www.npmjs.com/~kathan2404" },
  ],
}

export const nav = [
  { to: "/about", label: "About", index: "01" },
  { to: "/experience", label: "Experience", index: "02" },
  { to: "/projects", label: "Projects", index: "03" },
  { to: "/resume", label: "Resume", index: "04" },
  { to: "/contact", label: "Contact", index: "05" },
]

export const projects = [
  {
    name: "HaltPath",
    blurb:
      "Follow one payment, order, or claim id across Kafka services and say which failure hit it.",
    summary:
      "Give it one business id, such as a payment id, an order id, or a claim id. It shows the path that id took across every Kafka service, which failure pattern hit it, why, and what to change. It runs inside the customer's network.",
    facts: ["v1.1.0", "Java", "Spring Boot", "Kafka"],
    notes: [
      {
        label: "For",
        text: "Companies that already move one business id through several Java services on Kafka. A payment, a claim, an order, or a shipment.",
      },
      {
        label: "Does",
        text: "A starter in each Spring service records the hops. One server beside Kafka and Postgres rebuilds the path, names the failure, and writes what to change. The id is HMAC-hashed before it leaves the service.",
      },
      {
        label: "Leaves alone",
        text: "It reports. A person decides whether to replay, move an offset, or change a setting. It does not sit in the payment path, and it does not read the payment body.",
      },
    ],
  },
  {
    name: "apiversa",
    blurb:
      "Date-based API versioning for Node.js and Spring. One handler, and a change file keeps older clients working.",
    summary:
      "Date-based API versioning for Node.js and Spring. You write the newest handler once, and a change file keeps older clients working when a field is renamed or a number becomes an object.",
    repo: "https://github.com/kathanp/apiversa",
    facts: ["Apache-2.0", "Node.js", "Spring"],
    notes: [
      {
        label: "For",
        text: "Teams that ship breaking API changes and still have old apps and partner integrations in the field.",
      },
      {
        label: "Does",
        text: "Each client is pinned to a date, like 2026-01-15. The handler is written once, for the newest version. Each breaking change is one change file: old requests are upgraded, the handler runs, and the response is downgraded.",
      },
      {
        label: "Leaves alone",
        text: "It does not keep a copied handler for every version. Old clients keep their date until you retire it.",
      },
    ],
  },
  {
    name: "fullshield",
    blurb: "Full-cycle security scanner for Node.js and TypeScript backends.",
    summary:
      "Security scanner for Node.js/TypeScript backends. It does SAST, secret, dependency, supply-chain, MCP and config scanning, and it ships runtime middleware (Express, Fastify, Koa, Hono), RASP and an experimental DLP feature.",
    repo: "https://github.com/kathanp/fullshield",
    npm: "https://www.npmjs.com/package/fullshield",
    fallback: { version: "3.1.2", license: "MIT" },
    notes: [
      { label: "For", text: "Node.js and TypeScript backends you already run." },
      {
        label: "Does",
        text: "It reviews the code, secrets, dependencies, supply chain, MCP setup, and configuration. Each finding follows one cycle: detect, classify, report, notify, fix, and prevent.",
      },
      {
        label: "Leaves alone",
        text: "A scan does not stop an attack by itself. Your code stays as it is until you choose to apply a fix.",
      },
    ],
  },
  {
    name: "hubvik",
    blurb: "Per-device anomaly detection for IoT gateways, hubs, and small appliances.",
    summary:
      "Anomaly detection for IoT gateways, hubs, and small appliances. It learns normal behavior, reports changes, runs offline with no dependencies, and does not block or rewrite traffic.",
    repo: "https://github.com/kathanp/hubvik",
    npm: "https://www.npmjs.com/package/hubvik",
    fallback: { version: "2.3.0", license: "Apache-2.0" },
    notes: [
      {
        label: "For",
        text: "IoT gateways, smart-home hubs, building servers, and the small appliances behind them.",
      },
      {
        label: "Does",
        text: "It learns the traffic each device normally sends, then reports when that pattern changes.",
      },
      {
        label: "Leaves alone",
        text: "Traffic is left as it is. hubvik does not block, drop, or rewrite it, and you decide what a report means.",
      },
    ],
  },
]

export const featured = projects.filter((item) => item.npm)

export const experience = [
  {
    when: "2026 — Present",
    title: "Maintainer",
    company: "HaltPath, apiversa, fullshield, and hubvik",
    url: "https://github.com/kathanp",
    location: "Open source",
    summary:
      "HaltPath traces one business id across Kafka services. apiversa keeps old API clients working from one handler. fullshield and hubvik are the two packages on npm.",
    points: [
      "HaltPath takes a payment, order, or claim id and shows the path it took across Java services on Kafka, which failure hit it, and what to change. It reports. It does not sit in the payment path or read the payment body.",
      "apiversa is date-based API versioning for Node.js and Spring. The newest handler is written once, and a change file keeps older clients working.",
      "fullshield is a security scanner for Node.js and TypeScript backends. The published cycle is detect, classify, report, notify, fix, and prevent.",
      "hubvik learns what each device normally does on a gateway, hub, or small appliance, then reports when that changes. It runs offline, has no dependencies, and does not block, drop, or rewrite traffic.",
    ],
    tools: ["Java", "Spring Boot", "Kafka", "TypeScript", "Node.js", "npm", "GitHub Actions"],
  },
  {
    when: "Jan 2021 — Jun 2022",
    title: "Software Engineer",
    company: "USAA",
    url: "https://www.usaa.com/",
    location: "Dallas, Texas",
    summary:
      "Credit-card microservices: Spring Batch and Kafka services, a React frontend, and the pipeline that ships them.",
    points: [
      "Built Spring Batch and Apache Kafka applications with Maven, and deployed credit-card microservices from GitLab to OpenShift.",
      "Built self-service engines on a microservice architecture, with React on the frontend and Java and Kafka behind it. One engine reduced the work of creating privileged accounts and setting their permissions in CyberArk, a 10% productivity gain.",
      "Watched logs, spikes, JVM pressure, and alert errors in Kibana, Grafana, and Elasticsearch, and traced resource use with Datadog APM.",
      "Owned the CI/CD pipeline: Jenkins, shell scripts, JSON, YAML, GitLab CI, Datadog, and Control-M.",
    ],
    tools: [
      "Java",
      "Spring Batch",
      "Apache Kafka",
      "React",
      "Maven",
      "OpenShift",
      "GitLab CI",
      "Jenkins",
      "CyberArk",
      "Elasticsearch",
      "Kibana",
      "Grafana",
      "Datadog",
      "Control-M",
    ],
  },
  {
    when: "Previous",
    title: "Jr. Software Engineer",
    company: "Synchrony Finance",
    url: "https://www.synchrony.com/",
    location: "Illinois",
    summary:
      "Application work across the delivery cycle, from analysis through enhancement, on a Spring Boot and React stack.",
    points: [
      "Worked every phase of delivery: analysis, design, development, system integration, testing, implementation, and enhancement, on an Agile team.",
      "Sat with business analysts, QA, and other developers on a model-view architecture. Used the controller to take user requests and keep the application easier to change.",
      "Added web-service behavior backed by SQL Server.",
    ],
    tools: ["Spring Boot", "Hibernate", "React", "MySQL", "SQL Server", "JUnit", "Jenkins", "Agile"],
  },
  {
    when: "Dec 2016 — Apr 2017",
    title: "Java Developer Trainee",
    company: "SculpSoft Pvt. Ltd.",
    url: "https://www.sculptsoft.com/",
    location: "Ahmedabad Area, India",
    summary:
      "Analysis, development, and maintenance on a Java project, plus the interfaces and the data behind them.",
    points: [
      "Worked the analysis, development, and maintenance phases of the project in a J2EE environment.",
      "Wrote code with core Java collections, exception handling, and multi-threading, using object-oriented design patterns.",
      "Built responsive interfaces with JSP, HTML, and CSS in Eclipse.",
      "Ran SQL queries in Microsoft SQL Server to find data problems and fix them.",
    ],
    tools: ["Java", "J2EE", "JSP", "HTML", "CSS", "Eclipse", "SQL Server"],
  },
  {
    when: "Aug 2014 — Jan 2017",
    title: "Fundraising Coordinator",
    company: "Udaan - The Joy of Giving",
    url: "https://udaanthejoyofgiving.wordpress.com",
    location: "",
    summary:
      "Fundraising for children who are poor, who live in slums, and who have multiple disabilities.",
    points: [
      "Planned and ran fundraising, including multi-channel campaigns and events, and kept relationships with donors.",
      "Managed the budget, tracked expenses, and kept the work compliant. Used the results to adjust the plan.",
      "Collected donations and used them for food, clothes, and gifts at festivals, including Diwali.",
      "Arranged picnics for the children, including lunch and dinner, and took them out.",
    ],
    tools: [],
  },
]

export const archive = [
  {
    year: "2026",
    name: "HaltPath",
    where: "Open source",
    built: ["Java", "Spring Boot", "Kafka", "React"],
    line: "One business id, the path it took across Kafka, the failure, and what to change.",
  },
  {
    year: "2026",
    name: "apiversa",
    where: "Open source",
    built: ["Node.js", "Spring"],
    line: "Date-based API versioning. One handler, and a change file keeps older clients working.",
    url: "https://github.com/kathanp/apiversa",
    link: "kathanp/apiversa",
  },
  {
    year: "2026",
    name: "fullshield",
    where: "Open source",
    built: ["TypeScript", "Node.js"],
    url: "https://github.com/kathanp/fullshield",
    link: "kathanp/fullshield",
  },
  {
    year: "2026",
    name: "hubvik",
    where: "Open source",
    built: ["JavaScript", "Node.js"],
    url: "https://github.com/kathanp/hubvik",
    link: "kathanp/hubvik",
  },
  {
    year: "2025",
    name: "Email Bot",
    where: "Infinite8 Solutions",
    line: "A Flask app that sends mail through Gmail, with Google sign-in.",
    built: ["Python", "Flask", "Bootstrap"],
    url: "https://github.com/Infinite8-Solutions/Email_Bot",
    link: "Infinite8-Solutions/Email_Bot",
  },
  {
    year: "2025",
    name: "Email Service",
    where: "Infinite8 Solutions",
    line: "Campaign mail, with a React app, Python, AWS SES, and Stripe.",
    built: ["React", "Python", "AWS SES", "Stripe"],
    url: "https://github.com/Infinite8-Solutions/Email_service",
    link: "Infinite8-Solutions/Email_service",
  },
  {
    year: "2025",
    name: "All Season Plans",
    where: "All Season Plans",
    line: "A trip-planning site.",
    built: ["React"],
    url: "https://allseasonplans.com",
    link: "allseasonplans.com",
  },
  {
    year: "2024",
    name: "KSY Landing",
    where: "KSY Group",
    line: "A landing page for KSY Group.",
    built: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://github.com/kathanp/KSY_Landing_Next",
    link: "kathanp/KSY_Landing_Next",
  },
  {
    year: "2022",
    name: "Dropbox Replica",
    where: "Personal",
    line: "File sync and group sharing, with React, Express, Kafka, and MySQL.",
    built: ["React", "Express", "Node.js", "Apache Kafka", "MySQL"],
    url: "https://github.com/kathanp/Dropbox-Replica",
    link: "kathanp/Dropbox-Replica",
  },
  {
    year: "2022",
    name: "Emergency Panic",
    where: "Personal",
    line: "A React Native app for sending an emergency alert.",
    built: ["React Native", "Expo"],
    url: "https://github.com/kathanp/EmergencyPanic",
    link: "kathanp/EmergencyPanic",
  },
  {
    year: "2020",
    name: "MEDIplus",
    where: "Personal",
    line: "A medicine distribution system.",
    built: [],
    url: "https://github.com/kathanp/MEDIplus",
    link: "kathanp/MEDIplus",
  },
  {
    year: "2020",
    name: "CSC121",
    where: "Coursework",
    line: "Coursework in C++.",
    built: ["C++"],
    url: "https://github.com/kathanp/CSC121",
    link: "kathanp/CSC121",
  },
  {
    year: "2019",
    name: "Todo App",
    where: "Personal",
    line: "A React todo list.",
    built: ["React"],
    url: "https://github.com/kathanp/TodoApp-kp",
    link: "kathanp/TodoApp-kp",
  },
  {
    year: "2019",
    name: "Stock Market Calculator",
    where: "Personal",
    line: "A React calculator for a stock trade.",
    built: ["React"],
    url: "https://github.com/kathanp/Stock-market-calculator",
    link: "kathanp/Stock-market-calculator",
  },
]

export const tools = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "Apache Kafka",
  "MySQL",
  "GitHub Actions",
  "npm",
  "OpenShift",
  "Elasticsearch",
  "Datadog",
  "Control-M",
]
