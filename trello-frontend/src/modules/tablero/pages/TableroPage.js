import React, { useState } from "react";
import Modal from "react-modal";
import { Plus, X , AlarmFill, HourglassBottom, Hourglass, CheckCircleFill, CardHeading,EyeFill, PlusCircle, JustifyLeft, ListTask, PersonFillAdd, PersonFill, TagFill} from "react-bootstrap-icons";
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
    items: ["Tarea 1", "Tarea 2"],
  },
  pendiente: {
    name: "Pendiente",
    items: ["Tarea 1", "Tarea 2"],
  },
  enProgreso: {
    name: "En Progreso",
    items: ["Tarea 3"],
  },
  completado: {
    name: "Completado",
    items: ["Tarea 4"],
  },
};

export function TableroPage() {
  const [follow, setFollow] = useState(false); //Estado para el seguir y siguiendo.
  const [showDetails, setShowDetails] = useState(false); //Estado para boton "Mostrar Detalles"
  const [columns, setColumns] = useState(initialColumns);
  const [createLista, setCreateLista] = useState(false);
  const [listaName, setListaName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  //Estado para boton seguir y siguiendo
  const toggleFollow = () => {
    setFollow(!follow); //cambiar de true a false
  }

  // Estado boton "Mostrar Detalles"
  const toggleDetails = () =>{
    setShowDetails(!showDetails);//Cambiar el estado entre true o false
  }

  const onChange = (field) => (e) => {
    if (field === "listaName") {
      setListaName(e.target.value);
    }
  };

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
                    <div className="flex flex-row bg-transparent items-center gap-2 hover:bg-custom-body cursor-pointer rounded-md p-1 font-bold">
                      <Plus className="w-6 h-6" />
                      <p className="text-sm">Agregar tarjeta</p>
                    </div>
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
          <div className="flex flex-col">
            <button className="self-end" onClick={closeModal}>
              <X className="w-6 h-6" />
            </button>
            {selectedCard && (
              <h2 className="font-bold text-lg mb-4 flex items-center text-gray-900">
                <CardHeading className="mr-2" size={20} />
                {selectedCard}
              </h2>
            )}
            {selectedColumn && columns[selectedColumn] && (
              <p className="font-bold text-gray-900">En la lista de {columns[selectedColumn].name}</p>
            )}
            {/* Miembros y notificaciones */}
            <div className="flex justify-between items-center mb-4 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center">
                 IS
                </div>
                <PlusCircle className="mr-2 text-gray-900" size={25} />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={toggleFollow} //Evento que ejecuta la funcion para alternar de seguir a siguiendo.
                  className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center ">
                    <EyeFill  className="mr-2 bg-gray-100" size={20}/>
                    {follow ? "Siguiendo ✔" : "Seguir" } {/*Texto dinamico entre siguiendo y seguir al estar True o False*/}
                </button>
              </div>
            </div>

            {/* Descripcion */}
            <div className="mb-4">
              <label className=" text-gray-700 font-bold mb-2 flex items-center"><JustifyLeft className="mr-2" size={20} />Descripcion</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Añadir una descripción mas detallada..."
                rows="3"
              ></textarea>
            </div>
            {/*Actividad*/}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 flex items-center"> <ListTask className="mr-2" size={20} />Actividad
                </span>
                <button
                  onClick={toggleDetails}//Evento que muestra/oculta los detalles
                  className="text-gray-500 text-sm border border-gray-300 rounded px-2 py-1  hover:bg-gray-200"
                >
                  {/*Por defecto esta oculto, y pasa a mostrar detalles*/}
                  {showDetails ? "Ocultar detalles" : "Mostrar detalles"} 
                 </button>
              </div>
                <input
                  className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  type="text"
                  placeholder="Escribe un comentario..."
                />
              </div>
            </div>
            {/* Detalles ocultos de la tarea que se van a mostrar al clickear en Mostrar detalles*/}
            {showDetails && (
              <div className="flex items-center gap-4">
                {/* Avatar o iniciales */}
                <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center">
                  EL
                </div>

                {/* Contenido del texto */}
                <div>
                  <p className="font-bold text-gray-900">Eric Mathias Amarilla Leguizamon</p>
                  <p className="text-gray-900">ha añadido esta tarjeta a la lista de tareas 1 sept 2024, 14:43
                  </p>
                </div>
              </div>
            )}

            {/*Botones de la derecha*/}
            <div className="block mb-4 mt-4">
              {/*Boton de unirse*/}
              <div className="flex items-center gap-1">
                  <button 
                    className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200">
                      <PersonFillAdd  className="mr-2 bg-gray-100" size={20}/>Unirse  
                  </button>
              </div>

              {/*Boton de Miembros*/}
              <div className="flex items-center gap-1">
                  <button 
                    className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200">
                      <PersonFill  className="mr-2 bg-gray-100" size={20}/>Miembros  
                  </button>
              </div>
              {/*Boton de Etiquetas*/}
              <div className="flex items-center gap-1">
                  <button 
                    className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200">
                      <TagFill className="mr-2 bg-gray-100" size={20}/>Etiquetas  
                  </button>
              </div>              

            </div>
          </Modal>
      </div>
    </TableroLayout>
  );
}
