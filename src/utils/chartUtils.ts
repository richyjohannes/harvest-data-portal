import { ChartData, ChartOptions } from 'chart.js';

export interface FoodProductionData {
  years: number[];
  datasets: {
    [key: string]: number[];
  };
}

export interface DataConfig {
  type: 'Produksi' | 'Impor' | 'Konsumsi';
  country: string;
}

export const DEFAULT_FOOD_TYPES = [
  'Jagung',
  'Bungkil Kedelai',
  'Biji Minyak Kedelai',
  'Minyak Kedelai',
  'Beras',
  'Gandum',
  'Sorghum'
];

export const COUNTRIES = [
  'China',
  'Indonesia',
  'India',
  'Amerika Serikat',
  'Brazil',
  'Rusia',
  'Jepang'
];

export const DATA_TYPES = [
  'Produksi',
  'Impor',
  'Konsumsi'
];

export const CHART_COLORS = [
  'rgb(53, 162, 235)', // blue
  'rgb(255, 159, 64)', // orange
  'rgb(75, 192, 192)', // green
  'rgb(153, 102, 255)', // purple
  'rgb(201, 103, 107)', // brown
  'rgb(255, 99, 132)', // red
  'rgb(54, 235, 235)', // cyan
  'rgb(255, 205, 86)', // yellow
  'rgb(75, 192, 120)', // teal
  'rgb(201, 77, 168)', // pink
  'rgb(128, 98, 214)', // lavender
  'rgb(15, 174, 96)', // emerald
  'rgb(221, 81, 69)', // coral
  'rgb(77, 77, 77)', // charcoal
];

export const getInitialData = (startYear: number = 2010, count: number = 14, foodTypes: string[] = DEFAULT_FOOD_TYPES): FoodProductionData => {
  const years = Array.from({ length: count }, (_, i) => startYear + i);
  
  const datasets: { [key: string]: number[] } = {};
  foodTypes.forEach(type => {
    datasets[type] = Array(years.length).fill(0);
  });
  
  return { years, datasets };
};

export const getInitialConfig = (): DataConfig => {
  return {
    type: 'Produksi',
    country: 'China'
  };
};

export const generateChartTitle = (config: DataConfig): string => {
  return `${config.type} Pangan ${config.country}`;
};

export const generateChartData = (data: FoodProductionData): ChartData<'line'> => {
  const foodTypes = Object.keys(data.datasets);
  
  return {
    labels: data.years.map(year => year.toString()),
    datasets: foodTypes.map((type, index) => ({
      label: type,
      data: data.datasets[type],
      borderColor: CHART_COLORS[index % CHART_COLORS.length],
      backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 10,
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      pointBorderColor: CHART_COLORS[index % CHART_COLORS.length],
      fill: false,
    })),
  };
};

export const chartOptions = (config: DataConfig): ChartOptions<'line'> => ({
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
        text: `${config.type} (dalam 1000 MT)`,
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
      text: generateChartTitle(config),
      font: {
        size: 22,
        weight: 600,
      },
      padding: {
        top: 15,
        bottom: 30,
      },
      color: '#333',
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#333',
      bodyColor: '#333',
      titleFont: {
        size: 14,
        weight: 500,
      },
      bodyFont: {
        size: 13,
        weight: 500,
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
  },
  layout: {
    padding: {
      left: 15,
      right: 25,
      top: 25,
      bottom: 15,
    },
  },
  hover: {
    mode: 'nearest',
    intersect: false,
  },
});

export const researchData = (startYear: number = 2010, count: number = 14, foodTypes: string[] = DEFAULT_FOOD_TYPES): FoodProductionData => {
  // Function to generate research data (generate sensible random data)
  const years = Array.from({ length: count }, (_, i) => startYear + i);
  
  const generateRealisticTrend = (baseValue: number, volatility: number) => {
    return years.map((_, i) => {
      const trend = baseValue * (1 + (i * 0.05)); // 5% growth per year
      const randomFactor = (Math.random() - 0.5) * volatility; // Random factor with specified volatility
      return Math.round(trend * (1 + randomFactor));
    });
  };
  
  const baseValues = {
    "Jagung": 260000,
    "Bungkil Kedelai": 72000,
    "Biji Minyak Kedelai": 18000,
    "Minyak Kedelai": 16000,
    "Beras": 148000,
    "Gandum": 134000,
    "Sorghum": 3000
  };
  
  const datasets: { [key: string]: number[] } = {};
  
  foodTypes.forEach(type => {
    // Use the base value if it exists in predefined values, or generate a random base
    const baseValue = baseValues[type as keyof typeof baseValues] || Math.round(10000 + Math.random() * 100000);
    const volatility = 0.05 + Math.random() * 0.1; // Generate random volatility between 0.05 and 0.15
    datasets[type] = generateRealisticTrend(baseValue, volatility);
  });
  
  return { years, datasets };
};
