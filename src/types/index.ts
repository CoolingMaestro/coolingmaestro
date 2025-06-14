// Temel tip tanımlamaları

export type BuildingLocation = "inside" | "outside";
export type CalculationType = "quick" | "detailed";
export type RoomShape = "rectangle" | "lshaped" | "custom";

// İklim verileri tipi
export interface ClimateData {
  maxTemp: number;
  maxTempDate: string;
  humidity: number;
  wetBulbTemp: number;
  groundTemp: number;
  pressure: number;
}

// Hava durumu verileri tipi
export interface WeatherData {
  temperature: number;
  humidity: number;
  lastUpdated: string;
}

// Hesaplama sonucu tipi
export interface CalculationResult {
  totalLoad: number;
  components: {
    walls: number;
    roof: number;
    floor: number;
    equipment: number;
    people: number;
    infiltration: number;
  };
  recommendations: string[];
}

// Duvar konfigürasyonu
export interface WallConfiguration {
  insulation: Record<string, string>;
  doors: Record<string, boolean>;
  windows: Record<string, boolean>;
}

// Form değerleri tipi
export interface FormValues {
  // Konum bilgileri
  province?: string;
  district?: string;
  buildingLocation?: BuildingLocation;
  
  // Depo bilgileri
  storageType?: string;
  targetTemperature?: number;
  targetHumidity?: number;
  
  // Oda boyutları
  roomShape?: RoomShape;
  length?: number;
  width?: number;
  height?: number;
  
  // Ürün bilgileri
  productCategory?: string;
  productType?: string;
  productQuantity?: number;
  
  // Ekipman bilgileri
  lightingCount?: number;
  forkliftCount?: number;
  personnelCount?: number;
  workIntensity?: string;
}

// Grafik veri tipi
export interface ChartData {
  name: string;
  value: number;
  percentage?: number;
}

// API yanıt tipleri
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Adım bilgisi tipi
export interface StepInfo {
  title: string;
  icon: string;
  description?: string;
}