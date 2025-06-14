// İklim verileri API servisi

import { ClimateData, ApiResponse } from '../types';
import { calculateWetBulbTemperature } from '../utils/calculations';

// API base URL - gerçek uygulamada environment variable'dan alınmalı
const API_BASE_URL = 'https://api.open-meteo.com/v1';

// Türkiye şehir koordinatları (örnek)
const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  İstanbul: { lat: 41.0082, lon: 28.9784 },
  Ankara: { lat: 39.9334, lon: 32.8597 },
  İzmir: { lat: 38.4237, lon: 27.1428 },
  Bursa: { lat: 40.1826, lon: 29.0665 },
  Antalya: { lat: 36.8969, lon: 30.7133 },
  // Diğer şehirler eklenebilir
};

export class ClimateService {
  /**
   * Belirtilen konum için iklim verilerini getirir
   */
  static async getClimateData(
    province: string,
    district: string
  ): Promise<ApiResponse<ClimateData>> {
    try {
      // Koordinatları al (örnek implementasyon)
      const coordinates = CITY_COORDINATES[province] || { lat: 39.9334, lon: 32.8597 };
      
      // API çağrısı (OpenMeteo örneği)
      const response = await fetch(
        `${API_BASE_URL}/archive?` +
        `latitude=${coordinates.lat}&` +
        `longitude=${coordinates.lon}&` +
        `start_date=${this.getStartDate()}&` +
        `end_date=${this.getEndDate()}&` +
        `daily=temperature_2m_max,relative_humidity_2m,soil_temperature_0cm,surface_pressure&` +
        `timezone=Europe/Istanbul`
      );

      if (!response.ok) {
        throw new Error('İklim verileri alınamadı');
      }

      const data = await response.json();
      
      // Verileri işle ve maksimum değerleri bul
      const processedData = this.processClimateData(data);
      
      return {
        success: true,
        data: processedData,
      };
    } catch (error) {
      console.error('İklim verileri hatası:', error);
      
      // Hata durumunda simüle edilmiş veri döndür
      return {
        success: true,
        data: this.getSimulatedData(province),
        message: 'Simüle edilmiş veri kullanıldı',
      };
    }
  }

  /**
   * API verilerini işler ve gerekli formata dönüştürür
   */
  private static processClimateData(apiData: any): ClimateData {
    const temperatures = apiData.daily.temperature_2m_max || [];
    const humidities = apiData.daily.relative_humidity_2m || [];
    const dates = apiData.daily.time || [];
    
    // En yüksek sıcaklığı bul
    let maxTemp = -100;
    let maxTempIndex = 0;
    
    temperatures.forEach((temp: number, index: number) => {
      if (temp > maxTemp) {
        maxTemp = temp;
        maxTempIndex = index;
      }
    });
    
    const maxTempHumidity = humidities[maxTempIndex] || 65;
    
    return {
      maxTemp: Math.round(maxTemp * 10) / 10,
      maxTempDate: dates[maxTempIndex] || new Date().toISOString(),
      humidity: Math.round(maxTempHumidity),
      wetBulbTemp: calculateWetBulbTemperature(maxTemp, maxTempHumidity),
      groundTemp: Math.round((apiData.daily.soil_temperature_0cm?.[maxTempIndex] || maxTemp * 0.85) * 10) / 10,
      pressure: Math.round(apiData.daily.surface_pressure?.[maxTempIndex] || 1013),
    };
  }

  /**
   * Simüle edilmiş veri döndürür (API erişimi olmadığında)
   */
  private static getSimulatedData(province: string): ClimateData {
    // Şehre göre yaklaşık değerler
    const cityData: Record<string, Partial<ClimateData>> = {
      Antalya: { maxTemp: 42.5, humidity: 70 },
      Ankara: { maxTemp: 38.5, humidity: 45 },
      İstanbul: { maxTemp: 37.8, humidity: 75 },
      İzmir: { maxTemp: 41.2, humidity: 65 },
      Erzurum: { maxTemp: 32.5, humidity: 55 },
      Trabzon: { maxTemp: 35.2, humidity: 80 },
    };
    
    const baseData = cityData[province] || { maxTemp: 38.0, humidity: 60 };
    
    return {
      maxTemp: baseData.maxTemp!,
      maxTempDate: this.getRandomDateInLastFiveYears(),
      humidity: baseData.humidity!,
      wetBulbTemp: calculateWetBulbTemperature(baseData.maxTemp!, baseData.humidity!),
      groundTemp: Math.round(baseData.maxTemp! * 0.85 * 10) / 10,
      pressure: 1013 + Math.random() * 10 - 5, // 1008-1018 arası
    };
  }

  /**
   * Son 5 yıl içinde başlangıç tarihini döndürür
   */
  private static getStartDate(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 5);
    return date.toISOString().split('T')[0];
  }

  /**
   * Bugünün tarihini döndürür
   */
  private static getEndDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Son 5 yıl içinde rastgele bir tarih döndürür
   */
  private static getRandomDateInLastFiveYears(): string {
    const end = new Date();
    const start = new Date();
    start.setFullYear(start.getFullYear() - 5);
    
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  }

  /**
   * Anlık hava durumu verilerini getirir
   */
  static async getCurrentWeather(
    province: string,
    district: string
  ): Promise<ApiResponse<{ temperature: number; humidity: number }>> {
    try {
      const coordinates = CITY_COORDINATES[province] || { lat: 39.9334, lon: 32.8597 };
      
      const response = await fetch(
        `${API_BASE_URL}/forecast?` +
        `latitude=${coordinates.lat}&` +
        `longitude=${coordinates.lon}&` +
        `current_weather=true&` +
        `hourly=temperature_2m,relative_humidity_2m`
      );

      if (!response.ok) {
        throw new Error('Hava durumu verileri alınamadı');
      }

      const data = await response.json();
      
      return {
        success: true,
        data: {
          temperature: data.current_weather.temperature,
          humidity: data.hourly.relative_humidity_2m[0],
        },
      };
    } catch (error) {
      // Hata durumunda simüle edilmiş veri
      return {
        success: true,
        data: {
          temperature: 25 + Math.random() * 15,
          humidity: 50 + Math.random() * 30,
        },
        message: 'Simüle edilmiş veri kullanıldı',
      };
    }
  }
}