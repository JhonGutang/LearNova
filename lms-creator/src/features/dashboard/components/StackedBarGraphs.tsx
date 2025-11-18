import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components for bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const courseLabels = [
  'Introduction to Python',
  'Advanced Mathematics',
  'Creative Writing'
];

// 1. Only one dataset for course rate comparison
const rateData = {
  labels: courseLabels,
  datasets: [
    {
      label: 'Average Rate',
      data: [4.5, 4.2, 4.7], // choose one dataset only (e.g., A Rate or any aggregated/representative)
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      stack: 'rates'
    }
  ]
};

// 2. Only one dataset for total enrollees (e.g., most recent year)
const enrolleesData = {
  labels: courseLabels,
  datasets: [
    {
      label: '2024 Enrollees',
      data: [150, 130, 160],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      stack: 'enrollees'
    }
  ]
};

// 3. Only one dataset for completion count (e.g., Completed)
const completionRateData = {
  labels: courseLabels,
  datasets: [
    {
      label: 'Completed',
      data: [110, 90, 135],
      backgroundColor: 'rgba(40, 167, 69, 0.7)',
      stack: 'completion'
    }
  ]
};

// Generic options for stacked bar charts (stacked property can stay for consistency even if only one dataset)
const getOptions = (chartTitle: string) => ({
  plugins: {
    title: {
      display: true,
      text: chartTitle,
    },
    legend: {
      position: 'top' as const,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
});

const StackedBarGraphs = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Rate Comparison Bar Graph */}
      <div className="w-full h-[250px]">
        <Bar data={rateData} options={getOptions('Course Rate Comparison')} />
      </div>
      {/* 2. Total Enrollees Bar Graph */}
      <div className="w-full h-[250px]">
        <Bar data={enrolleesData} options={getOptions('Course Total Enrollees')} />
      </div>
      {/* 3. Completion Rate Bar Graph */}
      <div className="w-full h-[250px]">
        <Bar data={completionRateData} options={getOptions('Course Completion Rate')} />
      </div>
    </div>
  );
};

export default StackedBarGraphs;
