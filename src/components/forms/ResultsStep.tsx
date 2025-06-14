import React from 'react';
import { Button } from 'antd';

interface ResultsStepProps {
  result: any;
  onReset: () => void;
  onSave: () => void;
  onPrint: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ result, onReset, onSave, onPrint }) => {
  return (
    <div>
      <h3>Results Step</h3>
      <Button onClick={onReset}>Yeni Hesaplama</Button>
      <Button onClick={onSave}>Kaydet</Button>
      <Button onClick={onPrint}>Yazdır</Button>
    </div>
  );
};

export default ResultsStep;