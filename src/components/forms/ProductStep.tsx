import React from 'react';
import { Form, Button } from 'antd';

interface ProductStepProps {
  form: any;
  onNext: () => void;
  onBack: () => void;
}

const ProductStep: React.FC<ProductStepProps> = ({ onNext, onBack }) => {
  return (
    <div>
      <h3>Product Step</h3>
      <Button onClick={onBack}>Geri</Button>
      <Button type="primary" onClick={onNext}>İleri</Button>
    </div>
  );
};

export default ProductStep;