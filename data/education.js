// data/education.js

export const education = [
  {
    id: "iit",
    level: "University",
    institution: " University of Westminster",
    affiliation: "Affiliated via Informatics Institute of Technology (IIT)",
    degree: "BSc (Hons) Software Engineering",
    period: "2023 — Present",
    status: "active",
    gpa: null,                          // add when available
    location: "Colombo, Sri Lanka",
    path: "/edu/university/iit",
    highlights: [
      "Specialising in Software Engineering & Systems",
      "Agile SDLC workshop participant",
      "Active project contributor — Corpovinculo",
    ],
    modules: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Computer system fundamentals",
      "OOP with java",
      "Operating Systems",
      "Web Technologies",
      "Software Project Management",
      "Python Programming",
    ],
    color: "var(--g)",
  },
  {
  id: "IIT-foundation",
  level: "Foundation ", // e.g., "Diploma", "Course", "Certification"
  institution: "Informatics Institute of Technology (IIT) ",
  affiliation: "null",
  degree: "Foundation in Software Engineering",
  period: "2023 — 2025",
  status: "completed", // "active" | "completed"
  gpa: null,
  location: "Colombo, Sri Lanka ",
  path: "/edu/category/name",
  highlights: [
    "Key achievement or learning",
    "Another important detail",
  ],
  modules: [
    "Module 1",
    "Module 2",
  ],
  color: "var(--g)", // match theme
},

  {
    id: "school",
    level: "Secondary",
    institution: "Trinity College Kandy ",          // ← update this
    affiliation: "Primary and secondary education", // ← update this
    degree: "G.C.E Advanced Level examinations", // ← update this
    period: "2019 — 2022",
    status: "completed",
    gpa: null,
    location: "Kandy, Sri Lanka",
    path: "/edu/secondary/school",
    highlights: [
      "Member of the national drum and dance troupe ",
      "Held tresure of the social service union ",
      "Went to Singapore, Dubai and Malaysia for school dancing events",
    ],
    modules: ["Political Science", "Economics", "Media "],
    color: "var(--cyan)",
  },
];
