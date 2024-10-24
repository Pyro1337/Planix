import React from "react";
import { DataPieChartTemplate, PieChartTemplate } from "../helpers/helpers";

const data = [
  { name: "Atrasados", value: 4 },
  { name: "Pendientes", value: 6 },
  { name: "En progreso", value: 2 },
  { name: "Completados", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function ReporteTableroPage() {
  return (
    <>
      <div>ReporteTableroPage</div>
      <div className="flex justify-start items-center">
        <PieChartTemplate data={data} colors={COLORS} radius={100} />
        <DataPieChartTemplate data={data} colors={COLORS} />
      </div>
    </>
  );
}
