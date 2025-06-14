import React from 'react';
import { Form, Button } from 'antd';

interface StorageTypeStepProps {
  form: any;
  onNext: () => void;
  onBack: () => void;
}

const StorageTypeStep: React.FC<StorageTypeStepProps> = ({ onNext, onBack }) => {
  return (
    <div>
      <h3>Storage Type Step</h3>
      <Button onClick={onBack}>Geri</Button>
      <Button type="primary" onClick={onNext}>İleri</Button>
    </div>
  );
};

export default StorageTypeStep;