
import React, { useState, useRef } from 'react';
import { FoodProductionData, FOOD_TYPES, DATA_TYPES, COUNTRIES, DataConfig, researchData } from '@/utils/chartUtils';
import { toast } from 'sonner';
import { PlusCircle, MinusCircle, Save, RefreshCw, Beaker, ClipboardPaste, HelpCircle, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [pasteModalOpen, setPasteModalOpen] = useState<boolean>(false);
  const [selectedFoodType, setSelectedFoodType] = useState<string>('');
  const [pasteContent, setPasteContent] = useState<string>('');
  const tableRef = useRef<HTMLTableElement>(null);
  
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setStartYear(value);
      updateYears(value, yearCount);
    }
  };
  
  const updateYears = (start: number, count: number) => {
    const newYears = Array.from({ length: count }, (_, i) => start + i);
    
    const newDatasets: { [key: string]: number[] } = {};
    FOOD_TYPES.forEach(type => {
      newDatasets[type] = Array(count).fill(0).map((_, index) => {
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
    const cleanValue = value.replace(/[^\d]/g, '');
    const parsedValue = parseInt(cleanValue, 10);
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
    // Use the default values (2010 with 14 years)
    const researchedData = researchData(2010, 14);
    setTempData(researchedData);
    setStartYear(researchedData.years[0]);
    setYearCount(researchedData.years.length);
    toast.success("Data hasil riset berhasil dimuat!");
  };

  const handleExcelPaste = (e: React.ClipboardEvent, foodType: string) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    processPastedData(clipboardData, foodType);
  };

  const processPastedData = (pasteData: string, foodType: string) => {
    const rows = pasteData.split(/[\n\r]+/).map(row => row.trim()).filter(row => row);
    
    if (rows.length === 0) {
      toast.error("Tidak ada data yang valid untuk ditempel");
      return;
    }

    // Handle multi-row paste (matrix)
    if (rows.length > 1) {
      handleMatrixPaste(rows);
      return;
    }

    // Handle single row paste
    const values = rows[0].split(/[\t\s]+/).filter(val => val.trim() !== '');
    
    if (values.length === 0) {
      toast.error("Tidak ada data yang valid untuk ditempel");
      return;
    }

    const newDatasets = { ...tempData.datasets };
    const newValues = [...tempData.datasets[foodType]];
    
    const valuesToUpdate = Math.min(values.length, tempData.years.length);
    
    for (let i = 0; i < valuesToUpdate; i++) {
      const cleanValue = values[i].replace(/[^\d]/g, '');
      const parsedValue = parseInt(cleanValue, 10);
      
      if (!isNaN(parsedValue)) {
        newValues[i] = parsedValue;
      }
    }
    
    newDatasets[foodType] = newValues;
    setTempData({ ...tempData, datasets: newDatasets });
    
    toast.success(`Data ${foodType} berhasil ditempel untuk ${valuesToUpdate} tahun`);
  };

  const handleMatrixPaste = (rows: string[]) => {
    // Determine if we have enough food types to handle all rows
    const validRowCount = Math.min(rows.length, FOOD_TYPES.length);
    
    const newDatasets = { ...tempData.datasets };
    
    for (let rowIndex = 0; rowIndex < validRowCount; rowIndex++) {
      const foodType = FOOD_TYPES[rowIndex];
      const values = rows[rowIndex].split(/[\t\s]+/).filter(val => val.trim() !== '');
      const newValues = [...tempData.datasets[foodType]];
      
      const valuesToUpdate = Math.min(values.length, tempData.years.length);
      
      for (let i = 0; i < valuesToUpdate; i++) {
        const cleanValue = values[i].replace(/[^\d]/g, '');
        const parsedValue = parseInt(cleanValue, 10);
        
        if (!isNaN(parsedValue)) {
          newValues[i] = parsedValue;
        }
      }
      
      newDatasets[foodType] = newValues;
    }
    
    setTempData({ ...tempData, datasets: newDatasets });
    toast.success(`Data matrix berhasil ditempel untuk ${validRowCount} jenis pangan`);
  };

  const openPasteModal = (foodType: string) => {
    setSelectedFoodType(foodType);
    setPasteContent('');
    setPasteModalOpen(true);
  };

  const handlePasteFromModal = () => {
    if (!pasteContent.trim() || !selectedFoodType) return;
    
    processPastedData(pasteContent, selectedFoodType);
    setPasteModalOpen(false);
  };

  // Handler for direct table paste
  const handleTablePaste = (e: React.ClipboardEvent) => {
    if (!tableRef.current) return;
    
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    const rows = clipboardData.split(/[\n\r]+/).map(row => row.trim()).filter(row => row);
    
    if (rows.length === 0) return;
    
    handleMatrixPaste(rows);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 animate-slide-in border border-indigo-100">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-1.5">
              <Info size={18} className="text-indigo-600" />
              Konfigurasi Data
            </h2>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={handleResearchData}
                      className="btn-secondary text-xs flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 px-3 py-1.5 rounded-md shadow-sm transition-all duration-200"
                    >
                      <Beaker size={14} />
                      <span>Riset Data</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Reset data dan hasilkan data sampel riset</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 px-2 py-1 rounded-md"
                      onClick={() => document.querySelector('[data-value="tutorial"]')?.dispatchEvent(new MouseEvent('click'))}
                    >
                      <HelpCircle size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Lihat tutorial</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="input-label text-xs">Jenis Data</label>
              <Select 
                value={tempConfig.type} 
                onValueChange={(value: 'Produksi' | 'Impor' | 'Konsumsi') => handleTypeChange(value)}
              >
                <SelectTrigger className="w-full bg-white border border-gray-200 h-9 text-sm">
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
              <label className="input-label text-xs">Negara</label>
              <Select 
                value={tempConfig.country} 
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-full bg-white border border-gray-200 h-9 text-sm">
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
              <label htmlFor="startYear" className="input-label text-xs">
                Tahun Awal
              </label>
              <input
                id="startYear"
                type="number"
                value={startYear}
                onChange={handleYearChange}
                className="input-field w-full bg-white border border-gray-200 h-9 text-sm px-3"
                min="1900"
                max="2100"
              />
            </div>
            
            <div className="flex items-end gap-1">
              <button
                type="button"
                onClick={handleRemoveYear}
                className="btn-icon h-9 w-9 flex items-center justify-center bg-white border border-gray-200 rounded-md"
                title="Kurangi tahun"
                disabled={yearCount <= 2}
              >
                <MinusCircle size={16} />
              </button>
              
              <div className="flex-1">
                <label className="input-label text-xs text-center block">
                  Jumlah
                </label>
                <div className="input-field flex justify-center items-center h-9 bg-white border border-gray-200 text-sm">
                  {yearCount}
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleAddYear}
                className="btn-icon h-9 w-9 flex items-center justify-center bg-white border border-gray-200 rounded-md"
                title="Tambah tahun"
              >
                <PlusCircle size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden mb-4 shadow-sm">
          <div className="p-2 bg-gradient-to-r from-indigo-50 to-blue-50 flex items-center justify-between border-b">
            <div className="flex items-center gap-1.5">
              <ClipboardPaste size={14} className="text-indigo-600" />
              <span className="font-medium text-xs text-gray-700">Data {tempConfig.type}</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-indigo-600 cursor-help flex items-center gap-1">
                    <span className="text-xs italic">Copy-paste Excel</span>
                    <Info size={12} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs">Paste langsung ke tabel untuk multi-row, atau klik ikon clipboard untuk satu baris. Semua decimal dan karakter non-angka akan dihilangkan.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="overflow-x-auto">
            <table 
              ref={tableRef} 
              className="w-full border-collapse min-w-full text-sm"
              onPaste={handleTablePaste}
            >
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 text-gray-600 font-medium border-r border-gray-100 text-xs sticky left-0 bg-gray-50 z-10 whitespace-nowrap">
                    Jenis Produksi
                  </th>
                  {tempData.years.map(year => (
                    <th key={year} className="p-1 text-gray-600 font-medium border-r border-gray-100 min-w-12 text-center text-xs">
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FOOD_TYPES.map((foodType, index) => (
                  <tr key={foodType} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-1.5 font-medium border-r border-gray-100 text-xs sticky left-0 bg-white z-10 whitespace-nowrap">
                      <div className="flex items-center justify-between">
                        <div 
                          className="px-1.5 py-0.5 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `rgba(${index * 40}, ${100 + index * 20}, ${200 - index * 10}, 0.1)`,
                            color: `rgba(${index * 40}, ${100 + index * 20}, ${200 - index * 10}, 1)`
                          }}
                        >
                          {foodType}
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => openPasteModal(foodType)}
                                className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                title={`Paste data Excel untuk ${foodType}`}
                              >
                                <ClipboardPaste size={12} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <p className="text-xs">Paste data Excel untuk {foodType}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    {tempData.years.map((year, yearIndex) => (
                      <td 
                        key={`${foodType}-${year}`} 
                        className="p-0 border-r border-gray-100 text-center relative group"
                      >
                        <input
                          type="text"
                          value={tempData.datasets[foodType][yearIndex] || ''}
                          onChange={e => handleProductionChange(foodType, yearIndex, e.target.value)}
                          className="w-full text-center px-1 py-1 border-0 bg-transparent focus:ring-1 focus:ring-indigo-300 focus:outline-none text-xs group-hover:bg-indigo-50/50"
                          min="0"
                          placeholder="0"
                          onPaste={(e) => handleExcelPaste(e, foodType)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleResetForm}
            className="btn-secondary flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
          
          <button
            type="submit"
            className="btn-primary flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-xs px-3 py-1.5 shadow-sm"
          >
            <Save size={14} />
            <span>Simpan & Perbarui Grafik</span>
          </button>
        </div>
      </form>

      {pasteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-5 max-w-md w-full border border-indigo-100 animate-scale-in">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <ClipboardPaste size={16} className="text-indigo-600" />
              Paste Data Excel
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Paste data dari Excel untuk {selectedFoodType}. Decimal dan karakter non-angka akan dihilangkan otomatis.
            </p>
            <textarea 
              className="w-full border rounded-md p-2 mb-3 h-24 font-mono text-xs focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none"
              placeholder="Paste data disini (misalnya: 100.5 200.7 300.9 atau 100,5&#9;200,7&#9;300,9)"
              value={pasteContent}
              onChange={(e) => setPasteContent(e.target.value)}
              onPaste={(e) => {
                const clipText = e.clipboardData.getData('text');
                setPasteContent(clipText);
                e.preventDefault();
              }}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button 
                type="button"
                className="px-3 py-1.5 border rounded-md text-gray-700 hover:bg-gray-50 text-xs"
                onClick={() => setPasteModalOpen(false)}
              >
                Batal
              </button>
              <button 
                type="button"
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-xs"
                onClick={handlePasteFromModal}
              >
                Tempel Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInputForm;
