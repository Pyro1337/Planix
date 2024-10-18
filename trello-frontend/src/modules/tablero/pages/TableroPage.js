import React, { useState } from "react";
import Modal from "react-modal";
import { Plus, X , AlarmFill, HourglassBottom, Hourglass, CheckCircleFill, CardHeading,EyeFill, PlusCircle, JustifyLeft, ListTask, PersonFillAdd, PersonFill, TagFill, CardChecklist, Clock, Paperclip, WindowFullscreen, Back, ArrowRight, Copy, WindowStack, Archive, Share, XLg} from "react-bootstrap-icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TableroLayout } from "../components/TableroLayout";

// Ajusta los estilos del modal para hacerlo más blanco y el fondo transparente
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    backgroundColor: "#fff", // Hacer el fondo del modal completamente blanco
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Hacer el fondo detrás del modal transparente
  },
};

Modal.setAppElement("#root");

// Definir las columnas iniciales
const initialColumns = {
  atrasada: {
    name: "Atrasada",
    items: ["Extras"],
  },
  pendiente: {
    name: "Pendiente",
    items: ["III. Métricas de Software", "Tarea 2"],
  },
  enProgreso: {
    name: "En Progreso",
    items: ["II. Buenas Prácticas en Codificación y Estándares"],
  },
  completado: {
    name: "Completado",
    items: ["Selección y Justificación de Modelo de Desarrollo","I. Fundamentos y Modelos de Desarrollo"],
  },
};

export function TableroPage() {
  const [follow, setFollow] = useState(false); // Estado para el seguir y siguiendo.
  const [showDetails, setShowDetails] = useState(false); // Estado para el botón "Mostrar Detalles"
  const [columns, setColumns] = useState(initialColumns);
  const [createLista, setCreateLista] = useState(false);
  const [listaName, setListaName] = useState(""); // Estado para el nombre de la nueva lista
  const [newCardName, setNewCardName] = useState(""); // Estado para el nombre de la nueva tarjeta
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState({}); // Control de estado para las tarjetas


  // Estado para el botón seguir y siguiendo
  const toggleFollow = () => {
    setFollow(!follow); // Cambiar de true a false
  }

  // Estado botón "Mostrar Detalles"
  const toggleDetails = () => {
    setShowDetails(!showDetails); // Cambiar el estado entre true o false
  }

  const onChange = (field) => (e) => {
    if (field === "listaName") {
      setListaName(e.target.value);
    } else if (field === "newCardName") {
      setNewCardName(e.target.value);
    }
  };

  // Función para agregar una nueva lista
  const addNewList = () => {
    setColumns({
      ...columns,
      [listaName.replace(" ", "")]: {
        name: listaName,
        items: [],
      },
    });
    setCreateLista(false);
    setListaName("");
  };

  // Función para agregar una nueva tarjeta
  const addNewCard = (columnId) => {
    if (newCardName.trim() === "") return; // Verifica que el nombre no esté vacío
    const updatedColumn = {
      ...columns[columnId],
      items: [...columns[columnId].items, newCardName], // Añade la nueva tarjeta
    };
    setColumns({
      ...columns,
      [columnId]: updatedColumn,
    });
    setNewCardName(""); // Resetea el campo de nombre de tarjeta
    setIsAddingCard({ ...isAddingCard, [columnId]: false }); // Ocultar campo después de agregar tarjeta
  };

  // Función para cancelar la creación de tarjeta
  const cancelNewCard = (columnId) => {
    setNewCardName("");
    setIsAddingCard({ ...isAddingCard, [columnId]: false });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destinationItems = [...destinationColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems,
      },
    });
  };

  const openModal = (card, columnId) => {
    setSelectedCard(card);
    setSelectedColumn(columnId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
    setSelectedColumn(null);
  };

  return (
    <TableroLayout>
      <div className="w-full h-full p-4 bg-[#8F3F65] overflow-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row gap-4">
            {Object.entries(columns).map(([columnId, column], index) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`rounded-lg p-4 shadow-lg bg-black w-[300px] h-full ${
                      columnId === "atrasada" ? "border-4 border-red-600" : ""
                    }`}
                  >
                    <h2 className="font-bold text-md mb-2 flex items-center">
                      {column.name}
                      {columnId === "atrasada" && (
                        <AlarmFill className="ml-2 text-red-500" size={20} />
                      )}
                      {columnId === "pendiente" && (
                        <Hourglass className="ml-2 text-gray-400" size={20} />
                      )}
                      {columnId === "enProgreso" && (
                        <HourglassBottom className="ml-2 text-gray-400" size={20} />
                      )}
                      {columnId === "completado" && (
                        <CheckCircleFill className="ml-2 text-green-600" size={20} />
                      )}
                    </h2>
                    {column.items.length > 1 && (
                      <span className="text-sm text-red-500">
                        Cantidad máxima de tareas
                      </span>
                    )}
                    <div>
                      {column.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-2 mb-2 rounded text-sm cursor-pointer ${
                                snapshot.isDragging
                                  ? "bg-green-300"
                                  : "bg-custom-body"
                              } border border-transparent hover:border-white`}
                              onClick={() => openModal(item, columnId)}
                            >
                              {item}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {isAddingCard[columnId] ? (
                      <div className="flex flex-col gap-2 mt-2">
                        <input
                          type="text"
                          className="p-1 rounded bg-gray-700 text-white"
                          placeholder="Nueva tarjeta"
                          value={newCardName}
                          onChange={onChange("newCardName")}
                        />
                        <div className="flex gap-2">
                          <button
                            className="bg-blue-500 p-2 text-white rounded hover:bg-blue-400"
                            onClick={() => addNewCard(columnId)}
                          >
                            Añadir tarjeta
                          </button>
                          <button
                            className="p-2 rounded hover:bg-gray-300"
                            onClick={() => cancelNewCard(columnId)}
                          >
                            <XLg className="w-6 h-6" color="white" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex flex-row bg-transparent items-center gap-2 hover:bg-custom-body cursor-pointer rounded-md p-1 font-bold"
                        onClick={() => setIsAddingCard({ ...isAddingCard, [columnId]: true })}
                      >
                        <Plus className="w-6 h-6" />
                        <p className="text-sm">Añadir una tarjeta</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            ))}
            {!createLista && (
              <div
                className="flex flex-row items-center font-bold text-white text-sm rounded-lg p-2 bg-[#AA6D8B] shadow-lg w-[300px] h-full cursor-pointer hover:bg-[#9c627f]"
                onClick={() => setCreateLista(true)}
              >
                <Plus className="w-6 h-6" />
                Añade otra lista
              </div>
            )}
            {createLista && (
              <div className="text-sm rounded-lg p-2 bg-black shadow-lg w-[300px] h-full">
                <input
                  className="bg-custom-body p-1 rounded w-full"
                  placeholder="Introduce el nombre de la lista"
                  type="text"
                  onChange={onChange("listaName")}
                />
                <div className="flex flex-row items-center gap-2 mt-2">
                  <button
                    className="bg-blue-500 p-2 text-black rounded hover:bg-blue-400"
                    onClick={addNewList}
                  >
                    Añadir lista
                  </button>
                  <X
                    className="w-6 h-6 hover:bg-gray-500 cursor-pointer rounded"
                    onClick={() => setCreateLista(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </DragDropContext>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Detalles de la Tarjeta"
        >
          <div className="relative">
            <button
              className="absolute top-2 right-2 hover:bg-gray-500 hover:rounded-full"
              onClick={closeModal}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>

            <div className="flex justify-between">
              {/* Columna Izquierda */}
              <div className="flex-1 pr-8">
                {selectedCard && (
                  <h2 className="font-bold text-lg mb-4 flex items-center text-gray-900">
                    <CardHeading className="mr-2" size={20} />
                    {selectedCard}
                  </h2>
                )}

                {selectedColumn && columns[selectedColumn] && (
                  <p className="font-bold text-gray-900">
                    En la lista de {columns[selectedColumn].name}
                  </p>
                )}

                {/* Miembros y Notificaciones */}
                <div className="flex justify-between items-center mb-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center">
                      IS
                    </div>
                    <PlusCircle className="mr-2 text-gray-900" size={25} />
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={toggleFollow} className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center">
                      <EyeFill className="mr-2 bg-gray-100" size={18} />
                      {follow ? "Siguiendo ✔" : "Seguir"}
                    </button>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label className="text-gray-700 font-bold mb-2 flex items-center">
                    <JustifyLeft className="mr-2" size={18} /> Descripción
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Añadir una descripción más detallada..."
                    rows="3"
                  ></textarea>
                </div>

                {/* Actividad */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 flex items-center">
                      <ListTask className="mr-2" size={18} /> Actividad
                    </span>
                    <button
                      onClick={toggleDetails}
                      className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
                    >
                      {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
                    </button>
                  </div>
                  <input
                    className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    type="text"
                    placeholder="Escribe un comentario..."
                  />
                </div>

                {/* Detalles ocultos de la tarea */}
                {showDetails && (
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center">
                      EL
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        Eric Mathias Amarilla Leguizamon
                      </p>
                      <p className="text-gray-900">
                        ha añadido esta tarjeta a la lista de tareas 1 sept 2024, 14:43
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Columna Derecha (Botones) */}
              <div className="w-64 flex flex-col gap-2 mt-4">
                <button className="bg-gray-100 px-3 py-1 rounded mt-8 text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <PersonFillAdd className="mr-2 bg-gray-100" size={18} /> Unirse
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <PersonFill className="mr-2 bg-gray-100" size={18} /> Miembros
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <TagFill className="mr-2 bg-gray-100" size={18} /> Etiquetas
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <CardChecklist className="mr-2 bg-gray-100" size={18} /> Checklist
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <Clock className="mr-2 bg-gray-100" size={18} /> Fechas
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <Paperclip className="mr-2 bg-gray-100" size={18} /> Adjunto
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <WindowFullscreen className="mr-2 bg-gray-100" size={18} /> Portada
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <Back className="mr-2 bg-gray-100" size={18} /> Campos personalizados
                </button>

                {/* Sección de Power-Ups , Automatización , Acciones */}
                <div className="mt-8">
                  <h4 className="font-bold text-gray-700 text-sm mb-2">Power-Ups</h4>
                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                    <Plus className="mr-2 bg-gray-100" size={18} /> Añadir Power-Ups
                  </button>

                  <h4 className="font-bold text-gray-700 text-sm mt-4 mb-2">Automatización</h4>
                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                    <Plus className="mr-2 bg-gray-100" size={18} /> Botón Añadir
                  </button>

                  <h4 className="font-bold text-gray-700 text-sm mt-4 mb-2">Acciones</h4>
                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                    <ArrowRight className="mr-2 bg-gray-100" size={18} /> Mover
                  </button>

                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 mt-2 font-bold">
                    <Copy className="mr-2 bg-gray-100" size={18} /> Copiar
                  </button>

                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 mt-2 font-bold">
                    <WindowStack className="mr-2 bg-gray-100" size={18} /> Crear plantilla
                  </button>

                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 mt-2 font-bold">
                    <Archive className="mr-2 bg-gray-100" size={18} /> Archivar
                  </button>

                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 mt-2 font-bold">
                    <Share className="mr-2 bg-gray-100" size={18} /> Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </TableroLayout>
  );
}
