
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
import { FoodProductionData, generateChartData, chartOptions } from '@/utils/chartUtils';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';
import { Download } from 'lucide-react';

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
}

const ProductionChart: React.FC<ProductionChartProps> = ({ data }) => {
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
      link.download = `produksi-pangan-china-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('Grafik berhasil diunduh!');
    } catch (error) {
      console.error('Error downloading chart:', error);
      toast.error('Gagal mengunduh grafik');
    }
  };

  return (
    <div className="chart-container glass-panel p-4 md:p-8 animate-scale-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Visualisasi Data</h2>
          <p className="text-md text-gray-600">Grafik produksi pangan China</p>
        </div>
        <button
          onClick={downloadChart}
          className="btn-primary flex items-center gap-2 px-5 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
        >
          <Download size={18} />
          <span>Unduh Grafik</span>
        </button>
      </div>
      
      <div 
        ref={chartRef} 
        className="bg-white rounded-xl p-6 shadow-lg"
        style={{ height: '600px' }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProductionChart;
