
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
      tension: 0.4,
      borderWidth: 4,
      pointRadius: 6,
      pointHoverRadius: 10,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      pointBorderColor: CHART_COLORS[index % CHART_COLORS.length],
      fill: false,
    })),
  };
};

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: 'easeOutQuart',
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Produksi (dalam 1000 MT)',
        font: {
          size: 16,
          weight: 500,
        },
        padding: {
          bottom: 15,
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        // Removing drawBorder as it's not a valid property
      },
      ticks: {
        font: {
          size: 14,
        },
        padding: 10,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Tahun',
        font: {
          size: 16,
          weight: 500,
        },
        padding: {
          top: 15,
        },
      },
      grid: {
        display: false,
        // Removing drawBorder as it's not a valid property
      },
      ticks: {
        font: {
          size: 14,
        },
        padding: 10,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      align: 'center',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        padding: 25,
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: 'Produksi Pangan China',
      font: {
        size: 22,
        weight: 600,
      },
      padding: {
        top: 20,
        bottom: 40,
      },
      color: '#333',
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#333',
      bodyColor: '#333',
      titleFont: {
        size: 16,
        weight: 500,
      },
      bodyFont: {
        size: 14,
        weight: 500,
      },
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 16,
      boxPadding: 8,
      usePointStyle: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} (1000 MT)`;
        }
      },
      cornerRadius: 8,
    },
  },
  elements: {
    line: {
      borderJoinStyle: 'round',
      capBezierPoints: true,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
    // Removing animationDuration as it's not a valid property here
  },
  layout: {
    padding: {
      left: 15,
      right: 25,
      top: 25,
      bottom: 15,
    },
  },
  // Moving hover configuration to the correct location
  hover: {
    mode: 'nearest',
    intersect: false,
  },
};
