
import React, { useState } from 'react';
import DataInputForm from '@/components/DataInputForm';
import ProductionChart from '@/components/ProductionChart';
import { FoodProductionData, getInitialData } from '@/utils/chartUtils';

const Index = () => {
  const [data, setData] = useState<FoodProductionData>(getInitialData());
  
  const handleDataChange = (newData: FoodProductionData) => {
    setData(newData);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="micro-tag mb-2">Data Visualization</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900">
              Produksi Pangan China
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Input data produksi pangan dan visualisasikan dalam bentuk grafik interaktif
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 gap-8">
          <DataInputForm 
            data={data} 
            onDataChange={handleDataChange} 
          />
          
          <ProductionChart data={data} />
        </div>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>Visualisasi Data Produksi Pangan China</p>
            <p className="mt-1">© {new Date().getFullYear()} - Dibuat dengan teknologi modern</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
