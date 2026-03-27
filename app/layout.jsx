import "./globals.css";

export const metadata = {
  title: "Achira Medagedara | SRE & DevOps Engineer",
  description:
    "Aspiring Site Reliability Engineer & DevOps Engineer. Computer Science undergraduate at IIT Sri Lanka. Building scalable, reliable, and efficient systems.",
  keywords: [
    "SRE", "DevOps", "Cloud", "Linux", "Docker", "AWS",
    "Site Reliability Engineer", "Achira Medagedara", "IIT Sri Lanka",
  ],
  openGraph: {
    title: "Achira Medagedara | SRE & DevOps",
    description: "Building scalable, reliable systems for the modern world.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body>{children}</body>
    </html>
  );
}
