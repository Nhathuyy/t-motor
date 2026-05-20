// Pricing data exports
import dalatPricing from './dalat.json' with { type: 'json' };
import nhatrangPricing from './nhatrang.json' with { type: 'json' };
import danangPricing from './danang.json' with { type: 'json' };

// Pricing data by city
export const pricingData = {
  dalat: dalatPricing,
  nhatrang: nhatrangPricing,
  danang: danangPricing,
};

// Get pricing by city
export function getPricingByCity(city) {
  const cityKey = city.toLowerCase().replace(/[^a-z]/g, '');
  if (cityKey.includes('nhatrang') || cityKey === 'nhatrang') {
    return pricingData.nhatrang;
  }
  if (cityKey.includes('danang') || cityKey.includes('danang') || cityKey === 'danang') {
    return pricingData.danang;
  }
  return pricingData.dalat; // Default
}

// Format price in K format (e.g., "500K")
export function formatPrice(amountK) {
  if (amountK === null || amountK === undefined) {
    return '-';
  }
  return `${amountK}K`;
}

// Format price in full VND format (e.g., "500.000đ")
export function formatPriceVND(amountK) {
  if (amountK === null || amountK === undefined) {
    return '-';
  }
  const amount = amountK * 1000;
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

// Get pricing data for a specific language
export function getPricingLocalized(city, lang = 'vi') {
  const pricing = getPricingByCity(city);
  const isVi = lang === 'vi';
  
  return {
    branch_id: pricing.branch_id,
    branch_name: pricing.branch_name,
    city: isVi ? pricing.cityVi : pricing.city,
    address: pricing.address,
    phone: pricing.phone,
    website: pricing.website,
    contact_channels: pricing.contact_channels,
    has_monthly_price: pricing.has_monthly_price,
    promotion: pricing.promotion ? {
      description: isVi ? pricing.promotion.descriptionVi : pricing.promotion.description,
    } : null,
    title: isVi ? pricing.titleVi : pricing.title,
    subtitle: isVi ? pricing.subtitleVi : pricing.subtitle,
    services: isVi ? pricing.servicesVi : pricing.services,
    notes: isVi ? pricing.notesVi : pricing.notes,
    motorbikes: pricing.motorbikes.map(bike => ({
      model: bike.model,
      daily_price_k: bike.daily_price_k,
      weekly_price_k: bike.weekly_price_k,
      monthly_price_k: bike.monthly_price_k,
      daily_price_k_formatted: formatPrice(bike.daily_price_k),
      weekly_price_k_formatted: formatPrice(bike.weekly_price_k),
      monthly_price_k_formatted: bike.monthly_price_k !== null ? formatPrice(bike.monthly_price_k) : '-',
    })),
  };
}

// Export all pricing data as flat arrays for compatibility
export function getAllPricingBikes(city) {
  const pricing = getPricingByCity(city);
  return pricing.motorbikes.map(bike => ({
    ...bike,
    branch_id: pricing.branch_id,
    city: pricing.city,
  }));
}
