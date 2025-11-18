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
import React from 'react';
import { BarChart } from '@/src/types/backend-data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StackedBarGraphsProps {
  barCharts: BarChart[];
  loading?: boolean;
  error?: any;
}

function simplifyLabel(title: string) {
  if (!title) return "";
  const words = title.split(' ');
  const twoWords = words.slice(0, 2).join(' ');
  if (twoWords.length <= 20) {
    return twoWords + (words.length > 2 ? "..." : "");
  }
  return title.slice(0, 20) + (title.length > 20 ? "..." : "");
}

const getOptions = (chartTitle: string, fullTitles: string[]) => ({
  plugins: {
    title: {
      display: true,
      text: chartTitle,
    },
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        title: function(tooltipItems: any) {
          if (
            tooltipItems &&
            tooltipItems.length > 0 &&
            typeof tooltipItems[0].dataIndex === 'number'
          ) {
            const idx = tooltipItems[0].dataIndex;
            return fullTitles[idx] || '';
          }
          return '';
        }
      }
    }
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

const StackedBarGraphs: React.FC<StackedBarGraphsProps> = ({
  barCharts,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="w-full flex flex-col gap-8">
        <div className="h-[250px] flex items-center justify-center">Loading...</div>
        <div className="h-[250px] flex items-center justify-center">Loading...</div>
        <div className="h-[250px] flex items-center justify-center">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex flex-col gap-8">
        <div className="h-[250px] flex items-center justify-center text-red-500">
          Error loading data.
        </div>
      </div>
    );
  }

  const labels = barCharts.map(c => simplifyLabel(c.title));
  const fullTitles = barCharts.map(c => c.title);

  const enrolleesData = {
    labels,
    datasets: [
      {
        label: 'Enrollees',
        data: barCharts.map(c => c.totalEnrollees),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        stack: 'enrollees',
      }
    ]
  };

  const completionRateData = {
    labels,
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: barCharts.map(c => c.completionRate),
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
        stack: 'completion',
      }
    ]
  };

  const hasAverageRating = barCharts.some(chart => typeof chart.rateAverage === 'number');
  let ratingData = undefined;
  if (hasAverageRating) {
    ratingData = {
      labels,
      datasets: [
        {
          label: 'Average Rating',
          data: barCharts.map(c => c.rateAverage ?? 0),
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          stack: 'rating',
        }
      ]
    };
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full h-[250px]">
        <Bar
          data={enrolleesData}
          options={getOptions('Course Total Enrollees', fullTitles)}
        />
      </div>
      <div className="w-full h-[250px]">
        <Bar
          data={completionRateData}
          options={getOptions('Course Completion Rate', fullTitles)}
        />
      </div>
      {hasAverageRating && (
        <div className="w-full h-[250px]">
          <Bar
            data={ratingData!}
            options={getOptions('Course Average Rating', fullTitles)}
          />
        </div>
      )}
    </div>
  );
}

export default StackedBarGraphs;
