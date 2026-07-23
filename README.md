# my_portfolio

**Live Link:** https://maeedahammed.onrender.com/

> Codebase: `c:\Users\maeed\OneDrive\Documents\Projects\my_portfolio`
>
> *Note: the URL above is from the original README. The technical report below references `https://maeedanim.onrender.com/` double-check which domain is currently live before publishing, as they may point to different deployments.*

---

# Technical Report — Maeed Ahammed Portfolio

---

## 1. Tech Stack & Architecture

### Languages

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | Vanilla CSS + Tailwind CSS (CDN) |
| Logic | Vanilla JavaScript (ES6+) |
| Reactivity | Alpine.js v3 |
| Email | EmailJS (browser SDK) |

### Major Libraries / CDN Dependencies

| Library | Version | Purpose |
|---|---|---|
| Tailwind CSS | CDN (latest) | Utility-first CSS framework |
| Alpine.js | `@3.x.x` CDN | Lightweight reactive UI (dark mode, mobile menu, back-to-top) |
| Google Fonts | — | `PT Sans` (headings), `DM Sans` (body) |
| EmailJS | `@4` CDN | Sending contact-form emails without a backend |

### Architecture Pattern

This is a **static, multi-page website (MPA)** with no build step, no server, and no framework-managed routing. Everything runs in the browser:

```
Browser → index.html → loads CDN scripts + local JS → renders UI
```

There is no backend, no database, no REST API, and no bundler (Webpack, Vite, etc.). It is a **pure frontend static site**, deployable by uploading files to any static host (the live site uses Render's static-site hosting).

---

## 2. Folder / Module Structure

```
my_portfolio/
├── index.html                  ← Main single-page layout (2115 lines)
├── README.md                   ← Minimal (just a live link)
├── pages/
│   ├── projects.html           ← Full projects gallery page
│   └── contact.html            ← Dedicated contact page
└── assets/
    ├── alpine/
    │   └── portfolio.js        ← Alpine.js component: dark mode, scroll state
    ├── components/             ← UI micro-feature scripts (11 files)
    │   ├── activeNav.js        ← Highlights current nav link on scroll
    │   ├── contactForm.js      ← EmailJS form submission + modal logic
    │   ├── counter.js          ← Animated number counters
    │   ├── cursorGlow.js       ← Orange glow that follows the cursor
    │   ├── loader.js           ← Page-load spinner dismissal
    │   ├── navBar.js           ← Adds shadow to navbar after scrolling
    │   ├── progressBar.js      ← Scroll-progress bar at top of page
    │   ├── reveal.js           ← Scroll-triggered fade-in for sections
    │   ├── smoothScroll.js     ← Smooth scrolling for in-page anchor links
    │   ├── typing.js           ← Typewriter animation in the hero section
    │   └── year.js             ← Auto-updates copyright year in footer
    ├── css/
    │   ├── style.css           ← Base styles: reset, typography, glass effect, hero gradient
    │   ├── animations.css      ← Keyframe animations: float, reveal, button hover, card hover
    │   └── responsive.css      ← Media queries: 1024px, 768px, 480px breakpoints
    ├── favicon/
    │   └── favicon.ico
    ├── icons/                  ← SVG tech icons (NestJS, Node, MongoDB, Docker, etc.)
    ├── images/                 ← Project screenshots + profile photo
    ├── js/
    │   ├── app.js              ← Project card factory + filter/search/pagination engine
    │   ├── projects.js         ← Static project data array + pagination constants
    │   └── tailwind-config.js  ← Tailwind custom theme (colors, fonts)
    └── resume/
        └── Maeed_Ahammed_Resume.pdf
```

---

## 3. Entry Points & Execution Flow

### Primary Entry Point

**`index.html`** is the main entry point. It is a single HTML file containing all portfolio sections (Hero → About → Experience → Skills → Projects → Achievements → Statistics → CTA → Contact → Footer).

### Startup Sequence (on page load)

When the browser loads `index.html`, the following happens in order:

1. **CDN scripts start loading** — Tailwind CSS and Alpine.js are fetched from CDNs.
2. **`tailwind-config.js`** runs synchronously after Tailwind CDN, registering custom colors (`primary: #FF6B2B`, `dark: #09090B`, `grayText: #71717A`) and font families.
3. **Alpine.js initializes** with the `x-data="portfolio()"` declaration on the `<html>` tag. The `portfolio()` function (from `assets/alpine/portfolio.js`) sets up:
   - `darkMode` state (read from `localStorage`)
   - `mobileMenu` toggle state
   - `showTopButton` (controls back-to-top visibility)
   - A `$watch` that persists dark/light preference to `localStorage`
4. **`DOMContentLoaded` fires**, executing component scripts registered at the bottom of `<body>`:
   - `typing.js` — starts the typewriter loop
   - `progressBar.js` — attaches scroll listener
   - `reveal.js` — immediately checks `.reveal` elements and attaches scroll listener
   - `counter.js` — starts `requestAnimationFrame` counter animations immediately
   - `activeNav.js` — attaches scroll listener for nav highlighting
   - `smoothScroll.js` — hijacks all `a[href^="#"]` clicks
   - `cursorGlow.js` — attaches `mousemove` listener
   - `navBar.js` — attaches scroll listener for header shadow
   - `year.js` — sets `#year` span content
   - `loader.js` — waits for `window load` (all assets), then fades out the spinner after 700ms
5. **`emailjs.init("DzqXIglXEC691vvKu")`** runs from `contactForm.js` — initializes the EmailJS SDK.

### Multiple Pages

There are **3 HTML pages**, each a self-contained document:

| Page | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Full one-page portfolio with all sections |
| `pages/projects.html` | `/pages/projects.html` | Full projects gallery with search/filter/pagination |
| `pages/contact.html` | `/pages/contact.html` | Dedicated contact form page |

Navigation between pages uses plain `<a href="...">` links, not JavaScript routing.

> **Note**: `index.html` has two broken script references at lines 2062–2064:
> ```html
> <script src="../assets/alpine/portfolio.js"></script>
> <script src="../assets/components/contactForm.js"></script>
> ```
> These use `../assets/...` paths, which are incorrect from the root (`/`). The correct paths should be `assets/alpine/portfolio.js`. However, `projects.html` and `contact.html` correctly use `../assets/...`. This bug means `contactForm.js` and `portfolio.js` may silently fail to load on the main page in some environments, though direct file-open may work differently depending on path resolution.

---

## 4. Business Logic & Core Functionality

### Core Purpose

This is **a personal developer portfolio website** for Maeed Ahammed, a Software Engineer from Dhaka, Bangladesh. Its goal is to:
- Present professional background, skills, and experience to potential employers
- Showcase past projects with links to GitHub repositories
- Allow visitors to send a contact message via email
- Provide a downloadable PDF resume

### Main Workflows

#### A. Dark Mode Toggle

Managed entirely by Alpine.js (`portfolio.js`):
- `darkMode` initialised from `localStorage.getItem("theme") === "dark"`
- Clicking the `🌙` button flips `darkMode`
- Alpine's `$watch` persists the new value to `localStorage`
- The `<html>` element gets the `dark` class via `:class="{ 'dark': darkMode }"`, which activates all Tailwind `dark:` variants

#### B. Typewriter Animation (`typing.js`)

Cycles through 5 role titles in the hero section:
```
"Software Engineer" → "Backend Developer" → "NestJS Developer" → "API Designer" → "Problem Solver"
```
- Types at 110ms/char, deletes at 45ms/char
- Pauses 1400ms after each word completes before deleting
- Loops infinitely via `titleIndex % titles.length`

#### C. Scroll-driven UI Interactions

All are passive scroll listeners with no debouncing:
- **`progressBar.js`** — calculates `(scrollTop / scrollHeight) * 100` → `width` of the top bar
- **`reveal.js`** — adds `active` class to `.reveal` sections when they enter viewport (120px threshold)
- **`activeNav.js`** — compares `section.offsetTop - 120` against `window.scrollY` and adds `text-primary font-semibold` to matching nav link
- **`navBar.js`** — adds `shadow-xl` to `<header>` when `scrollY > 50`
- **`showTopButton`** (Alpine) — set `showTopButton = window.scrollY > 500` to show the back-to-top button

#### D. Projects Gallery (`pages/projects.html`)

The projects page uses a **client-side data-driven rendering** pattern:

1. **`projects.js`** defines the data array and pagination constant (`PROJECTS_PER_PAGE = 3`):
   ```js
   const projects = [
     { id, title, category, image, description, technologies[], github }
     // ...
   ];
   ```
2. **`app.js`** reads this array and provides:
   - `createProjectCard(project)` — returns a DOM `<a>` element with templated HTML
   - `renderProjects(list)` — clears `#projectsContainer`, renders up to `visibleProjects` items, shows/hides "Load More" button
   - `filterProjects()` — filters by `currentCategory` and `currentSearch`, resets visible count
   - Event listeners for search input (live `input` event), filter buttons (`click`), and "Load More" button (`click`)

**Current project data:**

| # | Title | Category | Tech |
|---|---|---|---|
| 1 | Dev Community Platform | Backend | NestJS, MongoDB, Redis, BullMQ |
| 2 | Fitness Tracker | Backend | ASP.NET MVC, SQL Server, Bootstrap |
| 3 | Hospital Management | Web | PHP, MySQL |

#### E. Contact Form (`contactForm.js`)

1. Validates all four fields (name, email, subject, message) and email format via regex
2. Disables the submit button with "Sending..." text during flight
3. Calls `emailjs.send("service_0bj7jrm", "template_k2lumfb", {...})` with the form data
4. On success: shows the `#successModal`, resets the form
5. On failure: `alert()` with the error message
6. On `finally`: re-enables the submit button

> **Security note**: The EmailJS public key (`DzqXIglXEC691vvKu`) and service/template IDs are **hardcoded in plain JavaScript** and visible to anyone who views the page source. This is by design for client-side EmailJS integrations (it uses public keys, not secret keys), but it means anyone can use the configured template/service by extracting these values.

---

## 5. Data & Storage

### No Database

This site has **no database at all**. All data is either:
- **Hardcoded in HTML** (experience, education, skills, achievements)
- **Hardcoded in JavaScript** (`projects.js` — the projects array)
- **Stored client-side** (`localStorage` for dark/light mode preference only)

### Data Structures

The only explicit data model is the **Project** object:

```js
{
  id: Number,              // integer identifier (1, 2, 3)
  title: String,           // display name
  category: String,        // "Backend" | "Web" | "Research"
  image: String,           // relative path to image
  description: String,     // short summary text
  technologies: String[],  // tech stack tags array
  github: String           // GitHub repo URL
}
```

### Persistence

Only `localStorage` is used, storing a single key:
```
key:   "theme"
value: "dark" | "light"
```

No cookies, no IndexedDB, no session storage.

---

## 6. External Integrations

### EmailJS

- **Purpose**: Sends contact form submissions to Maeed's Gmail inbox without a backend server
- **SDK**: `@emailjs/browser@4` loaded from CDN
- **Public Key**: `DzqXIglXEC691vvKu` (initialized in `contactForm.js` line 5)
- **Service ID**: `service_0bj7jrm`
- **Template ID**: `template_k2lumfb`
- **Template parameters sent**: `from_name`, `from_email`, `subject`, `message`
- **Account**: Linked to Maeed's EmailJS account, routing to his Gmail

### Google Fonts

- Loaded via `fonts.googleapis.com`
- **PT Sans** (400, 700) — used for all headings (`h1`–`h4`)
- **DM Sans** (300, 400, 500, 700) — used for body text

### Tailwind CSS CDN

- `https://cdn.tailwindcss.com` — loads the full Tailwind bundle (not optimized/purged)
- This is fine for prototyping but means **all ~3MB of Tailwind CSS** is downloaded, not just what's used

### Alpine.js CDN

- `https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js`
- Manages reactive state without a full framework

### GitHub (external links)

- Multiple project GitHub links embedded as `target="_blank"` anchors
- GitHub profiles: `github.com/maeedanim`

### Authentication

**There is no authentication or authorization** in this application. It is a fully public static site.

---

## 7. Configuration & Environment

### No Environment Variables

This is a **zero-configuration static site**. There are no:
- `.env` files
- Server-side environment variables
- Build scripts or package.json
- CI/CD configuration files

### What to "Configure" Before Using

The only things embedded as configuration values (all inside JS files, not externalized):

| Value | File | Line | Description |
|---|---|---|---|
| EmailJS public key | `contactForm.js` | 5 | `emailjs.init("DzqXIglXEC691vvKu")` |
| EmailJS service ID | `contactForm.js` | 68 | `"service_0bj7jrm"` |
| EmailJS template ID | `contactForm.js` | 69 | `"template_k2lumfb"` |
| Theme colors | `tailwind-config.js` | 11–15 | `#FF6B2B`, `#09090B`, `#71717A` |

If you fork this project for yourself, you need to:
1. Create your own [EmailJS account](https://www.emailjs.com/)
2. Create a service (Gmail/SMTP) and email template
3. Replace the three IDs in `contactForm.js`

---

## 8. How to Run Locally

There are **no dependencies to install**. No `npm install`, no Docker, no database setup.

### Option A — Direct File Open (simplest)

1. Clone or download the repository
2. Double-click `index.html` in your file explorer
3. It opens in your browser immediately

> **Caveat**: Some browsers block CDN requests when using `file://` protocol (CORS issues). Also, the `../assets/` path bug in `index.html` (lines 2062–2064) is more likely to surface here.

### Option B — Local Dev Server (recommended)

Use any static file server. Examples:

**VS Code Live Server extension** (easiest):
- Install the Live Server extension in VS Code
- Right-click `index.html` → "Open with Live Server"

**Python (built-in)**:
```bash
cd c:\Users\maeed\OneDrive\Documents\Projects\my_portfolio
python -m http.server 8080
# then open http://localhost:8080
```

**Node.js (npx)**:
```bash
cd c:\Users\maeed\OneDrive\Documents\Projects\my_portfolio
npx serve .
# or
npx http-server . -p 8080
```

### Checking the Contact Form Works

The contact form requires an internet connection (EmailJS CDN + API call to EmailJS servers). There is no way to test it offline unless you mock the EmailJS SDK.

---

## 9. Notable Patterns, Risks & Unclear Areas

### 🐛 Bug: Broken Script Paths in `index.html`

**Location**: [index.html](file:///c:/Users/maeed/OneDrive/Documents/Projects/my_portfolio/index.html#L2062-L2064), lines 2062–2064

```html
<script src="../assets/alpine/portfolio.js"></script>
<script src="../assets/components/contactForm.js"></script>
```

`index.html` is at the **root** of the project, so `../assets/` resolves to a directory **outside** the project root. The correct paths should be:
```html
<script src="assets/alpine/portfolio.js"></script>
<script src="assets/components/contactForm.js"></script>
```

This is likely masked by the fact that the site is deployed on Render (where the web server may resolve paths differently), but it's a real bug that can cause the contact form and dark mode toggle to silently not work in some local/file-open scenarios.

### 🐛 Bug: `navbar.js` vs `navBar.js` (case sensitivity)

In `pages/projects.html` line 330 and `pages/contact.html` line 505:
```html
<script src="../assets/components/navbar.js"></script>
```
The actual file is named `navBar.js` (capital B). On **case-insensitive** filesystems (Windows), this works. On **case-sensitive** filesystems (Linux, the Render server), this will throw a 404 and `navBar.js` won't load on sub-pages. This means the navbar shadow-on-scroll effect is broken on the live site's projects/contact pages.

### ⚠️ Hardcoded Credentials in Source Code

EmailJS IDs are hardcoded in `contactForm.js`. For EmailJS, this is the expected pattern (public keys only, no secrets), but the **service and template IDs** being public means anyone can send emails using your EmailJS quota by calling the API directly. EmailJS mitigates this with domain allowlists — **make sure your EmailJS account has domain restrictions** set to only allow `maeedanim.onrender.com`.

### ⚠️ No Input Sanitization / XSS Protection

`createProjectCard()` in `app.js` uses template literals with `innerHTML`:
```js
card.innerHTML = `...<h2>${project.title}</h2>...`;
```
Since `projects.js` is a hardcoded static file (not user input), there's no real XSS risk right now. But if project data were ever sourced from an API or user submissions, this would be a vulnerability.

### ⚠️ No Error State in Projects Page

If `projects.js` fails to load (network error), `app.js` will throw `ReferenceError: projects is not defined` since `app.js` depends on `projects` being globally defined by `projects.js`. There's no error boundary or fallback UI.

### ⚠️ Unthrottled Scroll Listeners

Multiple scripts attach `window.scroll` listeners with no debounce or throttle:
- `progressBar.js`
- `reveal.js`
- `activeNav.js`
- `navBar.js`
- Alpine's scroll watcher

On low-end devices or fast scrolling, this fires many times per second across all 4–5 listeners simultaneously. Performance is acceptable at current scale but worth noting.

### ⚠️ Tailwind CDN in Production

Using `https://cdn.tailwindcss.com` in production downloads the full Tailwind CSS bundle (several MB) which includes many unused utilities. A production build should use Tailwind CLI with PurgeCSS to reduce CSS to only what's used (typically ~5–15 KB). This is a minor performance concern for a portfolio site but is worth fixing.

### 📝 Missing / Incomplete Content

- The `projects` array in `projects.js` has only **3 projects**, and the last entry has a trailing comma and empty lines suggesting space was left for more entries
- The `og:url` meta tag in `index.html` (line 49) still reads `https://your-domain.com` — it was never updated to the real domain
- The desktop navbar in `index.html` (line 180) lists **6 links** (About, Experience, Skills, Projects, Achievements, Contact), but the mobile menu (line 226) only lists **5** (missing "Achievements") — an inconsistency
- The `#achievements` section in the desktop nav is present, but the mobile menu doesn't link to it

### 📝 The `counter.js` Limitation

The counter animation starts immediately on page load (not when the stats section scrolls into view). This means the animation plays in the background before the user sees it. Ideally it should use an IntersectionObserver to trigger only when visible — similar to how `reveal.js` uses the scroll position check.

### 📝 No `package.json` / No Version Locking

There are no locked CDN versions — Alpine uses `@3.x.x` which resolves to the latest 3.x minor, meaning **a breaking change in Alpine 3.x could silently break the site**. Consider pinning to a specific version like `@3.14.1`.

---

## Summary Architecture Diagram

```
Browser
│
├── index.html (root page — full portfolio)
│   ├── <head>: Tailwind CDN, tailwind-config.js, Google Fonts, Alpine CDN, CSS files
│   └── <body>
│       ├── Alpine.js reactive shell (x-data="portfolio()")
│       │   └── portfolio.js → darkMode, mobileMenu, showTopButton
│       ├── Sections: Loader → Navbar → Hero → About → Experience → Skills
│       │            → Projects → Tech Stack → GitHub → Achievements → Stats → CTA → Contact → Footer
│       └── Scripts: typing, progressBar, reveal, counter, activeNav, smoothScroll,
│                    cursorGlow, navBar, year, loader, EmailJS CDN, contactForm
│
├── pages/projects.html
│   ├── Same CDN stack
│   ├── projects.js → static project data array
│   ├── app.js → card renderer + filter/search/pagination
│   └── Shared components (progressBar, reveal, loader, year, navBar, cursorGlow)
│
└── pages/contact.html
    ├── Same CDN stack
    ├── EmailJS CDN
    ├── contactForm.js → form validation + EmailJS.send()
    └── Shared components (progressBar, reveal, navbar, year, loader)

External Services:
  ├── EmailJS API (contact form delivery)
  ├── Google Fonts API
  ├── Tailwind CDN (jsDelivr/Tailwind Labs)
  └── Alpine.js CDN (jsDelivr)
```
