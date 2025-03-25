
import React, { useState } from 'react';
import DataInputForm from '@/components/DataInputForm';
import ProductionChart from '@/components/ProductionChart';
import { FoodProductionData, getInitialData, getInitialConfig, DataConfig } from '@/utils/chartUtils';

const Index = () => {
  const [data, setData] = useState<FoodProductionData>(getInitialData());
  const [config, setConfig] = useState<DataConfig>(getInitialConfig());
  
  const handleDataChange = (newData: FoodProductionData) => {
    setData(newData);
  };
  
  const handleConfigChange = (newConfig: DataConfig) => {
    setConfig(newConfig);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="micro-tag mb-3 bg-indigo-100 text-indigo-700">Visualisasi Data</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {config.type} Pangan {config.country}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Input data {config.type.toLowerCase()} pangan dan visualisasikan dalam bentuk grafik interaktif
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 gap-12">
          <DataInputForm 
            data={data} 
            config={config}
            onDataChange={handleDataChange} 
            onConfigChange={handleConfigChange}
          />
          
          <div className="w-full max-w-7xl mx-auto">
            <ProductionChart data={data} config={config} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>Visualisasi Data {config.type} Pangan {config.country}</p>
            <p className="mt-1">© {new Date().getFullYear()} - Dibuat dengan teknologi modern</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
