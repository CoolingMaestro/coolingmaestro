import React, { useState, useEffect } from 'react';
import styles from './WelcomeScreen.module.css';
import {
Button,
Card,
Collapse,
Form,
Input,
Select,
Typography,
Carousel,
Divider,
Row,
Col,
Tag,
Tooltip
} from 'antd';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
interface WelcomeScreenProps {
  onStartCalculation?: () => void;
  onLogin?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartCalculation, onLogin }) => {
const [form] = Form.useForm();
// Örnek demo hesaplama formu için state
const [volume, setVolume] = useState<number>(100);
const [externalTemp, setExternalTemp] = useState<number>(35);
const [productType, setProductType] = useState<string>("meyve");
const [showDemoResult, setShowDemoResult] = useState<boolean>(false);
// Sektör referansları için state
const sectors = [
{ name: "Gıda", icon: styles.iconAppleAlt },
{ name: "Lojistik", icon: styles.iconTruck },
{ name: "Et", icon: styles.iconDrumstickBite },
{ name: "Süt", icon: styles.iconCheese },
{ name: "İlaç", icon: styles.iconPills }
];
// Müşteri referansları
const customers = [
{ name: "Soğutma A.Ş.", sector: "Gıda", quote: "Cooling Maestro ile hesaplamalarımız %40 daha hızlı ve doğru." },
{ name: "Lojistik Depo", sector: "Lojistik", quote: "Artık her müşteri için yeniden hesaplama yapmak zorunda kalmıyoruz." },
{ name: "Süt Ürünleri", sector: "Süt", quote: "Enerji tasarrufu sağlayan hesaplamalar sayesinde maliyetlerimizi düşürdük." },
{ name: "Pharma Soğuk", sector: "İlaç", quote: "Hassas ilaç depolama gereksinimlerimiz için mükemmel çözüm." }
];
// Demo hesaplama sonucu
const calculateDemo = () => {
setShowDemoResult(true);
};
// Özellikler grafiği
useEffect(() => {
const chartDom = document.getElementById('featuresChart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
radar: {
indicator: [
{ name: 'Hesaplama Hızı', max: 100 },
{ name: 'Doğruluk', max: 100 },
{ name: 'Kullanım Kolaylığı', max: 100 },
{ name: 'Özelleştirme', max: 100 },
{ name: 'Raporlama', max: 100 }
]
},
series: [{
type: 'radar',
data: [
{
value: [95, 90, 85, 80, 92],
name: 'Cooling Maestro',
areaStyle: {
color: 'rgba(59, 130, 246, 0.6)'
},
lineStyle: {
color: '#1d4ed8'
}
},
{
value: [60, 70, 50, 40, 55],
name: 'Geleneksel Yöntemler',
areaStyle: {
color: 'rgba(156, 163, 175, 0.5)'
},
lineStyle: {
color: '#6b7280'
}
}
]
}]
};
myChart.setOption(option);
return () => {
myChart.dispose();
};
}
}, []);
return (
<div className={`${styles.welcomeScreen} min-h-screen bg-white`}>
{/* Header / Navigation */}
<header className={`${styles.welcomeHeader} py-4`}>
<div className="container mx-auto px-4">
<div className="flex items-center justify-between">
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=A%2520professional%2520sleek%2520modern%2520logo%2520for%2520Cooling%2520Maestro%2520featuring%2520a%2520stylized%2520snowflake%2520or%2520cooling%2520symbol%2520with%2520blue%2520gradient%2520colors.%2520The%2520logo%2520should%2520be%2520minimalist%2520corporate%2520and%2520suitable%2520for%2520an%2520industrial%2520cooling%2520calculation%2520software.%2520Clean%2520background%2520high%2520contrast.&width=60&height=60&seq=1&orientation=squarish"
alt="Cooling Maestro Logo"
className="h-12 w-12 object-contain mr-3"
/>
<div>
<h1 className="text-2xl font-bold">Cooling Maestro</h1>
<p className="text-sm text-blue-100">Endüstriyel Soğutma Çözümleri</p>
</div>
</div>
<nav className="hidden md:flex items-center space-x-6">
<Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
Ana Sayfa
</Button>
<Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
Özellikler
</Button>
<Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
Fiyatlandırma
</Button>
<Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
Hakkımızda
</Button>
<Button type="link" className="text-white hover:text-blue-200 !rounded-button whitespace-nowrap">
İletişim
</Button>
</nav>
<div className="flex items-center space-x-3">
<Button type="default" className="border-white text-blue !rounded-button whitespace-nowrap" onClick={onLogin}>
Giriş Yap
</Button>
<Button type="primary" className="bg-blue-500 border-blue-500 hover:bg-blue-600 !rounded-button whitespace-nowrap">
Kayıt Ol
</Button>
</div>
</div>
</div>
</header>
{/* Hero Section */}
<section className="relative overflow-hidden">
<div
className={`absolute inset-0 w-full h-full ${styles.heroBackground} z-0`}
style={{
backgroundImage: `url('https://readdy.ai/api/search-image?query=A%2520professional%2520industrial%2520cooling%2520facility%2520with%2520modern%2520refrigeration%2520equipment%2520and%2520cold%2520storage%2520units.%2520The%2520left%2520side%2520has%2520a%2520gradient%2520blue%2520background%2520that%2520perfectly%2520blends%2520with%2520the%2520right%2520side%2520showing%2520technical%2520equipment.%2520High%2520quality%2520photorealistic%2520image%2520with%2520excellent%2520lighting%2520and%2520composition.&width=1440&height=600&seq=2&orientation=landscape')`
}}
/>
<div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div className={`text-white ${styles.blueGradientOverlay} p-8 rounded-lg backdrop-blur-sm`}>
<Title level={1} className="text-4xl md:text-5xl font-bold text-white mb-6">
Endüstriyel Soğutma Yüklerini Bilimsel Olarak Hesaplayın
</Title>
<Paragraph className="text-lg text-blue-100 mb-8">
Cooling Maestro, depo ve soğuk odalar için otomatik ısı yükü ve sistem konfigürasyonu hesaplayan web tabanlı profesyonel bir araçtır.
</Paragraph>
<div className="flex flex-wrap gap-4">
<Button
type="primary"
size="large"
className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-3 h-auto !rounded-button whitespace-nowrap cursor-pointer"
onClick={onStartCalculation}
>
<span className={`${styles.icon} ${styles.iconPlayCircle} mr-2`}></span> Ücretsiz Deneyin
</Button>
<Button
size="large"
className="border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-3 h-auto !rounded-button whitespace-nowrap cursor-pointer"
>
<span className={`${styles.icon} ${styles.iconInfoCircle} mr-2`}></span> Nasıl Çalışır?
</Button>
</div>
</div>
</div>
</div>
</section>
{/* Problem-Solution Section */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<div className="text-center mb-12">
<Title level={2} className="text-3xl font-bold text-gray-800 mb-4">
Soğutma Hesaplamalarında Yaşanan Zorluklar
</Title>
<Text className="text-lg text-gray-600">
Endüstriyel soğutma hesaplamalarında karşılaştığınız zorlukları Cooling Maestro ile aşın
</Text>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
<Card
className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
cover={
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=A%2520frustrated%2520engineer%2520struggling%2520with%2520complex%2520manual%2520calculations%2520on%2520paper%2520with%2520many%2520crossed-out%2520formulas%2520and%2520scattered%2520documents.%2520The%2520scene%2520shows%2520stress%2520and%2520inefficiency%2520with%2520a%2520clean%2520professional%2520office%2520background.&width=400&height=200&seq=3&orientation=landscape"
alt="Manuel Hesaplama Zorlukları"
className="w-full h-full object-cover object-top"
/>
</div>
}
>
<div className="text-center">
<Title level={4} className="text-red-600 mb-3">
<span className={`${styles.icon} ${styles.iconExclamationTriangle} mr-2`}></span> Elle Hesaplar Karmaşık mı?
</Title>
<Text className="text-gray-600">
Manuel hesaplamalar zaman alıcı ve hata yapmaya açıktır. Karmaşık formüller ve değişkenler arasında kaybolabilirsiniz.
</Text>
</div>
</Card>
<Card
className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
cover={
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=A%2520disorganized%2520desk%2520with%2520outdated%2520Excel%2520spreadsheets%2520showing%2520cooling%2520load%2520calculations%2520on%2520a%2520computer%2520screen.%2520The%2520spreadsheets%2520look%2520complex%2520and%2520confusing%2520with%2520a%2520clean%2520professional%2520office%2520background.&width=400&height=200&seq=4&orientation=landscape"
alt="Excel Dosyaları Güncel Değil"
className="w-full h-full object-cover object-top"
/>
</div>
}
>
<div className="text-center">
<Title level={4} className="text-red-600 mb-3">
<span className={`${styles.icon} ${styles.iconFileExcel} mr-2`}></span> Excel Dosyaları Güncel Değil mi?
</Title>
<Text className="text-gray-600">
Eski Excel dosyaları güncel standartları karşılamıyor ve bakımı zor. Formüllerin doğruluğundan emin olamıyorsunuz.
</Text>
</div>
</Card>
<Card
className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
cover={
<div className="h-48 overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=A%2520stressed%2520cooling%2520engineer%2520working%2520late%2520with%2520multiple%2520client%2520folders%2520and%2520repeating%2520calculations%2520for%2520different%2520customers.%2520The%2520scene%2520shows%2520inefficiency%2520and%2520repetitive%2520work%2520with%2520a%2520clean%2520professional%2520office%2520background.&width=400&height=200&seq=5&orientation=landscape"
alt="Her Müşteri İçin Yeniden Hesaplama"
className="w-full h-full object-cover object-top"
/>
</div>
}
>
<div className="text-center">
<Title level={4} className="text-red-600 mb-3">
<span className={`${styles.icon} ${styles.iconRedoAlt} mr-2`}></span> Her Müşteri İçin Yeniden mi Uğraşıyorsun?
</Title>
<Text className="text-gray-600">
Her yeni proje için sıfırdan hesaplama yapmak zorunda kalmak verimsiz ve zaman kaybıdır.
</Text>
</div>
</Card>
</div>
<div className={styles.solutionBox}>
<Title level={3} className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
<span className={`${styles.icon} ${styles.iconCheckCircle} text-green-500 mr-3 text-3xl`}></span>
Cooling Maestro ile Çözüm
</Title>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-4">
<div className="flex items-start">
<div className="flex-shrink-0 mt-1">
<span className={`${styles.icon} ${styles.iconCheck} text-green-500 text-lg bg-green-100 p-1 rounded-full`}></span>
</div>
<div className="ml-3">
<Text strong className="text-gray-800 block mb-1">Otomatik U değeri seçimi</Text>
<Text className="text-gray-600">Duvar, tavan ve zemin malzemelerine göre ısı transfer katsayılarını otomatik hesaplar.</Text>
</div>
</div>
<div className="flex items-start">
<div className="flex-shrink-0 mt-1">
<span className={`${styles.icon} ${styles.iconCheck} text-green-500 text-lg bg-green-100 p-1 rounded-full`}></span>
</div>
<div className="ml-3">
<Text strong className="text-gray-800 block mb-1">API üzerinden anlık iklim verisi</Text>
<Text className="text-gray-600">Konum bazlı sıcaklık ve nem verilerini otomatik olarak çeker ve hesaplamalarda kullanır.</Text>
</div>
</div>
</div>
<div className="space-y-4">
<div className="flex items-start">
<div className="flex-shrink-0 mt-1">
<span className={`${styles.icon} ${styles.iconCheck} text-green-500 text-lg bg-green-100 p-1 rounded-full`}></span>
</div>
<div className="ml-3">
<Text strong className="text-gray-800 block mb-1">Ürün veritabanına dayalı yük hesabı</Text>
<Text className="text-gray-600">Geniş ürün kütüphanesi ile farklı gıda ve malzemeler için doğru hesaplamalar yapar.</Text>
</div>
</div>
<div className="flex items-start">
<div className="flex-shrink-0 mt-1">
<span className={`${styles.icon} ${styles.iconCheck} text-green-500 text-lg bg-green-100 p-1 rounded-full`}></span>
</div>
<div className="ml-3">
<Text strong className="text-gray-800 block mb-1">Adım adım form yapısı</Text>
<Text className="text-gray-600">Hatalı veri girişini azaltan, kullanıcı dostu arayüz ile kolay ve hızlı hesaplama.</Text>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Features Section */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<div className="text-center mb-12">
<Title level={2} className="text-3xl font-bold text-gray-800 mb-4">
Özellikler ve Faydalar
</Title>
<Text className="text-lg text-gray-600">
Cooling Maestro'nun sunduğu profesyonel çözümler
</Text>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
<Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full border-t-4 border-blue-500">
<div className="text-center">
<div className={`${styles.iconContainer} ${styles.iconContainerBlue}`}>
<span className={`${styles.icon} ${styles.iconCalculator} text-2xl`}></span>
</div>
<Title level={4} className="text-gray-800 mb-3">Bilimsel Hesaplama</Title>
<Text className="text-gray-600">
ASHRAE ve TS EN normlarına dayalı profesyonel hesaplama yöntemleri ile doğru sonuçlar elde edin.
</Text>
</div>
</Card>
<Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full border-t-4 border-indigo-500">
<div className="text-center">
<div className={`${styles.iconContainer} ${styles.iconContainerIndigo}`}>
<span className={`${styles.icon} ${styles.iconCogs} text-2xl`}></span>
</div>
<Title level={4} className="text-gray-800 mb-3">Sistem Konfigürasyonu</Title>
<Text className="text-gray-600">
Kompresör, evaporatör, kondenser seçimi ve sistem optimizasyonu yakında hizmetinizde.
</Text>
</div>
</Card>
<Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full border-t-4 border-green-500">
<div className="text-center">
<div className={`${styles.iconContainer} ${styles.iconContainerGreen}`}>
<span className={`${styles.icon} ${styles.iconCloudSun} text-2xl`}></span>
</div>
<Title level={4} className="text-gray-800 mb-3">İklim API Entegrasyonu</Title>
<Text className="text-gray-600">
Koordinata özel iklim verisi (Open-Meteo) ile gerçek zamanlı ve doğru hesaplamalar yapın.
</Text>
</div>
</Card>
<Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full border-t-4 border-purple-500">
<div className="text-center">
<div className={`${styles.iconContainer} ${styles.iconContainerPurple}`}>
<span className={`${styles.icon} ${styles.iconFilePdf} text-2xl`}></span>
</div>
<Title level={4} className="text-gray-800 mb-3">Raporlama</Title>
<Text className="text-gray-600">
Profesyonel PDF ve Excel formatında raporlar ile müşterilerinize sunumlar hazırlayın.
</Text>
</div>
</Card>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
<div>
<Title level={3} className="text-2xl font-bold text-gray-800 mb-4">
Geleneksel Yöntemlere Göre Avantajlar
</Title>
<Paragraph className="text-gray-600 mb-6">
Cooling Maestro, geleneksel hesaplama yöntemlerine göre önemli avantajlar sunar.
Hız, doğruluk ve kullanım kolaylığı ile öne çıkan yazılımımız, işletmenize değer katar.
</Paragraph>
<div className="space-y-4 mb-6">
<div className="flex items-center">
<div className="w-1/2 pr-4">
<Text strong className="text-gray-800">Hesaplama Süresi</Text>
</div>
<div className="w-1/2">
<div className="flex items-center">
<div className={styles.progressBar}>
<div className={`${styles.progressFill} bg-blue-600`} style={{ width: '85%' }}></div>
</div>
<span className="ml-2 text-sm text-gray-600">85% Daha Hızlı</span>
</div>
</div>
</div>
<div className="flex items-center">
<div className="w-1/2 pr-4">
<Text strong className="text-gray-800">Hesaplama Doğruluğu</Text>
</div>
<div className="w-1/2">
<div className="flex items-center">
<div className={styles.progressBar}>
<div className={`${styles.progressFill} bg-green-600`} style={{ width: '92%' }}></div>
</div>
<span className="ml-2 text-sm text-gray-600">92% Daha Doğru</span>
</div>
</div>
</div>
<div className="flex items-center">
<div className="w-1/2 pr-4">
<Text strong className="text-gray-800">Zaman Tasarrufu</Text>
</div>
<div className="w-1/2">
<div className="flex items-center">
<div className={styles.progressBar}>
<div className={`${styles.progressFill} bg-purple-600`} style={{ width: '78%' }}></div>
</div>
<span className="ml-2 text-sm text-gray-600">78% Tasarruf</span>
</div>
</div>
</div>
</div>
<Button
type="primary"
size="large"
className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
>
Tüm Özellikleri Keşfedin
</Button>
</div>
<div className={`h-96 ${styles.featuresChartContainer}`}>
<div id="featuresChart" className="w-full h-full"></div>
</div>
</div>
</div>
</section>
{/* Demo Section */}
<section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
<div className="container mx-auto px-4">
<div className="text-center mb-12">
<Title level={2} className="text-3xl font-bold text-gray-800 mb-4">
Hiç Kayıt Olmadan Demo Hesaplama Yapın
</Title>
<Text className="text-lg text-gray-600">
Basit bir soğuk oda hesabı ile Cooling Maestro'nun gücünü keşfedin
</Text>
</div>
<div className="max-w-4xl mx-auto">
<Card className="shadow-lg">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className={showDemoResult ? styles.demoResult : ''}>
<Title level={4} className="text-gray-800 mb-6 flex items-center">
<span className={`${styles.icon} ${styles.iconEdit} text-blue-500 mr-2`}></span> Demo Soğuk Oda Hesabı
</Title>
<Form layout="vertical" form={form}>
<Form.Item
label="Soğuk Oda Hacmi (m³)"
required
tooltip="Soğuk odanın toplam hacmini giriniz"
>
<Input
type="number"
suffix="m³"
value={volume}
onChange={(e) => setVolume(Number(e.target.value))}
min={10}
max={1000}
className="border-gray-300"
/>
</Form.Item>
<Form.Item
label="Dış Ortam Sıcaklığı (°C)"
required
tooltip="Soğuk odanın bulunduğu ortamın sıcaklığını giriniz"
>
<Input
type="number"
suffix="°C"
value={externalTemp}
onChange={(e) => setExternalTemp(Number(e.target.value))}
min={0}
max={50}
className="border-gray-300"
/>
</Form.Item>
<Form.Item
label="Depolanacak Ürün Tipi"
required
tooltip="Soğuk odada depolanacak ürünü seçiniz"
>
<Select
value={productType}
onChange={(value) => setProductType(value)}
className="w-full"
>
<Option value="meyve">Meyve ve Sebze</Option>
<Option value="et">Et Ürünleri</Option>
<Option value="sut">Süt Ürünleri</Option>
<Option value="donmus">Dondurulmuş Gıda</Option>
<Option value="ilac">İlaç ve Kimyasallar</Option>
</Select>
</Form.Item>
<Form.Item>
<Button
type="primary"
size="large"
onClick={calculateDemo}
block
className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
>
<span className={`${styles.icon} ${styles.iconCalculator} mr-2`}></span> Hesapla
</Button>
</Form.Item>
</Form>
</div>
{showDemoResult && (
<div>
<Title level={4} className="text-gray-800 mb-6 flex items-center">
<span className={`${styles.icon} ${styles.iconChartBar} text-green-500 mr-2`}></span> Hesaplama Sonucu
</Title>
<div className="space-y-4">
<div className="bg-blue-50 p-4 rounded-lg">
<Text strong className="text-blue-800 block mb-1">Toplam Soğutma Yükü</Text>
<div className="flex items-baseline">
<span className="text-3xl font-bold text-blue-700">{(volume * 0.25 * (externalTemp - 2)).toFixed(2)}</span>
<span className="ml-2 text-blue-600">kW</span>
</div>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="bg-gray-50 p-3 rounded-lg">
<Text strong className="text-gray-700 block mb-1">Duvar Yükü</Text>
<div className="flex items-baseline">
<span className="text-xl font-bold text-gray-700">{(volume * 0.1 * (externalTemp - 2)).toFixed(2)}</span>
<span className="ml-2 text-gray-600">kW</span>
</div>
</div>
<div className="bg-gray-50 p-3 rounded-lg">
<Text strong className="text-gray-700 block mb-1">Ürün Yükü</Text>
<div className="flex items-baseline">
<span className="text-xl font-bold text-gray-700">{(volume * 0.15 * (externalTemp - 2)).toFixed(2)}</span>
<span className="ml-2 text-gray-600">kW</span>
</div>
</div>
</div>
<div className="bg-green-50 p-4 rounded-lg">
<Text strong className="text-green-800 block mb-1">Tavsiye Edilen Sistem Kapasitesi</Text>
<div className="flex items-baseline">
<span className="text-2xl font-bold text-green-700">{(volume * 0.3 * (externalTemp - 2)).toFixed(2)}</span>
<span className="ml-2 text-green-600">kW</span>
</div>
</div>
<Divider />
<div className="text-center">
<Text className="text-gray-600 block mb-4">
Bu basit demo hesaplamanın sonuçlarını beğendiniz mi?
</Text>
<Button
type="primary"
className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
onClick={onStartCalculation}
>
Kendi Hesabınızı Yaratın ve Kaydedin
</Button>
</div>
</div>
</div>
)}
</div>
</Card>
</div>
</div>
</section>
{/* Testimonials Section */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<div className="text-center mb-12">
<Title level={2} className="text-3xl font-bold text-gray-800 mb-4">
Müşteri Referansları ve Sektörler
</Title>
<Text className="text-lg text-gray-600">
Cooling Maestro'yu kullanan şirketler ve sektörler
</Text>
</div>
<div className="mb-12">
<div className="flex flex-wrap justify-center gap-6 mb-8">
{sectors.map((sector, index) => (
<Tag
key={index}
color="blue"
className="px-4 py-2 text-base rounded-full cursor-pointer"
>
<span className={`${styles.icon} ${sector.icon} mr-2`}></span> {sector.name}
</Tag>
))}
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
<div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
<span className={`${styles.icon} ${styles.iconBuilding} text-4xl text-blue-600 mb-3`}></span>
<Text strong className="block">Soğutma A.Ş.</Text>
</div>
<div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
<span className={`${styles.icon} ${styles.iconTruck} text-4xl text-indigo-600 mb-3`}></span>
<Text strong className="block">Lojistik Depo</Text>
</div>
<div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
<span className={`${styles.icon} ${styles.iconCheese} text-4xl text-yellow-600 mb-3`}></span>
<Text strong className="block">Süt Ürünleri</Text>
</div>
<div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
<span className={`${styles.icon} ${styles.iconPills} text-4xl text-red-600 mb-3`}></span>
<Text strong className="block">Pharma Soğuk</Text>
</div>
</div>
</div>
<div className="bg-gray-50 rounded-xl p-8">
<Title level={3} className="text-2xl font-bold text-gray-800 mb-8 text-center">
Müşterilerimizin Yorumları
</Title>
<Swiper
slidesPerView={1}
spaceBetween={30}
pagination={{
clickable: true,
}}
autoplay={{
delay: 5000,
disableOnInteraction: false,
}}
modules={[Pagination, Autoplay]}
className={styles.testimonialSwiper}
breakpoints={{
640: {
slidesPerView: 1,
},
768: {
slidesPerView: 2,
},
}}
>
{customers.map((customer, index) => (
<SwiperSlide key={index}>
<Card className="h-full shadow-md hover:shadow-lg transition-shadow">
<div className="flex flex-col h-full">
<div className="text-yellow-500 mb-4">
<span className={`${styles.icon} ${styles.iconStar}`}></span>
<span className={`${styles.icon} ${styles.iconStar}`}></span>
<span className={`${styles.icon} ${styles.iconStar}`}></span>
<span className={`${styles.icon} ${styles.iconStar}`}></span>
<span className={`${styles.icon} ${styles.iconStar}`}></span>
</div>
<Paragraph className="text-gray-600 italic flex-grow">
"{customer.quote}"
</Paragraph>
<div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
<div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
<span className={`${styles.icon} ${styles.iconUser}`}></span>
</div>
<div>
<Text strong className="block">{customer.name}</Text>
<Text className="text-gray-500">{customer.sector} Sektörü</Text>
</div>
</div>
</div>
</Card>
</SwiperSlide>
))}
</Swiper>
</div>
</div>
</section>
{/* FAQ Section */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<div className="text-center mb-12">
<Title level={2} className="text-3xl font-bold text-gray-800 mb-4">
Sıkça Sorulan Sorular
</Title>
<Text className="text-lg text-gray-600">
Cooling Maestro hakkında merak edilenler
</Text>
</div>
<div className="max-w-4xl mx-auto">
<Collapse
defaultActiveKey={['1']}
expandIconPosition="right"
className="bg-white rounded-lg shadow-md"
>
<Panel
header={
<span className="text-lg font-medium">Cooling Maestro ne yapar?</span>
}
key="1"
>
<Paragraph className="text-gray-600">
Cooling Maestro, endüstriyel soğutma sistemleri için ısı yükü hesaplamalarını otomatikleştiren web tabanlı bir yazılımdır.
ASHRAE ve TS EN standartlarına uygun olarak soğuk odalar, depolar ve endüstriyel tesisler için soğutma yükü hesaplamalarını yapar,
sistem konfigürasyonu önerir ve detaylı raporlar oluşturur.
</Paragraph>
</Panel>
<Panel
header={
<span className="text-lg font-medium">Ücretsiz mi?</span>
}
key="2"
>
<Paragraph className="text-gray-600">
Cooling Maestro'nun temel özellikleri içeren ücretsiz bir deneme sürümü bulunmaktadır.
Tam özellikli profesyonel sürüm için aylık veya yıllık abonelik planlarımız mevcuttur.
Fiyatlandırma detayları için lütfen satış ekibimizle iletişime geçin.
</Paragraph>
</Panel>
<Panel
header={
<span className="text-lg font-medium">Hesaplamalar neye göre yapılıyor?</span>
}
key="3"
>
<Paragraph className="text-gray-600">
Tüm hesaplamalar ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)
ve TS EN (Türk Standartları Enstitüsü Avrupa Normları) standartlarına uygun olarak yapılmaktadır.
Hesaplamalarda duvar, tavan, zemin ısı transferi, ürün soğutma yükü, insan yükü, aydınlatma yükü,
ekipman yükü ve hava değişimi gibi faktörler dikkate alınmaktadır.
</Paragraph>
</Panel>
<Panel
header={
<span className="text-lg font-medium">Verilerim güvende mi?</span>
}
key="4"
>
<Paragraph className="text-gray-600">
Evet, verilerinizin güvenliği bizim için çok önemlidir. Tüm veriler şifrelenerek saklanır ve
sadece yetkilendirilmiş kullanıcılar tarafından erişilebilir. Çok kiracılı (multi-tenant) mimari
sayesinde her müşterinin verileri izole edilmiş bir ortamda tutulur. Düzenli yedeklemeler ve
güvenlik denetimleri ile verileriniz her zaman güvendedir.
</Paragraph>
</Panel>
<Panel
header={
<span className="text-lg font-medium">Nasıl başlayabilirim?</span>
}
key="5"
>
<Paragraph className="text-gray-600">
Başlamak için ücretsiz hesap oluşturabilir ve demo sürümünü hemen kullanmaya başlayabilirsiniz.
Kayıt işlemi sadece birkaç dakika sürer. Daha sonra ihtiyaçlarınıza göre uygun abonelik planını seçebilirsiniz.
Ayrıca, ekibimiz size özel bir demo gösterimi yapabilir veya sorularınızı yanıtlayabilir.
</Paragraph>
</Panel>
</Collapse>
<div className="text-center mt-8">
<Text className="text-gray-600 block mb-4">
Başka sorularınız mı var? Bizimle iletişime geçin.
</Text>
<Button
type="primary"
size="large"
className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
>
<span className={`${styles.icon} ${styles.iconEnvelope} mr-2`}></span> İletişime Geçin
</Button>
</div>
</div>
</div>
</section>
{/* CTA Section */}
<section className={`py-16 ${styles.ctaGradient} text-white`}>
<div className="container mx-auto px-4 text-center">
<Title level={2} className="text-3xl md:text-4xl font-bold text-white mb-6">
Soğutma Hesaplamalarınızı Modernleştirin
</Title>
<Paragraph className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
Cooling Maestro ile zaman kazanın, maliyetleri düşürün ve daha doğru hesaplamalar yapın.
Hemen ücretsiz deneyin!
</Paragraph>
<div className="flex flex-col md:flex-row justify-center gap-4">
<Button
type="primary"
size="large"
className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-3 h-auto !rounded-button whitespace-nowrap cursor-pointer"
onClick={onStartCalculation}
>
<span className={`${styles.icon} ${styles.iconPlayCircle} mr-2`}></span> Ücretsiz Deneyin
</Button>
<Button
size="large"
className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 h-auto !rounded-button whitespace-nowrap cursor-pointer"
>
<span className={`${styles.icon} ${styles.iconCalendarAlt} mr-2`}></span> Demo Randevusu Alın
</Button>
</div>
</div>
</section>
{/* Footer */}
<footer className={`${styles.footerBg} text-white py-12`}>
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
<div>
<div className="flex items-center mb-4">
<img
src="https://readdy.ai/api/search-image?query=A%2520professional%2520sleek%2520modern%2520logo%2520for%2520Cooling%2520Maestro%2520featuring%2520a%2520stylized%2520snowflake%2520or%2520cooling%2520symbol%2520with%2520blue%2520gradient%2520colors.%2520The%2520logo%2520should%2520be%2520minimalist%2520corporate%2520and%2520suitable%2520for%2520an%2520industrial%2520cooling%2520calculation%2520software.%2520Clean%2520background%2520high%2520contrast.&width=60&height=60&seq=1&orientation=squarish"
alt="Cooling Maestro Logo"
className="h-10 w-10 object-contain mr-3"
/>
<div>
<h3 className="text-xl font-bold">Cooling Maestro</h3>
</div>
</div>
<Paragraph className="text-gray-400 mb-4">
Endüstriyel soğutma çözümleri için profesyonel hesaplama araçları sunan lider platform.
</Paragraph>
<div className="flex space-x-4">
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>
<span>f</span>
</a>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>
<span>𝕏</span>
</a>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>
<span>in</span>
</a>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>
<span>⚡</span>
</a>
</div>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
<ul className="space-y-2">
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>Şirketimiz</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>Ekibimiz</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>Kariyer</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>Blog</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>KVKK</a>
</li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Destek</h3>
<ul className="space-y-2">
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>Yardım Merkezi</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>SSS</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>Dokümantasyon</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>API</a>
</li>
<li>
<a href="#" className={`${styles.socialIcon} cursor-pointer`}>İletişim</a>
</li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">İletişim</h3>
<ul className="space-y-3">
<li className="flex items-start">
<span className={`${styles.icon} ${styles.iconMapMarkerAlt} mt-1 mr-3 text-blue-400`}></span>
<span className="text-gray-400">
Soğutma Vadisi, No:123<br />
Ankara, Türkiye
</span>
</li>
<li className="flex items-center">
<span className={`${styles.icon} ${styles.iconPhoneAlt} mr-3 text-blue-400`}></span>
<span className="text-gray-400">+90 (312) 123 4567</span>
</li>
<li className="flex items-center">
<span className={`${styles.icon} ${styles.iconEnvelope} mr-3 text-blue-400`}></span>
<span className="text-gray-400">info@coolingmaestro.com</span>
</li>
</ul>
<div className="mt-4 flex items-center space-x-3">
<span className="text-xl text-gray-400">VISA</span>
<span className="text-xl text-gray-400">MC</span>
<span className="text-xl text-gray-400">PP</span>
</div>
</div>
</div>
<Divider className="border-gray-700" />
<div className="flex flex-col md:flex-row justify-between items-center">
<Text className="text-gray-500 text-sm">
© 2025 Cooling Maestro. Tüm hakları saklıdır.
</Text>
<div className="mt-4 md:mt-0 flex flex-wrap gap-4">
<a href="#" className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
Gizlilik Politikası
</a>
<a href="#" className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
Kullanım Şartları
</a>
<a href="#" className="text-gray-500 text-sm hover:text-white transition-colors cursor-pointer">
Çerez Politikası
</a>
</div>
</div>
</div>
</footer>
</div>
);
};
export default WelcomeScreen;