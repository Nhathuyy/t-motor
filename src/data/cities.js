// Cities configuration
import { getPricingByCity } from './pricing/index.js';

export const cities = {
  dalat: {
    slug: 'dalat',
    slugPath: 'dalat',
    nameVi: 'Đà Lạt',
    nameEn: 'Da Lat',
    address: {
      street: 'H35 Phạm Hồng Thái',
      ward: 'Xuân Hương',
      city: 'Đà Lạt',
      region: 'Lâm Đồng',
      country: 'VN',
    },
    geo: {
      latitude: 11.9404,
      longitude: 108.4583,
    },
    contact: {
      phone: '+84848774775',
      phoneDisplay: '0848 774 775',
      zalo: '84848774775',
      whatsapp: '',
      facebook: 'https://www.facebook.com/profile.php?id=61587283070901',
      website: 'https://tmotor.vn/dalat',
    },
    seo: {
      vi: {
        title: 'T-MOTOR Đà Lạt | Cho thuê xe motor Đà Lạt giá rẻ - Giao xe tận khách sạn',
        description: 'T-MOTOR Đà Lạt - Dịch vụ cho thuê xe máy Đà Lạt uy tín, giá rẻ. Cửa hàng tại H35 Phạm Hồng Thái, Xuân Hương. Giao xe tận khách sạn, homestay. Xe mới, bảo dưỡng định kỳ. Liên hệ ngay!',
        keywords: 'cho thuê xe motor đà lạt, thuê xe máy đà lạt, thuê xe motor đà lạt, thuê xe đà lạt, t-motor đà lạt, cho thuê xe đà lạt, thuê xe langbiang, thuê xe cầu đất, rent motorbike dalat, motor da lat, scooter rental dalat',
      },
      en: {
        title: 'T-MOTOR Da Lat | Motorbike Rental Da Lat - Affordable, Hotel Delivery Available',
        description: 'T-MOTOR Da Lat - Reliable motorbike rental service in Da Lat. Shop at H35 Pham Hong Thai, Xuan Huong. Well-maintained bikes, hotel delivery. From scooters to big bikes - explore Da Lat!',
        keywords: 'motorbike rental da lat, scooter rental da lat, rent motorbike da lat, motorcycle rental dalat, t-motor da lat, da lat motorbike hire',
      },
    },
    content: {
      vi: {
        heroEyebrow: 'T-MOTOR · Thuê xe motor Đà Lạt',
        heroTitle: 'Cực nhanh trên mọi cung đường',
        heroSubtitle: 'KTM Duke 390',
        heroDesc: 'Động cơ một xy-lanh mạnh mẽ — lý tưởng để chinh phục đèo Đà Lạt. Thuê theo ngày hoặc tuần, giao xe tận khách sạn trong nội thành.',
        introTitle: 'Dịch vụ cho thuê xe motor Đà Lạt uy tín',
        introText: 'Cho thuê xe motor Đà Lạt giúp bạn chủ động lịch trình, dễ chinh phục đèo dốc và các điểm check-in ngoài trung tâm. T-MOTOR cung cấp thuê xe motor Đà Lạt với hơn 12 mẫu xe — phù hợp từ đi phố đến touring.',
        destinations: [
          'Hồ Xuân Hương & vòng quanh trung tâm',
          'Thung lũng Tình Yêu, Datanla',
          'Đồi chè Cầu Đất, làng hoa',
          'Langbiang, Thiền viện Trúc Lâm',
        ],
        introNote: 'Cung đường Đà Lạt đa dạng độ dốc — hãy chọn dòng xe phù hợp tay lái và thời tiết.',
      },
      en: {
        heroEyebrow: 'T-MOTOR · Motorbike Rental Da Lat',
        heroTitle: 'Blazing fast on every winding road',
        heroSubtitle: 'KTM Duke 390',
        heroDesc: 'Single-cylinder powerhouse — perfect for conquering Da Lat\'s mountain passes. Rent daily or weekly with hotel delivery within city center.',
        introTitle: 'Reliable Motorbike Rental in Da Lat',
        introText: 'Renting a motorbike in Da Lat gives you the freedom to set your own schedule, tackle mountain roads, and visit spots beyond the city center. T-MOTOR offers 12+ bike models — from city scooters to touring beasts.',
        destinations: [
          'Xuan Huong Lake & city center loop',
          'Valentine Valley, Datanla Waterfalls',
          'Cau Dat Tea Hills, Flower Villages',
          'Langbiang Mountain, Truc Lam Zen Monastery',
        ],
        introNote: 'Da Lat roads vary in steepness — choose a bike that matches your experience and the weather.',
      },
    },
    pricing: getPricingByCity('dalat'),
  },
  nhaTrang: {
    slug: 'nha-trang',
    slugPath: 'nha-trang',
    nameVi: 'Nha Trang',
    nameEn: 'Nha Trang',
    address: {
      street: '1A Bạch Đằng',
      ward: 'Phường Nha Trang',
      city: 'Nha Trang',
      region: 'Khánh Hòa',
      country: 'VN',
    },
    geo: {
      latitude: 12.2388,
      longitude: 109.1967,
    },
    contact: {
      phone: '+84848771771',
      phoneDisplay: '0848 771 771',
      zalo: '84848771771',
      whatsapp: '84848771771',
      facebook: 'https://www.facebook.com/p/T-Bike-%E1%BB%9F-Nha-Trang-D%E1%BB%8Bch-V%E1%BB%A5-Cho-Thu%C3%AA-Xe-M%C3%A1y-T%E1%BB%B1-L%C3%A1i-100094403166212/',
      website: 'https://tmotor.vn/nha-trang',
    },
    pricing: getPricingByCity('nhatrang'),
    seo: {
      vi: {
        title: 'T-MOTOR Nha Trang | Cho thuê xe motor Nha Trang giá rẻ - Giao xe tận khách sạn',
        description: 'T-MOTOR Nha Trang - Dịch vụ cho thuê xe máy Nha Trang uy tín, giá rẻ. Giao xe tại khách sạn, resort gần biển. Xe ga, xe số, xe phân khối lớn. Đặt xe ngay!',
        keywords: 'cho thuê xe motor nha trang, thuê xe máy nha trang, thuê xe motor nha trang, cho thuê xe nha trang, thuê xe biển nha trang, thuê xe khách sạn nha trang, t-motor nha trang, rent motorbike nha trang, scooter rental nha trang',
      },
      en: {
        title: 'T-MOTOR Nha Trang | Motorbike Rental Near Beach - Hotel Delivery Available',
        description: 'T-MOTOR Nha Trang - Rent motorbikes and scooters near the beach. Hotel delivery, affordable prices. From scooters for city sightseeing to big bikes for mountain adventures. Book now!',
        keywords: 'motorbike rental nha trang, scooter rental nha trang, rent motorbike nha trang, nha trang motorbike hire, t-motor nha trang',
      },
    },
    content: {
      vi: {
        heroEyebrow: 'T-MOTOR · Thuê xe motor Nha Trang',
        heroTitle: 'Tự do khám phá từ bãi biển',
        heroSubtitle: 'Yamaha XMAX 300',
        heroDesc: 'Maxi scooter êm ái với cốp rộng — hoàn hảo để chở đồ đạc từ khách sạn ra biển hoặc đi tour quanh thành phố. Giao xe tận nơi trong nội thành.',
        introTitle: 'Dịch vụ cho thuê xe motor Nha Trang tiện lợi',
        introText: 'Thuê xe motor Nha Trang để chủ động khám phá thành phố từ bãi biển đến những điểm đến xa hơn. T-MOTOR cung cấp đa dạng xe từ xe ga để đi dạo phố đến xe phân khối lớn cho những chuyến touring.',
        destinations: [
          'Bãi biển Nha Trang & khu vực trung tâm',
          'Hòn Chồng, Hòn Vung',
          'Tháp Bà Ponagar',
          'Vinpearl Land & Đảo Hòn Tre',
        ],
        introNote: 'Nha Trang có nhiều resort ven biển — chúng tôi hỗ trợ giao xe trực tiếp đến khách sạn của bạn.',
      },
      en: {
        heroEyebrow: 'T-MOTOR · Motorbike Rental Nha Trang',
        heroTitle: 'Freedom to explore from beach to city',
        heroSubtitle: 'Yamaha XMAX 300',
        heroDesc: 'Smooth maxi scooter with spacious storage — perfect for carrying beach gear or touring the city. Hotel delivery within city center.',
        introTitle: 'Convenient Motorbike Rental in Nha Trang',
        introText: 'Rent a motorbike in Nha Trang to freely explore the city from the beach to destinations further afield. T-MOTOR offers a wide range from city scooters to big bikes for touring adventures.',
        destinations: [
          'Nha Trang Beach & City Center',
          'Hon Chong, Hon Vung Island',
          'Thap Ba Ponagar Temple',
          'Vinpearl Land & Hon Tre Island',
        ],
        introNote: 'Nha Trang has many beachfront resorts — we deliver bikes directly to your hotel.',
      },
    },
  },
  daNang: {
    slug: 'da-nang',
    slugPath: 'da-nang',
    nameVi: 'Đà Nẵng',
    nameEn: 'Da Nang',
    address: {
      street: '54 Hồ Xuân Hương',
      ward: 'Chi Nhánh 1',
      city: 'Đà Nẵng',
      region: 'Đà Nẵng',
      country: 'VN',
    },
    geo: {
      latitude: 16.0544,
      longitude: 108.2022,
    },
    contact: {
      phone: '+84849771772',
      phoneDisplay: '0849 771 772',
      zalo: '84848774775',
      whatsapp: '84848774775',
      facebook: 'https://www.facebook.com/p/T-Bike-DaNang-D%E1%BB%8Bch-V%E1%BB%A5-Cho-Thu%C3%AA-Xe-M%C3%A1y-%C3%94T%C3%B4-100063470564198/?locale=vi_VN',
      website: 'https://tmotor.vn/da-nang',
    },
    seo: {
      vi: {
        title: 'T-MOTOR Đà Nẵng | Cho thuê xe motor Đà Nẵng giá rẻ - Giao xe tận nơi',
        description: 'T-MOTOR Đà Nẵng - Dịch vụ cho thuê xe máy Đà Nẵng uy tín. Chi nhánh tại 54 Hồ Xuân Hương & 01 Hoa Phượng. Giao xe tại khách sạn, homestay. Đi Sơn Trà, Hội An, Hải Vân. Đặt xe ngay!',
        keywords: 'cho thuê xe motor đà nẵng, thuê xe máy đà nẵng, thuê xe motor đà nẵng, thuê xe đà nẵng, thuê xe hội an, thuê xe sơn trà, t-motor đà nẵng, cho thuê xe đà nẵng, rent motorbike da nang, scooter rental da nang',
      },
      en: {
        title: 'T-MOTOR Da Nang | Motorbike Rental Da Nang - Hotel Delivery, Explore Hoi An & Son Tra',
        description: 'T-MOTOR Da Nang - Reliable motorbike rental service in Da Nang. Branches at 54 Ho Xuan Huong & 01 Hoa Phuong. Hotel delivery, explore Hoi An, Son Tra Peninsula, Marble Mountains. Book now!',
        keywords: 'motorbike rental da nang, scooter rental da nang, rent motorbike da nang, hoi an motorbike rental, son tra motorbike hire, t-motor da nang',
      },
    },
    content: {
      vi: {
        heroEyebrow: 'T-MOTOR · Thuê xe motor Đà Nẵng',
        heroTitle: 'Khám phá Đà Nẵng & vùng phụ cận',
        heroSubtitle: 'Honda CB500X',
        heroDesc: 'Xe adventure đa dụng — phù hợp để đi từ thành phố đến Hội An, Sơn Trà, hoặc Hải Vân. Thuê theo ngày hoặc tuần, giao xe tận nơi trong nội thành.',
        introTitle: 'Dịch vụ cho thuê xe motor Đà Nẵng thuận tiện',
        introText: 'Thuê xe motor Đà Nẵng để dễ dàng di chuyển từ trung tâm thành phố đến Hội An, Sơn Trà, Ngũ Hành Sơn và các điểm đến nổi tiếng. T-MOTOR mang đến nhiều lựa chọn xe phù hợp mọi nhu cầu.',
        destinations: [
          'Sơn Trà - Bãi biển Mỹ Khê',
          'Hội An - Phố cổ UNESCO',
          'Ngũ Hành Sơn',
          'Đèo Hải Vân - Lăng Cô',
        ],
        introNote: 'Đà Nẵng là điểm trung chuyển lý tưởng — thuê xe để tự do khám phá cả khu vực miền Trung.',
      },
      en: {
        heroEyebrow: 'T-MOTOR · Motorbike Rental Da Nang',
        heroTitle: 'Explore Da Nang & beyond',
        heroSubtitle: 'Honda CB500X',
        heroDesc: 'Versatile adventure bike — perfect for trips from city center to Hoi An, Son Tra Peninsula, or Hai Van Pass. Rent daily or weekly with hotel delivery.',
        introTitle: 'Convenient Motorbike Rental in Da Nang',
        introText: 'Rent a motorbike in Da Nang to easily travel from the city center to Hoi An, Son Tra, Marble Mountains, and other popular destinations. T-MOTOR offers diverse bike options for every need.',
        destinations: [
          'Son Tra Peninsula - My Khe Beach',
          'Hoi An Ancient Town UNESCO',
          'Marble Mountains',
          'Hai Van Pass - Lang Co Bay',
        ],
        introNote: 'Da Nang is an ideal transit hub — rent a bike to freely explore the Central region.',
      },
    },
    pricing: getPricingByCity('danang'),
  },
};

// Get city by slug
export function getCityBySlug(slug) {
  const cityKey = Object.keys(cities).find(
    (key) => cities[key].slug === slug || cities[key].slugPath === slug
  );
  return cityKey ? cities[cityKey] : cities.dalat;
}

// Get all city keys
export function getAllCityKeys() {
  return Object.keys(cities);
}
