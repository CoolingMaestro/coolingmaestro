import React, { useState } from 'react';
import { Card, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './CalculationSelection.module.css';

const { Title, Text } = Typography;

interface CalculationSelectionProps {
  onSelectCalculationType: (type: 'quick' | 'detailed') => void;
  onBack?: () => void;
}

const CalculationSelection: React.FC<CalculationSelectionProps> = ({ onSelectCalculationType, onBack }) => {
  const [selectedType, setSelectedType] = useState<'quick' | 'detailed' | null>(null);

  const handleSelect = (type: 'quick' | 'detailed') => {
    setSelectedType(type);
    onSelectCalculationType(type);
  };

  return (
    <div className={styles.calculationSelection}>
      <div className={styles.header}>
        {onBack && (
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
            className={styles.backButton}
          >
            Geri
          </Button>
        )}
        <Title level={2} className={styles.title}>
          Endüstriyel Soğutma Yükü Hesaplama Formu
        </Title>
        <Text className={styles.subtitle}>
          Lütfen hesaplama tipini seçiniz.
        </Text>
      </div>

      <div className={styles.cardsContainer}>
        {/* Hızlı Hesaplama Kartı */}
        <div 
          className={`${styles.calculationCard} ${selectedType === 'quick' ? styles.selected : ''}`}
          onClick={() => handleSelect('quick')}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              <span className={`${styles.icon} ${styles.iconBolt}`}></span>
            </div>
            <div className={styles.cardTitleContainer}>
              <h3 className={styles.cardTitle}>Hızlı Hesaplama</h3>
              <p className={styles.cardSubtitle}>5 dakika içinde sonuç alın</p>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li>
              <span className={`${styles.icon} ${styles.iconCheck}`}></span>
              <span>Temel parametrelerle hızlı hesaplama</span>
            </li>
            <li>
              <span className={`${styles.icon} ${styles.iconCheck}`}></span>
              <span>Yaklaşık değerler</span>
            </li>
            <li>
              <span className={`${styles.icon} ${styles.iconCheck}`}></span>
              <span>Ön fizibilite için ideal</span>
            </li>
          </ul>
        </div>

        {/* Detaylı Hesaplama Kartı */}
        <div 
          className={`${styles.calculationCard} ${selectedType === 'detailed' ? styles.selected : ''}`}
          onClick={() => handleSelect('detailed')}
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              <span className={`${styles.icon} ${styles.iconClipboard}`}></span>
            </div>
            <div className={styles.cardTitleContainer}>
              <h3 className={styles.cardTitle}>Detaylı Hesaplama</h3>
              <p className={styles.cardSubtitle}>Hassas sonuçlar için detaylı analiz</p>
            </div>
          </div>
          <ul className={styles.featureList}>
            <li>
              <span className={`${styles.icon} ${styles.iconCheck}`}></span>
              <span>Kapsamlı parametre girişi</span>
            </li>
            <li>
              <span className={`${styles.icon} ${styles.iconCheck}`}></span>
              <span>Yüksek hassasiyetli sonuçlar</span>
            </li>
            <li>
              <span className={`${styles.icon} ${styles.iconCheck}`}></span>
              <span>Profesyonel projeler için uygun</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalculationSelection;