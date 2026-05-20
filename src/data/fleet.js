// Fleet data - Motorcycles available for rent
export const fleet = [
  {
    id: 'honda-air-blade',
    nameVi: 'Honda Air Blade',
    nameEn: 'Honda Air Blade',
    category: 'ga',
    prices: {
      daily: 150,
      weekly: 850,
      monthly: 3000,
    },
    image: '/images/motors/pr-honda-airblade.webp',
    altVi: 'Honda Air Blade cho thuê',
    altEn: 'Honda Air Blade for rent',
  },
  {
    id: 'honda-sh',
    nameVi: 'Honda SH',
    nameEn: 'Honda SH',
    category: 'ga',
    prices: {
      daily: 300,
      weekly: 1800,
      monthly: 6000,
    },
    image: '/images/motors/xe-sh.png',
    altVi: 'Honda SH cho thuê',
    altEn: 'Honda SH for rent',
  },
  {
    id: 'honda-adv',
    nameVi: 'Honda ADV',
    nameEn: 'Honda ADV',
    category: 'ga',
    prices: {
      daily: 500,
      weekly: 2500,
      monthly: 7500,
    },
    image: '/images/motors/adv-motor.png',
    altVi: 'Honda ADV cho thuê',
    altEn: 'Honda ADV for rent',
  },
  {
    id: 'yamaha-wr155',
    nameVi: 'Yamaha WR 155',
    nameEn: 'Yamaha WR 155',
    category: 'adventure',
    prices: {
      daily: 650,
      weekly: 3500,
      monthly: 9750,
    },
    image: '/images/motors/pr-yamaha-wr155.webp',
    altVi: 'Yamaha WR 155 cho thuê',
    altEn: 'Yamaha WR 155 for rent',
  },
  {
    id: 'yamaha-xmax',
    nameVi: 'Yamaha XMAX 300',
    nameEn: 'Yamaha XMAX 300',
    category: 'ga',
    prices: {
      daily: 800,
      weekly: 4600,
      monthly: 11500,
    },
    image: '/images/motors/yamaha xmax 300.png',
    altVi: 'Yamaha XMAX 300 cho thuê',
    altEn: 'Yamaha XMAX 300 for rent',
  },
  {
    id: 'honda-cb300r',
    nameVi: 'Honda CB300R',
    nameEn: 'Honda CB300R',
    category: 'naked',
    prices: {
      daily: 750,
      weekly: 4200,
      monthly: 10500,
    },
    image: '/images/motors/pr-honda-cb300r.webp',
    altVi: 'Honda CB300R cho thuê',
    altEn: 'Honda CB300R for rent',
  },
  {
    id: 'kawasaki-z300',
    nameVi: 'Kawasaki Z300',
    nameEn: 'Kawasaki Z300',
    category: 'naked',
    prices: {
      daily: 650,
      weekly: 3500,
      monthly: 9750,
    },
    image: '/images/motors/pr-kawasaki-z300.webp',
    altVi: 'Kawasaki Z300 cho thuê',
    altEn: 'Kawasaki Z300 for rent',
  },
  {
    id: 'yamaha-mt03',
    nameVi: 'Yamaha MT-03',
    nameEn: 'Yamaha MT-03',
    category: 'naked',
    prices: {
      daily: 650,
      weekly: 3500,
      monthly: 9750,
    },
    image: '/images/motors/pr-yamaha-mt03.webp',
    altVi: 'Yamaha MT-03 cho thuê',
    altEn: 'Yamaha MT-03 for rent',
  },
  {
    id: 'ktm-duke390',
    nameVi: 'KTM Duke 390',
    nameEn: 'KTM Duke 390',
    category: 'naked',
    prices: {
      daily: 700,
      weekly: 3900,
      monthly: 10500,
    },
    image: '/images/motors/ktm-duke390-hero.jpg',
    altVi: 'KTM Duke 390 cho thuê',
    altEn: 'KTM Duke 390 for rent',
  },
  {
    id: 'kawasaki-z650',
    nameVi: 'Kawasaki Z650',
    nameEn: 'Kawasaki Z650',
    category: 'naked',
    prices: {
      daily: 1000,
      weekly: 6000,
      monthly: 15000,
    },
    image: '/images/motors/pr-kawasaki-z650.webp',
    altVi: 'Kawasaki Z650 cho thuê',
    altEn: 'Kawasaki Z650 for rent',
  },
  {
    id: 'honda-cb500x',
    nameVi: 'Honda CB500X',
    nameEn: 'Honda CB500X',
    category: 'adventure',
    prices: {
      daily: 1000,
      weekly: 6000,
      monthly: 15000,
    },
    image: '/images/motors/pr-cb500x.webp',
    altVi: 'Honda CB500X cho thuê',
    altEn: 'Honda CB500X for rent',
  },
  {
    id: 'honda-cb500f',
    nameVi: 'Honda CB500F',
    nameEn: 'Honda CB500F',
    category: 'naked',
    prices: {
      daily: 1000,
      weekly: 6000,
      monthly: 15000,
    },
    image: '/images/motors/pr-honda-cb300f.webp',
    altVi: 'Honda CB500F cho thuê',
    altEn: 'Honda CB500F for rent',
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
