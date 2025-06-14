// Ürün kategorileri
export const PRODUCT_CATEGORIES = [
  "Balık ve Deniz Ürünleri",
  "Çiçekler",
  "Diğer",
  "Et",
  "İçecekler",
  "Meyveler",
  "Sebzeler",
  "Süt Ürünleri",
] as const;

// Kategori bazlı ürün listesi
export const PRODUCT_MAP: Record<string, string[]> = {
  İçecekler: [
    "Elma Suyu",
    "Bira",
    "Çikolatalı Süt",
    "Kola",
    "Turna Yemişi Suyu",
    "Zencefilli Gazoz",
    "Üzüm Suyu",
    "Limon Suyu",
    "Limonlu Soda",
    "Portakal Suyu",
    "Ananas Suyu",
    "Erik Suyu",
    "Kök Birası",
    "Domates Suyu",
  ],
  "Süt Ürünleri": [
    "Cheddar Peyniri",
    "Dondurma (Çikolatalı)",
    "Dondurma (Çilekli)",
    "Dondurma (Vanilyalı)",
    "Gouda Peyniri",
    "İsviçre Peyniri",
    "Krem Peynir",
    "Krema (Ağır Çırpılmış)",
    "Krema (Sofra)",
    "Krema (Yarım Yağlı)",
    "Lor Peyniri",
    "Mozzarella Peyniri",
    "Parmesan Peyniri",
    "Peynir Altı Suyu (Kurutulmuş)",
    "Rokfor Peyniri",
    "Süt (Buharlaştırılmış)",
    "Süt (Tam Yağlı)",
    "Süt (Yağsız)",
    "Tereyağı",
    "Yoğunlaştırılmış Süt",
    "Yumurta (Tam)",
    "Yumurta Beyazı",
    "Yumurta Beyazı(Kurutulmuş)",
    "Yumurta Sarısı",
  ],
  "Balık ve Deniz Ürünleri": [
    "Deniz Tarağı",
    "Istakoz",
    "İstiridye",
    "Karides",
    "Levrek",
    "Mezgit",
    "Mezgit Balığı",
    "Midye",
    "Morina Balığı",
    "Pisi Balığı",
    "Ringa Balığı",
    "Somon",
    "Ton Balığı",
    "Uskumru",
  ],
  Çiçekler: ["Kesme Çiçekler"],
  Meyveler: [
    "Avokado",
    "Böğürtlen",
    "Elma, Kurutulmuş",
    "Elma, Taze",
    "Frenk Üzümü",
    "Greyfurt",
    "Karpuz",
    "Kayısı",
    "Kiraz",
    "Limon",
    "Mandalina",
    "Muz",
    "Portakal",
    "Şeftali",
    "Üzüm",
  ],
  Sebzeler: [
    "Bezelye",
    "Biber",
    "Brokoli",
    "Domates",
    "Fasulye",
    "Havuç",
    "Ispanak",
    "Kabak",
    "Karnabahar",
    "Lahana",
    "Mantar",
    "Marul",
    "Mısır",
    "Pancar",
    "Patates",
    "Patlıcan",
    "Salatalık",
    "Sarımsak",
    "Soğan",
    "Yeşil Fasulye",
  ],
  Et: [
    "Biftek",
    "Dana Eti",
    "Domuz Eti",
    "Jambon",
    "Kuzu Eti",
    "Sosis",
    "Tavuk",
  ],
  Diğer: ["Özel Ürün"],
};

// Ürün sıcaklık ve nem gereksinimleri
export const PRODUCT_REQUIREMENTS: Record<
  string,
  { temperature: number; humidity: number }
> = {
  // Meyveler
  "Elma, Taze": { temperature: 0, humidity: 90 },
  Kiraz: { temperature: -1, humidity: 95 },
  Üzüm: { temperature: -1, humidity: 90 },
  Şeftali: { temperature: -0.5, humidity: 90 },
  Kayısı: { temperature: -0.5, humidity: 90 },
  
  // Sebzeler
  Domates: { temperature: 13, humidity: 90 },
  Patates: { temperature: 4, humidity: 90 },
  Havuç: { temperature: 0, humidity: 95 },
  Lahana: { temperature: 0, humidity: 95 },
  Marul: { temperature: 0, humidity: 95 },
  
  // Et ürünleri
  "Dana Eti": { temperature: -1, humidity: 85 },
  "Kuzu Eti": { temperature: -1, humidity: 85 },
  Tavuk: { temperature: -1, humidity: 85 },
  
  // Deniz ürünleri
  Somon: { temperature: -1, humidity: 95 },
  "Ton Balığı": { temperature: -1, humidity: 95 },
  Karides: { temperature: -1, humidity: 95 },
  
  // Süt ürünleri
  "Süt (Tam Yağlı)": { temperature: 4, humidity: 85 },
  "Cheddar Peyniri": { temperature: 4, humidity: 80 },
  Tereyağı: { temperature: 4, humidity: 80 },
};

// Ürün listesini getiren yardımcı fonksiyon
export const getProducts = (category: string): string[] => {
  return PRODUCT_MAP[category] || [];
};