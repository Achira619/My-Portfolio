# Achira Medagedara — Portfolio

> Linux-themed personal portfolio for SRE / DevOps internship applications.
> Built with **Next.js 14**, **Tailwind CSS**, and pure CSS animations.

---

## 🗂 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # All design tokens, keyframes, utility classes
│   ├── layout.jsx           # Root layout + metadata
│   └── page.jsx             # Page assembly (imports all sections)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Sticky nav with live clock + mobile menu
│   │   └── Footer.jsx       # Footer with live session uptime counter
│   │
│   ├── sections/
│   │   ├── Hero.jsx         # Boot log + typing effect + stats
│   │   ├── About.jsx        # Bio + /proc/self/status + terminal
│   │   ├── Skills.jsx       # htop-style skill bars + apt badge list
│   │   ├── Projects.jsx     # ls -la layout + featured + grid
│   │   ├── Experience.jsx   # systemctl list-units timeline
│   │   ├── Goals.jsx        # crontab -l career goals
│   │   └── Contact.jsx      # sendmail compose form
│   │
│   └── ui/
│       ├── Button.jsx       # Reusable button (green / cyan / ghost)
│       ├── ProgressBar.jsx  # Animated skill bar
│       ├── SectionLabel.jsx # Section header label
│       ├── Tag.jsx          # Tech badge
│       └── Terminal.jsx     # Animated boot terminal
│
├── data/
│   ├── skills.js            # Skill categories + concept badges
│   ├── projects.js          # Project definitions
│   ├── experience.js        # Experience entries
│   └── goals.js             # Career goals + cron schedules
│
└── hooks/
    ├── useIntersection.js   # IntersectionObserver scroll hook
    └── useTyping.js         # Typing / deleting animation hook
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
npm start
```

---

## 🌐 Deploy

### Vercel (recommended — free, 30 seconds)
```bash
npx vercel
# Follow prompts → live URL immediately
```

### Netlify
```bash
npm run build
# Upload the .next folder, or connect your GitHub repo in Netlify UI
# Set build command:  npm run build
# Set publish dir:    .next
```

## 📬 Contact Email Setup

To make the contact form send real emails, create `.env.local` in project root:

```bash
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_API_SECRET=your_mailjet_api_secret
CONTACT_TO_EMAIL=achiramedagedara0@gmail.com
CONTACT_FROM_EMAIL=achiramedagedara0@gmail.com
CONTACT_FROM_NAME=Achira Portfolio
```

Notes:

- `CONTACT_FROM_EMAIL` must be a sender email/domain verified in Mailjet.
- Keep API keys server-side only (never expose them to client code).
- Restart `npm run dev` after updating env vars.
- Contact form posts to `POST /api/contact` and sends via Mailjet API.

---

## ✏️ Personalisation Checklist

| File | What to update |
|---|---|
| `data/projects.js` | Add real repo/live URLs for Corpovinculo |
| `data/skills.js`   | Adjust skill percentages as you grow |
| `data/experience.js` | Add new experiences over time |
| `components/sections/Contact.jsx` | Wire up form to Resend / EmailJS / Formspree |
| `components/layout/Navbar.jsx` | Your actual GitHub / LinkedIn links |
| `public/resume.pdf` | Drop your CV here for the download button |
| `app/layout.jsx`   | Update OpenGraph image, meta description |

---

## 🎨 Design System

All tokens live in `app/globals.css` under `:root`.

| Token | Value | Used for |
|---|---|---|
| `--g` | `#00ff41` | Primary phosphor green |
| `--g2` | `#00cc33` | Slightly dimmer green |
| `--cyan` | `#00e5ff` | DevOps / secondary accent |
| `--amber` | `#ffb800` | Cloud / warning accent |
| `--font-mono` | JetBrains Mono | All body text |
| `--font-disp` | Syne | Headings only |

---

Built with ❤️ and too much `grep` — Achira Medagedara, 2026
