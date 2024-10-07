import { CaretDown, Bell, InfoCircle } from "react-bootstrap-icons";
import { ReactComponent as TrelloLogo } from "../../common/icons/trello-icon.svg";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const NavItem = ({ label }) => (
  <div className="flex flex-row justify-center items-center gap-1 rounded-sm px-3 py-2 hover:bg-gray-600 cursor-pointer">
    {label}
    <CaretDown />
  </div>
);

export function AppBar() {
  const navigate = useNavigate();
  const items = [
    {
      label: "Espacios de trabajo",
      options: [],
    },
    { label: "Marcado", options: [] },
    { label: "Plantillas", options: [] },
    {
      label: "Opciones",
      options: [
        {
          label: "Crear usuario",
          action: () => {
            navigate("/miembros");
          },
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row gap-0 w-100 border-b border-gray-600 justify-between text-sm px-6">
      <div className="flex flex-row justify-start items-center p-2 gap-2">
        <div
          className="flex flex-row justify-start items-center p-2 gap-2 hover:bg-gray-600 cursor-pointer rounded"
          onClick={() => navigate("/espacio-trabajo")}
        >
          <TrelloLogo className="w-4 h-4" />
          <div className="text-xl font-bold">Trello</div>
        </div>
        {items.map((item) => (
          <Dropdown label={item.label} options={item.options} />
        ))}
        <button className="bg-blue-500 text-black rounded px-3 py-2 hover:bg-blue-400">
          Crear
        </button>
      </div>
      <div className="flex flex-row justify-end items-center p-2 gap-4">
        <input
          type="text"
          className="border border-gray-600 px-2 py-1 rounded bg-custom-body"
          placeholder="Buscar..."
          aria-label="Buscar"
        />
        <Bell className="w-4 h-4 cursor-pointer" />
        <InfoCircle className="w-4 h-4 cursor-pointer" />
        <div className="flex justify-center items-center w-5 h-5 rounded-full bg-orange-600 text-white">
          A
        </div>
      </div>
    </div>
  );
}
