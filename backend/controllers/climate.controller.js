import { ClimateService } from '../services/climate.service.js';

// İklim verilerini getir
export const getClimateData = async (req, res, next) => {
  try {
    const { province, district } = req.params;
    
    const climateData = await ClimateService.fetchHistoricalData(province, district);
    
    res.json({
      success: true,
      data: climateData,
      location: { province, district }
    });
  } catch (error) {
    next(error);
  }
};

// Güncel hava durumu
export const getCurrentWeather = async (req, res, next) => {
  try {
    const { province, district } = req.params;
    
    const weatherData = await ClimateService.fetchCurrentWeather(province, district);
    
    res.json({
      success: true,
      data: weatherData,
      location: { province, district },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};