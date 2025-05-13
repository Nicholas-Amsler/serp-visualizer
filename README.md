# 🚀 SERP Visualizer

> A pixel-perfect, AI-powered SERP snippet optimizer built for SEO pros, marketers, and digital agencies who demand clarity, speed, and a touch of confetti.

![Preview](https://serp.amslerlabs.com/preview.png) <!-- Replace with an actual screenshot URL when deployed -->

---

### 🎯 What It Does

- ✅ Live rendering of Google SERP snippets (title, description, URL)
- ⚡ Pixel-based validation to prevent truncation
- 🤖 GPT-powered rewrite engine with scoring feedback
- 📏 Token + pixel width metrics for performance tuning
- 🌓 Full dark mode support
- 🎉 Confetti, toast alerts, and emoji bursts on export
- 🔒 Firebase + Stripe membership-ready (coming soon)

---

### 🧪 Tech Stack

| Layer     | Tech                            |
|-----------|---------------------------------|
| Frontend  | React + TailwindCSS             |
| Animations| Framer Motion                   |
| Exporting | `html-to-image` (PNG snapshots) |
| Hosting   | Vercel (CI/CD)                  |
| Auth      | Firebase Auth                   |
| Payments  | Stripe                          |
| Backend   | Optional n8n automation (VPS)   |

---

### 🚀 Getting Started

```bash
git clone https://github.com/Nicholas-Amsler/serp-visualizer.git
cd serp-visualizer
npm install
npm run start
