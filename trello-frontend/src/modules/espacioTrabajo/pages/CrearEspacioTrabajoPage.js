import { useState } from "react";
import { InputText } from "../../common/components/InputText";
import { useDispatch } from "react-redux";
import { espacioTrabajoActions } from "../handlers/redux";
import { useNavigate } from "react-router-dom";

export function CrearEspacioTrabajoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [espacioTrabajoName, setEspacioTrabajoName] = useState("");
  const onChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "espacioTrabajoName") {
      setEspacioTrabajoName(value.trim());
    }
  };
  const onSubmit = () => {
    if (espacioTrabajoName) {
      const espacioTrabajoNuevo = {
        id: null,
        nombre: espacioTrabajoName,
        colorIni: "from-purple-500",
        colorFin: "to-teal-500",
      };
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
