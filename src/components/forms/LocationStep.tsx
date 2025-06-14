import React from 'react';
import { Form, Button } from 'antd';

interface LocationStepProps {
  form: any;
  buildingLocation: string;
  setBuildingLocation: (value: string) => void;
  selectedProvince: string;
  setSelectedProvince: (value: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (value: string) => void;
  climateData: any;
  setClimateData: (value: any) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  onNext: () => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ onNext }) => {
  return (
    <div>
      <h3>Location Step</h3>
      <Button type="primary" onClick={onNext}>İleri</Button>
    </div>
  );
};

export default LocationStep;