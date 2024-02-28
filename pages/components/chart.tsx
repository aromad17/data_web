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
  Legend
);

const options = {
  indexAxis: "x" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function ChartComponent({
  dataName,
  getMissingValue,
}: {
  dataName: any;
  getMissingValue: any;
}) {
  console.log("mv : ", getMissingValue);
  console.log(dataName);

  const labels = dataName;

  const dataValues = labels.map((label: string) => {
    const missing = getMissingValue[label] || 0;
    const total = getMissingValue["all_counts"];
    const notMissing = total - missing;
    return [missing, notMissing];
  });

  const data = {
    labels,
    datasets: [
      {
        label: "비결측치 수",
        data: dataValues.map((value: any) => value[1]),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "결측치 수",
        data: dataValues.map((value: any) => value[0]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true, // x축을 기준으로 바를 쌓음
      },
      y: {
        stacked: true, // y축을 기준으로 바를 쌓음
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
