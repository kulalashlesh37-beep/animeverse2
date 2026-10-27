# ANIMEVERSE — Premium Anime Discovery & Watch Hub

> **"ENTER A WORLD BEYOND REALITY."**

AnimeVerse is an editorial-grade, static multi-page anime discovery platform and legal streaming gateway built entirely with vanilla **HTML5**, **CSS3**, and **JavaScript**. Designed with a high-end cyberpunk & dark fantasy visual identity, glassmorphism, responsive editorial grids, and local persistence via HTML5 `localStorage`.

---

## 🌟 Visual Identity & Design System

* **Deep Black Canvas:** `#08080D`
* **Dark Charcoal Panels:** `#12121B` / `#171725`
* **Electric Purple:** `#A855F7`
* **Neon Violet:** `#7C3AED`
* **Cyan Highlights:** `#06B6D4` / `#22D3EE`
* **Gold Rating Accents:** `#F59E0B`
* **Typography:** Syne (Editorial Headings), Plus Jakarta Sans (Clean UI), Noto Sans JP (Japanese Kanji/Kana Accents)

---

## 🚀 Key Features

1. **Zero External Dependencies / No Build Step Required:**
   * Runs natively in any modern web browser simply by opening `index.html`.
   * No node servers, React, Vue, Angular, or bundlers needed.

2. **Full 12-Page Complete Architecture:**
   * `index.html` — Cinematic home showcase, hero slider, trending carousel, Black Clover spotlight, genre tiles, quick links sidebar, community callout.
   * `explore.html` — Interactive anime discovery engine with title search, genre multi-filters, release year filter, sorting by rating/title/year, and empty state handling.
   * `trending.html` — Top 10+ global anime leaderboard with gold/silver/bronze rank badges, weekly views, and momentum metrics.
   * `new-releases.html` — Weekly simulcast broadcast calendar with Monday-to-Sunday tabs and live countdown clock.
   * `anime-details.html` — Deep editorial anime information page featuring Black Clover by default (or any series via `?id=slug`), verified episode counts, studio metadata, character grids, and related series.
   * `characters.html` — High-impact character vault with brush typography, stat meters (Power, Speed, Cursed Energy, Intelligence, Durability), and iconic moment clips.
   * `genres.html` — Rich genre explorer showcasing 12+ categories with popularity stats and direct link filters.
   * `seasons.html` — Comprehensive seasonal anime guide (Winter, Spring, Summer, Fall).
   * `movies.html` — Theatrical anime feature film collection (Suzume, Your Name, Mugen Train).
   * `watch.html` — Cinematic 16:9 video player hub with interactive play/scrubber controls, episode selectors, server switches, and legal streaming gateway.
   * `watchlist.html` — Personal watchlist powered by browser `localStorage`, with category tabs (Watching, Plan to Watch, Completed), remove actions, and direct Crunchyroll search buttons.
   * `about.html` — Project philosophy, curatorial standards, legal compliance & DMCA disclosure, interactive FAQ accordion, and contact form.

3. **Official Community & Legal Streaming Integrations:**
   * **Telegram Community:** Linked across header, hero sidebar, watch hub, and footer: `https://t.me/animeverszz`
   * **Crunchyroll Official Search:** Dynamic title searches linking directly to `https://www.crunchyroll.com/` for licensed viewing without piracy.

4. **Persistence & Interactions:**
   * Watchlist count badge in header updates automatically on every page.
   * Toast notification feedback system for watchlist actions.
   * Smooth horizontal carousel scrolling.
   * Mobile responsive sliding drawer menu.

---

## 📁 Project Structure

```
animeverse/
│
├── index.html              # Homepage
├── explore.html            # Anime Search & Discovery
├── trending.html           # Global Trending Leaderboard
├── new-releases.html       # Simulcast Broadcast Schedule
├── anime-details.html      # Anime Information & Episodes (Default: Black Clover)
├── characters.html         # Iconic Character Vault
├── genres.html             # Genre Explorer
├── seasons.html            # Seasonal Anime Guide
├── movies.html             # Theatrical Movie Collection
├── watch.html              # Cinematic Watch Hub
├── watchlist.html          # Personal Watchlist (localStorage)
├── about.html              # About, Legal Streaming & FAQ
│
├── css/
│   └── style.css           # Single Shared Master Stylesheet
│
├── js/
│   └── script.js           # Single Shared Master Controller & Catalog DB
│
├── assets/
│   ├── icons/
│   │   └── logo.svg        # Custom Vector Emblem
│   └── images/
│       ├── hero-solo-leveling.jpg
│       ├── character-sukuna.jpg
│       ├── banners/        # High-Resolution Cinematic SVG Backdrops
│       ├── characters/     # Character Profiles & Silhouettes
│       ├── genres/         # Genre Editorial Artwork
│       └── posters/        # Individual Anime Posters (15+ Series)
│
└── README.md
```

---

## 💻 How to Run Locally

1. Open the project folder:
   ```
   C:\Users\ashlesh\.gemini\antigravity\scratch\animeverse
   ```
2. Double click `index.html` or open it with any web browser (Google Chrome, Microsoft Edge, Firefox, Safari).
3. Navigate freely between all 12 pages using the top navigation bar or mobile menu.

---

## ⚖️ Legal Disclaimer
AnimeVerse is an anime discovery and educational curation platform. AnimeVerse does not host, stream, or distribute unauthorized video files. All links direct fans to verified legal platforms including Crunchyroll (https://www.crunchyroll.com/).
