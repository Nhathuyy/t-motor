// Fleet data - Motorcycles available for rent
// available: ['nhatrang', 'danang', 'dalat'] - specify which cities have this bike
export const fleet = [
  // ============ NHA TRANG ============
  {
    id: 'honda-adv',
    nameVi: 'Honda ADV',
    nameEn: 'Honda ADV',
    category: 'adventure',
    prices: {
      nhatrang: { daily: 500, weekly: 2500, monthly: null },
      danang: { daily: 500, weekly: 2500, monthly: 7500 },
      dalat: { daily: 500, weekly: 2500, monthly: 7500 },
    },
    image: '/images/motors/adv-motor.png',
    altVi: 'Honda ADV cho thuê',
    altEn: 'Honda ADV for rent',
    available: ['nhatrang', 'danang', 'dalat'],
  },
  {
    id: 'yamaha-xmax',
    nameVi: 'Yamaha XMAX 300',
    nameEn: 'Yamaha XMAX 300',
    category: 'ga',
    prices: {
      nhatrang: { daily: 800, weekly: 4200, monthly: null },
      danang: { daily: 800, weekly: 4600, monthly: 11500 },
      dalat: { daily: 800, weekly: 4600, monthly: 11500 },
    },
    image: '/images/motors/yamaha-xmax-300.png',
    altVi: 'Yamaha XMAX 300 cho thuê',
    altEn: 'Yamaha XMAX 300 for rent',
    available: ['nhatrang', 'danang', 'dalat'],
  },
  {
    id: 'gpx-legend200',
    nameVi: 'GPX Legend 200',
    nameEn: 'GPX Legend 200',
    category: 'naked',
    prices: {
      nhatrang: { daily: 200, weekly: 1000, monthly: null },
      danang: { daily: null, weekly: null, monthly: null },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/gpx-legend-200.webp',
    altVi: 'GPX Legend 200 cho thuê',
    altEn: 'GPX Legend 200 for rent',
    available: ['nhatrang'],
  },
  {
    id: 'yamaha-mt15',
    nameVi: 'Yamaha MT-15',
    nameEn: 'Yamaha MT-15',
    category: 'naked',
    prices: {
      nhatrang: { daily: 300, weekly: 1500, monthly: null },
      danang: { daily: null, weekly: null, monthly: null },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/yamaha-mt15.webp',
    altVi: 'Yamaha MT-15 cho thuê',
    altEn: 'Yamaha MT-15 for rent',
    available: ['nhatrang'],
  },
  {
    id: 'honda-cb190r',
    nameVi: 'Honda CB190R',
    nameEn: 'Honda CB190R',
    category: 'naked',
    prices: {
      nhatrang: { daily: 300, weekly: 1500, monthly: null },
      danang: { daily: 250, weekly: 1500, monthly: 5000 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/hondacb190r.webp',
    altVi: 'Honda CB190R cho thuê',
    altEn: 'Honda CB190R for rent',
    available: ['nhatrang', 'danang'],
  },
  {
    id: 'benelli-302',
    nameVi: 'Benelli 302',
    nameEn: 'Benelli 302',
    category: 'naked',
    prices: {
      nhatrang: { daily: 300, weekly: 1500, monthly: null },
      danang: { daily: null, weekly: null, monthly: null },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/benelli 302.webp',
    altVi: 'Benelli 302 cho thuê',
    altEn: 'Benelli 302 for rent',
    available: ['nhatrang'],
  },
  {
    id: 'kawasaki-z300',
    nameVi: 'Kawasaki Z300',
    nameEn: 'Kawasaki Z300',
    category: 'naked',
    prices: {
      nhatrang: { daily: 650, weekly: 3500, monthly: null },
      danang: { daily: 650, weekly: 3500, monthly: 9750 },
      dalat: { daily: 650, weekly: 3500, monthly: 9750 },
    },
    image: '/images/motors/pr-kawasaki-z300.webp',
    altVi: 'Kawasaki Z300 cho thuê',
    altEn: 'Kawasaki Z300 for rent',
    available: ['nhatrang', 'danang', 'dalat'],
  },
  {
    id: 'yamaha-mt03',
    nameVi: 'Yamaha MT-03',
    nameEn: 'Yamaha MT-03',
    category: 'naked',
    prices: {
      nhatrang: { daily: 600, weekly: 3500, monthly: null },
      danang: { daily: 600, weekly: 3500, monthly: 9000 },
      dalat: { daily: 650, weekly: 3500, monthly: 9750 },
    },
    image: '/images/motors/pr-yamaha-mt03.webp',
    altVi: 'Yamaha MT-03 cho thuê',
    altEn: 'Yamaha MT-03 for rent',
    available: ['nhatrang', 'danang', 'dalat'],
  },
  {
    id: 'husqvarna-401',
    nameVi: 'Husqvarna 401',
    nameEn: 'Husqvarna 401',
    category: 'naked',
    prices: {
      nhatrang: { daily: 850, weekly: 4500, monthly: null },
      danang: { daily: null, weekly: null, monthly: null },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/husqvarna-401.jpeg',
    altVi: 'Husqvarna 401 cho thuê',
    altEn: 'Husqvarna 401 for rent',
    available: ['nhatrang'],
  },
  {
    id: 'ktm-duke390',
    nameVi: 'KTM Duke 390',
    nameEn: 'KTM Duke 390',
    category: 'naked',
    prices: {
      nhatrang: { daily: 850, weekly: 4500, monthly: null },
      danang: { daily: 650, weekly: 3500, monthly: 9750 },
      dalat: { daily: 700, weekly: 3900, monthly: 10500 },
    },
    image: '/images/motors/ktm-duke390-hero.jpg',
    altVi: 'KTM Duke 390 cho thuê',
    altEn: 'KTM Duke 390 for rent',
    available: ['nhatrang', 'danang', 'dalat'],
  },
  {
    id: 'yamaha-r3',
    nameVi: 'Yamaha R3',
    nameEn: 'Yamaha R3',
    category: 'naked',
    prices: {
      nhatrang: { daily: 800, weekly: 4200, monthly: null },
      danang: { daily: 550, weekly: 2800, monthly: 8250 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/pr-yamaha-r3.webp',
    altVi: 'Yamaha R3 cho thuê',
    altEn: 'Yamaha R3 for rent',
    available: ['nhatrang', 'danang'],
  },
  {
    id: 'honda-cbr500r',
    nameVi: 'Honda CBR500R',
    nameEn: 'Honda CBR500R',
    category: 'naked',
    prices: {
      nhatrang: { daily: 1000, weekly: 5500, monthly: null },
      danang: { daily: 850, weekly: 3500, monthly: 12750 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/Hondacrb500r.webp',
    altVi: 'Honda CBR500R cho thuê',
    altEn: 'Honda CBR500R for rent',
    available: ['nhatrang', 'danang'],
  },
  {
    id: 'kawasaki-ninja650',
    nameVi: 'Kawasaki Ninja 650',
    nameEn: 'Kawasaki Ninja 650',
    category: 'naked',
    prices: {
      nhatrang: { daily: 1000, weekly: 5500, monthly: null },
      danang: { daily: 1000, weekly: 5500, monthly: 15000 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/kawasaki-ninja650.webp',
    altVi: 'Kawasaki Ninja 650 cho thuê',
    altEn: 'Kawasaki Ninja 650 for rent',
    available: ['nhatrang', 'danang'],
  },
  {
    id: 'honda-cb500f',
    nameVi: 'Honda CB500F',
    nameEn: 'Honda CB500F',
    category: 'naked',
    prices: {
      nhatrang: { daily: 1200, weekly: 6500, monthly: null },
      danang: { daily: 1200, weekly: 6800, monthly: 18000 },
      dalat: { daily: 1000, weekly: 6000, monthly: 15000 },
    },
    image: '/images/motors/pr-honda-cb500f.webp',
    altVi: 'Honda CB500F cho thuê',
    altEn: 'Honda CB500F for rent',
    available: ['nhatrang', 'danang', 'dalat'],
  },

  // ============ DA NANG ============
  {
    id: 'yamaha-r15',
    nameVi: 'Yamaha R15',
    nameEn: 'Yamaha R15',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 200, weekly: 1000, monthly: 4000 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/yamaha-r15.webp',
    altVi: 'Yamaha R15 cho thuê',
    altEn: 'Yamaha R15 for rent',
    available: ['danang'],
  },
  {
    id: 'yamaha-tfx',
    nameVi: 'Yamaha TFX',
    nameEn: 'Yamaha TFX',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 200, weekly: 1000, monthly: 4000 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/yamha-tfx.webp',
    altVi: 'Yamaha TFX cho thuê',
    altEn: 'Yamaha TFX for rent',
    available: ['danang'],
  },
  {
    id: 'honda-cb150x',
    nameVi: 'Honda CB150X',
    nameEn: 'Honda CB150X',
    category: 'adventure',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 600, weekly: 3500, monthly: 9000 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/honda-cb150x.webp',
    altVi: 'Honda CB150X cho thuê',
    altEn: 'Honda CB150X for rent',
    available: ['danang'],
  },
  {
    id: 'yamaha-r3-2024',
    nameVi: 'Yamaha R3 2024',
    nameEn: 'Yamaha R3 2024',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 650, weekly: 3500, monthly: 9750 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/yamahaR3-2024.webp',
    altVi: 'Yamaha R3 2024 cho thuê',
    altEn: 'Yamaha R3 2024 for rent',
    available: ['danang'],
  },
  {
    id: 'kawasaki-ninja400',
    nameVi: 'Kawasaki Ninja 400',
    nameEn: 'Kawasaki Ninja 400',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 650, weekly: 3500, monthly: 9750 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/Kawasaki-Ninja400.webp',
    altVi: 'Kawasaki Ninja 400 cho thuê',
    altEn: 'Kawasaki Ninja 400 for rent',
    available: ['danang'],
  },
  {
    id: 'kawasaki-z800',
    nameVi: 'Kawasaki Z800',
    nameEn: 'Kawasaki Z800',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 1200, weekly: 6800, monthly: 18000 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/yamaha-z800.webp',
    altVi: 'Kawasaki Z800 cho thuê',
    altEn: 'Kawasaki Z800 for rent',
    available: ['danang'],
  },
  {
    id: 'honda-cbr650r',
    nameVi: 'Honda CBR650R',
    nameEn: 'Honda CBR650R',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 1500, weekly: 8500, monthly: 22500 },
      dalat: { daily: null, weekly: null, monthly: null },
    },
    image: '/images/motors/Honda-Cbr650r.webp',
    altVi: 'Honda CBR650R cho thuê',
    altEn: 'Honda CBR650R for rent',
    available: ['danang'],
  },

  // ============ DA LAT ============
  {
    id: 'honda-air-blade',
    nameVi: 'Honda Air Blade',
    nameEn: 'Honda Air Blade',
    category: 'ga',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 150, weekly: 850, monthly: 3000 },
      dalat: { daily: 150, weekly: 850, monthly: 3000 },
    },
    image: '/images/motors/pr-honda-airblade.webp',
    altVi: 'Honda Air Blade cho thuê',
    altEn: 'Honda Air Blade for rent',
    available: ['danang', 'dalat'],
  },
  {
    id: 'honda-sh',
    nameVi: 'Honda SH',
    nameEn: 'Honda SH',
    category: 'ga',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 300, weekly: 1800, monthly: 6000 },
      dalat: { daily: 300, weekly: 1800, monthly: 6000 },
    },
    image: '/images/motors/xe-sh.png',
    altVi: 'Honda SH cho thuê',
    altEn: 'Honda SH for rent',
    available: ['danang', 'dalat'],
  },
  {
    id: 'yamaha-wr155',
    nameVi: 'Yamaha WR155',
    nameEn: 'Yamaha WR155',
    category: 'adventure',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 650, weekly: 3500, monthly: 9750 },
      dalat: { daily: 650, weekly: 3500, monthly: 9750 },
    },
    image: '/images/motors/pr-yamaha-wr155.webp',
    altVi: 'Yamaha WR155 cho thuê',
    altEn: 'Yamaha WR155 for rent',
    available: ['danang', 'dalat'],
  },
  {
    id: 'honda-cb300r',
    nameVi: 'Honda CB300R',
    nameEn: 'Honda CB300R',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 750, weekly: 4200, monthly: 10500 },
      dalat: { daily: 750, weekly: 4200, monthly: 10500 },
    },
    image: '/images/motors/pr-honda-cb300r.webp',
    altVi: 'Honda CB300R cho thuê',
    altEn: 'Honda CB300R for rent',
    available: ['danang', 'dalat'],
  },
  {
    id: 'kawasaki-z650',
    nameVi: 'Kawasaki Z650',
    nameEn: 'Kawasaki Z650',
    category: 'naked',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 1000, weekly: 6000, monthly: 15000 },
      dalat: { daily: 1000, weekly: 6000, monthly: 15000 },
    },
    image: '/images/motors/pr-kawasaki-z650.webp',
    altVi: 'Kawasaki Z650 cho thuê',
    altEn: 'Kawasaki Z650 for rent',
    available: ['danang', 'dalat'],
  },
  {
    id: 'honda-cb500x',
    nameVi: 'Honda CB500X',
    nameEn: 'Honda CB500X',
    category: 'adventure',
    prices: {
      nhatrang: { daily: null, weekly: null, monthly: null },
      danang: { daily: 1000, weekly: 6000, monthly: 15000 },
      dalat: { daily: 1000, weekly: 6000, monthly: 15000 },
    },
    image: '/images/motors/pr-cb500x.webp',
    altVi: 'Honda CB500X cho thuê',
    altEn: 'Honda CB500X for rent',
    available: ['danang', 'dalat'],
  },
];

// Category labels
export const categories = {
  ga: {
    slug: 'ga',
    nameVi: 'Xe ga',
    nameEn: 'Scooter',
    filterVi: 'Xe ga',
    filterEn: 'Scooter',
  },
  adventure: {
    slug: 'adventure',
    nameVi: 'Địa hình',
    nameEn: 'Adventure',
    filterVi: 'Địa hình',
    filterEn: 'Adventure',
  },
  naked: {
    slug: 'naked',
    nameVi: 'Naked',
    nameEn: 'Naked Sport',
    filterVi: 'Naked',
    filterEn: 'Naked',
  },
};

// Hero bikes for carousel (3 featured bikes)
export const heroBikes = ['ktm-duke390', 'honda-adv', 'yamaha-xmax'];

// Get bikes available for a specific city
export function getFleetByCity(city) {
  return fleet.filter(bike => bike.available.includes(city));
}

// Format price in K format (e.g., "150K")
export function formatPrice(amountK) {
  if (amountK === null || amountK === undefined) {
    return '-';
  }
  return `${amountK}K`;
}

// Get fleet item by ID
export function getFleetById(id) {
  return fleet.find((bike) => bike.id === id);
}

// Get bikes by category
export function getBikesByCategory(category) {
  if (category === 'all') return fleet;
  return fleet.filter((bike) => bike.category === category);
}
