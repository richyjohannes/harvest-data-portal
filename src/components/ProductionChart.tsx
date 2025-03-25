
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
    <div className="chart-container glass-panel p-4 md:p-6 animate-scale-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Visualisasi Data</h2>
          <p className="text-sm text-gray-500">Grafik produksi pangan China</p>
        </div>
        <button
          onClick={downloadChart}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <Download size={16} />
          <span>Unduh Grafik</span>
        </button>
      </div>
      
      <div 
        ref={chartRef} 
        className="bg-white rounded-lg p-4 shadow-sm"
        style={{ height: '400px' }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProductionChart;
