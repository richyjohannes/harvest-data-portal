
import { ChartData, ChartOptions } from 'chart.js';

export interface FoodProductionData {
  years: number[];
  datasets: {
    [key: string]: number[];
  };
}

export const FOOD_TYPES = [
  'Jagung',
  'Bungkil Kedelai',
  'Biji Minyak Kedelai',
  'Minyak Kedelai',
  'Beras',
  'Gandum',
  'Sorghum'
];

export const CHART_COLORS = [
  'rgb(53, 162, 235)', // blue
  'rgb(255, 159, 64)', // orange
  'rgb(75, 192, 192)', // green
  'rgb(153, 102, 255)', // purple
  'rgb(201, 103, 107)', // brown
  'rgb(255, 99, 132)', // red
  'rgb(54, 235, 235)', // cyan
];

export const getInitialData = (): FoodProductionData => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);
  
  const datasets: { [key: string]: number[] } = {};
  FOOD_TYPES.forEach(type => {
    datasets[type] = Array(years.length).fill(0);
  });
  
  return { years, datasets };
};

export const generateChartData = (data: FoodProductionData): ChartData<'line'> => {
  return {
    labels: data.years.map(year => year.toString()),
    datasets: FOOD_TYPES.map((type, index) => ({
      label: type,
      data: data.datasets[type],
      borderColor: CHART_COLORS[index % CHART_COLORS.length],
      backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
      tension: 0.3,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };
};

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Produksi (dalam 1000 MT)',
        font: {
          size: 14,
          weight: 500, // Changed from '500' to 500
        },
        padding: {
          bottom: 10,
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.06)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Tahun',
        font: {
          size: 14,
          weight: 500, // Changed from '500' to 500
        },
        padding: {
          top: 10,
        },
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        padding: 20,
      },
    },
    title: {
      display: true,
      text: 'Produksi Pangan China',
      font: {
        size: 18,
        weight: 600, // Changed from '600' to 600
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      titleColor: '#000',
      bodyColor: '#000',
      bodyFont: {
        weight: 500, // Changed from '500' to 500
      },
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} (1000 MT)`;
        }
      }
    },
  },
  elements: {
    line: {
      borderJoinStyle: 'round',
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: {
      left: 10,
      right: 20,
      top: 20,
      bottom: 10,
    },
  },
};
