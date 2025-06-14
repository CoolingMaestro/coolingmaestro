// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import {
  Card,
  Radio,
  Select,
  Input,
  Button,
  Modal,
  Tabs,
  Form,
  InputNumber,
  Breadcrumb,
  Typography,
  Checkbox,
  Divider,
  Steps,
  Table
} from 'antd';
import {
  HomeOutlined,
  CalculatorOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  EnvironmentOutlined,
  BuildOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const swiperModules = [Pagination, Autoplay];

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [buildingLocation, setBuildingLocation] = useState<'inside' | 'outside'>('inside');
  const [selectedCalculationType, setSelectedCalculationType] = useState<'quick' | 'detailed' | null>(null);
  const [storageType, setStorageType] = useState<string>('');
  const [showCalculationForm, setShowCalculationForm] = useState<boolean>(false);
  const [roomType, setRoomType] = useState<string>('rectangle');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [productList, setProductList] = useState<any[]>([]);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCalculate = () => {
    // Simulate calculation
    const result = {
      totalLoad: 25000,
      components: {
        walls: 8000,
        roof: 5000,
        floor: 3000,
        equipment: 4000,
        people: 2000,
        infiltration: 3000
      },
      recommendations: [
        'Duvar yalıtımının artırılması önerilir',
        'Hava sızdırmazlık önlemleri alınmalı',
        'Enerji verimli ekipman kullanımı tavsiye edilir'
      ]
    };
    setCalculationResult(result);
    setCurrentStep(5); // Move to results step
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<{temperature: number; humidity: number; lastUpdated: string} | null>(null);
  const [climateData, setClimateData] = useState<{
    maxTemp: number;
    maxTempDate: string;
    humidity: number;
    wetBulbTemp: number;
    groundTemp: number;
    pressure: number;
  } | null>(null);
  const [wallInsulation, setWallInsulation] = useState<{[key: string]: string}>({
    wall1: 'standard',
    wall2: 'standard',
    wall3: 'standard',
    wall4: 'standard',
    wall5: 'standard',
    wall6: 'standard'
  });
  const [wallDoors, setWallDoors] = useState<{[key: string]: boolean}>({
    wall1: false,
    wall2: false,
    wall3: false,
    wall4: false,
    wall5: false,
    wall6: false
  });

  // Türkiye illeri
  const provinces = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
    'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
    'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
    'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
    'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
    'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
    'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye',
    'Düzce'
  ];

  // Ürün kategorileri
  const productCategories = [
    'Balık ve Deniz Ürünleri',
    'Çiçekler',
    'Diğer',
    'Et',
    'İçecekler',
    'Meyveler',
    'Sebzeler',
    'Süt Ürünleri'
  ];

  // Kategori bazlı ürünler
  const getProducts = (category: string) => {
    const productMap: {[key: string]: string[]} = {
      'İçecekler': ['Elma Suyu', 'Bira', 'Çikolatalı Süt', 'Kola', 'Turna Yemişi Suyu', 'Zencefilli Gazoz', 'Üzüm Suyu', 'Limon Suyu', 'Limonlu Soda', 'Portakal Suyu', 'Ananas Suyu', 'Erik Suyu', 'Kök Birası', 'Domates Suyu'],
      'Süt Ürünleri': ['Cheddar Peyniri', 'Dondurma (Çikolatalı)', 'Dondurma (Çilekli)', 'Dondurma (Vanilyalı)', 'Gouda Peyniri', 'İsviçre Peyniri', 'Krem Peynir', 'Krema (Ağır Çırpılmış)', 'Krema (Sofra)', 'Krema (Yarım Yağlı)', 'Lor Peyniri', 'Mozzarella Peyniri', 'Parmesan Peyniri', 'Peynir Altı Suyu (Kurutulmuş)', 'Rokfor Peyniri', 'Süt (Buharlaştırılmış)', 'Süt (Tam Yağlı)', 'Süt (Yağsız)', 'Tereyağı', 'Yoğunlaştırılmış Süt', 'Yumurta (Tam)', 'Yumurta Beyazı', 'Yumurta Beyazı(Kurutulmuş)', 'Yumurta Sarısı'],
      'Balık ve Deniz Ürünleri': ['Deniz Tarağı', 'Istakoz', 'İstiridye', 'Karides', 'Levrek', 'Mezgit', 'Mezgit Balığı', 'Midye', 'Morina Balığı', 'Pisi Balığı', 'Ringa Balığı', 'Somon', 'Ton Balığı', 'Uskumru'],
      'Çiçekler': ['Kesme Çiçekler'],
      'Meyveler': ['Avokado', 'Böğürtlen', 'Elma, Kurutulmuş', 'Elma, Taze', 'Frenk Üzümü', 'Greyfurt', 'Hurma', 'İncir, Kurutulmuş', 'İncir, Taze', 'Kayısı', 'Kiraz, Ekşi', 'Kiraz, Tatlı', 'Muz, Yeşil', 'Turna Yemişi', 'Üzüm', 'Yaban Mersini'],
      'Et': ['Dana Eti', 'Kuzu Eti', 'Tavuk Eti', 'Hindi Eti', 'Domuz Eti', 'Av Eti'],
      'Diğer': ['Çikolata', 'Dondurma', 'İlaç', 'Kimyasal Ürünler', 'Elektronik Parçalar'],
      'Sebzeler': ['Domates', 'Salatalık', 'Biber', 'Patlıcan', 'Kabak', 'Havuç', 'Patates', 'Soğan', 'Sarımsak']
    };
    return productMap[category] || [];
  };

  // İl bazlı ilçeler (örnek olarak)
  const getDistricts = (province: string) => {
    const districtMap: {[key: string]: string[]} = {
      'İstanbul': ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüp', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'],
      'Ankara': ['Akyurt', 'Altındağ', 'Ayaş', 'Balâ', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kalecik', 'Kazan', 'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle'],
      'İzmir': ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla'],
    };
    // Diğer iller için rastgele ilçeler
    if (!districtMap[province]) {
      return ['Merkez', 'İlçe 1', 'İlçe 2', 'İlçe 3', 'İlçe 4'];
    }
    return districtMap[province];
  };

  // Hava durumu verilerini getirme simülasyonu
  const fetchClimateData = async () => {
    if (!selectedProvince || !selectedDistrict) return;
    setLoading(true);
    try {
      // Get coordinates for the selected location (you'll need to implement this)
      const coordinates = await getCoordinates(selectedProvince, selectedDistrict);
      // OpenMeteo API call
      const response = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.lat}&longitude=${coordinates.lng}&start_date=2020-01-01&end_date=2025-06-13&daily=temperature_2m_max,relativehumidity_2m_max,pressure_msl,soil_temperature_0cm&timezone=Europe/Istanbul`
      );
      if (!response.ok) throw new Error('API call failed');
      const data = await response.json();
      // Process the data to find the highest temperature
      const maxTempIndex = data.daily.temperature_2m_max.indexOf(
        Math.max(...data.daily.temperature_2m_max)
      );
      setClimateData({
        maxTemp: data.daily.temperature_2m_max[maxTempIndex],
        maxTempDate: data.daily.time[maxTempIndex],
        humidity: data.daily.relativehumidity_2m_max[maxTempIndex],
        wetBulbTemp: calculateWetBulbTemp(
          data.daily.temperature_2m_max[maxTempIndex],
          data.daily.relativehumidity_2m_max[maxTempIndex]
        ),
        groundTemp: data.daily.soil_temperature_0cm[maxTempIndex],
        pressure: data.daily.pressure_msl[maxTempIndex]
      });
    } catch (error) {
      console.error('Error fetching climate data:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const getCoordinates = async (province: string, district: string) => {
    // This is a simplified version. You should implement proper geocoding
    const coordinates: {[key: string]: { lat: number; lng: number }} = {
      'İstanbul': { lat: 41.0082, lng: 28.9784 },
      'Ankara': { lat: 39.9334, lng: 32.8597 },
      'İzmir': { lat: 38.4237, lng: 27.1428 },
      // Add more cities as needed
    };
    return coordinates[province] || { lat: 41.0082, lng: 28.9784 }; // Default to Istanbul
  };

  const calculateWetBulbTemp = (dryBulbTemp: number, relativeHumidity: number) => {
    // This is a simplified calculation of wet bulb temperature
    // For more accurate results, you should use a proper psychrometric formula
    const wetBulbTemp = dryBulbTemp * Math.atan(0.151977 * Math.pow(relativeHumidity + 8.313659, 0.5)) +
      Math.atan(dryBulbTemp + relativeHumidity) -
      Math.atan(relativeHumidity - 1.676331) +
      0.00391838 * Math.pow(relativeHumidity, 1.5) * Math.atan(0.023101 * relativeHumidity) -
      4.686035;
    return Number(wetBulbTemp.toFixed(1));
  };

  const fetchWeatherData = () => {
    // Simulated function to fetch weather data
    // In a real application, you would make an API call here
  };

  useEffect(() => {
    if (selectedProvince && selectedDistrict && buildingLocation === 'outside') {
      fetchWeatherData();
    }
  }, [selectedProvince, selectedDistrict, buildingLocation]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    // Burada oda boyutları kaydedilecek
    setIsModalVisible(false);
  };

  const handleWallInsulationChange = (wall: string, value: string) => {
    setWallInsulation(prev => ({
      ...prev,
      [wall]: value
    }));
  };

  const handleWallDoorChange = (wall: string, checked: boolean) => {
    setWallDoors(prev => ({
      ...prev,
      [wall]: checked
    }));
  };

  // 3D oda görselleştirmesi için echarts
  useEffect(() => {
    if (isModalVisible) {
      const chartDom = document.getElementById('room3dVisualization');
      if (!chartDom) return;
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {},
        backgroundColor: '#f5f5f5',
        visualMap: {
          show: false,
          dimension: 2,
          min: 0,
          max: 30,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          type: 'value',
          name: 'Genişlik (m)',
          min: 0,
          max: roomType === 'rectangle' ? 10 : 15
        },
        yAxis3D: {
          type: 'value',
          name: 'Uzunluk (m)',
          min: 0,
          max: roomType === 'rectangle' ? 10 : 15
        },
        zAxis3D: {
          type: 'value',
          name: 'Yükseklik (m)',
          min: 0,
          max: 5
        },
        grid3D: {
          viewControl: {
            projection: 'orthographic',
            autoRotate: true,
            autoRotateSpeed: 5,
            distance: 100
          },
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: 'surface',
            wireframe: {
              show: true
            },
            shading: 'color',
            itemStyle: {
              color: '#1890ff'
            },
            data: generateRoomData()
          }
        ]
      };
      myChart.setOption(option);
      return () => {
        myChart.dispose();
      };
    }
  }, [isModalVisible, roomType]);

  // Oda veri noktalarını oluşturma
  const generateRoomData = () => {
    const data: number[][] = [];
    if (roomType === 'rectangle') {
      // Dikdörtgen oda için basit veri
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (i === 0 || i === 9 || j === 0 || j === 9) {
            data.push([i, j, 3]);
          }
        }
      }
    } else if (roomType === 'L') {
      // L şeklinde oda
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if ((i < 10 && j < 5) || (i < 5 && j < 10)) {
            if (i === 0 || i === 9 || j === 0 || j === 9 || i === 4 || j === 4) {
              data.push([i, j, 3]);
            }
          }
        }
      }
    } else if (roomType === 'T') {
      // T şeklinde oda
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if ((i < 10 && j > 4 && j < 10) || (i > 4 && i < 15 && j > 2 && j < 7)) {
            if (i === 5 || i === 14 || j === 3 || j === 6 || j === 5 || j === 9) {
              data.push([i, j, 3]);
            }
          }
        }
      }
    }
    return data;
  };

  // Ürün ekleme fonksiyonu
  const handleAddProduct = () => {
    if (!selectedCategory || !selectedProduct) return;

    const entryTemp = form.getFieldValue('productEntryTemperature');
    const dailyAmount = form.getFieldValue('dailyProductAmount');
    const totalCapacity = form.getFieldValue('totalStorageCapacity');
    const coolingDuration = form.getFieldValue('coolingDuration');

    if (!entryTemp || !dailyAmount || !totalCapacity || !coolingDuration) {
      return;
    }

    const newProduct = {
      key: Date.now().toString(),
      category: selectedCategory,
      product: selectedProduct,
      entryTemperature: entryTemp,
      dailyAmount,
      totalCapacity,
      coolingDuration
    };

    setProductList([...productList, newProduct]);

    // Form alanlarını temizle
    form.setFieldsValue({
      productEntryTemperature: null,
      dailyProductAmount: null,
      totalStorageCapacity: null,
      coolingDuration: null
    });

    setSelectedCategory('');
    setSelectedProduct('');
  };

  // Ürün silme fonksiyonu
  const handleRemoveProduct = (key: string) => {
    setProductList(productList.filter(item => item.key !== key));
  };

  // Ürün tablosu sütunları
  const productColumns = [
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ürün',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Giriş Sıcaklığı (°C)',
      dataIndex: 'entryTemperature',
      key: 'entryTemperature',
    },
    {
      title: 'Günlük Miktar (kg)',
      dataIndex: 'dailyAmount',
      key: 'dailyAmount',
    },
    {
      title: 'Toplam Kapasite (kg)',
      dataIndex: 'totalCapacity',
      key: 'totalCapacity',
    },
    {
      title: 'Soğutma Süresi (saat)',
      dataIndex: 'coolingDuration',
      key: 'coolingDuration',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (text: string, record: any) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleRemoveProduct(record.key)}
          className="!rounded-button whitespace-nowrap"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20professional%2C%20sleek%2C%20modern%20logo%20for%20Cooling%20Maestro%2C%20featuring%20a%20stylized%20snowflake%20or%20cooling%20symbol%20with%20blue%20gradient%20colors.%20The%20logo%20should%20be%20minimalist%2C%20corporate%2C%20and%20suitable%20for%20an%20industrial%20cooling%20calculation%20software.%20Clean%20background%2C%20high%20contrast.&width=80&height=80&seq=1&orientation=squarish"
                  alt="Cooling Maestro Logo"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cooling Maestro</h1>
                <p className="text-blue-100">Endüstriyel Soğutma Çözümleri</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
                <i className="fas fa-home mr-1"></i> Ana Sayfa
              </Button>
              <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
                <i className="fas fa-calculator mr-1"></i> Hesaplamalar
              </Button>
              <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
                <i className="fas fa-book mr-1"></i> Kılavuz
              </Button>
              <Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
                <i className="fas fa-question-circle mr-1"></i> Yardım
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <Breadcrumb.Item href="#">
              <HomeOutlined /> Ana Sayfa
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <CalculatorOutlined /> Hesaplama Formu
            </Breadcrumb.Item>
          </Breadcrumb>
          <Title level={2} className="mt-4 text-gray-800">
            Endüstriyel Soğutma Yükü Hesaplama Formu
          </Title>
          <Text className="text-gray-600 block mb-4">
            Lütfen hesaplama tipini seçiniz.
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hızlı Hesaplama Kartı */}
            <div className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg
              ${selectedCalculationType === 'quick' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => {
                setSelectedCalculationType('quick');
                setShowCalculationForm(true);
              }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-bolt text-xl text-blue-600"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Hızlı Hesaplama</h3>
                  <p className="text-sm text-gray-600">5 dakika içinde sonuç alın</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Temel parametrelerle hızlı hesaplama</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Yaklaşık değerler</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Ön fizibilite için ideal</span>
                </li>
              </ul>
            </div>

            {/* Detaylı Hesaplama Kartı */}
            <div className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg
              ${selectedCalculationType === 'detailed' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => {
                setSelectedCalculationType('detailed');
                setShowCalculationForm(true);
              }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-clipboard-list text-xl text-blue-600"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Detaylı Hesaplama</h3>
                  <p className="text-sm text-gray-600">Hassas sonuçlar için detaylı analiz</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Kapsamlı parametre girişi</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Yüksek hassasiyetli sonuçlar</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Profesyonel projeler için uygun</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Removed continue button section */}
        </div>

        {showCalculationForm && selectedCalculationType === 'detailed' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <Steps current={currentStep} onChange={handleStepChange} className="custom-steps">
                <Steps.Step title="Lokasyon" description="Konum ve iklim bilgileri" icon={<i className="fas fa-map-marker-alt text-blue-600"></i>} />
                <Steps.Step title="Depo & Ürün" description="Depo ve ürün bilgileri" icon={<i className="fas fa-box text-blue-600"></i>} />
                <Steps.Step title="Isı Geçişi" description="Duvar ve yüzeylerden ısı geçişi" icon={<i className="fas fa-temperature-high text-blue-600"></i>} />
                <Steps.Step title="İç Yükler" description="Ekipman ve insan kaynaklı yükler" icon={<i className="fas fa-lightbulb text-blue-600"></i>} />
                <Steps.Step title="Hava Sızıntısı" description="Hava değişimi ve sızıntı" icon={<i className="fas fa-wind text-blue-600"></i>} />
                <Steps.Step title="Sonuç" description="Toplam soğutma yükü" icon={<i className="fas fa-chart-bar text-blue-600"></i>} />
              </Steps>
            </div>

            {/* Konum Bilgileri Kartı */}
            {currentStep === 0 && (
              <Card
                title={
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mr-2 text-blue-600" />
                    <span>Konum Bilgileri</span>
                  </div>
                }
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
                headStyle={{ backgroundColor: '#f0f7ff', borderBottom: '1px solid #d6e8ff' }}
              >
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label="İl" name="province" required>
                      <Select
                        placeholder="İl seçiniz"
                        showSearch
                        onChange={(value) => {
                          setSelectedProvince(value);
                          setSelectedDistrict('');
                          form.setFieldsValue({ district: undefined });
                        }}
                        filterOption={(input, option) =>
                          (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        className="w-full"
                      >
                        {provinces.map(province => (
                          <Option key={province} value={province}>{province}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="İlçe" name="district" required>
                      <Select
                        placeholder="İlçe seçiniz"
                        showSearch
                        disabled={!selectedProvince}
                        onChange={(value) => setSelectedDistrict(value)}
                        filterOption={(input, option) =>
                          (option?.children as unknown as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        className="w-full"
                      >
                        {selectedProvince &&
                          getDistricts(selectedProvince).map(district => (
                            <Option key={district} value={district}>{district}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button
                      type="primary"
                      icon={<i className="fas fa-cloud-sun mr-2"></i>}
                      onClick={fetchClimateData}
                      loading={loading}
                      disabled={!selectedProvince || !selectedDistrict}
                      className="!rounded-button whitespace-nowrap"
                    >
                      İklim Verilerini Getir
                    </Button>
                  </div>

                  {climateData && (
                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                        <i className="fas fa-history mr-2"></i>
                        Son 5 Yıl İçerisindeki İklim Verileri
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-600">En Yüksek Sıcaklık</div>
                            <i className="fas fa-temperature-high text-red-500"></i>
                          </div>
                          <div className="text-2xl font-bold text-blue-700">{climateData.maxTemp}°C</div>
                          <div className="text-xs text-gray-500 mt-2">
                            {new Date(climateData.maxTempDate).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-600">Bağıl Nem</div>
                            <i className="fas fa-tint text-blue-500"></i>
                          </div>
                          <div className="text-2xl font-bold text-blue-700">{climateData.humidity}%</div>
                          <div className="text-xs text-gray-500 mt-2">Maksimum sıcaklık anındaki değer</div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-600">Yaş Termometre Sıcaklığı</div>
                            <i className="fas fa-thermometer-half text-green-500"></i>
                          </div>
                          <div className="text-2xl font-bold text-blue-700">{climateData.wetBulbTemp}°C</div>
                          <div className="text-xs text-gray-500 mt-2">Hesaplanan değer</div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-600">Zemin Sıcaklığı</div>
                            <i className="fas fa-layer-group text-orange-500"></i>
                          </div>
                          <div className="text-2xl font-bold text-blue-700">{climateData.groundTemp}°C</div>
                          <div className="text-xs text-gray-500 mt-2">0 cm derinlikte</div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-gray-600">Basınç</div>
                            <i className="fas fa-compress-alt text-purple-500"></i>
                          </div>
                          <div className="text-2xl font-bold text-blue-700">{climateData.pressure} hPa</div>
                          <div className="text-xs text-gray-500 mt-2">Deniz seviyesinde</div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-gray-500 flex items-center">
                        <i className="fas fa-info-circle mr-1"></i>
                        Veriler OpenMeteo API'den alınmıştır
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            <Form
              form={form}
              layout="vertical"
              className="space-y-8"
            >
              {/* Mekan Boyutları Kartı */}
              {currentStep === 1 && (
                <>
                  <Card
                    title={
                      <div className="flex items-center">
                        <i className="fas fa-warehouse mr-2 text-blue-600"></i>
                        <span>Depo Tipi</span>
                      </div>
                    }
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    headStyle={{ backgroundColor: '#f0f7ff', borderBottom: '1px solid #d6e8ff' }}
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div onClick={() => {
                          form.setFieldsValue({
                            storageType: 'cold_storage',
                            targetTemperature: 4,
                            targetHumidity: 90
                          });
                        }} className="cursor-pointer">
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${form.getFieldValue('storageType') === 'cold_storage' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-snowflake text-2xl text-blue-600"></i>
                              <div>
                                <h3 className="font-medium text-gray-900">Soğuk Muhafaza</h3>
                                <p className="text-sm text-gray-500">0°C ile +4°C arası</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div onClick={() => {
                          form.setFieldsValue({
                            storageType: 'frozen_storage',
                            targetTemperature: -18,
                            targetHumidity: 85
                          });
                        }} className="cursor-pointer">
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${form.getFieldValue('storageType') === 'frozen_storage' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-icicles text-2xl text-blue-600"></i>
                              <div>
                                <h3 className="font-medium text-gray-900">Dondurulmuş Depo</h3>
                                <p className="text-sm text-gray-500">-18°C ile -25°C arası</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div onClick={() => {
                          form.setFieldsValue({
                            storageType: 'blast_freezing',
                            targetTemperature: -35,
                            targetHumidity: null
                          });
                        }} className="cursor-pointer">
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${form.getFieldValue('storageType') === 'blast_freezing' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-wind text-2xl text-blue-600"></i>
                              <div>
                                <h3 className="font-medium text-gray-900">Şok Dondurma</h3>
                                <p className="text-sm text-gray-500">-30°C ile -40°C arası</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div onClick={() => {
                          form.setFieldsValue({
                            storageType: 'pre_cooling',
                            targetTemperature: 6,
                            targetHumidity: 90
                          });
                        }} className="cursor-pointer">
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${form.getFieldValue('storageType') === 'pre_cooling' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-temperature-low text-2xl text-blue-600"></i>
                              <div>
                                <h3 className="font-medium text-gray-900">Ön Soğutma</h3>
                                <p className="text-sm text-gray-500">+2°C ile +8°C arası</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div onClick={() => {
                          form.setFieldsValue({
                            storageType: 'controlled_atmosphere',
                            targetTemperature: 0,
                            targetHumidity: 92
                          });
                        }} className="cursor-pointer">
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${form.getFieldValue('storageType') === 'controlled_atmosphere' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-cloud text-2xl text-blue-600"></i>
                              <div>
                                <h3 className="font-medium text-gray-900">Kontrollü Atmosfer</h3>
                                <p className="text-sm text-gray-500">Özel atmosfer koşulları</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div onClick={() => {
                          form.setFieldsValue({
                            storageType: 'medical_storage',
                            targetTemperature: 4,
                            targetHumidity: 40
                          });
                        }} className="cursor-pointer">
                          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${form.getFieldValue('storageType') === 'medical_storage' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                            <div className="flex items-center space-x-3">
                              <i className="fas fa-prescription-bottle-alt text-2xl text-blue-600"></i>
                              <div>
                                <h3 className="font-medium text-gray-900">İlaç/Medikal</h3>
                                <p className="text-sm text-gray-500">+2°C ile +8°C arası</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Form.Item name="storageType" hidden>
                        <Input />
                      </Form.Item>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-thermometer-half text-blue-600 mr-2"></i>
                            Hedeflenen Sıcaklık
                          </h4>
                          <Form.Item
                            name="targetTemperature"
                            rules={[{ required: true, message: 'Lütfen hedeflenen sıcaklığı giriniz' }]}
                          >
                            <InputNumber
                              min={-40}
                              max={30}
                              className="w-full"
                              addonAfter="°C"
                              placeholder="Hedeflenen sıcaklığı giriniz"
                            />
                          </Form.Item>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-tint text-blue-600 mr-2"></i>
                            Hedeflenen Nem
                          </h4>
                          <Form.Item
                            name="targetHumidity"
                            rules={[{ required: true, message: 'Lütfen hedeflenen nem oranını giriniz' }]}
                          >
                            <InputNumber
                              min={0}
                              max={100}
                              className="w-full"
                              addonAfter="%"
                              placeholder="Hedeflenen nem oranını giriniz"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Ürün Bilgileri Kartı */}
                  <Card
                    title={
                      <div className="flex items-center">
                        <i className="fas fa-box-open mr-2 text-blue-600"></i>
                        <span>Ürün Bilgileri</span>
                      </div>
                    }
                    className="shadow-md hover:shadow-lg transition-shadow duration-300 mt-6"
                    headStyle={{ backgroundColor: '#f0f7ff', borderBottom: '1px solid #d6e8ff' }}
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                          label="Ürün Kategorisi"
                          name="productCategory"
                          rules={[{ required: true, message: 'Lütfen ürün kategorisi seçiniz' }]}
                        >
                          <Select
                            placeholder="Kategori seçiniz"
                            onChange={(value) => {
                              setSelectedCategory(value);
                              setSelectedProduct('');
                              form.setFieldsValue({ product: undefined });
                            }}
                            className="w-full"
                            value={selectedCategory}
                          >
                            {productCategories.map(category => (
                              <Option key={category} value={category}>{category}</Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label="Ürün"
                          name="product"
                          rules={[{ required: true, message: 'Lütfen ürün seçiniz' }]}
                        >
                          <Select
                            placeholder="Ürün seçiniz"
                            disabled={!selectedCategory}
                            onChange={(value) => setSelectedProduct(value)}
                            className="w-full"
                            value={selectedProduct}
                          >
                            {selectedCategory &&
                              getProducts(selectedCategory).map(product => (
                                <Option key={product} value={product}>{product}</Option>
                              ))
                            }
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Form.Item
                          label="Ürün Giriş Sıcaklığı (°C)"
                          name="productEntryTemperature"
                          rules={[{ required: true, message: 'Lütfen ürün giriş sıcaklığını giriniz' }]}
                        >
                          <InputNumber
                            min={-40}
                            max={50}
                            className="w-full"
                            addonAfter="°C"
                            placeholder="Giriş sıcaklığı"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Günlük Ürün Miktarı (kg)"
                          name="dailyProductAmount"
                          rules={[{ required: true, message: 'Lütfen günlük ürün miktarını giriniz' }]}
                        >
                          <InputNumber
                            min={0}
                            className="w-full"
                            addonAfter="kg"
                            placeholder="Günlük miktar"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Toplam Depolama Kapasitesi (kg)"
                          name="totalStorageCapacity"
                          rules={[{ required: true, message: 'Lütfen toplam depolama kapasitesini giriniz' }]}
                        >
                          <InputNumber
                            min={0}
                            className="w-full"
                            addonAfter="kg"
                            placeholder="Toplam kapasite"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Soğutma Süresi"
                          name="coolingDuration"
                          rules={[{ required: true, message: 'Lütfen soğutma süresini giriniz' }]}
                        >
                          <InputNumber
                            min={1}
                            max={168}
                            className="w-full"
                            addonAfter="saat"
                            placeholder="Soğutma süresini giriniz"
                          />
                        </Form.Item>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="primary" 
                          icon={<PlusOutlined />} 
                          onClick={handleAddProduct}
                          className="!rounded-button whitespace-nowrap"
                        >
                          Ürün Ekle
                        </Button>
                      </div>

                      {productList.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-list text-blue-600 mr-2"></i>
                            Eklenen Ürünler
                          </h4>
                          <Table 
                            dataSource={productList} 
                            columns={productColumns} 
                            pagination={false}
                            className="border border-gray-200 rounded-lg"
                            size="middle"
                          />
                        </div>
                      )}

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <i className="fas fa-info-circle text-blue-600 mt-1 mr-3"></i>
                          <div>
                            <h4 className="font-medium text-blue-800 mb-1">Ürün Bilgileri Hakkında</h4>
                            <p className="text-sm text-blue-700">
                              Seçilen ürünün özellikleri, soğutma yükü hesaplamasında önemli bir faktördür. Ürünün giriş sıcaklığı, miktarı ve depolama süresi, toplam soğutma kapasitesi ihtiyacını doğrudan etkiler.
                            </p>
                          </div>
                        </div>
                      </div>

                      {selectedProduct && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                            <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                            Ürün Özellikleri
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <i className="fas fa-thermometer-half text-blue-600"></i>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Önerilen Depolama Sıcaklığı</div>
                                <div className="font-medium">
                                  {selectedCategory === 'Meyveler' ? '0°C ile +4°C' :
                                    selectedCategory === 'Sebzeler' ? '+2°C ile +8°C' :
                                      selectedCategory === 'Et' ? '-18°C ile -22°C' :
                                        selectedCategory === 'Balık ve Deniz Ürünleri' ? '-20°C ile -25°C' :
                                          selectedCategory === 'Süt Ürünleri' ? '+2°C ile +6°C' :
                                            selectedCategory === 'İçecekler' ? '+4°C ile +8°C' :
                                              selectedCategory === 'Çiçekler' ? '+2°C ile +8°C' : '+2°C ile +8°C'}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <i className="fas fa-tint text-blue-600"></i>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Önerilen Nem Oranı</div>
                                <div className="font-medium">
                                  {selectedCategory === 'Meyveler' ? '%85 - %95' :
                                    selectedCategory === 'Sebzeler' ? '%90 - %95' :
                                      selectedCategory === 'Et' ? '%85 - %90' :
                                        selectedCategory === 'Balık ve Deniz Ürünleri' ? '%90 - %95' :
                                          selectedCategory === 'Süt Ürünleri' ? '%80 - %85' :
                                            selectedCategory === 'İçecekler' ? '%70 - %75' :
                                              selectedCategory === 'Çiçekler' ? '%85 - %90' : '%70 - %80'}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <i className="fas fa-clock text-blue-600"></i>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Tahmini Depolama Süresi</div>
                                <div className="font-medium">
                                  {selectedCategory === 'Meyveler' ? '2 - 4 hafta' :
                                    selectedCategory === 'Sebzeler' ? '1 - 3 hafta' :
                                      selectedCategory === 'Et' ? '6 - 12 ay' :
                                        selectedCategory === 'Balık ve Deniz Ürünleri' ? '3 - 8 ay' :
                                          selectedCategory === 'Süt Ürünleri' ? '1 - 6 ay' :
                                            selectedCategory === 'İçecekler' ? '6 - 12 ay' :
                                              selectedCategory === 'Çiçekler' ? '1 - 2 hafta' : '3 - 6 ay'}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <i className="fas fa-weight-hanging text-blue-600"></i>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Özgül Isı Değeri</div>
                                <div className="font-medium">
                                  {selectedCategory === 'Meyveler' ? '3.8 kJ/kg·K' :
                                    selectedCategory === 'Sebzeler' ? '3.9 kJ/kg·K' :
                                      selectedCategory === 'Et' ? '2.8 kJ/kg·K' :
                                        selectedCategory === 'Balık ve Deniz Ürünleri' ? '3.2 kJ/kg·K' :
                                          selectedCategory === 'Süt Ürünleri' ? '3.0 kJ/kg·K' :
                                            selectedCategory === 'İçecekler' ? '4.2 kJ/kg·K' :
                                              selectedCategory === 'Çiçekler' ? '3.7 kJ/kg·K' : '3.5 kJ/kg·K'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </>
              )}

              {currentStep === 2 && (
                <Card
                  title={
                    <div className="flex items-center">
                      <BuildOutlined className="mr-2 text-blue-600" />
                      <span>Mekan Boyutları</span>
                    </div>
                  }
                  className="shadow-md hover:shadow-lg transition-shadow duration-300"
                  headStyle={{ backgroundColor: '#f0f7ff', borderBottom: '1px solid #d6e8ff' }}
                >
                  <div className="space-y-6">
                    {/* Odanın Yerleşimi */}
                    <Form.Item
                      label="Odanın Yerleşimi"
                      name="buildingLocation"
                      initialValue="inside"
                    >
                      <Radio.Group
                        onChange={(e) => setBuildingLocation(e.target.value)}
                        value={buildingLocation}
                        className="flex flex-wrap gap-4"
                      >
                        <Radio.Button value="inside" className="!rounded-button whitespace-nowrap px-4 py-2 flex items-center">
                          <i className="fas fa-building mr-2"></i> Bina İçinde (İklimlendirilmiş Ortam)
                        </Radio.Button>
                        <Radio.Button value="outside" className="!rounded-button whitespace-nowrap px-4 py-2 flex items-center">
                          <i className="fas fa-cloud-sun mr-2"></i> Bina Dışında (Dış Hava ile Temaslı)
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    {/* Oda Tipi */}
                    <Form.Item
                      label="Oda Tipi"
                      name="roomType"
                      required
                      initialValue="rectangle"
                    >
                      <Select
                        onChange={(value) => setRoomType(value)}
                        className="w-full md:w-1/2"
                      >
                        <Option value="rectangle">Dikdörtgen Oda</Option>
                        <Option value="L">L Oda</Option>
                        <Option value="T">T Oda</Option>
                        <Option value="U">U Oda</Option>
                      </Select>
                    </Form.Item>

                    {/* Oda Boyutları Butonu */}
                    <div className="flex justify-center">
                      <Button
                        type="primary"
                        size="large"
                        icon={<i className="fas fa-ruler-combined mr-2"></i>}
                        onClick={showModal}
                        className="!rounded-button whitespace-nowrap"
                      >
                        Oda Boyutlarını Ayarla
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {currentStep === 4 && (
                <div className="flex justify-center mt-8">
                  <Button
                    type="primary"
                    size="large"
                    icon={<i className="fas fa-calculator mr-2"></i>}
                    onClick={handleCalculate}
                    className="!rounded-button whitespace-nowrap"
                  >
                    Hesaplamayı Başlat
                  </Button>
                </div>
              )}

              {currentStep === 5 && calculationResult && (
                <Card
                  title={
                    <div className="flex items-center">
                      <i className="fas fa-chart-pie mr-2 text-blue-600"></i>
                      <span>Hesaplama Sonuçları</span>
                    </div>
                  }
                  className="shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-blue-700">
                        Toplam Soğutma Yükü: {calculationResult.totalLoad.toLocaleString()} W
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(calculationResult.components).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-blue-700 capitalize">
                            {key} Yükü
                          </h4>
                          <p className="text-2xl font-bold text-blue-900">{value.toLocaleString()} W</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-blue-700 mb-3">Öneriler</h4>
                      <ul className="space-y-2">
                        {calculationResult.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {currentStep < 5 && (
                <div className="flex justify-center gap-4 mt-8">
                  <Button
                    size="large"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="!rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-arrow-left mr-2"></i> Geri
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="!rounded-button whitespace-nowrap"
                  >
                    Devam Et <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </div>
              )}
            </Form>
          </div>
        )}

        {/* Oda Boyutları Modal */}
        <Modal
          title={
            <div className="flex items-center text-blue-700">
              <i className="fas fa-cube mr-2"></i>
              <span>Oda Boyutları ve 3D Görünüm</span>
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer={null}
          className="room-dimensions-modal"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
                <i className="fas fa-ruler mr-2 text-blue-600"></i>
                Oda Ölçüleri
              </h3>

              {roomType === 'rectangle' && (
                <div className="space-y-4">
                  <Form.Item label="Oda Genişliği (m)" required>
                    <InputNumber min={1} max={50} defaultValue={5} addonAfter="m" className="w-full" />
                  </Form.Item>
                  <Form.Item label="Oda Uzunluğu (m)" required>
                    <InputNumber min={1} max={50} defaultValue={8} addonAfter="m" className="w-full" />
                  </Form.Item>
                  <Form.Item label="Oda Yüksekliği (m)" required>
                    <InputNumber min={1} max={20} defaultValue={3} addonAfter="m" className="w-full" />
                  </Form.Item>

                  <Divider orientation="left">Duvar Özellikleri</Divider>

                  {/* Duvar 1 */}
                  <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                    <h4 className="font-medium text-blue-700 mb-2">Duvar 1 (Ön)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                        <Select
                          className="w-full"
                          value={wallInsulation.wall1}
                          onChange={(value) => handleWallInsulationChange('wall1', value)}
                        >
                          <Option value="none">Yalıtımsız</Option>
                          <Option value="basic">Temel Yalıtım</Option>
                          <Option value="standard">Standart Yalıtım</Option>
                          <Option value="high">Yüksek Performanslı</Option>
                        </Select>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          checked={wallDoors.wall1}
                          onChange={(e) => handleWallDoorChange('wall1', e.target.checked)}
                        >
                          Kapı Ekle
                        </Checkbox>
                        {wallDoors.wall1 && (
                          <Select
                            className="ml-2"
                            defaultValue="standard"
                            style={{ width: 140 }}
                          >
                            <Option value="standard">Standart Kapı</Option>
                            <Option value="insulated">Yalıtımlı Kapı</Option>
                            <Option value="industrial">Endüstriyel Kapı</Option>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Duvar 2 */}
                  <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                    <h4 className="font-medium text-blue-700 mb-2">Duvar 2 (Sağ)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                        <Select
                          className="w-full"
                          value={wallInsulation.wall2}
                          onChange={(value) => handleWallInsulationChange('wall2', value)}
                        >
                          <Option value="none">Yalıtımsız</Option>
                          <Option value="basic">Temel Yalıtım</Option>
                          <Option value="standard">Standart Yalıtım</Option>
                          <Option value="high">Yüksek Performanslı</Option>
                        </Select>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          checked={wallDoors.wall2}
                          onChange={(e) => handleWallDoorChange('wall2', e.target.checked)}
                        >
                          Kapı Ekle
                        </Checkbox>
                        {wallDoors.wall2 && (
                          <Select
                            className="ml-2"
                            defaultValue="standard"
                            style={{ width: 140 }}
                          >
                            <Option value="standard">Standart Kapı</Option>
                            <Option value="insulated">Yalıtımlı Kapı</Option>
                            <Option value="industrial">Endüstriyel Kapı</Option>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Duvar 3 */}
                  <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                    <h4 className="font-medium text-blue-700 mb-2">Duvar 3 (Arka)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                        <Select
                          className="w-full"
                          value={wallInsulation.wall3}
                          onChange={(value) => handleWallInsulationChange('wall3', value)}
                        >
                          <Option value="none">Yalıtımsız</Option>
                          <Option value="basic">Temel Yalıtım</Option>
                          <Option value="standard">Standart Yalıtım</Option>
                          <Option value="high">Yüksek Performanslı</Option>
                        </Select>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          checked={wallDoors.wall3}
                          onChange={(e) => handleWallDoorChange('wall3', e.target.checked)}
                        >
                          Kapı Ekle
                        </Checkbox>
                        {wallDoors.wall3 && (
                          <Select
                            className="ml-2"
                            defaultValue="standard"
                            style={{ width: 140 }}
                          >
                            <Option value="standard">Standart Kapı</Option>
                            <Option value="insulated">Yalıtımlı Kapı</Option>
                            <Option value="industrial">Endüstriyel Kapı</Option>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Duvar 4 */}
                  <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-700 mb-2">Duvar 4 (Sol)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                        <Select
                          className="w-full"
                          value={wallInsulation.wall4}
                          onChange={(value) => handleWallInsulationChange('wall4', value)}
                        >
                          <Option value="none">Yalıtımsız</Option>
                          <Option value="basic">Temel Yalıtım</Option>
                          <Option value="standard">Standart Yalıtım</Option>
                          <Option value="high">Yüksek Performanslı</Option>
                        </Select>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          checked={wallDoors.wall4}
                          onChange={(e) => handleWallDoorChange('wall4', e.target.checked)}
                        >
                          Kapı Ekle
                        </Checkbox>
                        {wallDoors.wall4 && (
                          <Select
                            className="ml-2"
                            defaultValue="standard"
                            style={{ width: 140 }}
                          >
                            <Option value="standard">Standart Kapı</Option>
                            <Option value="insulated">Yalıtımlı Kapı</Option>
                            <Option value="industrial">Endüstriyel Kapı</Option>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {roomType === 'L' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <Text className="text-blue-700">L şeklindeki oda için iki ayrı bölümün ölçülerini giriniz.</Text>
                  </div>

                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Ana Bölüm" key="1">
                      <Form.Item label="Genişlik (m)" required>
                        <InputNumber min={1} max={50} defaultValue={6} addonAfter="m" className="w-full" />
                      </Form.Item>
                      <Form.Item label="Uzunluk (m)" required>
                        <InputNumber min={1} max={50} defaultValue={8} addonAfter="m" className="w-full" />
                      </Form.Item>

                      <Divider orientation="left">Duvar Özellikleri</Divider>

                      {/* Duvar 1 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 1</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall1}
                              onChange={(value) => handleWallInsulationChange('wall1', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall1}
                              onChange={(e) => handleWallDoorChange('wall1', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall1 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Duvar 2 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 2</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall2}
                              onChange={(value) => handleWallInsulationChange('wall2', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall2}
                              onChange={(e) => handleWallDoorChange('wall2', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall2 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabPane>

                    <TabPane tab="L Bölümü" key="2">
                      <Form.Item label="Genişlik (m)" required>
                        <InputNumber min={1} max={50} defaultValue={4} addonAfter="m" className="w-full" />
                      </Form.Item>
                      <Form.Item label="Uzunluk (m)" required>
                        <InputNumber min={1} max={50} defaultValue={5} addonAfter="m" className="w-full" />
                      </Form.Item>

                      <Divider orientation="left">Duvar Özellikleri</Divider>

                      {/* Duvar 3 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 3</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall3}
                              onChange={(value) => handleWallInsulationChange('wall3', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall3}
                              onChange={(e) => handleWallDoorChange('wall3', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall3 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Duvar 4 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 4</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall4}
                              onChange={(value) => handleWallInsulationChange('wall4', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall4}
                              onChange={(e) => handleWallDoorChange('wall4', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall4 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>

                  <Form.Item label="Oda Yüksekliği (m)" required>
                    <InputNumber min={1} max={20} defaultValue={3} addonAfter="m" className="w-full" />
                  </Form.Item>
                </div>
              )}

              {roomType === 'T' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <Text className="text-blue-700">T şeklindeki oda için iki ayrı bölümün ölçülerini giriniz.</Text>
                  </div>

                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Ana Bölüm" key="1">
                      <Form.Item label="Genişlik (m)" required>
                        <InputNumber min={1} max={50} defaultValue={8} addonAfter="m" className="w-full" />
                      </Form.Item>
                      <Form.Item label="Uzunluk (m)" required>
                        <InputNumber min={1} max={50} defaultValue={5} addonAfter="m" className="w-full" />
                      </Form.Item>

                      <Divider orientation="left">Duvar Özellikleri</Divider>

                      {/* Duvar 1 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 1</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall1}
                              onChange={(value) => handleWallInsulationChange('wall1', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall1}
                              onChange={(e) => handleWallDoorChange('wall1', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall1 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Duvar 2 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 2</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall2}
                              onChange={(value) => handleWallInsulationChange('wall2', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall2}
                              onChange={(e) => handleWallDoorChange('wall2', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall2 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabPane>

                    <TabPane tab="T Bölümü" key="2">
                      <Form.Item label="Genişlik (m)" required>
                        <InputNumber min={1} max={50} defaultValue={4} addonAfter="m" className="w-full" />
                      </Form.Item>
                      <Form.Item label="Uzunluk (m)" required>
                        <InputNumber min={1} max={50} defaultValue={6} addonAfter="m" className="w-full" />
                      </Form.Item>

                      <Divider orientation="left">Duvar Özellikleri</Divider>

                      {/* Duvar 5 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50 mb-3">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 5</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall5}
                              onChange={(value) => handleWallInsulationChange('wall5', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall5}
                              onChange={(e) => handleWallDoorChange('wall5', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall5 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Duvar 6 */}
                      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
                        <h4 className="font-medium text-blue-700 mb-2">Duvar 6</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">İzolasyon Tipi</label>
                            <Select
                              className="w-full"
                              value={wallInsulation.wall6}
                              onChange={(value) => handleWallInsulationChange('wall6', value)}
                            >
                              <Option value="none">Yalıtımsız</Option>
                              <Option value="basic">Temel Yalıtım</Option>
                              <Option value="standard">Standart Yalıtım</Option>
                              <Option value="high">Yüksek Performanslı</Option>
                            </Select>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              checked={wallDoors.wall6}
                              onChange={(e) => handleWallDoorChange('wall6', e.target.checked)}
                            >
                              Kapı Ekle
                            </Checkbox>
                            {wallDoors.wall6 && (
                              <Select
                                className="ml-2"
                                defaultValue="standard"
                                style={{ width: 140 }}
                              >
                                <Option value="standard">Standart Kapı</Option>
                                <Option value="insulated">Yalıtımlı Kapı</Option>
                                <Option value="industrial">Endüstriyel Kapı</Option>
                              </Select>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>

                  <Form.Item label="Oda Yüksekliği (m)" required>
                    <InputNumber min={1} max={20} defaultValue={3} addonAfter="m" className="w-full" />
                  </Form.Item>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  onClick={handleCancel}
                  icon={<ArrowLeftOutlined />}
                  className="!rounded-button whitespace-nowrap"
                >
                  İptal
                </Button>
                <Button
                  type="primary"
                  onClick={handleSave}
                  icon={<SaveOutlined />}
                  className="!rounded-button whitespace-nowrap"
                >
                  Kaydet ve Kapat
                </Button>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-700 text-white py-2 px-4 flex items-center">
                <i className="fas fa-cube mr-2"></i>
                <span>3D Oda Görünümü</span>
              </div>
              <div className="p-2">
                <div
                  id="room3dVisualization"
                  className="w-full h-80 bg-white border border-gray-200 rounded"
                ></div>
                <div className="flex justify-center mt-4 space-x-2">
                  <Button size="small" className="!rounded-button whitespace-nowrap">
                    <i className="fas fa-sync-alt mr-1"></i> Döndür
                  </Button>
                  <Button size="small" className="!rounded-button whitespace-nowrap">
                    <i className="fas fa-search-plus mr-1"></i> Yakınlaştır
                  </Button>
                  <Button size="small" className="!rounded-button whitespace-nowrap">
                    <i className="fas fa-search-minus mr-1"></i> Uzaklaştır
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-3 text-center">
                  Fare ile sürükleyerek modeli döndürebilirsiniz
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Cooling Maestro</h3>
              <p className="text-gray-400 text-sm">
                Endüstriyel soğutma çözümleri için profesyonel hesaplama araçları sunan lider platform.
              </p>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Ana Sayfa</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Hesaplamalar</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Kullanıcı Kılavuzu</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">SSS</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">İletişim</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hesaplama Araçları</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Soğutma Yükü Hesabı</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Enerji Verimliliği</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Ekipman Seçimi</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Maliyet Analizi</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Kapasite Planlama</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                  <span>Soğutma Vadisi, No:123<br />Ankara, Türkiye</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <span>+90 (312) 123 4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>info@coolingmaestro.com</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center space-x-2">
                <i className="fab fa-cc-visa text-2xl"></i>
                <i className="fab fa-cc-mastercard text-2xl"></i>
                <i className="fab fa-cc-paypal text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Cooling Maestro. Tüm hakları saklıdır.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 text-sm hover:text-white mr-4 transition-colors cursor-pointer">Gizlilik Politikası</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white mr-4 transition-colors cursor-pointer">Kullanım Şartları</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
