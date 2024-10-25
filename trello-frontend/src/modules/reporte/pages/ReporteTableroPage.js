import React from "react";
import { DataPieChartTemplate, PieChartTemplate } from "../components/PieChart";
import { useSelector } from "react-redux";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function ReporteTableroPage() {
  const navigate = useNavigate();

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
      <div className="m-6">
        <button onClick={() => navigate("/tableros/1")}>
          <ArrowLeft className="w-8 h-8" />
        </button>
      </div>

      <div className="flex justify-start items-center m-8">
        <PieChartTemplate data={getData()} radius={100} />
        <DataPieChartTemplate data={getData()} />
      </div>
    </>
  );
}
