import { Tooltip } from "@material-tailwind/react";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Atrasados", value: 4 },
  { name: "Pendientes", value: 6 },
  { name: "En progreso", value: 2 },
  { name: "Completados", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
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

export function ReporteTableroPage() {
  return (
    <>
      <div>ReporteTableroPage</div>
      <div className="w-full h-full flex justify-start">
        {/* <ResponsiveContainer width="100%" height="100%" className={"border"}> */}
        <PieChart width={200} height={200} className="border">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(entry) => console.log(entry)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        {/* </ResponsiveContainer> */}
      </div>
    </>
  );
}
