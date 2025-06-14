// Soğutma yükü hesaplama servisi

import { CalculationResult, FormValues } from '../types';
import { calculateTotalCoolingLoad } from '../utils/calculations';

export class CalculationService {
  /**
   * Form verilerini alıp detaylı hesaplama yapar
   */
  static calculate(formValues: FormValues): CalculationResult {
    // Temel hesaplama
    const result = calculateTotalCoolingLoad(formValues);
    
    // Ek hesaplamalar ve optimizasyonlar
    const optimizedResult = this.optimizeCalculation(result, formValues);
    
    return optimizedResult;
  }

  /**
   * Hesaplama sonuçlarını optimize eder
   */
  private static optimizeCalculation(
    result: CalculationResult,
    formValues: FormValues
  ): CalculationResult {
    // Güvenlik faktörü ekle (%10-15)
    const safetyFactor = 1.15;
    
    const optimizedResult = {
      ...result,
      totalLoad: Math.round(result.totalLoad * safetyFactor),
      components: {
        ...result.components,
        safety: Math.round(result.totalLoad * (safetyFactor - 1)),
      },
    };
    
    // Ek öneriler
    optimizedResult.recommendations = [
      ...result.recommendations,
      ...this.generateAdditionalRecommendations(optimizedResult, formValues),
    ];
    
    return optimizedResult;
  }

  /**
   * Ek öneriler oluşturur
   */
  private static generateAdditionalRecommendations(
    result: CalculationResult,
    formValues: FormValues
  ): string[] {
    const recommendations: string[] = [];
    
    // Büyük hacimli depolar için
    const volume = (formValues.length || 0) * (formValues.width || 0) * (formValues.height || 0);
    if (volume > 500) {
      recommendations.push('Büyük hacimli deponuz için çoklu evaporatör kullanımı önerilir.');
    }
    
    // Yüksek nem gereksinimleri için
    if (formValues.targetHumidity && formValues.targetHumidity > 85) {
      recommendations.push('Yüksek nem kontrolü için ultrasonik nemlendirici sistemi düşünülebilir.');
    }
    
    // Donmuş muhafaza için
    if (formValues.targetTemperature && formValues.targetTemperature < -10) {
      recommendations.push('Defrost sistemi için sıcak gazlı sistem tercih edilmelidir.');
    }
    
    return recommendations;
  }

  /**
   * Sistem kapasitesini hesaplar (TR - Ton Refrigeration)
   */
  static calculateSystemCapacity(totalLoad: number): number {
    // 1 TR = 3.517 kW = 3517 W
    const capacityInTR = totalLoad / 3517;
    return Math.ceil(capacityInTR * 10) / 10; // 0.1 TR hassasiyetinde yuvarla
  }

  /**
   * Aylık enerji tüketimini tahmin eder (kWh)
   */
  static estimateMonthlyEnergyConsumption(
    totalLoad: number,
    dailyOperatingHours: number = 16
  ): number {
    // COP (Coefficient of Performance) tahmini
    const estimatedCOP = 2.5; // Tipik değer
    
    // Elektrik gücü (kW)
    const electricPower = (totalLoad / 1000) / estimatedCOP;
    
    // Aylık tüketim (kWh)
    const monthlyConsumption = electricPower * dailyOperatingHours * 30;
    
    return Math.round(monthlyConsumption);
  }

  /**
   * Tahmini maliyetleri hesaplar
   */
  static estimateCosts(totalLoad: number): {
    equipmentCost: number;
    installationCost: number;
    monthlyOperatingCost: number;
  } {
    // Ekipman maliyeti tahmini (₺/W)
    const equipmentCostPerWatt = 15; // Örnek değer
    const equipmentCost = totalLoad * equipmentCostPerWatt;
    
    // Kurulum maliyeti (ekipman maliyetinin %30-40'ı)
    const installationCost = equipmentCost * 0.35;
    
    // Aylık işletme maliyeti
    const monthlyEnergy = this.estimateMonthlyEnergyConsumption(totalLoad);
    const electricityPrice = 2.5; // ₺/kWh (örnek)
    const monthlyOperatingCost = monthlyEnergy * electricityPrice;
    
    return {
      equipmentCost: Math.round(equipmentCost),
      installationCost: Math.round(installationCost),
      monthlyOperatingCost: Math.round(monthlyOperatingCost),
    };
  }

  /**
   * Karbon ayak izini hesaplar (kg CO2/yıl)
   */
  static calculateCarbonFootprint(totalLoad: number): number {
    const monthlyEnergy = this.estimateMonthlyEnergyConsumption(totalLoad);
    const yearlyEnergy = monthlyEnergy * 12;
    
    // Türkiye elektrik şebekesi karbon yoğunluğu (kg CO2/kWh)
    const carbonIntensity = 0.48; // Örnek değer
    
    const yearlyCarbon = yearlyEnergy * carbonIntensity;
    return Math.round(yearlyCarbon);
  }
}