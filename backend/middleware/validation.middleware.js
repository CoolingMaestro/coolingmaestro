import Joi from 'joi';

// İklim isteği doğrulama
export const validateClimateRequest = (req, res, next) => {
  const schema = Joi.object({
    province: Joi.string().required().min(2).max(50),
    district: Joi.string().required().min(2).max(50)
  });

  const { error } = schema.validate(req.params);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz istek parametreleri',
      details: error.details[0].message
    });
  }
  
  next();
};

// Hesaplama isteği doğrulama
export const validateCalculationRequest = (req, res, next) => {
  const schema = Joi.object({
    // Konum bilgileri
    province: Joi.string().optional(),
    district: Joi.string().optional(),
    buildingLocation: Joi.string().valid('inside', 'outside').optional(),
    
    // Sıcaklık bilgileri
    targetTemperature: Joi.number().min(-40).max(25).required(),
    targetHumidity: Joi.number().min(30).max(100).optional(),
    ambientTemperature: Joi.number().optional(),
    
    // Boyutlar
    length: Joi.number().min(1).max(1000).required(),
    width: Joi.number().min(1).max(1000).required(),
    height: Joi.number().min(2).max(50).required(),
    
    // Yalıtım
    insulation: Joi.string().valid('none', 'standard', 'good', 'excellent').optional(),
    
    // Yükler
    productLoad: Joi.number().min(0).optional(),
    personnelCount: Joi.number().min(0).integer().optional(),
    equipmentLoad: Joi.number().min(0).optional(),
    
    // Diğer
    storageType: Joi.string().optional(),
    roomShape: Joi.string().valid('rectangle', 'lshaped', 'custom').optional()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz hesaplama verileri',
      details: error.details[0].message
    });
  }
  
  next();
};

// Genel hata yakalama middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Hata:', err);

  // Joi doğrulama hatası
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: 'Doğrulama hatası',
      details: err.details[0].message
    });
  }

  // Axios hatası
  if (err.isAxiosError) {
    return res.status(err.response?.status || 500).json({
      success: false,
      error: 'Dış servis hatası',
      message: err.message
    });
  }

  // Genel hata
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};