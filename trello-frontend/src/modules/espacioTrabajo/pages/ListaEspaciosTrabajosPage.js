import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { espacioTrabajoActions } from "../handlers/redux";

export function ListaEspaciosTrabajosPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const espaciosTrabajos = useSelector(
    (state) => state.espacioTrabajo.espaciosTrabajos
  );

  const goToEspacioTrabajo = (espacioTrabajo) => {
    dispatch(espacioTrabajoActions.setEspacioTrabajo(espacioTrabajo));
    navigate(`/mis-espacios-trabajo/${espacioTrabajo.id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 gap-2">
      {espaciosTrabajos.length === 0 && (
        <h1 className="text-2xl">No tienes espacios de trabajo</h1>
      )}
      {espaciosTrabajos.map((espacioTrabajo) => (
        <div
          key={espacioTrabajo.id}
          className="flex justify-center items-center p-4 bg-gray-900 text-white rounded-lg w-1/2 hover:border hover:border-custom-text cursor-pointer"
          onClick={() => goToEspacioTrabajo(espacioTrabajo)}
        >
          {/* Icono e información del espacio de trabajo */}
          <div className="flex items-center space-x-4">
            {/* Icono del espacio de trabajo */}
            <div
              className={`w-12 h-12 bg-gradient-to-r ${espacioTrabajo.colorIni} ${espacioTrabajo.colorFin} flex items-center justify-center rounded-lg text-2xl font-bold`}
            >
              {espacioTrabajo.nombre.charAt(0)}
            </div>
            {/* Información */}
            <div>
              <h1 className="text-lg font-semibold">{espacioTrabajo.nombre}</h1>
              <p className="text-gray-400 flex items-center">
                <span className="mr-2">🔒 Privada</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
