# T-MOTOR SEO Optimization Guide

## Mục lục
1. [Tổng quan SEO](#tổng-quan-seo)
2. [Meta Tags cho Google AI Overview](#meta-tags-cho-google-ai-overview)
3. [Structured Data Schema](#structured-data-schema)
4. [Open Graph & Twitter Cards](#open-graph--twitter-cards)
5. [Canonical & hreflang](#canonical--hreflang)
6. [Content SEO](#content-seo)
7. [Technical SEO](#technical-seo)

---

## Tổng quan SEO

### Website Structure
```
tmotor.vn/
├── index.html (Landing page - City selector)
├── dalat/
│   ├── index.html (T-MOTOR Đà Lạt)
│   └── (City-specific SEO)
├── nha-trang/
│   ├── index.html (T-MOTOR Nha Trang)
│   └── (City-specific SEO)
├── da-nang/
│   ├── index.html (T-MOTOR Đà Nẵng)
│   └── (City-specific SEO)
└── en/
    ├── dalat/
    ├── nha-trang/
    └── da-nang/
```

### SEO URL Strategy
- Domain chính: `tmotor.vn`
- Landing page: `tmotor.vn/`
- City pages: `tmotor.vn/dalat/`, `tmotor.vn/nha-trang/`, `tmotor.vn/da-nang/`
- Language variants: `tmotor.vn/en/dalat/` (English)

---

## Meta Tags cho Google AI Overview

### Core Meta Tags (Mỗi trang city)

```html
<!-- Primary Meta Tags -->
<title>T-MOTOR Đà Lạt | Cho thuê xe motor Đà Lạt giá rẻ - Giao xe tận khách sạn</title>
<meta name="title" content="T-MOTOR Đà Lạt | Cho thuê xe motor Đà Lạt giá rẻ - Giao xe tận khách sạn">
<meta name="description" content="T-MOTOR Đà Lạt - Dịch vụ cho thuê xe máy Đà Lạt uy tín, giá rẻ. Cửa hàng tại H35 Phạm Hồng Thái, Xuân Hương. Giao xe tận khách sạn, homestay. Xe mới, bảo dưỡng định kỳ. Liên hệ ngay!">
<meta name="keywords" content="cho thuê xe motor đà lạt, thuê xe máy đà lạt, thuê xe motor đà lạt, thuê xe đà lạt, t-motor đà lạt, cho thuê xe đà lạt, thuê xe langbiang, thuê xe cầu đất, rent motorbike dalat, motor da lat, scooter rental dalat">
<meta name="author" content="T-MOTOR Vietnam">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

<!-- Language -->
<meta http-equiv="content-language" content="vi">
<meta name="geo.region" content="VN-35">
<meta name="geo.placename" content="Đà Lạt, Lâm Đồng, Việt Nam">

<!-- Verification -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
<meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE">
```

### Google AI Overview Optimization

Để website xuất hiện trong Google AI Overview, cần tối ưu:

1. **Featured Snippet Optimization**
   - Trả lời câu hỏi ngắn gọn (30-50 từ)
   - Dùng định dạng list/table khi phù hợp
   - Đặt câu trả lời ở đầu page

2. **People Also Ask (PAA)**
   - Tạo FAQ section với câu hỏi tự nhiên
   - Câu trả lời ngắn gọn, trực tiếp

3. **Sitelinks Search Box**
   - Thêm schema cho search action

---

## Structured Data Schema

### 1. Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "T-MOTOR Vietnam",
  "url": "https://tmotor.vn",
  "logo": "https://tmotor.vn/images/logo.png",
  "description": "Dịch vụ cho thuê xe máy uy tín tại Việt Nam. Xe mới, bảo dưỡng định kỳ, giao xe tận nơi.",
  "foundingDate": "2024",
  "areaServed": [
    {
      "@type": "City",
      "name": "Đà Lạt"
    },
    {
      "@type": "City",
      "name": "Nha Trang"
    },
    {
      "@type": "City",
      "name": "Đà Nẵng"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-848-774-775",
    "contactType": "customer service",
    "availableLanguage": ["Vietnamese", "English"]
  },
  "sameAs": [
    "https://www.facebook.com/tmotorvietnam",
    "https://zalo.me/84848774775"
  ]
}
```

### 2. LocalBusiness Schema (Mỗi city page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "T-MOTOR Đà Lạt",
  "alternateName": "T-MOTOR Da Lat",
  "description": "Dịch vụ cho thuê xe máy uy tín tại Đà Lạt. Xe mới, bảo dưỡng định kỳ, giao xe tận nơi, hỗ trợ đặt xe 24/7.",
  "image": "https://tmotor.vn/images/motor-showcase.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H35 Phạm Hồng Thái",
    "addressLocality": "Đà Lạt",
    "addressRegion": "Lâm Đồng",
    "postalCode": "670000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.9404,
    "longitude": 108.4583
  },
  "url": "https://tmotor.vn/dalat",
  "telephone": "+84-848-774-775",
  "priceRange": "150.000đ - 1.200.000đ/ngày",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "22:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cho thuê xe máy Đà Lạt",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Thuê xe máy Đà Lạt - Xe ga"
        },
        "price": "150000",
        "priceCurrency": "VND",
        "unitCode": "DAY"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Thuê xe máy Đà Lạt - Xe phân khối lớn"
        },
        "price": "500000",
        "priceCurrency": "VND",
        "unitCode": "DAY"
      }
    ]
  }
}
```

### 3. FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Giá thuê xe motor Đà Lạt khoảng bao nhiêu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Giá thuê xe motor Đà Lạt tại T-MOTOR từ 150.000đ - 1.200.000đ/ngày tùy dòng xe. Có giá thuê theo tuần và tháng với ưu đãi hấp dẫn."
      }
    },
    {
      "@type": "Question",
      "name": "T-MOTOR Đà Lạt có giao xe tận nơi không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có, T-MOTOR Đà Lạt hỗ trợ giao xe tận khách sạn, homestay trong nội thành Đà Lạt. Phí giao xe được tư vấn khi đặt."
      }
    },
    {
      "@type": "Question",
      "name": "Cần giấy tờ gì để thuê xe máy Đà Lạt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Khách trong nước: CMND/CCCD + bằng A1 (xe ga) hoặc A2 (xe phân khối lớn). Khách quốc tế: Passport + GPLX quốc tế (IDP)."
      }
    },
    {
      "@type": "Question",
      "name": "T-MOTOR Đà Lạt có những loại xe nào?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "T-MOTOR Đà Lạt có xe ga (Air Blade, SH, ADV, XMAX), xe địa hình (WR 155, CB500X), xe naked (CB300R, Z300, MT-03, Duke 390, Z650, CB500F)."
      }
    },
    {
      "@type": "Question",
      "name": "Giờ mở cửa và nên đặt xe trước bao lâu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "T-MOTOR Đà Lạt phục vụ 07:00 - 22:00 hàng ngày. Nên đặt trước 1-2 ngày, đặc biệt cuối tuần và dịp lễ để giữ đúng xe mong muốn."
      }
    }
  ]
}
```

### 4. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://tmotor.vn"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Thuê xe máy Đà Lạt",
      "item": "https://tmotor.vn/dalat"
    }
  ]
}
```

### 5. HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cách thuê xe máy tại T-MOTOR Đà Lạt",
  "description": "Hướng dẫn 4 bước đơn giản để thuê xe máy tại T-MOTOR Đà Lạt",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Liên hệ đặt xe",
      "text": "Gọi hotline 0848 774 775 hoặc nhắn Zalo để đặt xe. Chọn ngày, loại xe và địa điểm nhận xe."
    },
    {
      "@type": "HowToStep",
      "name": "Chuẩn bị giấy tờ",
      "text": "CMND/CCCD + bằng A1/A2 (khách trong nước) hoặc Passport + IDP (khách quốc tế)."
    },
    {
      "@type": "HowToStep",
      "name": "Ký hợp đồng và nhận xe",
      "text": "Kiểm tra xe, mũ bảo hiểm, áo mưa. Nhận hướng dẫn vận hành cơ bản."
    },
    {
      "@type": "HowToStep",
      "name": "Trả xe và thanh toán",
      "text": "Hoàn tất theo giờ hẹn. Thanh toán tiền mặt hoặc chuyển khoản."
    }
  ]
}
```

### 6. Video Schema (Optional - cho promotional videos)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "T-MOTOR Đà Lạt - Thuê xe máy du lịch",
  "description": "Video giới thiệu dịch vụ cho thuê xe máy T-MOTOR tại Đà Lạt. Khám phá Đà Lạt tự do với xe máy chất lượng cao.",
  "thumbnailUrl": "https://tmotor.vn/images/video-thumbnail.jpg",
  "uploadDate": "2026-01-01",
  "duration": "PT2M30S",
  "contentUrl": "https://tmotor.vn/videos/t-motor-dalat.mp4",
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID"
}
```

### 7. Review Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "T-MOTOR Đà Lạt"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Minh Anh"
  },
  "reviewBody": "Xe ga mới, giao đúng giờ tại homestay. Nhân viên nhiệt tình chỉ đường lên Langbiang."
}
```

### 8. Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cho thuê xe máy Đà Lạt",
  "description": "Dịch vụ cho thuê xe máy du lịch tại Đà Lạt với nhiều loại xe từ xe ga đến xe phân khối lớn. Giao xe tận khách sạn, hỗ trợ 24/7.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "T-MOTOR Đà Lạt"
  },
  "areaServed": {
    "@type": "City",
    "name": "Đà Lạt"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Bảng giá thuê xe máy Đà Lạt",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Thuê xe ga Đà Lạt"
        },
        "price": "150000-300000",
        "priceCurrency": "VND"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Thuê xe địa hình Đà Lạt"
        },
        "price": "350000-500000",
        "priceCurrency": "VND"
      }
    ]
  }
}
```

### 9. WebSite Schema với SearchAction

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "T-MOTOR - Cho thuê xe máy Việt Nam",
  "url": "https://tmotor.vn",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://tmotor.vn/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

## Open Graph & Twitter Cards

### Open Graph Tags

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://tmotor.vn/dalat">
<meta property="og:title" content="T-MOTOR Đà Lạt | Cho thuê xe motor Đà Lạt giá rẻ">
<meta property="og:description" content="Dịch vụ cho thuê xe máy Đà Lạt uy tín, giá rẻ. Giao xe tận khách sạn, homestay. Xe mới, bảo dưỡng định kỳ. Liên hệ 0848 774 775!">
<meta property="og:image" content="https://tmotor.vn/images/og-dalat.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="T-MOTOR Đà Lạt - Cho thuê xe máy du lịch">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="T-MOTOR Vietnam">

<!-- Open Graph cho từng city -->
<meta property="og:locale:alternate" content="en_US">
```

### Twitter Card Tags

```html
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@tmotorvietnam">
<meta name="twitter:creator" content="@tmotorvietnam">
<meta name="twitter:url" content="https://tmotor.vn/dalat">
<meta name="twitter:title" content="T-MOTOR Đà Lạt | Cho thuê xe motor Đà Lạt giá rẻ">
<meta name="twitter:description" content="Dịch vụ cho thuê xe máy Đà Lạt uy tín, giá rẻ. Giao xe tận khách sạn, homestay. Xe mới, bảo dưỡng định kỳ.">
<meta name="twitter:image" content="https://tmotor.vn/images/og-dalat.jpg">
```

---

## Canonical & hreflang

### Canonical URL

```html
<!-- Canonical cho trang chính -->
<link rel="canonical" href="https://tmotor.vn/dalat">

<!-- Canonical cho trang có query string (nếu cần) -->
<link rel="canonical" href="https://tmotor.vn/dalat?ref=social">
```

### hreflang Tags (Multi-language)

```html
<!-- Vietnamese (Default) -->
<link rel="alternate" hreflang="vi" href="https://tmotor.vn/dalat">
<link rel="alternate" hreflang="vi-vn" href="https://tmotor.vn/dalat">

<!-- English -->
<link rel="alternate" hreflang="en" href="https://tmotor.vn/en/dalat">
<link rel="alternate" hreflang="en-us" href="https://tmotor.vn/en/dalat">

<!-- X-default (Landing page) -->
<link rel="alternate" hreflang="x-default" href="https://tmotor.vn">

<!-- Hreflang cho tất cả pages -->
<link rel="alternate" hreflang="vi-vn" href="https://tmotor.vn">
<link rel="alternate" hreflang="en-us" href="https://tmotor.vn/en/dalat">
```

### hreflang in sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://tmotor.vn/dalat</loc>
    <xhtml:link rel="alternate" hreflang="vi-vn" href="https://tmotor.vn/dalat"/>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://tmotor.vn/en/dalat"/>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tmotor.vn/nha-trang</loc>
    <xhtml:link rel="alternate" hreflang="vi-vn" href="https://tmotor.vn/nha-trang"/>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://tmotor.vn/en/nha-trang"/>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## Content SEO

### Heading Structure tối ưu

```html
<!-- H1: 1 per page, chứa keyword chính -->
<h1>T-MOTOR Đà Lạt | Cho thuê xe máy Đà Lạt giá rẻ - Giao xe tận nơi</h1>

<!-- H2: Section headings với keywords liên quan -->
<h2>Thuê xe máy Đà Lạt - Dịch vụ uy tín, giá tốt</h2>
<h2>Bảng giá thuê xe máy Đà Lạt 2026</h2>
<h2>Quy trình thuê xe máy Đà Lạt tại T-MOTOR</h2>
<h2>Địa chỉ thuê xe máy Đà Lạt - T-MOTOR</h2>

<!-- H3: Sub-sections -->
<h3>Thuê xe ga Đà Lạt</h3>
<h3>Thuê xe phân khối lớn Đà Lạt</h3>
<h3>Thuê xe đi Langbiang</h3>
<h3>Thuê xe đi Cầu Đất</h3>
```

### Content Checklist

- [x] Title chứa keyword chính ở đầu
- [x] Meta description chứa keywords + call-to-action
- [x] H1 chứa brand + keyword
- [x] Keywords xuất hiện tự nhiên trong content
- [x] Internal linking giữa các city pages
- [x] External links đến authoritative sources
- [x] Image alt text có keywords
- [x] FAQ section với questions users thực sự hỏi
- [x] Schema markup đầy đủ

### Internal Linking Strategy

```html
<!-- Trong landing page -->
<a href="/dalat" title="Thuê xe máy Đà Lạt">Đà Lạt</a>
<a href="/nha-trang" title="Thuê xe máy Nha Trang">Nha Trang</a>
<a href="/da-nang" title="Thuê xe máy Đà Nẵng">Đà Nẵng</a>

<!-- Trong city page -->
<a href="/" title="T-MOTOR - Thuê xe máy Việt Nam">T-MOTOR</a>
<a href="/nha-trang" title="Thuê xe máy Nha Trang">Nha Trang</a>
<a href="/da-nang" title="Thuê xe máy Đà Nẵng">Đà Nẵng</a>
```

### Image Optimization

```html
<!-- Tối ưu alt text -->
<img src="/images/motors/honda-sh-dalat.jpg"
     alt="Thuê xe SH tại Đà Lạt - T-MOTOR"
     title="Thuê xe SH tại Đà Lạt">

<img src="/images/motors/ktm-duke-dalat.jpg"
     alt="Thuê xe KTM Duke 390 Đà Lạt đi Langbiang"
     title="Thuê xe phân khối lớn Đà Lạt">

<!-- Lazy loading cho performance -->
<img src="/images/motors/dalat-tmotor.jpg"
     alt="T-MOTOR Đà Lạt - Cửa hàng cho thuê xe máy"
     loading="lazy"
     width="800" height="600">
```

---

## Technical SEO

### robots.txt

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /dist/

# Sitemap
Sitemap: https://tmotor.vn/sitemap.xml

# Crawl-delay (optional)
Crawl-delay: 1
```

### Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>https://tmotor.vn/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Vietnamese city pages -->
  <url>
    <loc>https://tmotor.vn/dalat/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tmotor.vn/nha-trang/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://tmotor.vn/da-nang/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- English city pages -->
  <url>
    <loc>https://tmotor.vn/en/dalat/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tmotor.vn/en/nha-trang/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tmotor.vn/en/da-nang/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Core Web Vitals Optimization

```html
<!-- Preload critical assets -->
<link rel="preload" href="/fonts/main-font.woff2" as="font" crossorigin>
<link rel="preload" href="/images/hero-dalat.webp" as="image">

<!-- DNS Prefetch for external resources -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">

<!-- Critical CSS inline (cho First Contentful Paint) -->
<style>
  /* Critical CSS here */
  body { font-family: system-ui, sans-serif; }
  .hero { min-height: 100vh; }
</style>

<!-- Defer non-critical scripts -->
<script src="/js/analytics.js" defer></script>
```

### Performance Checklist

- [x] Minify HTML, CSS, JS
- [x] Enable gzip/brotli compression
- [x] Image optimization (WebP, lazy loading)
- [x] Font subsetting
- [x] Critical CSS inline
- [x] Preload/prefetch strategic resources
- [x] HTTP/2 support
- [x] Caching headers

---

## Google AI Overview Specific Optimizations

### 1. E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)

```html
<!-- About Page / Company Info -->
<meta name="author" content="T-MOTOR Vietnam">
<meta name="publisher" content="T-MOTOR Vietnam">

<!-- Trust signals -->
<div itemscope itemtype="https://schema.org/LocalBusiness">
  <span itemprop="name">T-MOTOR Đà Lạt</span>
  <span itemprop="telephone">+84-848-774-775</span>
  <span itemprop="address">H35 Phạm Hồng Thái, Đà Lạt</span>
  <span itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
    <span itemprop="ratingValue">4.8</span>/5
    (<span itemprop="reviewCount">127</span> reviews)
  </span>
</div>
```

### 2. Natural Language Optimization

```html
<!-- Tạo content answer-friendly -->
<section class="faq">
  <h2>Câu hỏi thường gặp khi thuê xe máy Đà Lạt</h2>

  <details>
    <summary>Giá thuê xe motor Đà Lạt bao nhiêu?</summary>
    <p>Giá thuê xe motor Đà Lạt tại T-MOTOR dao động từ <strong>150.000đ - 1.200.000đ/ngày</strong> tùy loại xe. Xe ga: 150.000đ-300.000đ/ngày. Xe địa hình: 350.000đ-500.000đ/ngày. Xe phân khối lớn: 500.000đ-1.200.000đ/ngày.</p>
  </details>

  <details>
    <summary>T-MOTOR Đà Lạt giao xe ở đâu?</summary>
    <p>T-MOTOR Đà Lạt có cửa hàng tại <strong>H35 Phạm Hồng Thái, Xuân Hương, Đà Lạt</strong>. Chúng tôi giao xe miễn phí tại khách sạn, homestay trong nội thành Đà Lạt.</p>
  </details>

  <details>
    <summary>Cần giấy tờ gì để thuê xe Đà Lạt?</summary>
    <p>Khách Việt Nam: CMND/CCCD + bằng lái A1 (xe ga) hoặc A2 (xe phân khối lớn). Khách nước ngoài: Passport + Giấy phép lái xe quốc tế (IDP).</p>
  </details>
</section>
```

### 3. Structured Data for SGE (Search Generative Experience)

```html
<!-- Q&A markup for featured snippets -->
<article itemscope itemtype="https://schema.org/Article">
  <h1 itemprop="headline">Thuê xe máy Đà Lạt 2026 - Bảng giá & Địa chỉ T-MOTOR</h1>
  <div itemprop="articleBody">
    <h2>Giá thuê xe máy Đà Lạt</h2>
    <p>T-MOTOR Đà Lạt cung cấp dịch vụ cho thuê xe máy với giá từ 150.000đ/ngày...</p>
  </div>
</article>
```

---

## Monitoring & Analytics

### Google Tools Setup

1. **Google Search Console**
   - Submit sitemap.xml
   - Monitor indexing status
   - Track keyword rankings
   - Check Core Web Vitals

2. **Google Analytics 4**
   - Track user behavior
   - Monitor conversions (booking form submissions)
   - Analyze traffic sources

3. **Google Tag Manager**
   - Event tracking
   - Conversion tracking

### Monthly SEO Checklist

- [ ] Check indexing status in Search Console
- [ ] Review keyword rankings
- [ ] Analyze traffic trends
- [ ] Update content if needed
- [ ] Check for crawl errors
- [ ] Monitor Core Web Vitals
- [ ] Review and respond to reviews

---

## Changelog

| Ngày | Phiên bản | Thay đổi |
|------|-----------|-----------|
| 2026-05-17 | 1.0 | Initial SEO guide for T-MOTOR |
