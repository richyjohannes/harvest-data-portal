
import React, { useState } from 'react';
import { FoodProductionData, FOOD_TYPES } from '@/utils/chartUtils';
import { toast } from 'sonner';
import { PlusCircle, MinusCircle, Save, RefreshCw } from 'lucide-react';

interface DataInputFormProps {
  data: FoodProductionData;
  onDataChange: (newData: FoodProductionData) => void;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ data, onDataChange }) => {
  const [startYear, setStartYear] = useState<number>(data.years[0]);
  const [yearCount, setYearCount] = useState<number>(data.years.length);
  const [tempData, setTempData] = useState<FoodProductionData>(data);
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataChange(tempData);
    toast.success("Data berhasil diperbarui!");
  };
  
  const handleResetForm = () => {
    setTempData(data);
    setStartYear(data.years[0]);
    setYearCount(data.years.length);
    toast.info("Form direset ke data sebelumnya");
  };
  
  const handleLoadSampleData = () => {
    const sampleData: FoodProductionData = {
      years: [2018, 2019, 2020, 2021, 2022, 2023],
      datasets: {
        "Jagung": [259071, 257174, 260779, 260670, 272552, 288842],
        "Bungkil Kedelai": [71280, 67320, 72468, 75240, 71280, 78408],
        "Biji Minyak Kedelai": [15283, 15967, 18092, 19602, 16395, 20840],
        "Minyak Kedelai": [16128, 15232, 16397, 17024, 16128, 17741],
        "Beras": [148873, 148490, 144730, 148300, 148990, 149000],
        "Gandum": [134241, 131441, 133600, 134250, 136946, 136590],
        "Sorghum": [2465, 2909, 3137, 2970, 3377, 3000]
      }
    };
    
    setTempData(sampleData);
    setStartYear(sampleData.years[0]);
    setYearCount(sampleData.years.length);
    onDataChange(sampleData);
    toast.success("Data sampel berhasil dimuat!");
  };

  return (
    <div className="glass-panel p-4 md:p-6 animate-slide-in">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Input Data Produksi</h2>
            <button
              type="button"
              onClick={handleLoadSampleData}
              className="btn-secondary text-sm"
            >
              Muat Data Sampel
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full md:w-auto">
              <label htmlFor="startYear" className="input-label">
                Tahun Awal
              </label>
              <input
                id="startYear"
                type="number"
                value={startYear}
                onChange={handleYearChange}
                className="input-field w-32"
                min="1900"
                max="2100"
              />
            </div>
            
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleRemoveYear}
                className="btn-secondary h-10 px-2"
                title="Kurangi tahun"
                disabled={yearCount <= 2}
              >
                <MinusCircle size={18} />
              </button>
              
              <div className="w-20">
                <label className="input-label text-center block">
                  Jumlah Tahun
                </label>
                <div className="input-field flex justify-center items-center h-10">
                  {yearCount}
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleAddYear}
                className="btn-secondary h-10 px-2"
                title="Tambah tahun"
              >
                <PlusCircle size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 text-gray-600 font-medium">Jenis Produksi</th>
                {tempData.years.map(year => (
                  <th key={year} className="p-3 text-gray-600 font-medium">
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FOOD_TYPES.map((foodType, index) => (
                <tr key={foodType} className="border-b hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 font-medium">
                    <div className="micro-tag" style={{ backgroundColor: `rgba(${index * 40}, ${100 + index * 20}, ${200 - index * 10}, 0.1)` }}>
                      {foodType}
                    </div>
                  </td>
                  {tempData.years.map((year, yearIndex) => (
                    <td key={`${foodType}-${year}`} className="p-2">
                      <input
                        type="number"
                        value={tempData.datasets[foodType][yearIndex] || ''}
                        onChange={e => handleProductionChange(foodType, yearIndex, e.target.value)}
                        className="input-field text-center"
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
            className="btn-primary flex items-center gap-2"
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
