// data/goals.js

export const goals = [
  {
    id: "sre",
    icon: "◎",
    title: "Site Reliability Engineering",
    cron: "@reboot",
    desc: "Build and maintain highly available distributed systems with 99.99%+ uptime SLOs and clear error budgets.",
    color: "var(--g)",
  },
  {
    id: "cloud",
    icon: "☁",
    title: "Cloud Infrastructure",
    cron: "0 */6 * * *",
    desc: "Architect scalable cloud-native systems on AWS — IaC, auto-scaling, cost optimisation at scale.",
    color: "#00e5ff",
  },
  {
    id: "devops",
    icon: "⎇",
    title: "DevOps Automation",
    cron: "*/5 * * * *",
    desc: "Automate everything: CI/CD pipelines, infrastructure provisioning, and zero-downtime deployments.",
    color: "var(--amber)",
  },
  {
    id: "observability",
    icon: "◉",
    title: "Observability & Monitoring",
    cron: "* * * * *",
    desc: "Build full-stack observability with metrics, logs, distributed traces, and intelligent on-call alerting.",
    color: "var(--g)",
  },
  {
    id: "security",
    icon: "⬡",
    title: "Cybersecurity Practices",
    cron: "0 0 * * 0",
    desc: "Integrate security at every layer — DevSecOps, threat modelling, and secure-by-default architecture.",
    color: "var(--red)",
  },
  {
    id: "database",
    icon: "⊞",
    title: "Database Architecture",
    cron: "0 3 * * *",
    desc: "Design performant, reliable data stores — query optimisation, replication, and automatic failover.",
    color: "#00e5ff",
  },
];
