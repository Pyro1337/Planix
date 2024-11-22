import { useState } from "react";
import { Card } from "../components/Card";
import { PeopleFill, PersonPlusFill, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { espacioTrabajoActions } from "../handlers/redux";

const initialTableros = ["Tablero 1", "Tablero 2", "Tablero 3"];

export function EspacioTrabajoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const espacioTrabajo = useSelector(
    (state) => state.espacioTrabajo.espacioTrabajo
  );
  const { tableros = [] } = espacioTrabajo;

  // const [tableros, setTableros] = useState(initialTableros);
  const [createTablero, setCreateTablero] = useState(false);
  const [tableroName, setTableroName] = useState("");
  const addNewTablero = () => {
    // setTableros([...tableros, tableroName]);
    dispatch(espacioTrabajoActions.addTablero(tableroName));
    setTableroName("");
    setCreateTablero(false);
  };
  const onChange = (field) => (e) => {
    e.preventDefault();
    if (field === "tableroName") {
      setTableroName(e.target.value);
    }
  };

  const goToUsuarios = () => {
    navigate("/miembros");
  };

  return (
    <>
      {espacioTrabajo && (
        <div className="form flex flex-col justify-center w-full p-6">
          <div className="flex justify-between items-center p-4 bg-gray-900 text-white rounded-lg">
            {/* Icono e información del espacio de trabajo */}
            <div className="flex items-center space-x-4">
              {/* Icono del espacio de trabajo */}
              <div
                className={`w-12 h-12 bg-gradient-to-r ${espacioTrabajo.colorIni} ${espacioTrabajo.colorFin} flex items-center justify-center rounded-lg text-2xl font-bold`}
              >
                {espacioTrabajo.nombre.charAt(0).toUpperCase()}
              </div>
              {/* Información */}
              <div>
                <h1 className="text-lg font-semibold">
                  {espacioTrabajo.nombre}
                </h1>
                <p className="text-gray-400 flex items-center">
                  <span className="mr-2">🔒 Privada</span>
                </p>
              </div>
            </div>
            {/* Botón para crear usuario al espacio de trabajo */}
            <button
              onClick={goToUsuarios}
              className="flex flew-row items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              <PeopleFill /> Usuarios
            </button>
          </div>
          <div className="mt-4 w-3/5">
            <h1 className="text-base font-bold mb-2">TUS TABLEROS</h1>
            <div className="flex flex-row gap-2">
              {tableros.map((tablero) => (
                <Card
                  nombre={tablero.nombre}
                  onClick={() => navigate(`/tableros/${tablero.id}`)}
                />
              ))}
              {!createTablero && (
                <div
                  className={`w-48 h-24 bg-[#333C43] rounded p-4 flex items-center justify-center shadow-md cursor-pointer hover:brightness-90`}
                  onClick={() => setCreateTablero(true)}
                >
                  Crear un tablero nuevo
                </div>
              )}
              {createTablero && (
                <div
                  className={`flex flex-col h-24 bg-[#333C43] rounded p-4 items-start justify-center shadow-md`}
                >
                  <input
                    className="bg-custom-body p-1 rounded w-[300px]"
                    placeholder="Introduce el nombre del tablero"
                    type="text"
                    onChange={onChange("tableroName")}
                  />
                  <div className="flex flex-row items-center gap-2 mt-2">
                    <button
                      type="button"
                      className="bg-blue-500 p-2 text-black text-sm rounded hover:bg-blue-400"
                      onClick={addNewTablero}
                    >
                      Añadir tablero
                    </button>
                    <X
                      className="w-6 h-6 hover:bg-gray-500 cursor-pointer rounded"
                      onClick={() => setCreateTablero(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
