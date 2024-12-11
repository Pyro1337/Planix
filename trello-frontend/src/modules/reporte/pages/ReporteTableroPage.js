import React from "react";
import { DataPieChartTemplate, PieChartTemplate } from "../components/PieChart";
import { useSelector } from "react-redux";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { SimpleBarChart } from "../components/SimpleBarChart";

export function ReporteTableroPage() {
  const navigate = useNavigate();

  const tableros = useSelector((state) => state.tablero.tableros);

  const getDataPieChart = () => {
    const data = [];
    Object.entries(tableros).map((tablero) => {
      data.push({ name: tablero[1].name, value: tablero[1].items.length });
    });
    return data;
  };

  const getDataBarChart = () => {
    const userItemCounts = {};
    // Recorre cada columna en tableros
    Object.values(tableros).forEach((columna) => {
      columna.items.forEach((item) => {
        // Incrementa el conteo de items para cada usuario
        if (userItemCounts[item.user || "Desconocido"]) {
          userItemCounts[item.user || "Desconocido"]++;
        } else {
          userItemCounts[item.user || "Desconocido"] = 1;
        }
      });
    });
    // Convierte el objeto en un arreglo en el formato solicitado
    const data = Object.entries(userItemCounts).map(([name, value]) => ({
      name,
      value,
    }));
    return data;
  };

  return (
    <>
      <div className="flex flex-row justify-start items-center m-6 gap-8">
        <button onClick={() => navigate("/tableros/1")}>
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-3xl font-bold text-white">
          Dashboard de Estadísticas
        </h1>
      </div>

      <div className="flex justify-start items-center m-8">
        <PieChartTemplate data={getDataPieChart()} radius={180} />
        <DataPieChartTemplate data={getDataPieChart()} />

        <SimpleBarChart data={getDataBarChart()} />
      </div>
    </>
  );
}
