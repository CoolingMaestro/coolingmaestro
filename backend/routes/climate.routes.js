import express from 'express';
import { getClimateData, getCurrentWeather } from '../controllers/climate.controller.js';
import { validateClimateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

// İklim verilerini getir (son 5 yıl)
router.get('/historical/:province/:district', validateClimateRequest, getClimateData);

// Güncel hava durumu
router.get('/current/:province/:district', validateClimateRequest, getCurrentWeather);

export default router;