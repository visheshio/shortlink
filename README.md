# Shortlink

**A fast, no-signup URL shortener with custom aliases — built on Next.js and MongoDB.**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Next.js 16](https://img.shields.io/badge/Next.js-16.3-000?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage / API Reference](#usage--api-reference)
- [Deployment](#deployment)
- [Limitations & Roadmap](#limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Shortlink lets anyone turn a long URL into a short, memorable link in seconds — no account required. You pick your own custom alias (e.g. `my-link`) or just hit Generate. When someone visits the short URL, the server looks it up in MongoDB and redirects them to the original destination instantly.

It's a single-purpose tool: paste a URL, choose a slug, share the result. The interface is minimal and fast, styled with a precision-instrument design language (graphite + brass palette, monospace typography, micro-animations).

---

## Features

- **Custom aliases** — choose your own short URL text (e.g. `/my-portfolio`)
- **Duplicate detection** — rejects an alias if it already exists, preventing collisions
- **Instant redirect** — server-side lookup and redirect via Next.js dynamic routes
- **No sign-up** — completely open, no authentication required
- **Responsive UI** — mobile-first layout with animated navigation and a dedicated "How to Use" guide page
- **Dark mode** — automatic light/dark palette via `prefers-color-scheme`
- **Accessible** — respects `prefers-reduced-motion`, uses semantic HTML and ARIA attributes
- **Interactive hero** — canvas-based animated wordmark on the landing page (draggable glyphs, reveal-on-hover)

---

## How It Works

### The flow in plain language

1. A user visits `/shorten` and enters a destination URL plus a preferred alias.
2. The frontend `POST`s both values to `/api/generate`.
3. The API checks MongoDB for an existing document with that alias. If one exists, it returns an error. If not, it inserts a new `{ url, shorturl }` document.
4. The user receives the generated short link (e.g. `https://shortlink-beta-eight.vercel.app/my-link`).
5. When anyone visits that short link, the `[shorturl]` dynamic route queries MongoDB for the alias, and calls Next.js `redirect()` to send the visitor to the original URL. If the alias isn't found, it returns a 404.

### Sequence diagram

```mermaid
sequenceDiagram
    actor User
    participant UI as /shorten (React)
    participant API as /api/generate
    participant DB as MongoDB

    Note over User,DB: Create a short link
    User->>UI: Enter URL + custom alias
    UI->>API: POST { url, shorturl }
    API->>DB: findOne({ shorturl })
    alt Alias already taken
        DB-->>API: document found
        API-->>UI: { success: false, message: "URL already exists" }
        UI-->>User: Alert — pick another alias
    else Alias available
        DB-->>API: null
        API->>DB: insertOne({ url, shorturl })
        DB-->>API: ack
        API-->>UI: { success: true, message: "Url Generated Successfully" }
        UI-->>User: Display short link
    end

    Note over User,DB: Visit a short link
    User->>UI: GET /:shorturl
    UI->>DB: findOne({ shorturl })
    alt Found
        DB-->>UI: { url: "https://..." }
        UI-->>User: 307 redirect to original URL
    else Not found
        DB-->>UI: null
        UI-->>User: 404 Not Found
    end
```

### Key design decisions

| Decision | Detail |
|---|---|
| **Short code generation** | User-chosen custom aliases only. There is no server-side random/hash generation — the user provides the alias text. |
| **Collision handling** | Before inserting, the API queries MongoDB for an existing document with the same `shorturl`. If found, the request is rejected with an error message. |
| **Storage** | MongoDB Atlas (cloud-hosted). Single collection `url` in database `shortlink`, with documents shaped `{ url, shorturl }`. |
| **Redirect type** | Next.js `redirect()` from `next/navigation`, which issues a **307 Temporary Redirect** by default. |
| **Connection pooling** | In development, the MongoDB client promise is cached on `global` to survive hot reloads. In production, a fresh client is created per cold start. |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Full-stack React framework — server components, API routes, file-based routing |
| [React 19](https://react.dev/) | UI components |
| [MongoDB 7](https://www.mongodb.com/) (driver `mongodb@^7.7`) | Document storage for URL mappings |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Archivo + IBM Plex Mono](https://fonts.google.com/) | Typography (via `next/font/google`) |
| [Vercel](https://vercel.com/) | Hosting & deployment |

---

## Project Structure

```
shortlink/
├── app/
│   ├── [shorturl]/
│   │   └── page.js            # Dynamic route — looks up alias in DB and redirects
│   ├── api/
│   │   └── generate/
│   │       └── route.js       # POST endpoint — creates a new short link
│   ├── components/
│   │   ├── HeroWordmark.jsx   # Animated canvas wordmark on the landing page
│   │   ├── Navbar.js          # Sticky header with desktop/mobile nav + GitHub link
│   │   └── TechText.jsx       # Low-level canvas engine for the wordmark animation
│   ├── howtouse/
│   │   └── page.js            # Static guide page — 3-step walkthrough, tips, FAQ
│   ├── lib/
│   │   └── mongodb.js         # Shared MongoDB client (connection pooling)
│   ├── shorten/
│   │   └── page.js            # Client component — form to create a short link
│   ├── globals.css             # Design tokens, palette, animations
│   ├── icon.png                # Favicon
│   ├── layout.js               # Root layout — fonts, metadata, Navbar
│   └── page.js                 # Landing page (hero + tagline)
├── public/
│   └── home.jpg                # Hero image
├── .env.local                  # Environment variables (not committed)
├── eslint.config.mjs           # ESLint config (next/core-web-vitals)
├── jsconfig.json               # Path alias: @/* → ./*
├── next.config.mjs             # Next.js config
├── package.json                # Scripts & dependencies
└── postcss.config.mjs          # PostCSS (Tailwind CSS plugin)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (Next.js 16 requirement)
- **npm** (ships with Node.js)
- A **MongoDB** instance — either [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works) or a local `mongod`

### Installation

```bash
git clone https://github.com/visheshio/shortlink.git
cd shortlink
npm install
```

### Environment variables

Create a `.env.local` file at the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
NEXT_PUBLIC_HOST=http://localhost:3000
```

| Variable | Description | Required | Example |
|---|---|---|---|
| `MONGODB_URI` | MongoDB connection string. The app uses database `shortlink` and collection `url`. | **Yes** | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `NEXT_PUBLIC_HOST` | Base URL shown to the user when a link is generated. Set to your deployment URL in production. | **Yes** | `https://shortlink-beta-eight.vercel.app` |

> The app will throw on startup if `MONGODB_URI` is missing.

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads on save.

### Run in production (local)

```bash
npm run build
npm start
```

---

## Usage / API Reference

### Pages

| Route | Description |
|---|---|
| `/` | Landing page with animated wordmark and tagline |
| `/shorten` | Form to create a new short link |
| `/howtouse` | Step-by-step guide, tips, and FAQ |
| `/:shorturl` | Redirect — looks up the alias and redirects to the original URL |

### `POST /api/generate`

Creates a new short link.

**Request:**

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/path", "shorturl": "my-link"}'
```

**Success response** `200`:

```json
{
  "success": true,
  "error": false,
  "message": "Url Generated Successfully"
}
```

The short link is now live at `http://localhost:3000/my-link`.

**Error response — alias taken** `200`:

```json
{
  "success": false,
  "error": true,
  "message": "URL already exists"
}
```

### Redirect

```bash
curl -I http://localhost:3000/my-link
```

Returns a **307 Temporary Redirect** with `Location: https://example.com/very/long/path`.

If the alias doesn't exist, returns **404 Not Found**.

---

## Deployment

The project is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Push the repo to GitHub.
2. Import it in the [Vercel dashboard](https://vercel.com/new).
3. Add the environment variables (`MONGODB_URI`, `NEXT_PUBLIC_HOST`) in Vercel's project settings.
4. Deploy — Vercel auto-detects the Next.js framework.

Set `NEXT_PUBLIC_HOST` to your Vercel deployment URL (e.g. `https://shortlink-beta-eight.vercel.app`).

---

## Limitations & Roadmap

### Known limitations

- **No server-side random ID generation** — if the user leaves the alias field empty, no fallback short code is generated (the "How to Use" page mentions random ID generation, but the current API requires a non-empty alias).
- **No input validation** — the API doesn't validate that `url` is a well-formed URL or that `shorturl` contains only safe characters.
- **No rate limiting** — the endpoint is open and unauthenticated.
- **No analytics** — clicks are not counted or tracked.
- **No link expiry or deletion** — once created, links live forever and cannot be removed through the UI.
- **All responses return HTTP 200** — error cases (alias taken) use the same 200 status code with a JSON flag instead of 409 Conflict.
- **No uniqueness index on MongoDB** — collision detection relies on application-level `findOne` + `insertOne` (a race condition is theoretically possible under high concurrency).

### Sensible next steps

- [ ] Add a unique index on `shorturl` in MongoDB to guarantee uniqueness at the database level
- [ ] Auto-generate a random short code (e.g. nanoid / base62) when no alias is provided
- [ ] Validate and normalize the destination URL server-side
- [ ] Return proper HTTP status codes (201 Created, 409 Conflict, 400 Bad Request)
- [ ] Add rate limiting (e.g. per-IP via middleware)
- [ ] Track click counts and expose basic analytics
- [ ] Support link expiry (TTL) and deletion
- [ ] Add an API route to list/manage existing links (with optional auth)

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Make your changes and run the linter:
   ```bash
   npm run lint
   ```
4. Commit with a clear message and open a pull request.

Please keep PRs focused on a single change and include a short description of _why_ the change is useful.

---

## License

No `LICENSE` file is included in this repository. All rights are reserved by the author until a license is explicitly added. If you'd like to use this code, please contact the repository owner.
