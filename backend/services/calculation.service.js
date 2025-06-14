export class CalculationService {
  // Ana hesaplama fonksiyonu
  static async calculate(formData) {
    const {
      targetTemperature,
      ambientTemperature = 35,
      length,
      width,
      height,
      insulation = 'standard',
      productLoad = 0,
      personnelCount = 0,
      equipmentLoad = 0
    } = formData;

    // Alan ve hacim hesaplamaları
    const floorArea = length * width;
    const wallArea = 2 * (length + width) * height;
    const ceilingArea = floorArea;
    const volume = floorArea * height;

    // Sıcaklık farkı
    const temperatureDiff = ambientTemperature - targetTemperature;

    // Isı transfer katsayıları (W/m²K)
    const insulationCoefficients = {
      none: 5.0,
      standard: 0.35,
      good: 0.25,
      excellent: 0.18
    };
    const uValue = insulationCoefficients[insulation] || 0.35;

    // Yük bileşenleri hesaplama
    const wallLoad = wallArea * uValue * temperatureDiff;
    const roofLoad = ceilingArea * uValue * temperatureDiff;
    const floorLoad = floorArea * uValue * temperatureDiff * 0.7; // Zemin için azaltılmış faktör
    
    // Ürün yükü
    const productHeatLoad = productLoad * 3.5; // W/kg yaklaşık değer
    
    // Personel yükü (W/kişi)
    const personnelLoad = personnelCount * 300; // Orta iş yükü
    
    // Infiltrasyon yükü (%15)
    const infiltrationLoad = (wallLoad + roofLoad + floorLoad) * 0.15;
    
    // Toplam yük
    const totalLoad = wallLoad + roofLoad + floorLoad + productHeatLoad + 
                     personnelLoad + equipmentLoad + infiltrationLoad;

    return {
      totalLoad: Math.round(totalLoad),
      components: {
        walls: Math.round(wallLoad),
        roof: Math.round(roofLoad),
        floor: Math.round(floorLoad),
        product: Math.round(productHeatLoad),
        equipment: Math.round(equipmentLoad),
        people: Math.round(personnelLoad),
        infiltration: Math.round(infiltrationLoad)
      },
      details: {
        volume,
        floorArea,
        temperatureDiff,
        uValue
      },
      recommendations: this.generateRecommendations({
        totalLoad,
        volume,
        temperatureDiff,
        insulation,
        targetTemperature
      })
    };
  }

  // Maliyet tahmini
  static async estimateCosts(totalLoad, location = 'Türkiye') {
    // Ekipman maliyeti (₺/W)
    const equipmentCostPerWatt = 15;
    const equipmentCost = totalLoad * equipmentCostPerWatt;
    
    // Kurulum maliyeti (%35)
    const installationCost = equipmentCost * 0.35;
    
    // Elektrik tüketimi tahmini
    const cop = 2.5; // Ortalama COP
    const electricPower = totalLoad / 1000 / cop; // kW
    const dailyHours = 16; // Günlük ortalama çalışma
    const monthlyEnergy = electricPower * dailyHours * 30; // kWh
    const electricityPrice = 2.5; // ₺/kWh
    const monthlyOperatingCost = monthlyEnergy * electricityPrice;
    
    // Bakım maliyeti (yıllık ekipman maliyetinin %5'i)
    const yearlyMaintenanceCost = equipmentCost * 0.05;
    const monthlyMaintenanceCost = yearlyMaintenanceCost / 12;

    return {
      equipmentCost: Math.round(equipmentCost),
      installationCost: Math.round(installationCost),
      totalInitialCost: Math.round(equipmentCost + installationCost),
      monthlyOperatingCost: Math.round(monthlyOperatingCost),
      monthlyMaintenanceCost: Math.round(monthlyMaintenanceCost),
      totalMonthlyCost: Math.round(monthlyOperatingCost + monthlyMaintenanceCost),
      yearlyOperatingCost: Math.round((monthlyOperatingCost + monthlyMaintenanceCost) * 12),
      paybackPeriod: '2-3 yıl', // Tahmini
      energyConsumption: {
        monthly: Math.round(monthlyEnergy),
        yearly: Math.round(monthlyEnergy * 12)
      }
    };
  }

  // Sistem önerileri oluştur
  static generateRecommendations(systemData) {
    const recommendations = [];
    const { totalLoad, volume, temperatureDiff, insulation, targetTemperature } = systemData;

    // Yüksek yük durumu
    if (totalLoad > 50000) {
      recommendations.push({
        type: 'warning',
        title: 'Yüksek Soğutma Yükü',
        description: 'Sistem yükü yüksek. Enerji verimliliği için ek yalıtım düşünülmeli.',
        priority: 'high'
      });
    }

    // Yalıtım önerisi
    if (insulation === 'none' || insulation === 'standard') {
      recommendations.push({
        type: 'improvement',
        title: 'Yalıtım İyileştirmesi',
        description: 'Daha iyi yalıtım ile enerji tüketimi %20-30 azaltılabilir.',
        priority: 'medium'
      });
    }

    // Büyük hacim
    if (volume > 500) {
      recommendations.push({
        type: 'info',
        title: 'Çoklu Evaporatör',
        description: 'Büyük hacim için çoklu evaporatör sistemi daha verimli olabilir.',
        priority: 'medium'
      });
    }

    // Düşük sıcaklık
    if (targetTemperature < -18) {
      recommendations.push({
        type: 'technical',
        title: 'Cascade Sistem',
        description: 'Çok düşük sıcaklıklar için cascade soğutma sistemi önerilir.',
        priority: 'high'
      });
    }

    // Sıcaklık farkı
    if (temperatureDiff > 40) {
      recommendations.push({
        type: 'warning',
        title: 'Yüksek Sıcaklık Farkı',
        description: 'Hava kilidi ve hızlı kapı sistemleri enerji kaybını azaltabilir.',
        priority: 'medium'
      });
    }

    // Enerji verimliliği
    recommendations.push({
      type: 'efficiency',
      title: 'Enerji İzleme',
      description: 'Enerji izleme sistemi ile %10-15 tasarruf sağlanabilir.',
      priority: 'low'
    });

    // VFD önerisi
    recommendations.push({
      type: 'technical',
      title: 'Değişken Hızlı Sürücü',
      description: 'Kompresör ve fanlarda VFD kullanımı enerji tasarrufu sağlar.',
      priority: 'medium'
    });

    return recommendations;
  }
}