import { Tooltip } from "@material-tailwind/react";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF00FF", "#FF0000", "#0000FF"];
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function PieChartTemplate({ data, radius }) {
  return (
    <PieChart width={radius * 2} height={radius * 2}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={radius}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
// Alt + 96 -> ``
export function DataPieChartTemplate({ data }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {data.map((item, index) => (
        <div className="flex flex-row gap-2 items-center">
          <div
            className={`w-2 h-2 rounded-full`}
            style={{ backgroundColor: COLORS[index] }}
          ></div>
          <div className="font-semibold">{item.name}:</div>
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
