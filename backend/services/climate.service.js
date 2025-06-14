import axios from 'axios';
import { CITY_COORDINATES } from '../config/cities.js';

export class ClimateService {
  static API_BASE_URL = 'https://api.open-meteo.com/v1';

  // Tarihsel iklim verilerini getir
  static async fetchHistoricalData(province, district) {
    try {
      const coordinates = CITY_COORDINATES[province] || { lat: 39.9334, lon: 32.8597 };
      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 5);
      
      const response = await axios.get(`${this.API_BASE_URL}/archive`, {
        params: {
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          daily: 'temperature_2m_max,relative_humidity_2m,soil_temperature_0cm,surface_pressure',
          timezone: 'Europe/Istanbul'
        }
      });

      return this.processHistoricalData(response.data);
    } catch (error) {
      console.error('İklim verileri alınamadı:', error);
      // Simüle edilmiş veri döndür
      return this.getSimulatedData(province);
    }
  }

  // Güncel hava durumu verilerini getir
  static async fetchCurrentWeather(province, district) {
    try {
      const coordinates = CITY_COORDINATES[province] || { lat: 39.9334, lon: 32.8597 };
      
      const response = await axios.get(`${this.API_BASE_URL}/forecast`, {
        params: {
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          current_weather: true,
          hourly: 'temperature_2m,relative_humidity_2m'
        }
      });

      return {
        temperature: response.data.current_weather.temperature,
        humidity: response.data.hourly.relative_humidity_2m[0],
        windSpeed: response.data.current_weather.windspeed,
        weatherCode: response.data.current_weather.weathercode
      };
    } catch (error) {
      console.error('Hava durumu verileri alınamadı:', error);
      // Simüle edilmiş veri
      return {
        temperature: 20 + Math.random() * 20,
        humidity: 40 + Math.random() * 40,
        windSpeed: Math.random() * 20,
        weatherCode: 0
      };
    }
  }

  // Tarihsel verileri işle
  static processHistoricalData(apiData) {
    const temperatures = apiData.daily.temperature_2m_max || [];
    const humidities = apiData.daily.relative_humidity_2m || [];
    const dates = apiData.daily.time || [];
    
    // En yüksek sıcaklığı bul
    let maxTemp = -100;
    let maxTempIndex = 0;
    
    temperatures.forEach((temp, index) => {
      if (temp > maxTemp) {
        maxTemp = temp;
        maxTempIndex = index;
      }
    });
    
    const maxTempHumidity = humidities[maxTempIndex] || 65;
    
    return {
      maxTemp: Math.round(maxTemp * 10) / 10,
      maxTempDate: dates[maxTempIndex],
      humidity: Math.round(maxTempHumidity),
      wetBulbTemp: this.calculateWetBulbTemp(maxTemp, maxTempHumidity),
      groundTemp: Math.round((apiData.daily.soil_temperature_0cm?.[maxTempIndex] || maxTemp * 0.85) * 10) / 10,
      pressure: Math.round(apiData.daily.surface_pressure?.[maxTempIndex] || 1013)
    };
  }

  // Yaş termometre sıcaklığı hesapla
  static calculateWetBulbTemp(temp, humidity) {
    const wetBulb = temp * Math.atan(0.151977 * Math.sqrt(humidity + 8.313659)) +
      Math.atan(temp + humidity) -
      Math.atan(humidity - 1.676331) +
      0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.023101 * humidity) -
      4.686035;
    
    return Math.round(wetBulb * 10) / 10;
  }

  // Simüle edilmiş veri
  static getSimulatedData(province) {
    const cityData = {
      Antalya: { maxTemp: 42.5, humidity: 70 },
      Ankara: { maxTemp: 38.5, humidity: 45 },
      İstanbul: { maxTemp: 37.8, humidity: 75 },
      İzmir: { maxTemp: 41.2, humidity: 65 },
      Erzurum: { maxTemp: 32.5, humidity: 55 },
      Trabzon: { maxTemp: 35.2, humidity: 80 },
    };
    
    const baseData = cityData[province] || { maxTemp: 38.0, humidity: 60 };
    
    return {
      maxTemp: baseData.maxTemp,
      maxTempDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5).toISOString().split('T')[0],
      humidity: baseData.humidity,
      wetBulbTemp: this.calculateWetBulbTemp(baseData.maxTemp, baseData.humidity),
      groundTemp: Math.round(baseData.maxTemp * 0.85 * 10) / 10,
      pressure: 1013 + Math.round(Math.random() * 10 - 5)
    };
  }
}