// Soğutma yükü hesaplama fonksiyonları

import { INSULATION_TYPES, DOOR_TYPES, EQUIPMENT_LOADS, PERSONNEL_HEAT_LOAD } from '../constants/storage';
import { CalculationResult, FormValues } from '../types';

// Duvar ısı yükü hesaplama
export const calculateWallHeatLoad = (
  area: number,
  insulation: string,
  temperatureDiff: number
): number => {
  const coefficient = INSULATION_TYPES[insulation as keyof typeof INSULATION_TYPES]?.coefficient || 0.35;
  return area * coefficient * temperatureDiff;
};

// Kapı ısı yükü hesaplama
export const calculateDoorHeatLoad = (
  doorType: string,
  count: number,
  temperatureDiff: number
): number => {
  const door = DOOR_TYPES[doorType as keyof typeof DOOR_TYPES] || DOOR_TYPES.standard;
  const area = door.defaultWidth * door.defaultHeight;
  return count * area * door.coefficient * temperatureDiff;
};

// Ekipman ısı yükü hesaplama
export const calculateEquipmentHeatLoad = (formValues: FormValues): number => {
  let totalLoad = 0;
  
  // Aydınlatma yükü
  if (formValues.lightingCount && formValues.length && formValues.width) {
    const area = formValues.length * formValues.width;
    totalLoad += area * EQUIPMENT_LOADS.lighting.wattPerSqm;
  }
  
  // Forklift yükü
  if (formValues.forkliftCount) {
    totalLoad += formValues.forkliftCount * EQUIPMENT_LOADS.forklift.wattPerUnit;
  }
  
  return totalLoad;
};

// Personel ısı yükü hesaplama
export const calculatePersonnelHeatLoad = (
  personnelCount: number,
  workIntensity: string
): number => {
  const intensity = PERSONNEL_HEAT_LOAD[workIntensity as keyof typeof PERSONNEL_HEAT_LOAD] || PERSONNEL_HEAT_LOAD.medium;
  return personnelCount * (intensity.sensibleHeat + intensity.latentHeat);
};

// Toplam soğutma yükü hesaplama
export const calculateTotalCoolingLoad = (formValues: FormValues): CalculationResult => {
  // Örnek hesaplama - gerçek uygulamada daha detaylı olmalı
  const temperatureDiff = 30 - (formValues.targetTemperature || 4);
  
  // Duvar alanları (basitleştirilmiş)
  const wallArea = 2 * (formValues.length || 10) * (formValues.height || 3) +
                   2 * (formValues.width || 8) * (formValues.height || 3);
  const roofArea = (formValues.length || 10) * (formValues.width || 8);
  const floorArea = roofArea;
  
  // Yük bileşenleri
  const wallLoad = calculateWallHeatLoad(wallArea, 'standard', temperatureDiff);
  const roofLoad = calculateWallHeatLoad(roofArea, 'good', temperatureDiff);
  const floorLoad = calculateWallHeatLoad(floorArea, 'standard', temperatureDiff * 0.5);
  const equipmentLoad = calculateEquipmentHeatLoad(formValues);
  const personnelLoad = calculatePersonnelHeatLoad(
    formValues.personnelCount || 2,
    formValues.workIntensity || 'medium'
  );
  const infiltrationLoad = (wallLoad + roofLoad + floorLoad) * 0.15; // %15 sızıntı
  
  const totalLoad = wallLoad + roofLoad + floorLoad + equipmentLoad + personnelLoad + infiltrationLoad;
  
  return {
    totalLoad: Math.round(totalLoad),
    components: {
      walls: Math.round(wallLoad),
      roof: Math.round(roofLoad),
      floor: Math.round(floorLoad),
      equipment: Math.round(equipmentLoad),
      people: Math.round(personnelLoad),
      infiltration: Math.round(infiltrationLoad),
    },
    recommendations: generateRecommendations(formValues, totalLoad),
  };
};

// Öneri oluşturma
const generateRecommendations = (formValues: FormValues, totalLoad: number): string[] => {
  const recommendations: string[] = [];
  
  if (totalLoad > 50000) {
    recommendations.push("Yüksek soğutma yükü tespit edildi. Enerji verimliliği için ek yalıtım önerilir.");
  }
  
  if (!formValues.storageType || formValues.storageType === 'frozen_storage') {
    recommendations.push("Donmuş muhafaza için hava perdeli kapı kullanımı enerji tasarrufu sağlayacaktır.");
  }
  
  if (formValues.personnelCount && formValues.personnelCount > 5) {
    recommendations.push("Yüksek personel sayısı nedeniyle havalandırma sisteminin güçlendirilmesi önerilir.");
  }
  
  recommendations.push("Düzenli bakım ve filtre temizliği ile sistem verimliliği %15'e kadar artırılabilir.");
  
  return recommendations;
};

// Yaş termometre sıcaklığı hesaplama
export const calculateWetBulbTemperature = (
  temperature: number,
  humidity: number
): number => {
  // Basitleştirilmiş formül
  const wetBulb = temperature * Math.atan(0.151977 * Math.sqrt(humidity + 8.313659)) +
    Math.atan(temperature + humidity) -
    Math.atan(humidity - 1.676331) +
    0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.023101 * humidity) -
    4.686035;
  
  return Math.round(wetBulb * 10) / 10;
};