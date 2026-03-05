# Dua Reminder 🤲

A progressive web app (PWA) for browsing, searching, and reflecting on Islamic Duas.

## Features (Phase 1)
- Browse Duas fetched from Google Sheets
- Fixed-size Dua card with Arabic text, transliteration, meaning
- Story, Instructions, Benefits panels per Dua  
- Language toggle: English / Bangla
- Categorized tag filter sidebar (slides from left)
- Multi-tab navigation: Home, Plan, Search, Favorites, Profile
- Light & dark theme support
- Installable as a PWA on Android and iOS

## Tech Stack
- React + Vite
- Vanilla CSS (no Tailwind)
- Supabase (auth & future backend)
- Google Sheets CSV (data source)
- PWA via vite-plugin-pwa

## Local Development
```bash
npm install
npm run dev
```

Create a `.env.local` file with:
```
VITE_GOOGLE_SHEET_CSV_URL=your_sheet_csv_url_here
```
