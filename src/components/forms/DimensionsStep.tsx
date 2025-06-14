import React from 'react';
import { Form, Button } from 'antd';

interface DimensionsStepProps {
  form: any;
  onNext: () => void;
  onBack: () => void;
}

const DimensionsStep: React.FC<DimensionsStepProps> = ({ onNext, onBack }) => {
  return (
    <div>
      <h3>Dimensions Step</h3>
      <Button onClick={onBack}>Geri</Button>
      <Button type="primary" onClick={onNext}>İleri</Button>
    </div>
  );
};

export default DimensionsStep;