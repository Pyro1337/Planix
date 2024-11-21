import { useState } from "react";
import { InputText } from "../../common/components/InputText";
import { useDispatch } from "react-redux";
import { espacioTrabajoActions } from "../handlers/redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function CrearEspacioTrabajoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const espaciosTrabajos = useSelector(
    (state) => state.espacioTrabajo.espaciosTrabajos
  );
  const [espacioTrabajoName, setEspacioTrabajoName] = useState("");
  const colors = [
    {
      colorIni: "from-red-500",
      colorFin: "to-orange-500",
    },
    {
      colorIni: "from-green-500",
      colorFin: "to-blue-500",
    },
    {
      colorIni: "from-yellow-500",
      colorFin: "to-pink-500",
    },
    {
      colorIni: "from-purple-500",
      colorFin: "to-teal-500",
    },
  ];
  const onChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "espacioTrabajoName") {
      setEspacioTrabajoName(value.trim());
    }
  };
  const onSubmit = () => {
    if (espacioTrabajoName) {
      // Seleccionar un color aleatorio del array `colors`
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Crear el nuevo espacio de trabajo con el color aleatorio
      const espacioTrabajoNuevo = {
        id: espaciosTrabajos.length + 1,
        nombre: espacioTrabajoName,
        colorIni: randomColor.colorIni,
        colorFin: randomColor.colorFin,
        tableros: [],
        miembros: [],
      };

      // Dispatch y otras acciones
      dispatch(espacioTrabajoActions.addEspacioTrabajo(espacioTrabajoNuevo));
      setEspacioTrabajoName("");
      navigate("/mis-espacios-trabajo");
    }
  };
  return (
    <div className="flex justify-center w-full py-2 px-8 -mx-8">
      <div className="mt-4 w-3/5">
        <h1 className="text-lg font-bold mb-2">Configuración</h1>
        <div className="py-6">
          <h2 className="text-base font-bold mb-2">Espacio de trabajo</h2>
          <p>
            Un Espacio de trabajo es un conjunto de tableros y personas.
            Utilízalo para organizar tu empresa, tu proyecto paralelo y tus
            planes con familiares o amigos.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <InputText
            extraClass="w-full"
            placeholder="Nombre del espacio de trabajo"
            onChange={onChange("espacioTrabajoName")}
          />
          <button
            className="bg-blue-500 w-full rounded px-3 py-2 hover:bg-blue-400 text-white"
            onClick={onSubmit}
          >
            Crear espacio de trabajo
          </button>
        </div>
      </div>
    </div>
  );
}
