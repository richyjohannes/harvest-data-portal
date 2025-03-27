
import React, { useState, useEffect } from 'react';
import DataInputForm from '@/components/DataInputForm';
import ProductionChart from '@/components/ProductionChart';
import Tutorial from '@/components/Tutorial';
import { FoodProductionData, getInitialData, getInitialConfig, DataConfig } from '@/utils/chartUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileSpreadsheet, BookOpen } from 'lucide-react';

const Index = () => {
  const [data, setData] = useState<FoodProductionData>(getInitialData(2010, 14));
  const [config, setConfig] = useState<DataConfig>(getInitialConfig());
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  
  const handleDataChange = (newData: FoodProductionData) => {
    setData(newData);
  };
  
  const handleConfigChange = (newConfig: DataConfig) => {
    setConfig(newConfig);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] opacity-10 bg-center bg-cover"></div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="h-10 w-10 mr-2 animate-pulse" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Visualisasi Data {config.type} Pangan
              </h1>
            </div>
            <p className="text-indigo-100 text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Platform analisis visual data {config.type.toLowerCase()} pangan modern untuk pemahaman yang lebih baik tentang tren produksi, impor, dan konsumsi pangan global.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-indigo-50 to-transparent"></div>
      </div>
      
      <main className="container mx-auto px-4 py-8 pb-16">
        <Tabs defaultValue="data" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="data" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Data & Chart</span>
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Tutorial</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="data" className="space-y-8 animate-fade-in">
            <DataInputForm 
              data={data} 
              config={config}
              onDataChange={handleDataChange} 
              onConfigChange={handleConfigChange}
            />
            
            <div className="w-full max-w-7xl mx-auto">
              <ProductionChart data={data} config={config} />
            </div>
          </TabsContent>
          
          <TabsContent value="tutorial" className="animate-fade-in">
            <Tutorial />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              <p>Visualisasi Data {config.type} Pangan {config.country}</p>
              <p className="mt-1">© {new Date().getFullYear()} - Dibuat dengan teknologi modern</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="text-xs">Deploy dengan GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
