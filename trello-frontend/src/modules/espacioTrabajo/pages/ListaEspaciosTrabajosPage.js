import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const espaciosTrabajos = [
//   {
//     id: 1,
//     nombre: "Espacio de trabajo 1",
//     colorIni: "from-red-500",
//     colorFin: "to-orange-500",
//   },
//   {
//     id: 2,
//     nombre: "Espacio de trabajo 2",
//     colorIni: "from-green-500",
//     colorFin: "to-blue-500",
//   },
//   {
//     id: 3,
//     nombre: "Espacio de trabajo 3",
//     colorIni: "from-yellow-500",
//     colorFin: "to-pink-500",
//   },
//   {
//     id: 4,
//     nombre: "Espacio de trabajo 4",
//     colorIni: "from-purple-500",
//     colorFin: "to-teal-500",
//   },
//   {
//     id: 5,
//     nombre: "Espacio de trabajo 5",
//     colorIni: "from-gray-500",
//     colorFin: "to-gray-700",
//   },
// ];

export function ListaEspaciosTrabajosPage() {
  const navigate = useNavigate();
  const espaciosTrabajos = useSelector(
    (state) => state.espacioTrabajo.espaciosTrabajos
  );
  return (
    <div className="flex flex-col justify-center items-center p-6 gap-2">
      {espaciosTrabajos.map((espacioTrabajo) => (
        <div
          className="flex justify-center items-center p-4 bg-gray-900 text-white rounded-lg w-1/2 hover:border hover:border-custom-text cursor-pointer"
          onClick={() => navigate("/espacio-trabajo")}
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
