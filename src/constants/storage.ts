// Depo tipleri ve özellikleri
export const STORAGE_TYPES = {
  cold_storage: {
    name: "Soğuk Muhafaza",
    temperatureRange: "0°C ile +4°C arası",
    defaultTemperature: 4,
    defaultHumidity: 90,
    icon: "snowflake",
  },
  frozen_storage: {
    name: "Donmuş Muhafaza",
    temperatureRange: "-18°C ile -25°C arası",
    defaultTemperature: -18,
    defaultHumidity: 90,
    icon: "icicles",
  },
  freezing_storage: {
    name: "Dondurma",
    temperatureRange: "-35°C ile -40°C arası",
    defaultTemperature: -35,
    defaultHumidity: 90,
    icon: "temperature-low",
  },
  ambient_storage: {
    name: "Ortam Sıcaklığı",
    temperatureRange: "+10°C ile +25°C arası",
    defaultTemperature: 18,
    defaultHumidity: 60,
    icon: "home",
  },
} as const;

// Yalıtım tipleri
export const INSULATION_TYPES = {
  none: {
    name: "Yalıtımsız",
    coefficient: 5.0,
  },
  standard: {
    name: "Standart Yalıtım",
    coefficient: 0.35,
  },
  good: {
    name: "İyi Yalıtım",
    coefficient: 0.25,
  },
  excellent: {
    name: "Mükemmel Yalıtım",
    coefficient: 0.18,
  },
} as const;

// Duvar tipleri (oda şekline göre)
export const WALL_TYPES = {
  rectangle: ["Duvar 1", "Duvar 2", "Duvar 3", "Duvar 4", "Tavan", "Zemin"],
  lshaped: [
    "Duvar 1",
    "Duvar 2",
    "Duvar 3",
    "Duvar 4",
    "Duvar 5",
    "Duvar 6",
    "Tavan",
    "Zemin",
  ],
  custom: [], // Kullanıcı tanımlı
} as const;

// Kapı tipleri ve ısı katsayıları
export const DOOR_TYPES = {
  standard: {
    name: "Standart Kapı",
    coefficient: 2.0,
    defaultWidth: 1.2,
    defaultHeight: 2.2,
  },
  insulated: {
    name: "Yalıtımlı Kapı",
    coefficient: 0.5,
    defaultWidth: 1.2,
    defaultHeight: 2.2,
  },
  airCurtain: {
    name: "Hava Perdeli Kapı",
    coefficient: 0.3,
    defaultWidth: 1.5,
    defaultHeight: 2.5,
  },
} as const;

// Ekipman yük değerleri (W)
export const EQUIPMENT_LOADS = {
  lighting: {
    name: "Aydınlatma",
    wattPerSqm: 10,
  },
  forklift: {
    name: "Forklift",
    wattPerUnit: 3000,
  },
  conveyor: {
    name: "Konveyör",
    wattPerMeter: 100,
  },
  fan: {
    name: "Fan",
    wattPerUnit: 500,
  },
} as const;

// Personel ısı yükü (W/kişi)
export const PERSONNEL_HEAT_LOAD = {
  light: {
    name: "Hafif İş",
    sensibleHeat: 100,
    latentHeat: 100,
  },
  medium: {
    name: "Orta İş",
    sensibleHeat: 150,
    latentHeat: 150,
  },
  heavy: {
    name: "Ağır İş",
    sensibleHeat: 200,
    latentHeat: 200,
  },
} as const;