🌟 Abdelrahman Magdy's Portfolio

Welcome to my multilingual portfolio — a high-performance showcase of my work as a full-stack web developer. Designed to impress clients on platforms like Upwork, this portfolio demonstrates my expertise in building fast, scalable, and visually appealing web applications. With seamless language switching, cohesive Light/Dark Mode, a professional Projects page, and secure authentication, this project highlights my ability to deliver exceptional digital solutions. 🚀

📖 Table of Contents

✨ Features
🛠️ Technologies
📦 Installation
🏗️ Project Structure
🚀 Deployment
🧪 Testing
📜 License
📬 Contact


✨ Features
This portfolio is designed with client-focused features to ensure an outstanding user experience:

Multilingual Support:

Supports Arabic (RTL), English (LTR), French (LTR), and Spanish (LTR).
Instant language switching with fade-out/in and slide animations (0.3s).
Context-aware translations for all text (Navbar, Hero, Projects, etc.).
RTL layout for Arabic with right-aligned text and reversed flexbox.
See it in action: [Add GIF of language switching in /public/images/language-switch.gif].


Light/Dark Mode:

Light Mode: Clean white (#F8FAFC), bold blue (#2563EB), rich green (#059669).
Dark Mode: Deep navy (#0F172A), vibrant blue (#3B82F6), bright green (#10B981).
WCAG 2.1 AA-compliant contrast ratios (e.g., 15.3:1).
Smooth theme toggle with rotate animation (0.4s).


Secure Authentication:

Sign In/Sign Up via Supabase Auth (email/password or OAuth, e.g., Google).
Sign Out clears session and redirects to homepage.
User Profile with avatar (32x32px) or initials, featuring a dropdown (Profile, Settings, Sign Out).
Animations: Glow on hover, sparkle on click, slide-down for dropdown.


Professional Projects Page:

Hero section with gradient background and translated title/subtitle.
Interactive controls: Filter (E-Commerce, SaaS, etc.), Search (Fuse.js), Sort (date, name).
Project cards with infinite scroll, parallax tilt (8deg), and gradient overlay on hover.
Animations: Slide-up for cards, sparkle for links, glow for filters.
See it in action: [Add GIF of project card animations in /public/images/projects-animation.gif].


Smooth Animations:

Powered by Framer Motion for spring-based transitions and parallax effects.
Micro-interactions like ripple effects, cursor trails, and particle animations.
Page transitions with crossfade (0.5s) for seamless navigation.


Optimized Performance:

Lighthouse scores: 95+ for Performance, Accessibility, and SEO.
Lazy-loaded images with Next/Image and Suspense for components.
PWA support via next-pwa for offline access and installability.


SEO & Analytics:

Dynamic meta tags and Open Graph for each language.
Integrated with Google Analytics 4 and Vercel Analytics.


Security:

Honeypot for contact form, Zod validation, and rate limiting.
Content Security Policy (CSP) headers for enhanced protection.




🛠️ Technologies
The portfolio is built with a modern tech stack, organized by category for clarity:



Category
Technologies



Frontend
Next.js 15 (App Router), TypeScript 5.6, React, Tailwind CSS 3.4, ShadCN UI


Backend
Supabase (authentication, contact form), JSON (project data)


UI/UX
Framer Motion 12 (animations), Lucide React (icons), next-themes (Light/Dark)


i18n
next-intl (Arabic RTL, English LTR, French, Spanish)


Performance
Next/Image, Lazy Loading, Suspense, next-pwa (PWA support)


Search
Fuse.js (client-side project search)


SEO/Analytics
next/head, Open Graph, Schema.org JSON-LD, Google Analytics 4, Vercel Analytics


Security
Honeypot, CSP headers, Rate Limiting, Supabase Auth


DevOps
Vercel (deployment), pnpm (package management)


Testing
Vitest (unit tests for translations, auth, and components)



📦 Installation
Follow these steps to set up and run the portfolio locally:
Prerequisites

Node.js: v18.17.0 or higher
pnpm: v8.6.0 or higher
Supabase Account: For authentication and contact form
Vercel Account: For deployment (optional)

Steps

Clone the Repository:
git clone https://github.com/your-username/portfolio.git
cd portfolio


Install Dependencies:
pnpm install


Set Up Environment Variables:

Create a .env.local file in the root directory.
Add the following (replace with your Supabase and analytics keys):NEXT_PUBLIC_SUPABASE_URL=your-supabase-url




Configure Supabase:

Create a Supabase project and enable authentication (email/password and OAuth).
Set up a table for contact form submissions (e.g., contacts with columns: id, name, email, message, created_at).
Update lib/supabase.ts with your Supabase credentials.


Manage Translations:

Translation files are located in /messages/[lang].json (e.g., ar.json, en.json).
Update or extend translations for additional languages or content.


Run the Development Server:
pnpm dev


Open http://localhost:3000 in your browser.
Test language switching (e.g., /ar for Arabic, /en for English).


Build for Production:
pnpm build
pnpm start




🏗️ Project Structure
The project is organized for clarity and maintainability:
├── /app                  # Next.js App Router
│   ├── /[lang]           # Dynamic route for languages
│   │   ├── /projects     # Projects page
│   │   ├── /signin       # Sign-in page/modal
│   │   ├── /signup       # Sign-up page/modal
│   │   ├── /profile      # User profile page
│   │   ├── /settings     # User settings page
│   │   └── page.tsx      # Homepage
├── /components           # Reusable React components
│   ├── Header.tsx        # Navbar with auth and language toggle
│   ├── Hero.tsx          # Hero section
│   ├── ProjectsPage.tsx  # Projects page components
├── /messages             # Translation files
│   ├── ar.json           # Arabic translations
│   ├── en.json           # English translations
│   ├── fr.json           # French translations
│   ├── es.json           # Spanish translations
├── /public               # Static assets
│   ├── /images           # Screenshots, avatar, GIFs
├── /lib                  # Utilities and Supabase client
│   ├── supabase.ts       # Supabase configuration
├── /data                 # Static data
│   ├── projects.json     # Project metadata
├── /styles               # Global CSS (if needed)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file


🚀 Deployment
Deploy to Vercel for a production-ready site:

Push to GitHub:

Commit and push all changes to your repository.


Connect to Vercel:

Log in to Vercel.
Import your GitHub repository.
Configure environment variables (same as .env.local).


Deploy:

Vercel will automatically build and deploy.
Optionally, set up a custom domain (e.g., abdelrahmanmagdy.dev).


Verify:

Visit the live URL (e.g., https://your-vercel-app.vercel.app).
Test language routes (e.g., /ar/projects, /en/projects).
Confirm Lighthouse scores are 95+ for Performance, Accessibility, and SEO.




🧪 Testing
Ensure the portfolio is robust with these tests:

Language Switching:

Switch between Arabic, English, French, and Spanish via the Navbar toggle.
Verify text updates instantly (e.g., "Sign In" in English, "تسجيل الدخول" in Arabic).
Check RTL layout for Arabic (right-aligned text, reversed flexbox).
Test animations (fade-out/in, slide) during language switches.


Light/Dark Mode:

Toggle between Light and Dark Mode.
Verify colors:
Light Mode: #F8FAFC (background), #2563EB (buttons).
Dark Mode: #0F172A (background), #3B82F6 (buttons).


Check animation (sun/moon rotate, 0.4s).


Authentication:

Test Sign In/Sign Up with email/password and OAuth (e.g., Google).
Verify Sign Out clears the session and redirects to /.
Check User Profile dropdown (Profile, Settings, Sign Out).
Ensure protected routes (/profile, /settings) redirect unauthenticated users.


Projects Page:

Test Filter (All, E-Commerce, SaaS, Web Apps).
Search projects using keywords (Fuse.js).
Sort by date, name, or impact.
Verify infinite scroll loads 6 projects at a time.
Check card animations (parallax tilt, gradient overlay).


Performance:

Run Lighthouse audits (pnpm lighthouse or Chrome DevTools).
Target 95+ scores for Performance, Accessibility, and SEO.


Unit Tests:

Use Vitest to test translations, authentication flows, and component rendering.
Run pnpm test to execute test suites.




📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📬 Contact
Ready to collaborate on your next project? Find me at:

Email: [Add your email address]
Upwork: [Add your Upwork profile link]
LinkedIn: [Add your LinkedIn profile link]
GitHub: [Add your GitHub profile link]
Twitter: [Add your Twitter profile link]

Note: Update the placeholders above with your actual contact details or link to your portfolio’s contact page (e.g., abdelrahmanmagdy.dev/contact).

🌟 Abdelrahman Magdy | Building Exceptional Web Experiences 💻
