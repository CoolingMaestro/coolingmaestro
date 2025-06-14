// Formatlama yardımcı fonksiyonları

// Sayı formatlama (binlik ayraç)
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('tr-TR').format(num);
};

// Para birimi formatlama
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Tarih formatlama
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
};

// Tarih ve saat formatlama
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

// Yüzde formatlama
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

// Sıcaklık formatlama
export const formatTemperature = (temp: number): string => {
  return `${temp}°C`;
};

// Güç birimi formatlama (Watt)
export const formatPower = (watts: number): string => {
  if (watts >= 1000000) {
    return `${(watts / 1000000).toFixed(1)} MW`;
  } else if (watts >= 1000) {
    return `${(watts / 1000).toFixed(1)} kW`;
  }
  return `${watts} W`;
};

// Enerji birimi formatlama (kWh)
export const formatEnergy = (kwh: number): string => {
  if (kwh >= 1000) {
    return `${(kwh / 1000).toFixed(1)} MWh`;
  }
  return `${kwh.toFixed(1)} kWh`;
};

// Alan formatlama
export const formatArea = (area: number): string => {
  return `${area.toFixed(1)} m²`;
};

// Hacim formatlama
export const formatVolume = (volume: number): string => {
  return `${volume.toFixed(1)} m³`;
};