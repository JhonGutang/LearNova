import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

/*
  This chart visualizes the distribution of enrollees based on the star rating they have given 
  across all courses by the author. The total number of ratings equals the total number of enrollees 
  who have provided a rating on any course by this author.
*/

const PieChart = () => {
  // In a real app, fetch/process this data based on enrollees' actual ratings across all courses
  // Example: 98 enrollees gave 5, 75 gave 4, etc. (total enrollees who rated: 260)
  const enrolleeRatings = [98, 75, 52, 25, 10]; // [5, 4, 3, 2, 1 stars]
  const totalRated = enrolleeRatings.reduce((a, b) => a + b, 0);

  const data = {
    labels: [
      `5 Star (${enrolleeRatings[0]})`,
      `4 Star (${enrolleeRatings[1]})`,
      `3 Star (${enrolleeRatings[2]})`,
      `2 Star (${enrolleeRatings[3]})`,
      `1 Star (${enrolleeRatings[4]})`
    ],
    datasets: [
      {
        label: "Enrollee Ratings",
        data: enrolleeRatings,
        backgroundColor: [
          "rgb(34,197,94)",   // 5 Star: Green
          "rgb(59,130,246)",  // 4 Star: Blue
          "rgb(251,191,36)",  // 3 Star: Yellow
          "rgb(251,113,133)", // 2 Star: Pinkish-red
          "rgb(239,68,68)"    // 1 Star: Red
        ],
        hoverOffset: 4,
      }
    ]
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
          label: function(context: any) {
            const count = context.parsed;
            const percent = totalRated
              ? ((count / totalRated) * 100).toFixed(1)
              : 0;
            return `${context.label}: ${count} (${percent}%)`;
          }
        }
      }
    }
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
