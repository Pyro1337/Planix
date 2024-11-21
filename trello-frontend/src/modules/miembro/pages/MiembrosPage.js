import { ShareFill } from "react-bootstrap-icons";
import { InputText } from "../../common/components/InputText";
import TablaUsuarios from "../components/DataTable";
import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";

export function MiembrosPage() {
  const espacioTrabajo = useSelector(
    (state) => state.espacioTrabajo.espacioTrabajo
  );
  const usuarios = useSelector((state) => state.miembro.miembros);
  const [openModalInvitar, setOpenModalInvitar] = useState(false);
  const [openModalQuitar, setOpenModalQuitar] = useState(false);
  const onCloseModalInvitar = () => {
    setOpenModalInvitar(false);
  };
  const onEnviarInvitacion = () => {
    setOpenModalInvitar(false);
  };
  const onCloseModalQuitar = () => {
    setOpenModalQuitar(false);
  };
  const onConfirmarQuitar = () => {
    setOpenModalQuitar(false);
  };
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-lg">
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
            <h1 className="text-lg font-semibold">{espacioTrabajo.nombre}</h1>
            <p className="text-gray-400 flex items-center">
              <span className="mr-2">🔒 Privada</span>
            </p>
          </div>
        </div>
        {/* Botón de invitar a miembros */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => setOpenModalInvitar(true)}
        >
          👤 Invitar a miembros del Espacio de trabajo
        </button>
      </div>
      <div className="flex justify-center w-full py-2 px-8 -mx-8">
        <div className="mt-4 w-3/5">
          <h1 className="text-lg font-bold mb-2">
            Colaboradores ({usuarios.length})
          </h1>
          <div className="border-b border-custom-text py-6">
            <h2 className="text-base font-bold mb-2">
              Miembros del espacio de trabajo
            </h2>
            <p>
              Los miembros del Espacio de trabajo pueden ver todos los tableros
              visibles para el Espacio de trabajo, unirse a ellos y crear nuevos
              tableros en el Espacio de trabajo.
            </p>
          </div>
          <div className="py-6">
            <InputText placeholder="Filtrar por nombre" extraClass="mb-4" />
            <div className="w-full border-b border-custom-text"></div>
            <TablaUsuarios
              data={usuarios}
              onClickQuitar={() => setOpenModalQuitar(true)}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModalInvitar}
        onRequestClose={onCloseModalInvitar}
        className="w-1/3 bg-gray-800 text-white p-6 rounded-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Invitar al Espacio de trabajo
          </h2>
          <button
            onClick={onCloseModalInvitar}
            className="text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>

        <input
          type="text"
          placeholder="Dirección de correo electrónico o nombre"
          className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-gray-400 mb-4">
          Invita a alguien a este Espacio de trabajo:
        </p>

        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
          onClick={onEnviarInvitacion}
        >
          Enviar invitación
        </button>
      </Modal>
      <Modal
        isOpen={openModalQuitar}
        onRequestClose={onCloseModalQuitar}
        className="w-1/3 bg-gray-800 text-white p-6 rounded-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            ¿Deseas quitar al usuario de este Espacio de trabajo?
          </h2>
          <button
            onClick={onCloseModalQuitar}
            className="text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>

        <p className="text-gray-400 mb-4">
          Si saca al usuario de este Espacio de trabajo, el usuario dejará de
          estar asignado a las tareas actuales
        </p>

        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
          onClick={onConfirmarQuitar}
        >
          Confirmar
        </button>
      </Modal>
    </>
  );
}
