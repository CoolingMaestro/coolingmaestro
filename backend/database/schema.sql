-- Projeler tablosu
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Konum bilgileri
  province VARCHAR(100),
  district VARCHAR(100),
  building_location VARCHAR(20),
  
  -- Depo bilgileri
  storage_type VARCHAR(50),
  target_temperature DECIMAL(5,2),
  target_humidity DECIMAL(5,2),
  
  -- Boyutlar
  room_shape VARCHAR(20),
  length DECIMAL(10,2),
  width DECIMAL(10,2),
  height DECIMAL(10,2),
  
  -- Hesaplama sonuçları
  total_load DECIMAL(15,2),
  calculation_result JSONB,
  
  -- Zaman damgaları
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hesaplama geçmişi tablosu
CREATE TABLE IF NOT EXISTS calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Giriş verileri
  input_data JSONB NOT NULL,
  
  -- Sonuçlar
  total_load DECIMAL(15,2),
  components JSONB,
  recommendations JSONB,
  cost_analysis JSONB,
  
  -- Meta bilgiler
  calculation_type VARCHAR(50),
  version VARCHAR(10) DEFAULT '1.0',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- İklim verisi önbelleği
CREATE TABLE IF NOT EXISTS climate_data_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  province VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  data_type VARCHAR(50) NOT NULL, -- 'historical' veya 'current'
  
  -- Veri
  data JSONB NOT NULL,
  
  -- Önbellek yönetimi
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Tekil indeks
  UNIQUE(province, district, data_type)
);

-- Kullanıcılar tablosu (opsiyonel)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  
  -- Auth bilgileri
  auth_id UUID UNIQUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Proje sahipliği (opsiyonel)
CREATE TABLE IF NOT EXISTS project_users (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'owner',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (project_id, user_id)
);

-- İndeksler
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_province ON projects(province);
CREATE INDEX idx_calculations_project_id ON calculations(project_id);
CREATE INDEX idx_calculations_created_at ON calculations(created_at DESC);
CREATE INDEX idx_climate_cache_expires ON climate_data_cache(expires_at);

-- RLS (Row Level Security) politikaları
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Herkesin okuyabilmesi için (demo amaçlı)
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON projects
  FOR INSERT WITH CHECK (true);

-- Güncelleme tetikleyicisi
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE
  ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();