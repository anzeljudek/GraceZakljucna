import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Podatki o prebivalstvu v Sloveniji (po starosti)",
    },
  },
};

export function Grafi(props) {
  const prebivalstvo = props.prebivalstvo;
  const labels = prebivalstvo[1];

  const data = {
    labels,
    datasets: [
      {
        label: "Slovenija",
        data: prebivalstvo[1],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
