import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const enrolleeRatings = [
    { rate: 5, count: 98 },
    { rate: 4, count: 75 },
    { rate: 3, count: 52 },
    { rate: 2, count: 25 },
    { rate: 1, count: 10 },
  ];
  const totalRated = enrolleeRatings.reduce((a, b) => a + b.count, 0);

  const data = {
    labels: enrolleeRatings.map(
      (rating) => `${rating.rate} Star (${rating.count})`
    ),
    datasets: [
      {
        label: "Enrollee Ratings",
        data: enrolleeRatings.map((rating) => rating.count),
        backgroundColor: [
          "rgb(34,197,94)",
          "rgb(59,130,246)",
          "rgb(251,191,36)",
          "rgb(251,113,133)",
          "rgb(239,68,68)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Enrollee Ratings Distribution (All Courses)",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const count = context.parsed;
            const percent = totalRated
              ? ((count / totalRated) * 100).toFixed(1)
              : 0;
            return `${context.label}: ${count} (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Doughnut data={data} options={options} />
      <div className="text-center text-xs text-gray-500 mt-2">
        Total Enrollees Who Rated: <span className="font-semibold">{totalRated}</span>
      </div>
    </div>
  );
};

export default PieChart;
