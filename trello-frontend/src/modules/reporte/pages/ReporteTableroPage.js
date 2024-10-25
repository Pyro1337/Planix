import React from "react";
import { DataPieChartTemplate, PieChartTemplate } from "../components/PieChart";
import { useSelector } from "react-redux";

export function ReporteTableroPage() {
  const tableros = useSelector((state) => state.tablero.tableros);
  const getData = () => {
    const data = [];
    Object.entries(tableros).map((tablero) => {
      data.push({ name: tablero[1].name, value: tablero[1].items.length });
    });
    return data;
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <PieChartTemplate data={getData()} radius={100} />
        <DataPieChartTemplate data={getData()} />
      </div>
    </>
  );
}
