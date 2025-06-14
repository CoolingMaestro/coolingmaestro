import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Route imports
import climateRoutes from './routes/climate.routes.js';
import calculationRoutes from './routes/calculation.routes.js';
import projectRoutes from './routes/project.routes.js';

// Ortam değişkenlerini yükle
dotenv.config();

// Express uygulamasını oluştur
const app = express();
const PORT = process.env.PORT || 5000;

// Güvenlik middleware'leri
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına maksimum 100 istek
});
app.use('/api/', limiter);

// Genel middleware'ler
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// API rotaları
app.use('/api/climate', climateRoutes);
app.use('/api/calculation', calculationRoutes);
app.use('/api/projects', projectRoutes);

// Sağlık kontrolü endpoint'i
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 hatası
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint bulunamadı',
    path: req.originalUrl 
  });
});

// Genel hata yakalayıcı
app.use((err, req, res, next) => {
  console.error('Hata:', err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Sunucu hatası';
  
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🌍 Ortam: ${process.env.NODE_ENV || 'development'}`);
});