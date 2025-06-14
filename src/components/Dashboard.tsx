import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import CalculationSelection from './CalculationSelection';
import {
Card,
Button,
Typography,
Statistic,
Table,
Dropdown,
Badge,
Row,
Col,
Menu,
Avatar,
Tooltip,
Input,
Tag,
Progress,
Divider
} from 'antd';
import {
HomeOutlined,
PlusOutlined,
CalculatorOutlined,
SettingOutlined,
BellOutlined,
UserOutlined,
DownOutlined,
SearchOutlined,
FileTextOutlined,
DatabaseOutlined,
EnvironmentOutlined,
QuestionCircleOutlined,
LogoutOutlined,
AppstoreOutlined,
BarChartOutlined,
TeamOutlined,
CalendarOutlined,
FileOutlined,
MoreOutlined,
ArrowUpOutlined,
ArrowDownOutlined,
InfoCircleOutlined
} from '@ant-design/icons';
import * as echarts from 'echarts';
const { Title, Text } = Typography;
interface DashboardProps {
  onStartCalculation?: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartCalculation, onLogout }) => {
const [searchValue, setSearchValue] = useState<string>('');
const [showCalculations, setShowCalculations] = useState<boolean>(false);
const [notificationCount, setNotificationCount] = useState<number>(3);
// Echarts - Hesaplama Aktivitesi
useEffect(() => {
const activityChart = document.getElementById('activity-chart');
if (activityChart) {
const chart = echarts.init(activityChart);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'shadow'
}
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
data: ['14 Haz', '15 Haz', '16 Haz', '17 Haz', '18 Haz', '19 Haz', '20 Haz', '21 Haz', '22 Haz', '23 Haz', '24 Haz', '25 Haz', '26 Haz', '27 Haz', '28 Haz', '29 Haz', '30 Haz', '1 Tem', '2 Tem', '3 Tem', '4 Tem', '5 Tem', '6 Tem', '7 Tem', '8 Tem', '9 Tem', '10 Tem', '11 Tem', '12 Tem', '13 Tem'],
axisLabel: {
interval: 6
}
},
yAxis: {
type: 'value',
name: 'Hesaplama Sayısı'
},
series: [
{
name: 'Hesaplama Sayısı',
type: 'line',
smooth: true,
data: [2, 1, 0, 3, 2, 1, 0, 2, 3, 4, 2, 1, 0, 1, 2, 3, 2, 5, 3, 2, 1, 0, 2, 3, 1, 2, 3, 4, 2, 1],
itemStyle: {
color: '#1890ff'
},
areaStyle: {
color: {
type: 'linear',
x: 0,
y: 0,
x2: 0,
y2: 1,
colorStops: [{
offset: 0, color: 'rgba(24,144,255,0.6)'
}, {
offset: 1, color: 'rgba(24,144,255,0.1)'
}]
}
}
}
]
};
chart.setOption(option);
window.addEventListener('resize', () => {
chart.resize();
});
return () => {
chart.dispose();
window.removeEventListener('resize', () => {
chart.resize();
});
};
}
}, []);
// Echarts - Yük Dağılımı
useEffect(() => {
const distributionChart = document.getElementById('distribution-chart');
if (distributionChart) {
const chart = echarts.init(distributionChart);
const option = {
animation: false,
tooltip: {
trigger: 'item',
formatter: '{a} <br/>{b}: {c} ({d}%)'
},
legend: {
orient: 'vertical',
right: 10,
top: 'center',
data: ['Ürün Soğutma', 'İletim Yükü', 'Havalandırma', 'Ekipman Isısı', 'Personel Isısı']
},
series: [
{
name: 'Yük Dağılımı',
type: 'pie',
radius: ['50%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: '14',
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: 48, name: 'Ürün Soğutma', itemStyle: { color: '#1890ff' } },
{ value: 22, name: 'İletim Yükü', itemStyle: { color: '#52c41a' } },
{ value: 15, name: 'Havalandırma', itemStyle: { color: '#faad14' } },
{ value: 10, name: 'Ekipman Isısı', itemStyle: { color: '#722ed1' } },
{ value: 5, name: 'Personel Isısı', itemStyle: { color: '#eb2f96' } }
]
}
]
};
chart.setOption(option);
window.addEventListener('resize', () => {
chart.resize();
});
return () => {
chart.dispose();
window.removeEventListener('resize', () => {
chart.resize();
});
};
}
}, []);
// Tablo verileri
const projectsData = [
{
key: '1',
name: 'Antalya Et Deposu',
rooms: 3,
lastCalculation: '2 gün önce',
load: '86.200 kcal/h',
status: 'Tamamlandı',
statusType: 'success'
},
{
key: '2',
name: 'İzmir Süt Tesisi',
rooms: 2,
lastCalculation: '6 gün önce',
load: '-',
status: 'Eksik Veri',
statusType: 'warning'
},
{
key: '3',
name: 'Ankara Meyve Deposu',
rooms: 4,
lastCalculation: '1 gün önce',
load: '92.450 kcal/h',
status: 'Tamamlandı',
statusType: 'success'
},
{
key: '4',
name: 'Adana Sebze Soğutma',
rooms: 1,
lastCalculation: '12 saat önce',
load: '34.800 kcal/h',
status: 'Tamamlandı',
statusType: 'success'
},
{
key: '5',
name: 'Bursa Dondurma Fabrikası',
rooms: 5,
lastCalculation: '3 gün önce',
load: '-',
status: 'Devam Ediyor',
statusType: 'processing'
}
];
const columns = [
{
title: 'Proje Adı',
dataIndex: 'name',
key: 'name',
render: (text: string) => <a className="text-blue-600 hover:text-blue-800 font-medium">{text}</a>,
},
{
title: 'Oda Sayısı',
dataIndex: 'rooms',
key: 'rooms',
},
{
title: 'Son Hesaplama',
dataIndex: 'lastCalculation',
key: 'lastCalculation',
},
{
title: 'Yük',
dataIndex: 'load',
key: 'load',
},
{
title: 'Durum',
dataIndex: 'status',
key: 'status',
render: (text: string, record: any) => (
<Tag color={
record.statusType === 'success' ? 'success' :
record.statusType === 'warning' ? 'warning' :
record.statusType === 'processing' ? 'processing' : 'default'
}>
{text}
</Tag>
),
},
{
title: 'Aksiyon',
key: 'action',
render: (_: any, record: any) => (
<div className="flex space-x-2">
<Button type="primary" size="small" className={`${styles.roundedButton} whitespace-nowrap`}>
Devam Et
</Button>
<Button size="small" className={`${styles.roundedButton} whitespace-nowrap`}>
Görüntüle
</Button>
</div>
),
},
];
// Kullanıcı profil menüsü
const userMenu = (
<Menu>
<Menu.Item key="1" icon={<UserOutlined />}>
Profilim
</Menu.Item>
<Menu.Item key="2" icon={<SettingOutlined />}>
Ayarlar
</Menu.Item>
<Menu.Divider />
<Menu.Item key="3" icon={<LogoutOutlined />}>
Çıkış Yap
</Menu.Item>
</Menu>
);
// Bildirim menüsü
const notificationMenu = (
<Menu className="w-80">
<Menu.Item key="1" className="hover:bg-gray-50">
<div>
<div className="flex justify-between items-center">
<Text strong>Hesaplama Tamamlandı</Text>
<Text type="secondary" className="text-xs">1 saat önce</Text>
</div>
<Text className="text-gray-600 block mt-1">Antalya Et Deposu projesinin hesaplaması başarıyla tamamlandı.</Text>
</div>
</Menu.Item>
<Menu.Divider />
<Menu.Item key="2" className="hover:bg-gray-50">
<div>
<div className="flex justify-between items-center">
<Text strong>Eksik Veri Uyarısı</Text>
<Text type="secondary" className="text-xs">3 saat önce</Text>
</div>
<Text className="text-gray-600 block mt-1">İzmir Süt Tesisi projesinde giriş sıcaklığı verisi eksik.</Text>
</div>
</Menu.Item>
<Menu.Divider />
<Menu.Item key="3" className="hover:bg-gray-50">
<div>
<div className="flex justify-between items-center">
<Text strong>Yeni Güncelleme</Text>
<Text type="secondary" className="text-xs">1 gün önce</Text>
</div>
<Text className="text-gray-600 block mt-1">Cooling Maestro'nun yeni sürümü yayınlandı. Yenilikler için tıklayın.</Text>
</div>
</Menu.Item>
<Menu.Divider />
<Menu.Item key="4" className="text-center">
<a className="text-blue-600">Tüm Bildirimleri Gör</a>
</Menu.Item>
</Menu>
);
return (
<div className={styles.dashboard}>
{/* Sidebar */}
<div className={styles.sidebar}>
<div className={styles.sidebarHeader}>
<div className="flex items-center">
<img
src="https://readdy.ai/api/search-image?query=A%2520professional%252C%2520sleek%252C%2520modern%2520logo%2520for%2520Cooling%2520Maestro%252C%2520featuring%2520a%2520stylized%2520snowflake%2520or%2520cooling%2520symbol%2520with%2520blue%2520gradient%2520colors.%2520The%2520logo%2520should%2520be%2520minimalist%252C%2520corporate%252C%2520and%2520suitable%2520for%2520an%2520industrial%2520cooling%2520calculation%2520software.%2520Clean%2520background%252C%2520high%2520contrast.&width=40&height=40&seq=1&orientation=squarish"
alt="Cooling Maestro Logo"
className="h-10 w-10 object-contain"
/>
<div className="ml-3">
<h1 className="text-lg font-bold text-gray-800">Cooling Maestro</h1>
<p className="text-xs text-blue-600">Endüstriyel Soğutma</p>
</div>
</div>
</div>
<div className={styles.sidebarContent}>
<div className={styles.menuSection}>
<Text className={styles.menuSectionTitle}>Ana Menü</Text>
<ul className={styles.menuList}>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonActive} ${styles.roundedButton} whitespace-nowrap`}>
<HomeOutlined className="mr-3" />
<span>Dashboard</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<AppstoreOutlined className="mr-3" />
<span>Projelerim</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`} onClick={() => setShowCalculations(true)}>
<CalculatorOutlined className="mr-3" />
<span>Hesaplamalar</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<DatabaseOutlined className="mr-3" />
<span>Ürün Veritabanı</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<BarChartOutlined className="mr-3" />
<span>Raporlar</span>
</Button>
</li>
</ul>
</div>
<div className={styles.menuSection}>
<Text className={styles.menuSectionTitle}>Araçlar</Text>
<ul className={styles.menuList}>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<CalendarOutlined className="mr-3" />
<span>Takvim</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<TeamOutlined className="mr-3" />
<span>Ekip</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<FileOutlined className="mr-3" />
<span>Dokümanlar</span>
</Button>
</li>
</ul>
</div>
<div className={styles.menuSection}>
<Text className={styles.menuSectionTitle}>Destek</Text>
<ul className={styles.menuList}>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<QuestionCircleOutlined className="mr-3" />
<span>Yardım Merkezi</span>
</Button>
</li>
<li>
<Button type="text" className={`${styles.menuButton} ${styles.menuButtonInactive} ${styles.roundedButton} whitespace-nowrap`}>
<SettingOutlined className="mr-3" />
<span>Ayarlar</span>
</Button>
</li>
</ul>
</div>
</div>
<div className={styles.userProfile}>
<div className="flex items-center">
<Avatar src="https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520Turkish%2520male%2520engineer%2520or%2520technical%2520professional%2520with%2520a%2520friendly%2520expression%252C%2520wearing%2520business%2520casual%2520attire%252C%2520on%2520a%2520neutral%2520background.%2520The%2520image%2520should%2520be%2520high%2520quality%252C%2520well-lit%252C%2520and%2520suitable%2520for%2520a%2520profile%2520picture.&width=40&height=40&seq=2&orientation=squarish" />
<div className="ml-3">
<Text className="font-medium block text-sm">Ahmet Yılmaz</Text>
<Text className="text-xs text-gray-500">Proje Yöneticisi</Text>
</div>
</div>
</div>
</div>
{/* Main Content */}
<div className={styles.mainContent}>
{/* Header */}
<header className={styles.header}>
<div className={styles.headerContent}>
<div className="flex items-center">
<Title level={4} className="m-0">Dashboard</Title>
<Text className="text-gray-500 ml-4">13 Haziran 2025, Cuma</Text>
</div>
<div className="flex items-center space-x-4">
<div className="relative">
<Input
placeholder="Ara..."
prefix={<SearchOutlined className="text-gray-400" />}
value={searchValue}
onChange={(e) => setSearchValue(e.target.value)}
className={styles.searchInput}
/>
</div>
<Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
<Badge count={notificationCount} className="cursor-pointer">
<Button type="text" icon={<BellOutlined style={{ fontSize: '20px' }} />} className={`${styles.notificationButton} ${styles.roundedButton} whitespace-nowrap`} />
</Badge>
</Dropdown>
<Dropdown overlay={userMenu} trigger={['click']}>
<div className="flex items-center cursor-pointer">
<Avatar src="https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520Turkish%2520male%2520engineer%2520or%2520technical%2520professional%2520with%2520a%2520friendly%2520expression%252C%2520wearing%2520business%2520casual%2520attire%252C%2520on%2520a%2520neutral%2520background.%2520The%2520image%2520should%2520be%2520high%2520quality%252C%2520well-lit%252C%2520and%2520suitable%2520for%2520a%2520profile%2520picture.&width=40&height=40&seq=2&orientation=squarish" />
<span className="ml-2 mr-1 hidden md:inline">Ahmet Yılmaz</span>
<DownOutlined className="text-xs text-gray-500" />
</div>
</Dropdown>
</div>
</div>
</header>
{/* Page Content */}
<div className={styles.pageContent}>
{showCalculations ? (
<CalculationSelection 
onSelectCalculationType={(type) => {
  setShowCalculations(false);
  onStartCalculation();
}}
onBack={() => setShowCalculations(false)}
/>
) : (
<>
{/* Welcome Section */}
<div className="mb-8">
<div className="flex items-center justify-between">
<div>
<Title level={3} className="mb-1">Hoş Geldiniz, Ahmet!</Title>
<Text className="text-gray-600">İşte bugünkü özet bilgileriniz ve devam eden projeleriniz.</Text>
</div>
<Button type="primary" icon={<PlusOutlined />} size="large" className={`${styles.roundedButton} whitespace-nowrap`}>
Yeni Proje
</Button>
</div>
</div>
{/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<Card className={styles.statCard}>
<div className="flex items-start">
<div className={`mr-4 ${styles.statIcon} ${styles.statIconBlue}`}>
<span className={`${styles.icon} ${styles.iconProjectDiagram} text-xl text-blue-600`}></span>
</div>
<div>
<Text className="text-gray-600">Toplam Proje</Text>
<div className="flex items-baseline">
<Title level={3} className="m-0 mr-2">12</Title>
<Text className="text-green-500 flex items-center">
<ArrowUpOutlined /> 2 <span className="ml-1">bu ay</span>
</Text>
</div>
</div>
</div>
</Card>
<Card className={styles.statCard}>
<div className="flex items-start">
<div className={`mr-4 ${styles.statIcon} ${styles.statIconGreen}`}>
<span className={`${styles.icon} ${styles.iconCalculator} text-xl text-green-600`}></span>
</div>
<div>
<Text className="text-gray-600">Bu Ayki Hesaplamalar</Text>
<div className="flex items-baseline">
<Title level={3} className="m-0 mr-2">18</Title>
<Text className="text-green-500 flex items-center">
<ArrowUpOutlined /> 5 <span className="ml-1">geçen aya göre</span>
</Text>
</div>
</div>
</div>
</Card>
<Card className={styles.statCard}>
<div className="flex items-start">
<div className={`mr-4 ${styles.statIcon} ${styles.statIconYellow}`}>
<span className={`${styles.icon} ${styles.iconThermometer} text-xl text-yellow-600`}></span>
</div>
<div>
<Text className="text-gray-600">Ortalama Yük</Text>
<div className="flex items-baseline">
<Title level={3} className="m-0 mr-2">74.300</Title>
<Text className="text-gray-500">kcal/h</Text>
</div>
</div>
</div>
</Card>
<Card className={styles.statCard}>
<div className="flex items-start">
<div className={`mr-4 ${styles.statIcon} ${styles.statIconPurple}`}>
<span className={`${styles.icon} ${styles.iconBox} text-xl text-purple-600`}></span>
</div>
<div>
<Text className="text-gray-600">En Sık Kullanılan Ürün</Text>
<div className="flex items-baseline">
<Title level={3} className="m-0 mr-2">Tavuk</Title>
<Text className="text-gray-500">(Donmuş)</Text>
</div>
</div>
</div>
</Card>
</div>
{/* Recent Projects */}
<div className="mb-8">
<Card
title={
<div className="flex items-center">
<span className={`${styles.icon} ${styles.iconClipboardList} text-blue-600 mr-2`}></span>
<span>Son Projeler</span>
</div>
}
extra={
<Button type="link" className="text-blue-600 !rounded-button whitespace-nowrap">
Tüm Projeleri Gör
</Button>
}
className="shadow-sm hover:shadow-md transition-shadow"
>
<Table
dataSource={projectsData}
columns={columns}
pagination={false}
className="overflow-x-auto"
/>
</Card>
</div>
{/* Quick Actions and Analytics */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
{/* Quick Actions */}
<Card
title={
<div className="flex items-center">
<span className={`${styles.icon} ${styles.iconBolt} text-yellow-500 mr-2`}></span>
<span>Hızlı Aksiyonlar</span>
</div>
}
className="shadow-sm hover:shadow-md transition-shadow lg:col-span-1"
>
<div className="grid grid-cols-2 gap-4">
<Button className={`${styles.quickActionButton} text-blue-600 hover:text-blue-700 hover:border-blue-300 ${styles.roundedButton} whitespace-nowrap`}>
<span className={`${styles.icon} ${styles.iconPlusCircle} ${styles.quickActionIcon}`}></span>
<span>Yeni Proje Başlat</span>
</Button>
<Button className={`${styles.quickActionButton} text-green-600 hover:text-green-700 hover:border-green-300 ${styles.roundedButton} whitespace-nowrap`} onClick={onStartCalculation}>
<span className={`${styles.icon} ${styles.iconCalculator} ${styles.quickActionIcon}`}></span>
<span>Hızlı Hesap</span>
</Button>
<Button className="h-24 flex flex-col items-center justify-center text-purple-600 hover:text-purple-700 hover:border-purple-300 !rounded-button whitespace-nowrap">
<span className={`${styles.icon} ${styles.iconBoxIcon} ${styles.quickActionIcon}`}></span>
<span>Ürün Tanımla</span>
</Button>
<Button className="h-24 flex flex-col items-center justify-center text-orange-600 hover:text-orange-700 hover:border-orange-300 !rounded-button whitespace-nowrap">
<span className={`${styles.icon} ${styles.iconMapMarker} ${styles.quickActionIcon}`}></span>
<span>Lokasyon Belirle</span>
</Button>
<Button className="h-24 flex flex-col items-center justify-center text-cyan-600 hover:text-cyan-700 hover:border-cyan-300 !rounded-button whitespace-nowrap">
<span className={`${styles.icon} ${styles.iconChartBar} ${styles.quickActionIcon}`}></span>
<span>Hesaplama Raporları</span>
</Button>
<Button className="h-24 flex flex-col items-center justify-center text-red-600 hover:text-red-700 hover:border-red-300 !rounded-button whitespace-nowrap">
<span className={`${styles.icon} ${styles.iconFilePdf} ${styles.quickActionIcon}`}></span>
<span>PDF Dışa Aktar</span>
</Button>
</div>
</Card>
{/* Analytics Charts */}
<Card
title={
<div className="flex items-center">
<span className={`${styles.icon} ${styles.iconChartLine} text-blue-600 mr-2`}></span>
<span>Son 30 Gün Hesaplama Aktivitesi</span>
</div>
}
className="shadow-sm hover:shadow-md transition-shadow"
>
<div id="activity-chart" className={styles.chartContainer}></div>
</Card>
<Card
title={
<div className="flex items-center">
<span className={`${styles.icon} ${styles.iconChartPie} text-green-600 mr-2`}></span>
<span>Yük Dağılımı</span>
</div>
}
className="shadow-sm hover:shadow-md transition-shadow"
>
<div id="distribution-chart" className={styles.chartContainer}></div>
</Card>
</div>
{/* Notifications and Help */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Notifications */}
<Card
title={
<div className="flex items-center">
<span className={`${styles.icon} ${styles.iconBell} text-orange-500 mr-2`}></span>
<span>Devam Edenler / Açık Uyarılar</span>
</div>
}
className="shadow-sm hover:shadow-md transition-shadow lg:col-span-2"
>
<div className="space-y-4">
<div className={`${styles.notificationItem} ${styles.notificationItemYellow}`}>
<span className={`${styles.icon} ${styles.iconExclamationTriangle} text-yellow-500 mt-1 mr-3`}></span>
<div>
<Text strong>Adana Projesi'nde giriş sıcaklığı eksik.</Text>
<div className="mt-1 flex justify-between">
<Text className="text-gray-600 text-sm">Eksik veriyi tamamlamadan hesaplama yapılamaz.</Text>
<Button type="link" size="small" className="text-blue-600 !rounded-button whitespace-nowrap">
Düzenle
</Button>
</div>
</div>
</div>
<div className={`${styles.notificationItem} ${styles.notificationItemOrange}`}>
<span className={`${styles.icon} ${styles.iconClipboardCheck} text-orange-500 mt-1 mr-3`}></span>
<div>
<Text strong>Ürün tipi belirlenmemiş 2 proje var.</Text>
<div className="mt-1 flex justify-between">
<Text className="text-gray-600 text-sm">Ürün tipini belirleyerek hesaplamayı tamamlayın.</Text>
<Button type="link" size="small" className="text-blue-600 !rounded-button whitespace-nowrap">
Görüntüle
</Button>
</div>
</div>
</div>
<div className={`${styles.notificationItem} ${styles.notificationItemGreen}`}>
<span className={`${styles.icon} ${styles.iconCheckCircle} text-green-500 mt-1 mr-3`}></span>
<div>
<Text strong>4 projenin sonucu başarıyla hesaplandı.</Text>
<div className="mt-1 flex justify-between">
<Text className="text-gray-600 text-sm">Sonuçları görüntüleyebilir veya rapor oluşturabilirsiniz.</Text>
<Button type="link" size="small" className="text-blue-600 !rounded-button whitespace-nowrap">
Sonuçları Gör
</Button>
</div>
</div>
</div>
<div className={`${styles.notificationItem} ${styles.notificationItemBlue}`}>
<span className={`${styles.icon} ${styles.iconInfoCircle} text-blue-500 mt-1 mr-3`}></span>
<div>
<Text strong>Cooling Maestro'nun yeni sürümü yayınlandı.</Text>
<div className="mt-1 flex justify-between">
<Text className="text-gray-600 text-sm">Yeni özellikler ve iyileştirmeler için güncellemeyi yapın.</Text>
<Button type="link" size="small" className="text-blue-600 !rounded-button whitespace-nowrap">
Güncelle
</Button>
</div>
</div>
</div>
</div>
</Card>
{/* Help Panel */}
<Card
title={
<div className="flex items-center">
<span className={`${styles.icon} ${styles.iconQuestionCircle} text-purple-600 mr-2`}></span>
<span>Yardım & Eğitim</span>
</div>
}
className="shadow-sm hover:shadow-md transition-shadow"
>
<div className="space-y-4">
<a href="#" className={styles.helpItem}>
<div className="flex items-center">
<div className={`${styles.helpIcon} ${styles.helpIconBlue}`}>
<span className={`${styles.icon} ${styles.iconBook} text-blue-600`}></span>
</div>
<div>
<Text strong>Soğutma Yükü Hesabı Nedir?</Text>
<Text className="text-gray-600 text-sm block">Temel kavramlar ve hesaplama yöntemleri</Text>
</div>
</div>
</a>
<a href="#" className={styles.helpItem}>
<div className="flex items-center">
<div className={`${styles.helpIcon} ${styles.helpIconGreen}`}>
<span className={`${styles.icon} ${styles.iconGraduationCap} text-green-600`}></span>
</div>
<div>
<Text strong>Yeni Başlayanlar İçin Rehber</Text>
<Text className="text-gray-600 text-sm block">Adım adım kullanım kılavuzu</Text>
</div>
</div>
</a>
<a href="#" className={styles.helpItem}>
<div className="flex items-center">
<div className={`${styles.helpIcon} ${styles.helpIconRed}`}>
<span className={`${styles.icon} ${styles.iconPlay} text-red-600`}></span>
</div>
<div>
<Text strong>Video: Cooling Maestro nasıl çalışır?</Text>
<Text className="text-gray-600 text-sm block">1 dakikalık tanıtım videosu</Text>
</div>
</div>
</a>
<div className="mt-6 pt-4 border-t border-gray-100">
<Button type="primary" block icon={<span className={`${styles.icon} ${styles.iconHeadset} mr-2`}></span>} className={`${styles.roundedButton} whitespace-nowrap`}>
Destek İste
</Button>
</div>
</div>
</Card>
</div>
</>
)}
</div>
</div>
</div>
);
};
export default Dashboard;