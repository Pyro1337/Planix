import { useState } from "react";
import { Card } from "../components/Card";
import { X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialTableros = ["Tablero 1", "Tablero 2", "Tablero 3"];

export function EspacioTrabajoPage() {
  const navigate = useNavigate();
  const espaciosTrabajos = useSelector(
    (state) => state.espacioTrabajo.espaciosTrabajos
  );
  const [tableros, setTableros] = useState(initialTableros);
  const [createTablero, setCreateTablero] = useState(false);
  const [tableroName, setTableroName] = useState("");
  const addNewTablero = () => {
    setTableros([...tableros, tableroName]);
    setTableroName("");
    setCreateTablero(false);
  };
  const onChange = (field) => (e) => {
    e.preventDefault();
    if (field === "tableroName") {
      setTableroName(e.target.value);
    }
  };
  return (
    <div className="form flex flex-col justify-center w-full p-6">
      <div className="flex items-center p-4 bg-gray-900 text-white rounded-lg">
        {/* Icono e información del espacio de trabajo */}
        <div className="flex items-center space-x-4">
          {/* Icono del espacio de trabajo */}
          <div
            className={`w-12 h-12 bg-gradient-to-r ${espaciosTrabajos[0].colorIni} ${espaciosTrabajos[0].colorFin} flex items-center justify-center rounded-lg text-2xl font-bold`}
          >
            {espaciosTrabajos[0].nombre.charAt(0)}
          </div>
          {/* Información */}
          <div>
            <h1 className="text-lg font-semibold">
              {espaciosTrabajos[0].nombre}
            </h1>
            <p className="text-gray-400 flex items-center">
              <span className="mr-2">🔒 Privada</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 w-3/5">
        {/* <div className="flex flex-col w-1/4 border"></div>
        <div className="flex flex-col w-3/4 border">Derecha</div> */}
        <h1 className="text-base font-bold mb-2">TUS TABLEROS</h1>
        <div className="flex flex-row gap-2">
          {tableros.map((tablero) => (
            <Card nombre={tablero} onClick={() => navigate("/tableros")} />
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
              onClick={addNewTablero}
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
  );
}
