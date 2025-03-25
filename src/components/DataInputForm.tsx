
import React, { useState } from 'react';
import { FoodProductionData, FOOD_TYPES, DATA_TYPES, COUNTRIES, DataConfig, researchData } from '@/utils/chartUtils';
import { toast } from 'sonner';
import { PlusCircle, MinusCircle, Save, RefreshCw, Database, FileSpreadsheet, Beaker } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataInputFormProps {
  data: FoodProductionData;
  config: DataConfig;
  onDataChange: (newData: FoodProductionData) => void;
  onConfigChange: (newConfig: DataConfig) => void;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ data, config, onDataChange, onConfigChange }) => {
  const [startYear, setStartYear] = useState<number>(data.years[0]);
  const [yearCount, setYearCount] = useState<number>(data.years.length);
  const [tempData, setTempData] = useState<FoodProductionData>(data);
  const [tempConfig, setTempConfig] = useState<DataConfig>(config);
  
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setStartYear(value);
      updateYears(value, yearCount);
    }
  };
  
  const updateYears = (start: number, count: number) => {
    const newYears = Array.from({ length: count }, (_, i) => start + i);
    
    // Create new datasets with appropriate length
    const newDatasets: { [key: string]: number[] } = {};
    FOOD_TYPES.forEach(type => {
      newDatasets[type] = Array(count).fill(0).map((_, index) => {
        // Preserve existing data where possible
        const oldYearIndex = data.years.indexOf(start + index);
        return oldYearIndex >= 0 ? tempData.datasets[type][oldYearIndex] : 0;
      });
    });
    
    const newData = { years: newYears, datasets: newDatasets };
    setTempData(newData);
  };
  
  const handleAddYear = () => {
    const newCount = yearCount + 1;
    setYearCount(newCount);
    updateYears(startYear, newCount);
  };
  
  const handleRemoveYear = () => {
    if (yearCount > 2) {
      const newCount = yearCount - 1;
      setYearCount(newCount);
      updateYears(startYear, newCount);
    } else {
      toast.error("Minimal harus ada 2 tahun untuk membuat grafik");
    }
  };
  
  const handleProductionChange = (foodType: string, yearIndex: number, value: string) => {
    const parsedValue = parseInt(value, 10);
    const newValue = isNaN(parsedValue) ? 0 : parsedValue;
    
    const newDatasets = { ...tempData.datasets };
    newDatasets[foodType] = [...tempData.datasets[foodType]];
    newDatasets[foodType][yearIndex] = newValue;
    
    setTempData({ ...tempData, datasets: newDatasets });
  };
  
  const handleTypeChange = (value: 'Produksi' | 'Impor' | 'Konsumsi') => {
    setTempConfig({ ...tempConfig, type: value });
  };
  
  const handleCountryChange = (value: string) => {
    setTempConfig({ ...tempConfig, country: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataChange(tempData);
    onConfigChange(tempConfig);
    toast.success("Data berhasil diperbarui!");
  };
  
  const handleResetForm = () => {
    setTempData(data);
    setTempConfig(config);
    setStartYear(data.years[0]);
    setYearCount(data.years.length);
    toast.info("Form direset ke data sebelumnya");
  };
  
  const handleResearchData = () => {
    const researchedData = researchData();
    setTempData(researchedData);
    setStartYear(researchedData.years[0]);
    setYearCount(researchedData.years.length);
    toast.success("Data hasil riset berhasil dimuat!");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 animate-slide-in">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Konfigurasi Data</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResearchData}
                className="btn-secondary text-sm flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              >
                <Beaker size={16} />
                <span>Riset Data</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="input-label">Jenis Data</label>
              <Select 
                value={tempConfig.type} 
                onValueChange={(value: 'Produksi' | 'Impor' | 'Konsumsi') => handleTypeChange(value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-200 h-10">
                  <SelectValue placeholder="Pilih Jenis" />
                </SelectTrigger>
                <SelectContent>
                  {DATA_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="input-label">Negara</label>
              <Select 
                value={tempConfig.country} 
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-full bg-white border border-gray-200 h-10">
                  <SelectValue placeholder="Pilih Negara" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="startYear" className="input-label">
                Tahun Awal
              </label>
              <input
                id="startYear"
                type="number"
                value={startYear}
                onChange={handleYearChange}
                className="input-field w-full bg-white border border-gray-200 h-10"
                min="1900"
                max="2100"
              />
            </div>
            
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleRemoveYear}
                className="btn-icon h-10 w-10 flex items-center justify-center bg-white border border-gray-200 rounded-md"
                title="Kurangi tahun"
                disabled={yearCount <= 2}
              >
                <MinusCircle size={18} />
              </button>
              
              <div className="flex-1">
                <label className="input-label text-center block">
                  Jumlah
                </label>
                <div className="input-field flex justify-center items-center h-10 bg-white border border-gray-200">
                  {yearCount}
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleAddYear}
                className="btn-icon h-10 w-10 flex items-center justify-center bg-white border border-gray-200 rounded-md"
                title="Tambah tahun"
              >
                <PlusCircle size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden mb-6 shadow-sm">
          <div className="p-2 bg-gray-50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-gray-600" />
              <span className="font-medium text-sm text-gray-700">Data {tempConfig.type}</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 text-gray-600 font-medium border-r border-gray-100">
                    Jenis Produksi
                  </th>
                  {tempData.years.map(year => (
                    <th key={year} className="p-3 text-gray-600 font-medium border-r border-gray-100 min-w-20 text-center">
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FOOD_TYPES.map((foodType, index) => (
                  <tr key={foodType} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 font-medium border-r border-gray-100">
                      <div 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `rgba(${index * 40}, ${100 + index * 20}, ${200 - index * 10}, 0.1)`,
                          color: `rgba(${index * 40}, ${100 + index * 20}, ${200 - index * 10}, 1)`
                        }}
                      >
                        {foodType}
                      </div>
                    </td>
                    {tempData.years.map((year, yearIndex) => (
                      <td key={`${foodType}-${year}`} className="p-1 border-r border-gray-100 text-center">
                        <input
                          type="number"
                          value={tempData.datasets[foodType][yearIndex] || ''}
                          onChange={e => handleProductionChange(foodType, yearIndex, e.target.value)}
                          className="w-full text-center px-2 py-2 border-0 bg-transparent focus:ring-0 focus:outline-none"
                          min="0"
                          placeholder="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleResetForm}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Reset</span>
          </button>
          
          <button
            type="submit"
            className="btn-primary flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Save size={16} />
            <span>Simpan & Perbarui Grafik</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataInputForm;
