import { ClipboardDataFill, Star } from "react-bootstrap-icons";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export function TableroLayout({ children }) {
  const navigate = useNavigate();
  const params = useParams();
  const { tableroId } = params; // Recupera el parámero de la url

  const goToDashboard = () => {
    if (tableroId) {
      navigate(`/reporte-tablero/${tableroId}`);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-end items-center gap-4 bg-[#6D304D] text-white p-4 font-bold">
        <button className="" onClick={goToDashboard}>
          <ClipboardDataFill className="w-6 h-6" />
        </button>
      </div>
      {children}
    </>
  );
}
