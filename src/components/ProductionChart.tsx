
import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FoodProductionData, generateChartData, chartOptions, DataConfig } from '@/utils/chartUtils';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { Download, TrendingUp } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProductionChartProps {
  data: FoodProductionData;
  config: DataConfig;
}

const ProductionChart: React.FC<ProductionChartProps> = ({ data, config }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const chartData = generateChartData(data);

  const downloadChart = async () => {
    if (chartRef.current === null) return;
    
    try {
      const dataUrl = await toPng(chartRef.current, { 
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: 'white',
      });
      
      const link = document.createElement('a');
      link.download = `${config.type.toLowerCase()}-pangan-${config.country.toLowerCase()}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('Grafik berhasil diunduh!');
    } catch (error) {
      console.error('Error downloading chart:', error);
      toast.error('Gagal mengunduh grafik');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 animate-scale-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="mb-3 md:mb-0">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-1.5">
            <TrendingUp className="text-indigo-600" size={18} />
            Visualisasi Data
          </h2>
          <p className="text-sm text-gray-600">{config.type} pangan {config.country}</p>
        </div>
        <button
          onClick={downloadChart}
          className="btn-primary flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs shadow-sm hover:shadow-md transition-all bg-indigo-600 hover:bg-indigo-700"
        >
          <Download size={14} />
          <span>Unduh Grafik</span>
        </button>
      </div>
      
      <div 
        ref={chartRef} 
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
        style={{ height: '850px' }} // Increased height further
      >
        <Line data={chartData} options={chartOptions(config)} />
      </div>
    </div>
  );
};

export default ProductionChart;
