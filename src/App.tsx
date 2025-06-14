import React, { useState } from "react";
import { Form, Breadcrumb, Steps, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";

// Bileşenler
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import LocationStep from './components/forms/LocationStep';
import StorageTypeStep from './components/forms/StorageTypeStep';
import DimensionsStep from './components/forms/DimensionsStep';
import ProductStep from './components/forms/ProductStep';
import ResultsStep from './components/forms/ResultsStep';

// Tipler ve servisler
import { BuildingLocation, CalculationType, ClimateData, CalculationResult } from './types';
import { CalculationService } from './services/calculation.service';
import { ClimateService } from './services/climate.service';
import { ProjectService, Project } from './services/project.service';

// Stiller
import 'swiper/css';
import 'swiper/css/pagination';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [buildingLocation, setBuildingLocation] = useState<BuildingLocation>("inside");
  const [selectedCalculationType, setSelectedCalculationType] = useState<CalculationType | null>(null);
  const [showCalculationForm, setShowCalculationForm] = useState<boolean>(false);
  const [showLoginScreen, setShowLoginScreen] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  
  // Konum state'leri
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [climateData, setClimateData] = useState<ClimateData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Adım bilgileri
  const steps = [
    { title: 'Konum', icon: 'fa-map-marker-alt' },
    { title: 'Depo Tipi', icon: 'fa-warehouse' },
    { title: 'Boyutlar', icon: 'fa-ruler-combined' },
    { title: 'Ürünler', icon: 'fa-boxes' },
    { title: 'Ekipman', icon: 'fa-cogs' },
    { title: 'Sonuçlar', icon: 'fa-chart-pie' },
  ];

  const handleStartCalculation = () => {
    setSelectedCalculationType('detailed');
    setShowCalculationForm(true);
  };

  const handleLogoClick = () => {
    setShowCalculationForm(false);
    setCurrentStep(0);
    setCalculationResult(null);
    setCurrentProjectId(null);
    form.resetFields();
  };

  const handleStepChange = (step: number) => {
    // Form doğrulaması yapılabilir
    setCurrentStep(step);
  };

  const handleCalculate = async () => {
    try {
      const formValues = form.getFieldsValue();
      const result = CalculationService.calculate(formValues);
      setCalculationResult(result);
      setCurrentStep(5); // Sonuçlar adımına git
    } catch (error) {
      message.error('Hesaplama sırasında bir hata oluştu');
      console.error(error);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCalculationResult(null);
    setCurrentProjectId(null);
    form.resetFields();
    setSelectedProvince("");
    setSelectedDistrict("");
    setClimateData(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formValues = form.getFieldsValue();
      
      // Proje adı iste
      const projectName = prompt('Proje adını giriniz:');
      if (!projectName) return;

      const projectData: Project = {
        name: projectName,
        description: `${formValues.province} - ${formValues.district} soğutma projesi`,
        ...formValues,
        total_load: calculationResult?.totalLoad,
        calculation_result: calculationResult!,
      };

      if (currentProjectId) {
        // Mevcut projeyi güncelle
        await ProjectService.updateProject(currentProjectId, projectData);
        message.success('Proje güncellendi!');
      } else {
        // Yeni proje oluştur
        const newProject = await ProjectService.createProject(projectData);
        setCurrentProjectId(newProject.id!);
        
        // Hesaplama geçmişini kaydet
        if (newProject.id && calculationResult) {
          await ProjectService.saveCalculation(
            newProject.id,
            formValues,
            calculationResult
          );
        }
        
        message.success('Proje kaydedildi!');
      }
    } catch (error) {
      message.error('Kayıt sırasında bir hata oluştu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const fetchClimateData = async () => {
    if (!selectedProvince || !selectedDistrict) return;
    
    setLoading(true);
    try {
      const response = await ClimateService.getClimateData(selectedProvince, selectedDistrict);
      if (response.success && response.data) {
        setClimateData(response.data);
        if (response.message) {
          message.info(response.message);
        }
      }
    } catch (error) {
      message.error('İklim verileri alınamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showLoginScreen ? (
        <LoginScreen 
          onLoginSuccess={() => {
            setShowLoginScreen(false);
            setShowDashboard(true);
          }}
          onBackToHome={() => setShowLoginScreen(false)}
        />
      ) : showDashboard ? (
        <Dashboard 
          onStartCalculation={() => {
            setShowDashboard(false);
            setShowCalculationForm(true);
          }}
          onLogout={() => {
            setShowDashboard(false);
            setShowLoginScreen(false);
            setShowCalculationForm(false);
          }}
        />
      ) : !showCalculationForm ? (
        <WelcomeScreen 
          onStartCalculation={handleStartCalculation}
          onLogin={() => setShowLoginScreen(true)}
        />
      ) : (
        <>
          <Header onLogoClick={handleLogoClick} />
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <Breadcrumb.Item>
              <HomeOutlined />
              <span>Ana Sayfa</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Hesaplamalar</Breadcrumb.Item>
            <Breadcrumb.Item>Detaylı Hesaplama</Breadcrumb.Item>
          </Breadcrumb>

          {/* Adımlar */}
          <Steps
            current={currentStep}
            onChange={handleStepChange}
            className="mb-8"
            items={steps.map((step, index) => ({
              title: step.title,
              icon: <i className={`fas ${step.icon}`}></i>,
              disabled: index > currentStep && !calculationResult,
            }))}
          />

          {/* Form Adımları */}
          <Form form={form} layout="vertical" className="space-y-8">
            {currentStep === 0 && (
              <LocationStep
                form={form}
                buildingLocation={buildingLocation}
                setBuildingLocation={setBuildingLocation}
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                climateData={climateData}
                setClimateData={setClimateData}
                loading={loading}
                setLoading={setLoading}
                onNext={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 1 && (
              <StorageTypeStep
                form={form}
                onNext={() => setCurrentStep(2)}
                onBack={() => setCurrentStep(0)}
              />
            )}

            {currentStep === 2 && (
              <DimensionsStep
                form={form}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <ProductStep
                form={form}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Ekipman ve Personel Bilgileri</h2>
                <p className="text-gray-600 mb-8">
                  Bu bölüm henüz geliştirilme aşamasındadır.
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2 border border-gray-300 rounded-lg"
                  >
                    Geri
                  </button>
                  <button
                    onClick={handleCalculate}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Hesapla
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && calculationResult && (
              <ResultsStep
                result={calculationResult}
                onReset={handleReset}
                onSave={handleSave}
                onPrint={handlePrint}
              />
            )}
          </Form>
        </div>
        <Footer />
        </>
      )}
    </div>
  );
};

export default App;