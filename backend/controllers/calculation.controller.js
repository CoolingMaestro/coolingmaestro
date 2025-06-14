import { CalculationService } from '../services/calculation.service.js';

// Soğutma yükü hesaplama
export const calculateCoolingLoad = async (req, res, next) => {
  try {
    const calculationData = req.body;
    
    const result = await CalculationService.calculate(calculationData);
    
    res.json({
      success: true,
      data: result,
      calculatedAt: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// Maliyet tahmini
export const estimateCosts = async (req, res, next) => {
  try {
    const { totalLoad, location } = req.body;
    
    const costs = await CalculationService.estimateCosts(totalLoad, location);
    
    res.json({
      success: true,
      data: costs
    });
  } catch (error) {
    next(error);
  }
};

// Sistem önerileri
export const getRecommendations = async (req, res, next) => {
  try {
    const systemData = req.body;
    
    const recommendations = await CalculationService.generateRecommendations(systemData);
    
    res.json({
      success: true,
      data: {
        recommendations,
        count: recommendations.length
      }
    });
  } catch (error) {
    next(error);
  }
};