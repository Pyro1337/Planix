import React from "react";

const TablaUsuarios = ({ data, onClickQuitar }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <tbody>
          {data.map((usuario, index) => (
            <tr key={index} className="border-b border-custom-text">
              <td className="px-4 py-2">
                <strong>{usuario.nombre} {usuario.apellido}</strong>
                <br />
                <span className="text-gray-500">{usuario.username}</span>
              </td>
              <td className="px-4 py-2">{usuario.actividad}</td>
              <td className="px-4 py-2">
                <button className="hover:underline">
                  Ver tableros ({usuario.tableros})
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={onClickQuitar}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
