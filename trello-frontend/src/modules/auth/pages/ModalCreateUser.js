import Modal from "react-modal";
import React, { useState } from "react";

const ModalCreateUser = ({ show, onClose, onCreateUser }) => {
  const [formDataMiembro, setFormDataMiembro] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataMiembro({
      ...formDataMiembro,
      [name]: value,
    });
  };

  const onPreSubmit = () => {
    if (
      formDataMiembro.nombre === "" ||
      formDataMiembro.apellido === "" ||
      formDataMiembro.username === "" ||
      formDataMiembro.password === ""
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onCreateUser(formDataMiembro);
  };

  return (
    <>
      <Modal
        isOpen={show}
        className="w-1/3 bg-gray-800 text-white p-6 rounded-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Registro de usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formDataMiembro.password}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-center w-full">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center w-2/3"
            onClick={onPreSubmit}
          >
            Registrar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
