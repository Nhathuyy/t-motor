# T-MOTOR - Motorcycle Rental Landing Pages

A multilingual (VI/EN), multi-city (Da Lat, Nha Trang, Da Nang) static website for motorcycle rental services in Vietnam.

## Features

- **3 Cities**: Da Lat, Nha Trang, Da Nang
- **2 Languages**: Vietnamese (VI) and English (EN)
- **SEO Optimized**: Meta tags, Schema.org JSON-LD, sitemap.xml, robots.txt, hreflang
- **Responsive Design**: Mobile-first, works on all devices
- **Interactive Components**: Hero carousel, fleet filter, FAQ accordion, mobile menu

## URL Structure

| Page | Vietnamese | English |
|------|-----------|---------|
| Da Lat | `/` | `/en/` |
| Nha Trang | `/nha-trang/` | `/en/nha-trang/` |
| Da Nang | `/da-nang/` | `/en/da-nang/` |

## Quick Start

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the site at `http://localhost:3000`

### Build for production

```bash
npm run build
```

Output goes to `dist/` directory.

### Preview production build

```bash
npm run preview
```

## Project Structure

```
t-motor/
├── src/
│   ├── data/
│   │   ├── cities.js        # City data (address, contact, SEO, content)
│   │   ├── fleet.js         # Motorcycle fleet data
│   │   └── translations.js  # UI translations (VI/EN)
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       └── main.js          # Client-side JavaScript
├── build.js                  # Build script (generates all 6 pages)
├── vite.config.js           # Vite configuration
├── server.js                # Express server (production)
└── dist/                    # Built output
    ├── index.html           # Da Lat (VI)
    ├── nha-trang/
    │   └── index.html       # Nha Trang (VI)
    ├── da-nang/
    │   └── index.html       # Da Nang (VI)
    ├── en/
    │   └── index.html       # Da Lat (EN)
    ├── en/nha-trang/
    │   └── index.html       # Nha Trang (EN)
    ├── en/da-nang/
    │   └── index.html       # Da Nang (EN)
    ├── sitemap.xml
    ├── robots.txt
    ├── css/style.css
    └── js/main.js
```

## How to Edit Content

### Edit city information

File: `src/data/cities.js`

Each city has:
- Address and contact info
- SEO metadata (title, description, keywords)
- Hero content
- Destination suggestions
- FAQ items

### Edit fleet/motorcycles

File: `src/data/fleet.js`

Add, remove, or modify motorcycles. Each has:
- Name (VI/EN)
- Category (ga, adventure, naked)
- Pricing (daily, weekly, monthly)
- Image path

### Edit UI translations

File: `src/data/translations.js`

All UI text for both Vietnamese and English.

### Edit CSS

File: `src/css/style.css`

### Edit JavaScript

File: `src/js/main.js`

## How to Add a New City

1. Add city data to `src/data/cities.js`:

```javascript
// Add new city object
myCity: {
  slug: 'my-city',
  slugPath: 'my-city',
  nameVi: 'My City',
  nameEn: 'My City',
  // ... address, contact, SEO, content
}
```

2. Rebuild:

```bash
npm run build
```

## SEO Checklist

Each page includes:
- [x] Unique `<title>` per city and language
- [x] Unique `<meta name="description">`
- [x] Unique `<meta name="keywords">`
- [x] Unique `<link rel="canonical">`
- [x] `<link rel="alternate" hreflang="vi">` and `hreflang="en"`
- [x] Open Graph tags (og:title, og:description, og:url, og:locale)
- [x] LocalBusiness Schema.org JSON-LD
- [x] FAQPage Schema.org JSON-LD
- [x] `sitemap.xml` with all 6 pages
- [x] `robots.txt` allowing all crawlers

## Deployment

The `dist/` folder contains static HTML files ready for any hosting:

### Vercel

```bash
npm run build
vercel dist/
```

### Netlify

```bash
npm run build
netlify deploy --dir=dist
```

### Traditional hosting (Apache/Nginx)

Upload `dist/` contents to your web root.

## Notes

- Images are expected in `/images/motors/` directory
- The build script generates static HTML for optimal SEO
- No client-side rendering for main content (better for SEO)
- Contact info for Nha Trang and Da Nang branches are marked as TODO

## License

ISC
