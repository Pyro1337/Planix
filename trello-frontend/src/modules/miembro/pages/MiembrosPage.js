import { ArrowLeft, ArrowLeftCircleFill, ArrowReturnLeft, ShareFill } from "react-bootstrap-icons";
import { InputText } from "../../common/components/InputText";
import TablaUsuarios from "../components/DataTable";
import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { espacioTrabajoActions } from "../../espacioTrabajo/handlers/redux";
import { miembroActions } from "../handlers/redux";
import Swal from "sweetalert2";

export function MiembrosPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const espacioTrabajo = useSelector(
    (state) => state.espacioTrabajo.espacioTrabajo
  );
  const miembrosSistema = useSelector((state) => state.miembro.miembros);
  const { miembros = [] } = espacioTrabajo;

  const [openModalInvitar, setOpenModalInvitar] = useState(false);
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalQuitar, setOpenModalQuitar] = useState(false);
  const [formDataMiembro, setFormDataMiembro] = useState({
    nombre: "",
    apellido: "",
    username: "",
    actividad: "No hay actividad reciente",
    tableros: 0,
    estado: "Colaborador",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataMiembro({
      ...formDataMiembro,
      [name]: value,
    });
  };

  const onAddMiembro = () => {
    const { nombre, apellido, username } = formDataMiembro;
    if (!nombre || !apellido || !username) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoMiembro = { nombre, apellido, username, ...formDataMiembro };
    console.log("Miembro agregado:", nuevoMiembro);
    dispatch(espacioTrabajoActions.addMiembro(nuevoMiembro));
    dispatch(
      miembroActions.addMiembro({
        nombre: nuevoMiembro.nombre,
        apellido: nuevoMiembro.apellido,
        username: nuevoMiembro.username,
        password: "123456",
      })
    );
    setFormDataMiembro({
      nombre: "",
      apellido: "",
      email: "",
    });
    setOpenModalAgregar(false);
  };

  const onAddUsuarioSistema = (usuario) => {
    Swal.fire({
      title: "Añadir",
      text: "¿Deseas agregar al usuario al espacio de trabajo?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Verificar si usuario no está vacío antes de dispatch
        if (usuario) {
          dispatch(espacioTrabajoActions.addMiembro(usuario));
          Swal.fire({
            title: "Agregado",
            text: "El usuario ha sido agregado con éxito.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo agregar el usuario. Verifica los datos e inténtalo nuevamente.",
            icon: "error",
          });
        }
      }
    });
  
    // Cerrar el modal siempre, después de la acción
    setOpenModalInvitar(false);
  };
  

  const onCloseModalInvitar = () => {
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
      <div className="flex flex-row justify-start items-center m-6 gap-8">
        <button onClick={() => navigate("/mis-espacios-trabajo")}>
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-3xl font-bold text-white">
          Mis Espacios de Trabajo
        </h1>
      </div>
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
          👤 Invitar a usuarios al Espacio de trabajo
        </button>
      </div>
      <div className="flex justify-center w-full py-2 px-8 -mx-8">
        <div className="mt-4 w-3/5">
          <h1 className="text-lg font-bold mb-2">
            Colaboradores ({miembros.length})
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
          <div>
            <div className="flex flex-row justify-between items-center my-4">
              <InputText placeholder="Filtrar por nombre" />
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg w-1/6"
                onClick={() => setOpenModalAgregar(true)}
              >
                Crear
              </button>
            </div>
            <div className="w-full border-b border-custom-text"></div>
            <TablaUsuarios
              data={miembros}
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

        <table className="min-w-full table-auto border-collapse">
          <tbody className="divide-y divide-custom-text gap-2">
            {miembrosSistema.map((usuario, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-700"
                onClick={() => onAddUsuarioSistema(usuario, index)}
              >
                <td className="px-4 py-2">
                  <strong>
                    {usuario.nombre} {usuario.apellido}
                  </strong>
                  <br />
                  <span className="text-gray-500">{usuario.username}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
      <Modal
        isOpen={openModalAgregar}
        className="w-1/3 bg-gray-800 text-white p-6 rounded-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Nuevo miembro del Espacio de trabajo
          </h2>
          <button
            onClick={() => setOpenModalAgregar(false)}
            className="text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>
        <div className="flex flex-row justify-between w-full gap-4">
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formDataMiembro.nombre}
            onChange={handleChange}
            className="w-1/2 p-3 bg-gray-700 text-white rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={formDataMiembro.apellido}
            onChange={handleChange}
            className="w-1/2 p-3 bg-gray-700 text-white rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="text"
          placeholder="Dirección de correo electrónico o nombre de usuario"
          name="username"
          value={formDataMiembro.username}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-center w-full">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center w-2/3"
            onClick={onAddMiembro}
          >
            Agregar
          </button>
        </div>
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
