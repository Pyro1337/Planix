import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { espacioTrabajoActions } from "../handlers/redux";
import { CheckCircleFill } from "react-bootstrap-icons";

export function ListaEspaciosTrabajosPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const espaciosTrabajos = useSelector(
    (state) => state.espacioTrabajo.espaciosTrabajos
  );
  const miembro_logueado = useSelector(
    (state) => state.miembro.miembro_logueado
  );

  const goToEspacioTrabajo = (espacioTrabajo) => {
    if (!espacioTrabajo.active) {
      alert("El espacio de trabajo se encuentra inactivo");
      return;
    }

    dispatch(espacioTrabajoActions.setEspacioTrabajo(espacioTrabajo));
    navigate(`/mis-espacios-trabajo/${espacioTrabajo.id}`);
  };

  const changeActiveState = (espacioTrabajo) => {
    const realizarAccion = window.confirm(
      `¿Deseas ${
        espacioTrabajo.active ? "desactivar" : "activar"
      } el espacio de trabajo ${espacioTrabajo.nombre}?`
    );
    if (!realizarAccion) return;
    dispatch(espacioTrabajoActions.changeActiveState(espacioTrabajo));
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 gap-2">
      {espaciosTrabajos.filter((espacio) => {
        // Verifica si el miembro_logueado es el owner
        const esOwner = espacio.owner.username === miembro_logueado.username;
        // Verifica si el miembro_logueado está en la lista de miembros
        const esMiembro = espacio.miembros.some(
          (miembro) => miembro.username === miembro_logueado.username
        );
        // Devuelve true si es owner o miembro
        return esOwner || esMiembro;
      }).length === 0 && (
        <h1 className="text-2xl">No tienes espacios de trabajo</h1>
      )}
      {espaciosTrabajos
        .filter((espacio) => {
          // Verifica si el miembro_logueado es el owner
          const esOwner = espacio.owner.username === miembro_logueado.username;
          // Verifica si el miembro_logueado está en la lista de miembros
          const esMiembro = espacio.miembros.some(
            (miembro) => miembro.username === miembro_logueado.username
          );
          // Devuelve true si es owner o miembro
          return esOwner || esMiembro;
        })
        .map((espacioTrabajo) => (
          <div className="flex justify-center items-center w-full">
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
                  {espacioTrabajo.nombre.charAt(0)}{" "}
                </div>
                {/* Información */}
                <div>
                  <h1 className="flex items-center gap-4 text-lg font-semibold">
                    {espacioTrabajo.nombre}
                  </h1>
                  <p className="text-gray-400 flex items-center">
                    <span className="mr-2">🔒 Privada</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              className={`${
                espacioTrabajo.active ? "text-green-500" : "text-red-500"
              } ml-2`}
              onClick={() => changeActiveState(espacioTrabajo)}
            >
              <CheckCircleFill size={20} />
            </button>
          </div>
        ))}
    </div>
  );
}
