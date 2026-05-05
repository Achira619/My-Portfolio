// data/skills.js
// Skill levels are percentages (0–100).
// color: CSS variable string for accent.

export const skillCategories = [
  {
    id: "programming",
    label: "Programming Languages",
    path: "/usr/bin/lang",
    color: "var(--g)",
    icon: "{ }",
    skills: [
      { name: "Java",       level: 80, pkg: "openjdk-21"  },
      { name: "Python",     level: 72, pkg: "python3.12"  },
      { name: "JavaScript", level: 68, pkg: "node-20-lts" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    path: "/usr/sbin/ops",
    color: "#00e5ff",
    icon: "⎇",
    skills: [
      { name: "Docker",     level: 65, pkg: "docker-ce"    },
      { name: "Git/GitHub", level: 85, pkg: "git-2.44"     },
      { name: "Linux",      level: 75, pkg: "kernel-6.8.0" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Systems",
    path: "/etc/cloud",
    color: "var(--amber)",
    icon: "☁",
    skills: [
      { name: "AWS Core",     level: 50, pkg: "awscli-2"       },
      { name: "Networking",   level: 60, pkg: "net-tools"       },
      { name: "System Design",level: 55, pkg: "architecture-v1" },
    ],
  },
  {
    id: "database",
    label: "Database",
    path: "/var/lib/db",
    color: "#6a00ff",
    icon: "⊞",
    skills: [
      { name: "SQL",              level: 78, pkg: "postgresql-16" },
      { name: "DB Design",        level: 70, pkg: "schema-tools"  },
      { name: "Query Optimization",level: 58, pkg: "explain-analyze"},
    ],
  },
];

export const conceptBadges = [
  { label: "OOP",             pkg: "oop-patterns"   },
  { label: "Agile / SDLC",   pkg: "Concepts"   },
  //{ label: "REST APIs",       pkg: "openapi-3"      },
 // { label: "Monitoring",      pkg: "prometheus"     },
  { label: "CI/CD Concepts",  pkg: "gh-actions"     },
 // { label: "Cybersecurity",   pkg: "sec-baseline"   },
  { label: "Bash Scripting",  pkg: "bash-5.2"       },
 // { label: "TCP/IP",          pkg: "networking"     },
];
