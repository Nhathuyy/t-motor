/**
 * Build script for T-MOTOR
 * Generates all 6 HTML pages (3 cities × 2 languages)
 * 
 * Run after `vite build`:
 * npm run build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// Import data
import { cities } from './src/data/cities.js';
import { fleet, categories, heroBikes, getFleetById } from './src/data/fleet.js';
import { translations, t } from './src/data/translations.js';
import { formatPrice, getPricingLocalized } from './src/data/pricing/index.js';

const BASE_URL = 'https://tmotor.vn';

// City slug to display name mapping
const cityNames = {
  dalat: { vi: 'Đà Lạt', en: 'Da Lat' },
  nhaTrang: { vi: 'Nha Trang', en: 'Nha Trang' },
  daNang: { vi: 'Đà Nẵng', en: 'Da Nang' },
};

// ============================================
// SVG Icons
// ============================================
const icons = {
  box: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  map: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
  chevronLeft: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowRight: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// ============================================
// SEO & Schema Helpers
// ============================================

// Organization Schema (shared across all pages)
function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'T-MOTOR Vietnam',
    'url': BASE_URL,
    'logo': `${BASE_URL}/images/logo.png`,
    'description': 'Dịch vụ cho thuê xe máy uy tín tại Việt Nam. Xe mới, bảo dưỡng định kỳ, giao xe tận nơi.',
    'foundingDate': '2024',
    'areaServed': [
      { '@type': 'City', 'name': 'Đà Lạt' },
      { '@type': 'City', 'name': 'Nha Trang' },
      { '@type': 'City', 'name': 'Đà Nẵng' }
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+84-848-774-775',
      'contactType': 'customer service',
      'availableLanguage': ['Vietnamese', 'English']
    },
    'sameAs': [
      'https://www.facebook.com/tmotorvietnam'
    ]
  };
}

// BreadcrumbList Schema
function generateBreadcrumbSchema(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const cityPageName = lang === 'vi'
    ? `Thuê xe máy ${cityName}`
    : `Motorbike Rental ${cityName}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': lang === 'vi' ? 'Trang chủ' : 'Home',
        'item': BASE_URL
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': cityPageName,
        'item': `${BASE_URL}/${cityData.slugPath}`
      }
    ]
  };
}

// Service Schema
function generateServiceSchema(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `Cho thuê xe máy ${cityName}`,
    'description': lang === 'vi'
      ? `Dịch vụ cho thuê xe máy du lịch tại ${cityName} với nhiều loại xe từ xe ga đến xe phân khối lớn. Giao xe tận khách sạn, hỗ trợ 24/7.`
      : `Motorbike rental service in ${cityName} - from scooters to big bikes. Hotel delivery, 24/7 support.`,
    'provider': {
      '@type': 'LocalBusiness',
      'name': `T-MOTOR ${cityName}`
    },
    'areaServed': {
      '@type': 'City',
      'name': cityName
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': lang === 'vi' ? `Bảng giá thuê xe máy ${cityName}` : `Motorbike Rental Prices ${cityName}`,
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': lang === 'vi' ? `Thuê xe ga ${cityName}` : `Scooter Rental ${cityName}`
          },
          'price': '150000-300000',
          'priceCurrency': 'VND'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': lang === 'vi' ? `Thuê xe địa hình ${cityName}` : `Adventure Bike Rental ${cityName}`
          },
          'price': '350000-500000',
          'priceCurrency': 'VND'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': lang === 'vi' ? `Thuê xe phân khối lớn ${cityName}` : `Big Bike Rental ${cityName}`
          },
          'price': '500000-1200000',
          'priceCurrency': 'VND'
        }
      ]
    }
  };
}

// HowTo Schema
function generateHowToSchema(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;

  const steps = [
    {
      '@type': 'HowToStep',
      'name': lang === 'vi' ? 'Liên hệ đặt xe' : 'Contact to book',
      'text': lang === 'vi'
        ? `Gọi hotline 0848 774 775 hoặc nhắn Zalo để đặt xe tại ${cityName}. Chọn ngày, loại xe và địa điểm nhận xe.`
        : `Call hotline 0848 774 775 or message on Zalo to book in ${cityName}. Choose date, bike type and pickup location.`
    },
    {
      '@type': 'HowToStep',
      'name': lang === 'vi' ? 'Chuẩn bị giấy tờ' : 'Prepare documents',
      'text': lang === 'vi'
        ? `CMND/CCCD + bằng A1/A2 (khách trong nước) hoặc Passport + IDP (khách quốc tế).`
        : `ID card + A1/A2 license (domestic) or Passport + IDP (international).`
    },
    {
      '@type': 'HowToStep',
      'name': lang === 'vi' ? 'Ký hợp đồng và nhận xe' : 'Sign contract and receive bike',
      'text': lang === 'vi'
        ? `Kiểm tra xe, mũ bảo hiểm, áo mưa. Nhận hướng dẫn vận hành cơ bản tại ${cityName}.`
        : `Inspect bike, helmet, raincoat. Receive basic riding instructions in ${cityName}.`
    },
    {
      '@type': 'HowToStep',
      'name': lang === 'vi' ? 'Trả xe và thanh toán' : 'Return bike and pay',
      'text': lang === 'vi'
        ? `Hoàn tất theo giờ hẹn. Thanh toán tiền mặt hoặc chuyển khoản.`
        : `Complete at scheduled time. Pay by cash or bank transfer.`
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': lang === 'vi'
      ? `Cách thuê xe máy tại T-MOTOR ${cityName}`
      : `How to rent a motorbike at T-MOTOR ${cityName}`,
    'description': lang === 'vi'
      ? `Hướng dẫn 4 bước đơn giản để thuê xe máy tại T-MOTOR ${cityName}`
      : `Simple 4-step guide to rent a motorbike at T-MOTOR ${cityName}`,
    'step': steps
  };
}

// WebSite Schema with SearchAction
function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'T-MOTOR - Cho thuê xe máy Việt Nam',
    'url': BASE_URL,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${BASE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

function generateLocalBusinessSchema(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const address = lang === 'vi'
    ? `${cityData.address.street}, ${cityData.address.ward}, ${cityData.address.city}`
    : `${cityData.address.street}, ${cityData.address.ward}, ${cityData.address.city}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `T-MOTOR ${cityName}`,
    description: lang === 'vi'
      ? `Dịch vụ cho thuê xe máy uy tín tại ${cityName}. Xe mới, bảo dưỡng định kỳ, giao xe tận nơi, hỗ trợ đặt xe 24/7.`
      : `Reliable motorbike rental service in ${cityName}. Well-maintained bikes, hotel delivery, 24/7 booking support.`,
    image: '/images/motor-showcase.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: cityData.address.street,
      addressLocality: cityData.address.city,
      addressRegion: cityData.address.region,
      addressCountry: cityData.address.country,
    },
    url: `${BASE_URL}/${cityData.slugPath}`,
    telephone: cityData.contact.phone,
    priceRange: lang === 'vi' ? '150.000đ - 1.200.000đ/ngày' : '150K - 1.2M VND/day',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '22:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
    },
  };

  // Add geo if available
  if (cityData.geo && cityData.geo.latitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: cityData.geo.latitude,
      longitude: cityData.geo.longitude,
    };
  }

  return schema;
}

function generateFAQSchema(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const faqData = translations[lang].faq.items;
  const address = cityData.address.street || cityData.nameVi;

  const mainEntity = faqData.map((item, index) => ({
    '@type': 'Question',
    name: item.question.replace('{city}', cityName).replace('{address}', address),
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer.replace('{city}', cityName).replace('{address}', address),
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

// ============================================
// Template Functions
// ============================================

function generateNavLinks(city, lang, currentPath) {
  const navKeys = ['benefits', 'process', 'fleet', 'reviews', 'faq', 'contact'];
  const navIds = ['uu-diem', 'quy-trinh', 'bang-gia', 'danh-gia', 'faq', 'lien-he'];
  const trans = translations[lang].nav;

  return navKeys.map((key, i) => {
    const id = navIds[i];
    return `<a href="#${id}">${trans[key]}</a>`;
  }).join('\n        ');
}

function generateCitySwitcher(city, lang) {
  const langPath = lang === 'en' ? '/en' : '';
  const cityLinks = [
    { key: 'dalat', vi: 'Đà Lạt', en: 'Da Lat' },
    { key: 'nhaTrang', vi: 'Nha Trang', en: 'Nha Trang' },
    { key: 'daNang', vi: 'Đà Nẵng', en: 'Da Nang' },
  ];

  return cityLinks.map((c) => {
    const slugPath = cities[c.key].slugPath;
    const url = `${langPath}/${slugPath}`;
    const isActive = city === c.key ? 'city-switch-btn--active' : '';
    return `<a href="${url}" class="city-switch-btn ${isActive}">${lang === 'vi' ? c.vi : c.en}</a>`;
  }).join('');
}

function generateLanguageSwitcher(city, lang) {
  const cityData = cities[city];
  const otherLang = lang === 'vi' ? 'en' : 'vi';
  const otherLangLabel = lang === 'vi' ? 'EN' : 'VI';
  const langPath = otherLang === 'en' ? '/en' : '';
  const url = `${langPath}/${cityData.slugPath}`;

  return `<a href="${url}" class="lang-switch">${otherLangLabel}</a>`;
}

function generateHeroCarousel(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const trans = translations[lang];

  const slides = heroBikes.map((bikeId, index) => {
    const bike = getFleetById(bikeId);
    if (!bike) return '';

    const name = lang === 'vi' ? bike.nameVi : bike.nameEn;
    const alt = lang === 'vi' ? bike.altVi : bike.altEn;
    const price = formatPrice(bike.prices.daily);
    const isActive = index === 0 ? 'is-active' : '';
    const ariaHidden = index === 0 ? 'false' : 'true';

    // Different hero content per bike
    let title = '';
    let subtitle = '';
    let desc = '';
    let blobClass = '';
    let emoji = '🛵';

    if (bikeId === 'ktm-duke390') {
      title = lang === 'vi' ? 'Cực nhanh trên mọi cung đường' : 'Blazing fast on every winding road';
      subtitle = 'KTM Duke 390';
      desc = lang === 'vi'
        ? 'Động cơ một xy-lanh mạnh mẽ — lý tưởng để chinh phục đèo. Thuê theo ngày hoặc tuần, giao xe tận khách sạn trong nội thành.'
        : 'Single-cylinder powerhouse — perfect for conquering mountain passes. Rent daily or weekly with hotel delivery within city center.';
      blobClass = '';
      emoji = '🏍️';
    } else if (bikeId === 'honda-adv') {
      title = lang === 'vi' ? 'Phố và đường đất nhẹ' : 'City streets to light trails';
      subtitle = 'Honda ADV';
      desc = lang === 'vi'
        ? 'Thiết kế đứng lái thoải mái, lốp đa địa hình — hợp khám phá và các đoạn đường ven rừng. Giá niêm yết theo ngày & tuần, có giao xe tận nơi.'
        : 'Comfortable upright riding position, mixed-terrain tires — great for exploration and forest trails. Daily & weekly rates, hotel delivery available.';
      blobClass = 'hero-blob--adv';
      emoji = '🏍️';
    } else {
      title = lang === 'vi' ? 'Maxi scooter êm ái' : 'Smooth maxi scooter';
      subtitle = 'Yamaha XMAX 300';
      desc = lang === 'vi'
        ? 'Ổn định trên đèo dài, cốp rộng cho đồ đạc — lựa chọn sang trọng khi thuê xe máy. Hỗ trợ tư vấn lộ trình miễn phí.'
        : 'Stable on long mountain roads, spacious storage for gear — a premium choice for motorbike rental. Free route consultation included.';
      blobClass = 'hero-blob--xmax';
      emoji = '🛵';
    }

    return `
          <article class="hero-carousel__slide ${isActive}" id="carousel-slide-${index}" data-carousel-slide aria-hidden="${ariaHidden}">
            <div class="container hero-showcase">
              <div class="hero-showcase-grid">
                <div class="hero-showcase-left">
                  <div class="hero-showcase-top">
                    <p class="hero-eyebrow hero-eyebrow--dark">${trans.fleet.kicker} · ${lang === 'vi' ? 'Thuê xe motor' : 'Motorbike Rental'} ${cityName}</p>
                    <h2 class="hero-showcase-title">
                      ${title}
                      <span class="hero-title-line2">${subtitle}</span>
                    </h2>
                  </div>
                  <div class="hero-showcase-bottom">
                    <div class="hero-spec-block">
                      <div class="hero-spec-head">
                        <span class="hero-spec-code">${bike.prices.daily}K</span>
                        <span class="hero-spec-tag">${bike.category === 'ga' ? (lang === 'vi' ? 'Xe ga' : 'Scooter') : bike.category === 'adventure' ? 'Adventure' : 'Naked Sport'}</span>
                      </div>
                      <p class="hero-spec-desc">${desc}</p>
                      <div class="hero-spec-actions">
                        <a href="#bang-gia" class="hero-cta-arrow" aria-label="${trans.heroCta} ${subtitle}">
                          ${icons.arrowRight}
                        </a>
                        ${cityData.contact.zalo ? `<a href="https://zalo.me/${cityData.contact.zalo}" class="hero-spec-link" target="_blank" rel="noopener">${trans.bookZalo}</a>` : ''}
                        ${cityData.contact.phone ? `<a href="tel:${cityData.contact.phone}" class="hero-spec-link">${cityData.contact.phoneDisplay}</a>` : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="hero-showcase-visual">
                  <div class="hero-blob ${blobClass}" aria-hidden="true"></div>
                  <img
                    class="hero-bike-img"
                    src="${bike.image}"
                    alt="${alt} ${cityName}"
                    width="900"
                    height="700"
                    loading="${index === 0 ? 'eager' : 'lazy'}"
                    ${index === 0 ? 'fetchpriority="high"' : ''}
                  >
                  <div class="hero-floating hero-floating--social" aria-hidden="true">
                    <div class="hero-avatars"><span class="hero-avatar">M</span><span class="hero-avatar">H</span><span class="hero-avatar">J</span></div>
                    <div class="hero-social-copy">
                      <span class="hero-social-text">127+ ${lang === 'vi' ? 'đánh giá tích cực' : 'positive reviews'}</span>
                      <span class="hero-stars">★★★★★</span>
                    </div>
                  </div>
                  <a href="#bang-gia" class="hero-floating hero-floating--card">
                    <span class="hero-mini-thumb" aria-hidden="true">${emoji}</span>
                    <span class="hero-mini-text"><strong>${subtitle}</strong><span>${lang === 'vi' ? 'Từ' : 'From'} ${price}${lang === 'vi' ? '/ngày' : '/day'}</span></span>
                  </a>
                </div>
              </div>
            </div>
          </article>`;
  }).join('');

  const dots = heroBikes.map((bikeId, index) => {
    const bike = getFleetById(bikeId);
    if (!bike) return '';
    const name = lang === 'vi' ? bike.nameVi : bike.nameEn;
    const isActive = index === 0 ? 'is-active' : '';
    const ariaSelected = index === 0 ? 'true' : 'false';
    return `<button type="button" class="hero-carousel__dot ${isActive}" role="tab" aria-selected="${ariaSelected}" aria-controls="carousel-slide-${index}" id="carousel-tab-${index}" data-carousel-goto="${index}" aria-label="${name}"></button>`;
  }).join('\n        ');

  return {
    slides,
    dots,
    eyebrow: `${trans.fleet.kicker} · ${lang === 'vi' ? 'Thuê xe motor' : 'Motorbike Rental'} ${cityName}`,
    heading: lang === 'vi'
      ? `Thuê xe motor ${cityName} — T-MOTOR`
      : `Motorbike Rental ${cityName} — T-MOTOR`,
  };
}

function generateTrustStrip(lang) {
  const items = translations[lang].trustStrip;
  return items.map((item) => `
        <div class="trust-item"><span class="trust-icon" aria-hidden="true">✓</span> ${item}</div>
      `).join('\n        ');
}

function generateBenefits(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const trans = translations[lang].benefits;

  const items = trans.items.map((item, index) => {
    const delay = index > 0 ? `animate-delay-${index}` : '';
    return `
          <article class="benefit-card animate-on-scroll ${delay}">
            <span class="benefit-icon" aria-hidden="true">${item.icon}</span>
            <h3>${item.title}</h3>
            <p>${item.desc.replace('{city}', cityName)}</p>
          </article>`;
  }).join('');

  return {
    kicker: trans.kicker,
    title: trans.title.replace('{city}', cityName),
    desc: trans.desc.replace('{city}', cityName),
    items,
  };
}

function generateProcess(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const trans = translations[lang].process;

  const steps = trans.steps.map((step, index) => {
    const delay = index > 0 ? `animate-delay-${index}` : '';
    return `
          <li class="step animate-on-scroll ${delay}">
            <span class="step-num">${index + 1}</span>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
          </li>`;
  }).join('');

  return {
    kicker: trans.kicker,
    title: trans.title.replace('{city}', cityName),
    desc: trans.desc.replace('{city}', cityName),
    steps,
  };
}

function generateFleetPerks(lang) {
  const perks = translations[lang].fleet.perks;

  return perks.map((perk) => {
    const icon = icons[perk.icon] || icons.box;
    return `
            <li class="service-perk" role="listitem">
              <div class="service-perk__icon" aria-hidden="true">
                ${icon}
              </div>
              <div class="service-perk__text">
                <span class="service-perk__title">${perk.title}</span>
                <span class="service-perk__desc">${perk.desc}</span>
              </div>
            </li>`;
  }).join('');
}

function generateCityPricing(city, lang) {
  const cityData = cities[city];
  const isVi = lang === 'vi';
  const pricing = getPricingLocalized(city, lang);
  const dayLabel = isVi ? 'Ngày' : 'Day';
  const weekLabel = isVi ? 'Tuần' : 'Week';
  const monthLabel = isVi ? 'Tháng' : 'Month';

  // Generate rows for each bike
  const bikeRows = pricing.motorbikes.map(bike => {
    const dailyFormatted = formatPrice(bike.daily_price_k);
    const weeklyFormatted = formatPrice(bike.weekly_price_k);
    const monthlyFormatted = bike.monthly_price_k !== null ? formatPrice(bike.monthly_price_k) : '-';
    
    // Da Lat style (div blocks)
    if (city === 'dalat' || city === 'danang') {
      return `
            <div class="dalat-pricing__item">
              <span class="dalat-pricing__name">${bike.model}</span>
              <span class="dalat-pricing__daily">${dailyFormatted}<span class="dalat-pricing__unit">/${dayLabel.toLowerCase()}</span></span>
              <span class="dalat-pricing__weekly">${weeklyFormatted}<span class="dalat-pricing__unit">/${weekLabel.toLowerCase()}</span></span>
              <span class="dalat-pricing__monthly">${monthlyFormatted}<span class="dalat-pricing__unit">/${monthLabel.toLowerCase()}</span></span>
            </div>`;
    }
    
    // Nha Trang style (table)
    return `
            <tr>
              <td class="price-table__name">${bike.model}</td>
              <td class="price-table__daily">${dailyFormatted}</td>
              <td class="price-table__weekly">${weeklyFormatted}</td>
            </tr>`;
  }).join('');

  // Service items for Nha Trang
  const serviceItems = pricing.services.map((service) =>
    `<li>${service}</li>`
  ).join('');

  // Promotion note
  const promotionNote = pricing.promotion ? pricing.promotion.description : '';

  return {
    title: pricing.title,
    subtitle: pricing.subtitle,
    monthlyNote: promotionNote,
    dayLabel,
    weekLabel,
    monthLabel,
    serviceItems,
    bikeRows,
    hasMonthlyPrice: pricing.has_monthly_price,
    address: pricing.address,
    phone: pricing.phone,
    website: pricing.website,
  };
}

function generateFleetGrid(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const isVi = lang === 'vi';
  const dayLabel = isVi ? 'Ngày' : 'Day';
  const weekLabel = isVi ? 'Tuần' : 'Week';
  const monthLabel = isVi ? 'Tháng' : 'Month';

  const cards = fleet.map((bike) => {
    const name = lang === 'vi' ? bike.nameVi : bike.nameEn;
    const alt = lang === 'vi' ? bike.altVi : bike.altEn;
    const dailyPrice = formatPrice(bike.prices.daily);
    const weeklyPrice = formatPrice(bike.prices.weekly);
    const monthlyPrice = formatPrice(bike.prices.monthly);
    const category = bike.category;

    return `
              <article class="fleet-card" role="listitem" data-fleet-cat="${category}">
                <div class="fleet-card__media motor-image">
                  <img src="${bike.image}" alt="${alt} ${cityName}" width="400" height="300" loading="lazy">
                </div>
                <div class="fleet-card__body">
                  <h3 class="fleet-card__name">${name}</h3>
                  <div class="fleet-card__prices">
                    <div class="fleet-card__price-main">
                      <span class="fleet-card__price-amount">${dailyPrice}</span>
                      <span class="fleet-card__price-label">${dayLabel}</span>
                    </div>
                    <div class="fleet-card__price-divider"></div>
                    <div class="fleet-card__price-secondary">
                      <div class="fleet-card__price-row">
                        <span class="fleet-card__price-label-sm">${weekLabel}</span>
                        <span class="fleet-card__price-value">${weeklyPrice}</span>
                      </div>
                      <div class="fleet-card__price-row">
                        <span class="fleet-card__price-label-sm">${monthLabel}</span>
                        <span class="fleet-card__price-value">${monthlyPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>`;
  }).join('');

  return {
    hint: translations[lang].fleet.hint,
    tabs: translations[lang].fleet.tabs,
    cards,
  };
}

function generatePromo(city, lang) {
  const cityData = cities[city];
  const trans = translations[lang].promo;

  return {
    title: trans.title,
    desc: trans.desc,
    ctaCall: trans.ctaCall,
    ctaZalo: trans.ctaZalo,
    hasZalo: !!cityData.contact.zalo,
  };
}

function generateTestimonials(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const trans = translations[lang].testimonials;

  const items = trans.items.map((item, index) => {
    const delay = index > 0 ? `animate-delay-${index}` : '';
    return `
          <figure class="testimonial-card animate-on-scroll ${delay}">
            <blockquote>"${item.quote.replace('{city}', cityName)}"</blockquote>
            <figcaption><strong>${item.author}</strong> · ${item.from}</figcaption>
          </figure>`;
  }).join('');

  return {
    kicker: trans.kicker,
    title: trans.title,
    desc: trans.desc.replace('{city}', cityName),
    items,
  };
}

function generateIntroContent(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const content = cityData.content[lang];
  const trans = translations[lang].intro;

  const destinations = content.destinations.map((dest) => `
            <li>${dest}</li>`).join('\n            ');

  return {
    introTitle: content.introTitle,
    introText: content.introText,
    introTitle2: trans.title,
    destinations,
    note: trans.note.replace('{city}', cityName),
  };
}

function generateFAQ(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const address = cityData.address.street || cityData.nameVi;
  const trans = translations[lang].faq;

  const items = trans.items.map((item, index) => {
    const question = item.question.replace('{city}', cityName).replace('{address}', address);
    const answer = item.answer.replace('{city}', cityName).replace('{address}', address);
    return `
          <div class="faq-item">
            <button type="button" class="faq-trigger" id="faq-btn-${index + 1}" aria-expanded="false" aria-controls="faq-panel-${index + 1}">
              ${question}
              <span class="faq-chevron" aria-hidden="true"></span>
            </button>
            <div class="faq-panel" id="faq-panel-${index + 1}" role="region" aria-labelledby="faq-btn-${index + 1}" hidden>
              <p>${answer}</p>
            </div>
          </div>`;
  }).join('');

  return {
    kicker: trans.kicker,
    title: trans.title,
    desc: trans.desc.replace('{city}', cityName),
    items,
  };
}

function generateContact(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const address = cityData.address.street
    ? `${cityData.address.street}, ${cityData.address.ward}, ${cityData.nameVi}`
    : cityData.nameVi;
  const trans = translations[lang].contact;

  return {
    title: trans.title.replace('{city}', cityName),
    lead: trans.lead,
    hotline: cityData.contact.phone ? trans.hotline : null,
    phoneDisplay: cityData.contact.phoneDisplay,
    zalo: trans.zalo,
    hasZalo: !!cityData.contact.zalo,
    website: trans.website,
    chatZalo: trans.chatZalo,
    visitWebsite: trans.visitWebsite,
    address,
    hasPhone: !!cityData.contact.phone,
  };
}

function generateAllBranches(city, lang) {
  const langPath = lang === 'en' ? '/en' : '';
  const trans = translations[lang].branches;

  const branchKeys = ['dalat', 'nhaTrang', 'daNang'];
  const branchImages = {
    dalat: '/images/motors/dalat-tmotor%20.jpg',
    nhaTrang: '/images/motors/nhatrang-tmotor%20.jpg',
    daNang: '/images/motors/danang-tmotor.jpg',
  };

  const branches = branchKeys.map((key, index) => {
    const data = cities[key];
    const name = lang === 'vi' ? data.nameVi : data.nameEn;
    const slugPath = data.slugPath;
    const url = `${langPath}/${slugPath}`;
    const isCurrent = city === key;
    const hasPhone = !!data.contact.phone;
    const phoneDisplay = data.contact.phoneDisplay || '';
    const address = data.address.street ? `${data.address.street}, ${data.address.city}` : data.address.city;
    const branchImg = branchImages[key] || '';

    const descKey = lang === 'vi' ? 'descVi' : 'descEn';
    const desc = data.content[lang].heroDesc || '';

    return `
          <article class="branch-featured-card ${isCurrent ? 'branch-featured-card--current' : ''}">
            <div class="branch-featured-card__image">
              <div class="branch-featured-card__img-wrapper">
                <img src="${branchImg}" alt="${name}" loading="lazy">
              </div>
            </div>
            <div class="branch-featured-card__content">
              <div class="branch-featured-card__header">
                <h3 class="branch-featured-card__name">${name}</h3>
                ${isCurrent ? `<span class="branch-featured-card__badge">${lang === 'vi' ? 'Chi nhánh hiện tại' : 'Current branch'}</span>` : ''}
              </div>
              <p class="branch-featured-card__address">📍 ${address}</p>
              ${hasPhone ? `<p class="branch-featured-card__phone">📞 ${phoneDisplay}</p>` : ''}
              <p class="branch-featured-card__desc">${desc}</p>
              <a href="${url}" class="branch-featured-card__btn">
                ${lang === 'vi' ? 'Xem chi nhánh' : 'View branch'}
                <span class="branch-featured-card__arrow">→</span>
              </a>
            </div>
          </article>`;
  }).join('');

  return {
    kicker: trans.kicker,
    title: trans.title,
    branches,
  };
}

function generateLocationCards(city, lang) {
  const trans = translations[lang];
  const isVi = lang === 'vi';

  const cardsData = [
    {
      cityKey: 'nhaTrang',
      cityName: isVi ? 'Nha Trang' : 'Nha Trang',
      image: '/images/motors/nhatrang-tmotor .jpg',
      address: isVi
        ? '1A Bạch Đằng, Phường Nha Trang, Tỉnh Khánh Hoà'
        : '1A Bach Dang, Nha Trang Ward, Khanh Hoa Province',
      branches: null,
    },
    {
      cityKey: 'dalat',
      cityName: isVi ? 'Đà Lạt' : 'Da Lat',
      image: '/images/motors/dalat-tmotor .jpg',
      address: isVi
        ? 'H35 KQH Phạm Hồng Thái, Xuân Hương - Đà Lạt, Lâm Đồng 670000'
        : 'H35 KQH Pham Hong Thai, Xuan Huong - Da Lat, Lam Dong 670000',
      branches: null,
    },
    {
      cityKey: 'daNang',
      cityName: isVi ? 'Đà Nẵng' : 'Da Nang',
      image: '/images/motors/danang-tmotor.jpg',
      address: null,
      branches: [
        isVi ? 'Chi Nhánh 1: 54 Hồ Xuân Hương, Đà Nẵng' : 'Branch 1: 54 Ho Xuan Huong, Da Nang',
        isVi ? 'Chi Nhánh 2: 110 Trần Văn Dư, Đà Nẵng' : 'Branch 2: 110 Tran Van Du, Da Nang',
      ],
    },
  ];

  const cards = cardsData.map((card, index) => {
    const delay = `animate-delay-${index + 1}`;
    let contentHtml = '';

    if (card.branches) {
      contentHtml = `
                <div class="location-card__branches">
                  ${card.branches.map((branch) => `
                    <p class="location-card__branch">
                      <span class="location-card__branch-icon">●</span>
                      <span>${branch}</span>
                    </p>
                  `).join('')}
                </div>`;
    } else {
      contentHtml = `
                <p class="location-card__address">
                  <span class="location-card__address-icon">📍</span>
                  ${card.address}
                </p>`;
    }

    return `
            <article class="location-card animate-on-scroll ${delay}">
              <div class="location-card__image">
                <img src="${card.image}" alt="T-MOTOR ${card.cityName}" width="400" height="200" loading="lazy">
                <span class="location-card__city-badge">${card.cityName}</span>
              </div>
              <div class="location-card__content">
                <span class="location-card__label">${isVi ? 'Chi nhánh' : 'Branch'}</span>
                ${contentHtml}
              </div>
            </article>`;
  }).join('');

  return {
    title: isVi ? 'Địa chỉ các chi nhánh T-MOTOR' : 'T-MOTOR Branch Locations',
    desc: isVi ? 'Ghé thăm hoặc liên hệ chúng tôi tại các địa điểm' : 'Visit or contact us at our locations',
    cards,
  };
}

function generateFooter(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const trans = translations[lang].footer;
  const navIds = ['uu-diem', 'bang-gia', 'faq', 'lien-he'];
  const navLabels = lang === 'vi'
    ? ['Ưu điểm', 'Bảng giá', 'FAQ', 'Liên hệ']
    : ['Benefits', 'Fleet & Pricing', 'FAQ', 'Contact'];

  const shortcuts = navIds.map((id, i) => `
        <a href="#${id}">${navLabels[i]}</a>`).join('\n        ');

  const contactLinks = [
    { label: cityData.contact.phoneDisplay, href: `tel:${cityData.contact.phone}`, show: !!cityData.contact.phone },
    { label: lang === 'vi' ? 'Zalo' : 'WhatsApp', href: `https://zalo.me/${cityData.contact.zalo}`, show: !!cityData.contact.zalo },
    { label: 'Facebook', href: cityData.contact.facebook, show: !!cityData.contact.facebook },
  ].filter((link) => link.show);

  return {
    tagline: trans.tagline,
    shortcuts: trans.shortcuts,
    contact: trans.contact,
    shortcutsLinks: shortcuts,
    contactLinks: contactLinks.map((link) => `<a href="${link.href}" target="_blank" rel="noopener">${link.label}</a>`).join('\n        '),
    copyright: trans.copyright.replace('{city}', cityName),
    address: `${cityData.address.street || ''}, ${cityData.address.ward || ''}, ${cityData.nameVi}${cityData.address.region ? ', ' + cityData.address.region : ''}`,
  };
}

function generateFloatButtons(city, lang) {
  const cityData = cities[city];
  const trans = translations[lang].floatButtons;
  const buttons = [];

  // Hotline - always first (most important)
  if (cityData.contact.phone) {
    buttons.push(`
    <a href="tel:${cityData.contact.phone}" class="float-btn float-btn-hotline" title="${trans.hotline}">
      <span class="float-btn-wave"></span>
      <span class="float-btn-wave float-btn-wave-2"></span>
      <span class="float-btn-icon float-btn-icon--phone" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill="currentColor"
          />
        </svg>
      </span>
    </a>`);
  }

  // Zalo - second
  if (cityData.contact.zalo) {
    const zaloLabel = lang === 'vi' ? 'Z' : 'Z';
    buttons.push(`
    <a href="https://zalo.me/${cityData.contact.zalo}" target="_blank" rel="noopener" class="float-btn float-btn-zalo" title="${trans.zalo}">
      <span class="float-btn-wave"></span>
      <span class="float-btn-wave float-btn-wave-2"></span>
      <span class="float-btn-icon">${zaloLabel}</span>
    </a>`);
  }

  // Facebook - third
  if (cityData.contact.facebook) {
    buttons.push(`
    <a href="${cityData.contact.facebook}" target="_blank" rel="noopener" class="float-btn float-btn-fb" title="${trans.facebook}">
      <span class="float-btn-wave"></span>
      <span class="float-btn-wave float-btn-wave-2"></span>
      <span class="float-btn-icon">f</span>
    </a>`);
  }

  return buttons.join('');
}

// ============================================
// Main Page Generator
// ============================================
function generatePage(city, lang) {
  const cityData = cities[city];
  const cityName = lang === 'vi' ? cityData.nameVi : cityData.nameEn;
  const langPrefix = lang === 'en' ? '/en' : '';
  const pageUrl = `${langPrefix}/${cityData.slugPath}`;
  const canonicalUrl = `${BASE_URL}${pageUrl}`;
  const otherLang = lang === 'vi' ? 'en' : 'vi';
  const otherLangUrl = `${otherLang === 'en' ? '/en' : ''}/${cityData.slugPath}`;
  const otherLangLocale = otherLang === 'vi' ? 'vi_VN' : 'en_US';
  const currentLocale = lang === 'vi' ? 'vi_VN' : 'en_US';

  const seo = cityData.seo[lang];
  const brandName = translations[lang].brandName;

  // Generate all sections
  const hero = generateHeroCarousel(city, lang);
  const trustStrip = generateTrustStrip(lang);
  const benefits = generateBenefits(city, lang);
  const process = generateProcess(city, lang);
  const fleetPerks = generateFleetPerks(lang);
  const fleetGrid = generateFleetGrid(city, lang);
  const promo = generatePromo(city, lang);
  const testimonials = generateTestimonials(city, lang);
  const intro = generateIntroContent(city, lang);
  const faq = generateFAQ(city, lang);
  const contact = generateContact(city, lang);
  const footer = generateFooter(city, lang);
  const floatButtons = generateFloatButtons(city, lang);
  const allBranches = generateAllBranches(city, lang);
  const locationCards = generateLocationCards(city, lang);

  // Unified city pricing table
  const cityPricing = generateCityPricing(city, lang);

  // Schema JSON - All Schemas
  const localBusinessSchema = generateLocalBusinessSchema(city, lang);
  const faqSchema = generateFAQSchema(city, lang);
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(city, lang);
  const serviceSchema = generateServiceSchema(city, lang);
  const howToSchema = generateHowToSchema(city, lang);
  const webSiteSchema = generateWebSiteSchema();

  // Service footer bar address
  const serviceAddress = `${cityData.address.street}, ${cityData.address.ward}, ${cityData.nameVi}`;
  const servicePhone = cityData.contact.phone
    ? `<a href="tel:${cityData.contact.phone}"><span class="footer-icon" aria-hidden="true">📞</span> ${cityData.contact.phoneDisplay}</a>`
    : '';
  const serviceWebsite = `<a href="${cityData.contact.website}" target="_blank" rel="noopener"><span class="footer-icon" aria-hidden="true">🌐</span> ${cityData.contact.website.replace('https://', '')}</a>`;

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="title" content="${seo.title}">
  <meta name="description" content="${seo.description}">
  <meta name="keywords" content="${seo.keywords}">
  <meta name="author" content="T-MOTOR Vietnam">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  <meta name="geo.region" content="${cityData.address.country}-${cityData.address.region}">
  <meta name="geo.placename" content="${cityData.nameVi}, ${cityData.address.region}, Việt Nam">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${seo.description}">
  <meta property="og:image" content="/images/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="T-MOTOR ${cityName} - Cho thuê xe máy ${cityName}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:locale" content="${currentLocale}">
  <meta property="og:site_name" content="T-MOTOR Vietnam">
  <meta property="og:locale:alternate" content="en_US">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@tmotorvietnam">
  <meta name="twitter:creator" content="@tmotorvietnam">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${seo.title}">
  <meta name="twitter:description" content="${seo.description}">
  <meta name="twitter:image" content="/images/og-image.jpg">

  <link rel="canonical" href="${canonicalUrl}">

  <!-- hreflang for multi-language -->
  <link rel="alternate" hreflang="vi-vn" href="${BASE_URL}/${cityData.slugPath}">
  <link rel="alternate" hreflang="en-us" href="${BASE_URL}/en/${cityData.slugPath}">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/${cityData.slugPath}">

  <title>${seo.title}</title>

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(webSiteSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(organizationSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(localBusinessSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(serviceSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(howToSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(faqSchema, null, 2)}
  </script>
</head>
<body>

  <header class="header">
    <div class="container header-inner">
      <a href="${langPrefix}/" class="logo" aria-label="${brandName} ${cityName}">
        <img class="logo-img" src="/images/motors/logo-tbike.jpg" alt="" width="44" height="44" decoding="async">
        <span class="logo-text"><span class="logo-brand">${brandName}</span> ${lang === 'vi' ? 'Thuê xe motor' : 'Motorbike Rental'} <span class="logo-accent">${cityName}</span></span>
      </a>

      <nav class="nav nav--desktop" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}">
        ${generateNavLinks(city, lang)}
      </nav>

      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-haspopup="dialog" aria-label="${lang === 'vi' ? 'Mở menu' : 'Open menu'}">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
    </div>
  </header>

  <div id="mobile-drawer" class="mobile-drawer" aria-hidden="true" data-mobile-drawer>
    <button type="button" class="mobile-drawer__backdrop" data-nav-backdrop aria-label="${lang === 'vi' ? 'Đóng menu' : 'Close menu'}"></button>
    <div class="mobile-drawer__panel" role="dialog" aria-modal="true" aria-label="${lang === 'vi' ? 'Menu điều hướng' : 'Navigation menu'}">
      <div class="mobile-drawer__head">
        <a href="${langPrefix}/" class="mobile-drawer__brand logo" data-mobile-menu-logo>
          <img class="logo-img" src="/images/motors/logo-tbike.jpg" alt="" width="44" height="44" decoding="async">
          <span class="logo-text"><span class="logo-brand">${brandName}</span> ${lang === 'vi' ? 'Thuê xe motor' : 'Motorbike Rental'} <span class="logo-accent">${cityName}</span></span>
        </a>
        <button type="button" class="mobile-drawer__close" data-nav-close aria-label="${lang === 'vi' ? 'Đóng menu' : 'Close menu'}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <nav id="site-nav" class="nav nav--mobile" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}">
        ${generateNavLinks(city, lang)}
      </nav>
      <div class="mobile-drawer__footer">
        ${generateLanguageSwitcher(city, lang)}
      </div>
    </div>
  </div>

  <main id="main">
    <!-- Hero carousel -->
    <section
      class="hero hero--showcase hero-carousel"
      data-hero-carousel
      aria-roledescription="carousel"
      aria-label="${lang === 'vi' ? 'Xe nổi bật cho thuê' : 'Featured bikes for rent'}"
    >
      <div class="hero-bg hero-bg--minimal" aria-hidden="true"></div>

      <h1 class="visually-hidden" id="hero-heading">${hero.heading}</h1>

      <div class="hero-carousel__viewport">
        <button type="button" class="hero-carousel__arrow hero-carousel__arrow--prev" data-carousel-prev aria-label="${lang === 'vi' ? 'Banner trước' : 'Previous'}">
          ${icons.chevronLeft}
        </button>
        <button type="button" class="hero-carousel__arrow hero-carousel__arrow--next" data-carousel-next aria-label="${lang === 'vi' ? 'Banner sau' : 'Next'}">
          ${icons.chevronRight}
        </button>
        <div class="hero-carousel__track" data-carousel-track>
          ${hero.slides}
        </div>
      </div>

      <div class="hero-carousel__nav" role="tablist" aria-label="${lang === 'vi' ? 'Chọn xe giới thiệu' : 'Select featured bike'}">
        ${hero.dots}
      </div>
    </section>

    <!-- Trust strip -->
    <section class="trust-strip" aria-label="${lang === 'vi' ? 'Cam kết dịch vụ' : 'Service commitments'}">
      <div class="container trust-strip-inner">
        ${trustStrip}
      </div>
    </section>

    <!-- Benefits -->
    <section id="uu-diem" class="section section-alt">
      <div class="container">
        <header class="section-head">
          <span class="section-kicker">${benefits.kicker}</span>
          <h2 class="section-title">${benefits.title}</h2>
          <p class="section-desc">${benefits.desc}</p>
        </header>
        <div class="benefits-grid">
          ${benefits.items}
        </div>
      </div>
    </section>

    <!-- Process -->
    <section id="quy-trinh" class="section">
      <div class="container">
        <header class="section-head">
          <span class="section-kicker">${process.kicker}</span>
          <h2 class="section-title">${process.title}</h2>
          <p class="section-desc">${process.desc}</p>
        </header>
        <ol class="steps">
          ${process.steps}
        </ol>
      </div>
    </section>

    <!-- Fleet & Pricing -->
    <section id="bang-gia" class="service-content" aria-labelledby="bang-gia-heading">
      <div class="container">
        <header class="section-head section-head--tight animate-on-scroll">
          <span class="section-kicker"><span class="logo-brand">${translations[lang].fleet.kicker}</span></span>
          <h2 id="bang-gia-heading" class="section-title">${lang === 'vi' ? 'Bảng giá & lựa chọn xe motor' : 'Fleet & Pricing'}</h2>
          <p class="section-desc">${translations[lang].fleet.desc.replace('{city}', cityName)}</p>
        </header>

        <div class="service-perks animate-on-scroll" aria-label="${lang === 'vi' ? 'Tiện ích kèm theo khi thuê xe' : 'Included services when renting'}">
          <p class="service-perks__kicker">${translations[lang].fleet.perksKicker}</p>
          <ul class="service-perks__grid" role="list">
            ${fleetPerks}
          </ul>
        </div>

        <div class="fleet-catalog animate-on-scroll" data-fleet-catalog>
          <p class="fleet-catalog__hint">${fleetGrid.hint}</p>
          <div class="fleet-tabs" role="tablist" aria-label="${lang === 'vi' ? 'Lọc xe theo loại' : 'Filter bikes by type'}">
            <button type="button" class="fleet-tab is-active" role="tab" id="fleet-tab-all" aria-selected="true" aria-controls="fleet-grid-main" data-fleet-filter="all">${fleetGrid.tabs.all}</button>
            <button type="button" class="fleet-tab" role="tab" id="fleet-tab-ga" aria-selected="false" aria-controls="fleet-grid-main" data-fleet-filter="ga">${fleetGrid.tabs.ga}</button>
            <button type="button" class="fleet-tab" role="tab" id="fleet-tab-adventure" aria-selected="false" aria-controls="fleet-grid-main" data-fleet-filter="adventure">${fleetGrid.tabs.adventure}</button>
            <button type="button" class="fleet-tab" role="tab" id="fleet-tab-naked" aria-selected="false" aria-controls="fleet-grid-main" data-fleet-filter="naked">${fleetGrid.tabs.naked}</button>
          </div>

          <div id="fleet-grid-main" class="fleet-grid-wrap" role="tabpanel" aria-labelledby="fleet-tab-all">
            <div class="fleet-grid" role="list">
              ${fleetGrid.cards}
            </div>
          </div>
        </div>

        ${cityPricing ? `
        <div class="city-pricing-section animate-on-scroll">
          <div class="city-pricing-header">
            <h3 class="city-pricing-title">${cityPricing.title}</h3>
            <p class="city-pricing-subtitle">${cityPricing.subtitle}</p>
          </div>
          ${city === 'nhatrang' ? `
          <div class="nhatrang-pricing">
            <div class="nhatrang-pricing__services">
              ${cityPricing.monthlyNote ? `<p class="nhatrang-pricing__services-note">${cityPricing.monthlyNote}</p>` : ''}
              <ul class="nhatrang-pricing__services-list">
                ${cityPricing.serviceItems}
              </ul>
            </div>
            <div class="nhatrang-pricing__table-wrap">
              <table class="nhatrang-pricing__table" aria-label="${cityPricing.title}">
                <thead>
                  <tr>
                    <th class="nhatrang-pricing__th-name">Model</th>
                    <th class="nhatrang-pricing__th-price">${cityPricing.dayLabel}</th>
                    <th class="nhatrang-pricing__th-price">${cityPricing.weekLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  ${cityPricing.bikeRows}
                </tbody>
              </table>
            </div>
          </div>
          ` : `
          <div class="dalat-pricing">
            <div class="dalat-pricing__head">
              <span class="dalat-pricing__col-name">Model</span>
              <span class="dalat-pricing__col-price">${cityPricing.dayLabel}</span>
              <span class="dalat-pricing__col-price">${cityPricing.weekLabel}</span>
              ${cityPricing.hasMonthlyPrice ? `<span class="dalat-pricing__col-price">${cityPricing.monthLabel}</span>` : ''}
            </div>
            ${cityPricing.bikeRows}
          </div>
          `}
        </div>
        ` : ''}

        <div class="service-footer-bar animate-on-scroll">
          <div class="service-address">
            <span class="footer-icon" aria-hidden="true">📍</span>
            ${serviceAddress}
          </div>
          <div class="service-contact">
            ${servicePhone}
            ${serviceWebsite}
            <span><span class="footer-icon" aria-hidden="true">💬</span> WhatsApp · Zalo · Viber</span>
          </div>
        </div>

        <!-- Location Cards - 3 columns for all branches -->
        <section class="location-cards-section" aria-labelledby="location-cards-heading">
          <header class="location-cards-header">
            <h2 id="location-cards-heading" class="location-cards-title">${locationCards.title}</h2>
            <p class="location-cards-desc">${locationCards.desc}</p>
          </header>
          <div class="location-cards-grid">
            ${locationCards.cards}
          </div>
        </section>
      </div>
    </section>

    <!-- Promo -->
    <section id="uu-dai" class="promo animate-on-scroll" aria-labelledby="promo-heading">
      <div class="container promo-inner">
        <div class="promo-content">
          <h2 id="promo-heading">${promo.title}</h2>
          <p>${promo.desc}</p>
          <div class="promo-actions">
            ${cityData.contact.phone ? `<a href="tel:${cityData.contact.phone}" class="btn btn-light btn-lg">${promo.ctaCall}</a>` : ''}
            ${cityData.contact.zalo ? `<a href="https://zalo.me/${cityData.contact.zalo}" class="btn btn-outline-light btn-lg" target="_blank" rel="noopener">${promo.ctaZalo}</a>` : ''}
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="danh-gia" class="section section-alt" aria-labelledby="danh-gia-heading">
      <div class="container">
        <header class="section-head">
          <span class="section-kicker">${testimonials.kicker}</span>
          <h2 id="danh-gia-heading" class="section-title">${testimonials.title}</h2>
          <p class="section-desc">${testimonials.desc}</p>
        </header>
        <div class="testimonial-grid">
          ${testimonials.items}
        </div>
      </div>
    </section>

    <!-- Intro / SEO content -->
    <section class="section intro-content" aria-label="${lang === 'vi' ? 'Thông tin bổ sung' : 'Additional information'}">
      <div class="container content-split">
        <div class="intro-block animate-on-scroll">
          <h2>${intro.introTitle}</h2>
          <p><strong>${intro.introText}</strong></p>
        </div>
        <div class="intro-block animate-on-scroll">
          <h2>${intro.introTitle2}</h2>
          <ul class="destination-list">
            ${intro.destinations}
          </ul>
          <p class="muted">${intro.note}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="faq section-alt" aria-labelledby="faq-heading">
      <div class="container">
        <header class="section-head">
          <span class="section-kicker">${faq.kicker}</span>
          <h2 id="faq-heading" class="section-title">${faq.title}</h2>
          <p class="section-desc">${faq.desc}</p>
        </header>
        <div class="faq-accordion" role="region" aria-label="${lang === 'vi' ? 'Danh sách câu hỏi' : 'Question list'}">
          ${faq.items}
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="lien-he" class="contact animate-on-scroll" aria-labelledby="lien-he-heading">
      <div class="container contact-layout">
        <div class="contact-info">
          <h2 id="lien-he-heading">${contact.title}</h2>
          <p class="contact-lead">${contact.lead}</p>
          <div class="contact-methods">
            ${contact.hasPhone ? `
            <a href="tel:${cityData.contact.phone}" class="contact-item">
              <span class="contact-icon" aria-hidden="true">📞</span>
              <span><strong>${contact.hotline}</strong><br>${contact.phoneDisplay}</span>
            </a>` : ''}
            ${contact.hasZalo ? `
            <a href="https://zalo.me/${cityData.contact.zalo}" class="contact-item" target="_blank" rel="noopener">
              <span class="contact-icon" aria-hidden="true">💬</span>
              <span><strong>${contact.zalo}</strong><br>${contact.chatZalo}</span>
            </a>` : ''}
            <a href="${cityData.contact.website}" class="contact-item" target="_blank" rel="noopener">
              <span class="contact-icon" aria-hidden="true">🌐</span>
              <span><strong>${contact.website}</strong><br>${contact.visitWebsite}</span>
            </a>
          </div>
          <p class="contact-address"><span aria-hidden="true">📍</span> ${contact.address}</p>
        </div>
      </div>
    </section>

    <!-- All Branches Section -->
    <section class="branches-section" aria-labelledby="branches-heading">
      <div class="container">
        <header class="branches-header">
          <span class="branches-kicker">${allBranches.kicker}</span>
          <h2 id="branches-heading" class="branches-title">${allBranches.title}</h2>
        </header>
        <div class="branches-grid">
          ${allBranches.branches}
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <strong>T-MOTOR ${cityName}</strong>
        <p><span class="logo-brand">${brandName}</span> · ${footer.tagline}</p>
      </div>
      <div class="footer-links">
        <span class="footer-heading">${footer.shortcuts}</span>
        ${footer.shortcutsLinks}
      </div>
      <div class="footer-links">
        <span class="footer-heading">${footer.contact}</span>
        ${footer.contactLinks}
      </div>
    </div>
    <div class="container footer-bottom">
      <p>${footer.copyright}</p>
      <p>${footer.address}</p>
    </div>
  </footer>

  ${floatButtons ? `<div class="float-buttons" aria-label="${lang === 'vi' ? 'Liên hệ nhanh' : 'Quick contact'}">${floatButtons}</div>` : ''}

  <script src="/js/main.js"></script>
</body>
</html>`;

  return html;
}

// ============================================
// Sitemap Generator
// ============================================
function generateSitemap() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  // Vietnamese pages
  urls.push({ url: '/', priority: '1.0', changefreq: 'weekly' });
  urls.push({ url: '/nha-trang/', priority: '0.9', changefreq: 'weekly' });
  urls.push({ url: '/da-nang/', priority: '0.9', changefreq: 'weekly' });

  // English pages
  urls.push({ url: '/en/', priority: '1.0', changefreq: 'weekly' });
  urls.push({ url: '/en/nha-trang/', priority: '0.9', changefreq: 'weekly' });
  urls.push({ url: '/en/da-nang/', priority: '0.9', changefreq: 'weekly' });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${BASE_URL}${u.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="vi" href="${BASE_URL}${u.url.replace('/en/', '/')}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${u.url.startsWith('/en') ? u.url : '/en' + u.url}"/>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// ============================================
// Robots.txt Generator
// ============================================
function generateRobots() {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay (optional, be kind to shared hosting)
Crawl-delay: 1
`;
}

// ============================================
// Main Build Process
// ============================================
function build() {
  console.log('🔨 Building T-MOTOR website...\n');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy CSS from src/css/style.css to dist/css/style.css
  const cssDir = path.join(distDir, 'css');
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  fs.copyFileSync(
    path.join(rootDir, 'src', 'css', 'style.css'),
    path.join(distDir, 'css', 'style.css')
  );
  console.log('✅ Copied: dist/css/style.css');

  // Copy JS from src/js/main.js to dist/js/main.js
  const jsDir = path.join(distDir, 'js');
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
  fs.copyFileSync(
    path.join(rootDir, 'src', 'js', 'main.js'),
    path.join(distDir, 'js', 'main.js')
  );
  console.log('✅ Copied: dist/js/main.js');

  // Copy landing page as index.html
  const landingHtml = fs.readFileSync(path.join(rootDir, 'landing.html'), 'utf-8');
  fs.writeFileSync(path.join(distDir, 'index.html'), landingHtml);
  console.log('✅ Generated: dist/index.html (Landing page)');

  // Generate all city/language pages
  const cityKeys = ['dalat', 'nhaTrang', 'daNang'];
  const langs = ['vi', 'en'];

  cityKeys.forEach((city) => {
    langs.forEach((lang) => {
      const html = generatePage(city, lang);
      const cityData = cities[city];
      const slugPath = cityData.slugPath;
      
      // Build path: VI -> /slug/, EN -> /en/slug/
      let dir, filePath;
      if (lang === 'vi') {
        dir = path.join(distDir, slugPath);
        filePath = path.join(dir, 'index.html');
      } else {
        dir = path.join(distDir, 'en', slugPath);
        filePath = path.join(dir, 'index.html');
      }

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, html);
      console.log(`✅ Generated: ${filePath.replace(rootDir + '/dist/', '')}`);
    });
  });

  // Generate SEO files
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated: dist/sitemap.xml');

  const robots = generateRobots();
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
  console.log('✅ Generated: dist/robots.txt');

  console.log('\n✨ Build complete!');
  console.log(`📁 Output: ${distDir}`);
  console.log('\nPages generated:');
  console.log('  🌐 / (Landing page - City selector)');
  console.log('  🇻🇳 /dalat/ (Da Lat - Vietnamese)');
  console.log('  🇻🇳 /nha-trang/ (Nha Trang - Vietnamese)');
  console.log('  🇻🇳 /da-nang/ (Da Nang - Vietnamese)');
  console.log('  🇬🇧 /en/dalat/ (Da Lat - English)');
  console.log('  🇬🇧 /en/nha-trang/ (Nha Trang - English)');
  console.log('  🇬🇧 /en/da-nang/ (Da Nang - English)');
}

build();
