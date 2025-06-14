# Cooling Maestro - Soğutma Yükü Hesaplama Uygulaması

Profesyonel soğuk hava depoları için gelişmiş soğutma yükü hesaplama ve analiz aracı.

## 🚀 Özellikler

- **Detaylı Soğutma Yükü Hesaplama**: ASHRAE standartlarına uygun hesaplama
- **İklim Verileri Entegrasyonu**: Türkiye'nin tüm illeri için gerçek iklim verileri
- **Çoklu Depo Tipi Desteği**: Soğuk muhafaza, donmuş muhafaza, dondurma ve ortam sıcaklığı
- **Ürün Bazlı Optimizasyon**: 100+ ürün için özel sıcaklık ve nem gereksinimleri
- **Maliyet Analizi**: Detaylı kurulum ve işletme maliyeti hesaplamaları
- **Enerji Verimliliği Önerileri**: Sistem optimizasyonu için özel tavsiyeler

## 🛠️ Teknoloji Yığını

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Ant Design UI Framework
- Tailwind CSS
- ECharts (Grafikler)
- Swiper (Carousel)

### Backend
- Node.js + Express
- RESTful API
- OpenMeteo API (İklim verileri)

## 📋 Gereksinimler

- Node.js 16+
- npm veya pnpm

## 🔧 Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/CoolingMaestro/CoolingMaestro.git
cd cooling-maestro
```

2. Frontend bağımlılıklarını kurun:
```bash
npm install
```

3. Backend bağımlılıklarını kurun:
```bash
cd backend
npm install
cd ..
```

4. Ortam değişkenlerini ayarlayın:
```bash
cp backend/.env.example backend/.env
```

## 🚀 Geliştirme

Frontend ve backend'i aynı anda başlatmak için:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend:dev
```

Frontend: http://localhost:3000
Backend API: http://localhost:5000

## 📦 Build

Prodüksiyon için build almak:

```bash
npm run build
```

## 🧪 Test

```bash
npm run test
```

## 📁 Proje Yapısı

```
cooling-maestro/
├── src/                    # Frontend kaynak kodları
│   ├── components/         # React bileşenleri
│   ├── services/          # API servisleri
│   ├── constants/         # Sabit değerler
│   ├── types/            # TypeScript tipleri
│   ├── utils/            # Yardımcı fonksiyonlar
│   └── App.tsx           # Ana uygulama bileşeni
├── backend/              # Backend API
│   ├── routes/           # API rotaları
│   ├── controllers/      # İstek kontrolörleri
│   ├── services/         # İş mantığı servisleri
│   ├── middleware/       # Express middleware'leri
│   └── server.js         # Express sunucu
├── public/               # Statik dosyalar
└── package.json          # Proje bağımlılıkları
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📧 İletişim

Cooling Maestro Team - info@coolingmaestro.com

Proje Linki: [https://github.com/CoolingMaestro/CoolingMaestro](https://github.com/CoolingMaestro/CoolingMaestro)