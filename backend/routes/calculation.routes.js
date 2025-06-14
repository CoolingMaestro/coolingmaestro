import express from 'express';
import { 
  calculateCoolingLoad, 
  estimateCosts,
  getRecommendations 
} from '../controllers/calculation.controller.js';
import { validateCalculationRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

// Soğutma yükü hesaplama
router.post('/cooling-load', validateCalculationRequest, calculateCoolingLoad);

// Maliyet tahmini
router.post('/cost-estimate', validateCalculationRequest, estimateCosts);

// Sistem önerileri
router.post('/recommendations', validateCalculationRequest, getRecommendations);

export default router;