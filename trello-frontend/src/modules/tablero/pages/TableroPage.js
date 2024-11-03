import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Plus,
  X,
  AlarmFill,
  HourglassBottom,
  Hourglass,
  CheckCircleFill,
  CardHeading,
  EyeFill,
  PlusCircle,
  JustifyLeft,
  ListTask,
  PersonFillAdd,
  PersonFill,
  TagFill,
  CardChecklist,
  Clock,
  Paperclip,
  WindowFullscreen,
  Back,
  ArrowRight,
  Copy,
  WindowStack,
  Archive,
  Share,
  XLg,
  Trash,
  FunnelFill,
} from "react-bootstrap-icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TableroLayout } from "../components/TableroLayout";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { tableroActions } from "../handlers/redux";
import { useSelector } from "react-redux";

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
    height: "80%",
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

export function TableroPage() {
  const dispatch = useDispatch();
  const miembros = useSelector((state) => state.miembro.miembros);

  const tableros = useSelector((state) => state.tablero.tableros);

  const [follow, setFollow] = useState(false); // Estado para el seguir y siguiendo.
  const [showDetails, setShowDetails] = useState(false); // Estado para el botón "Mostrar Detalles"
  const [showDelete, setShowDelete] = useState(false); // Estado para el boton Archivar -> Eliminar
  const [columns, setColumns] = useState(tableros); //Selector de columnas
  const [createLista, setCreateLista] = useState(false);
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [listaName, setListaName] = useState(""); // Estado para el nombre de la nueva lista
  const [newCardName, setNewCardName] = useState(""); // Estado para el nombre de la nueva tarjeta
  const [selectedCard, setSelectedCard] = useState(null);
  const [filter, setFilter] = useState(""); // Estado para el filtro
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); //estado para las fechas
  const [originalColumn, setOriginalColumn] = useState(null); // Almacena la columna original de la tarjeta
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para mostrar/ocultar el DatePicker
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState({}); // Control de estado para las tarjetas
  const [showMoveSelect, setShowMoveSelect] = useState(false); //Estado para mostrar la lista
  const [selectedDestinationColumn, setSelectedDestinationColumn] =
    useState(null); //Estado para almacenar el destino seleccionado por el usuario.
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    dispatch(tableroActions.setTableros(columns));
  }, [columns]);

  // Estado para el botón seguir y siguiendo
  const toggleFollow = () => {
    setFollow(!follow); // Cambiar de true a false
  };

  // Estado botón "Mostrar Detalles"
  const toggleDetails = () => {
    setShowDetails(!showDetails); // Cambiar el estado entre true o false
  };

  //Estado botón "Archivar/Eliminar"
  const toggleDelete = () => {
    if (showDelete) {
      deleteCard();
    } else {
      setShowDelete(true);
    }
  };

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
      items: [
        ...columns[columnId].items,
        {
          name: newCardName,
          description: null,
          fechaInicio: null,
          fechaFin: null,
          user: null,
        },
      ], // Añade la nueva tarjeta
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
    setShowDelete(false); //seteamos que al abrir el comportamiento se resetee de archivar/eliminar y de mostrar detalles
    setShowMoveSelect(false); //Para que al cerrar se resetee el comportamiento del selector de Mover a columna
    setShowDatePicker(false); //Para ocultar el datepicker al volver a abrir
    setShowDetails(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
    setSelectedColumn(null);
    setShowDelete(false); //seteamos que al cerrar el comportamiento se resetee de archivar/eliminar y de mostrar detalles
    setShowDetails(false);
    setShowDatePicker(false); //Para ocultar el datepicker al cerrar
    setShowMoveSelect(false); //Para que al cerrar se resetee el comportamiento del selector de Mover a columna
  };

  //Funciona para eliminar la tarjeta
  const deleteCard = () => {
    const updatedColumn = {
      ...columns[selectedColumn],
      items: columns[selectedColumn].items.filter(
        (item) => item !== selectedCard
      ),
    };

    setColumns({
      ...columns,
      [selectedColumn]: updatedColumn,
    });

    // Cerrar el modal después de eliminar la tarjeta
    closeModal();
  };
  // Función para eliminar una lista
  const deleteList = (columnId) => {
    const updatedColumns = { ...columns };
    delete updatedColumns[columnId]; // Eliminar la columna por su id
    setColumns(updatedColumns); // Actualizar el estado con las columnas restantes
  };

  //Funcion para las fechas
  const handleDateChange = (date) => {
    setSelectedDate(date); // Almacena la fecha seleccionada

    const currentDate = new Date(); // Fecha actual

    if (date < currentDate) {
      // Si la fecha seleccionada es menor que la actual, mover a "Atrasada"
      // Guardar la columna original solo si la tarjeta no estaba previamente en "Atrasada"
      if (selectedColumn !== "atrasada") {
        setOriginalColumn(selectedColumn); // Guardar la columna original antes de moverla
      }

      let updatedColumn = {};
      if (!columns["atrasada"]) {
        updatedColumn = {
          name: "Atrasada",
          items: [selectedCard],
        };
      } else {
        updatedColumn = {
          ...columns["atrasada"],
          items: [...columns["atrasada"].items, selectedCard], // Añadir la tarjeta a la columna "Atrasada"
        };
      }

      // Si atrada no existe, se agrega al principio de todo
      if (!columns["atrasada"]) {
        setColumns({
          atrasada: updatedColumn,
          ...columns,
          [selectedColumn]: {
            ...columns[selectedColumn],
            items: columns[selectedColumn].items.filter(
              (item) => item.name !== selectedCard.name
            ), // Eliminar la tarjeta de su columna actual
          },
        });
      }
      // Si atrada sí existe, se debe actualizar luego de ...columns o sino si ponemos antes ...columns le sobreescribe
      else {
        setColumns({
          ...columns,
          atrasada: updatedColumn,
          [selectedColumn]: {
            ...columns[selectedColumn],
            items: columns[selectedColumn].items.filter(
              (item) => item.name !== selectedCard.name
            ), // Eliminar la tarjeta de su columna actual
          },
        });
      }
    } else if (originalColumn && selectedColumn === "atrasada") {
      // Si la fecha seleccionada es mayor y la tarjeta está en "Atrasada", restaurarla a la columna original
      const updatedColumn = {
        ...columns[originalColumn],
        items: [...columns[originalColumn].items, selectedCard], // Mover la tarjeta de vuelta a su columna original
      };

      setColumns({
        ...columns,
        atrasada: {
          ...columns["atrasada"],
          items: columns["atrasada"].items.filter(
            (item) => item !== selectedCard
          ), // Eliminar la tarjeta de "Atrasada"
        },
        [originalColumn]: updatedColumn,
      });

      setOriginalColumn(null); // Limpiar la columna original después de mover la tarjeta de vuelta
    }

    closeModal(); // Cerrar el modal después de la acción
  };

  //Funcion para mover la tarjeta.

  // Definimos la lista de las columnas destino.
  const columnOptions = Object.entries(columns).map(([key, column]) => ({
    value: key,
    label: column.name,
  }));

  const moveCard = () => {
    if (!selectedDestinationColumn) return;

    const updatedSourceColumn = {
      ...columns[selectedColumn],
      items: columns[selectedColumn].items.filter(
        (item) => item !== selectedCard
      ),
    };

    const updatedDestinationColumn = {
      ...columns[selectedDestinationColumn],
      items: [...columns[selectedDestinationColumn].items, selectedCard],
    };

    setColumns({
      ...columns,
      [selectedColumn]: updatedSourceColumn,
      [selectedDestinationColumn]: updatedDestinationColumn,
    });

    closeModal(); // Cerrar el modal después de mover la tarjeta
  };

  const asignarMiembro = (miembro) => {
    const newColumns = JSON.parse(JSON.stringify(columns));
    const column = { ...columns[selectedColumn] };

    // Busca el item en la columna que coincida con el name de selectedCard
    const itemIndex = column.items.findIndex(
      (item) => item.name === selectedCard.name
    );

    // Si se encuentra el item, actualiza el campo user
    if (itemIndex !== -1) {
      newColumns[selectedColumn].items[itemIndex] = {
        ...column.items[itemIndex],
        user: miembro.nombre,
      };
      setColumns(newColumns);
    }
    setShowUsers(false);
    setModalIsOpen(false);
  };

  return (
    <TableroLayout>
      <div className="w-full h-full p-4 bg-[#8F3F65] overflow-auto">
        {/* Botón de Filtros */}
        <div className="flex flex-row gap-4 mb-3">
          <div
            className="flex flex-row items-center font-bold text-white text-sm h-10 rounded-lg p-2 bg-[#AA6D8B] shadow-lg cursor-pointer hover:bg-[#9c627f]"
            onClick={() => setShowFilterInput(!showFilterInput)}
          >
            <FunnelFill className="w-6 h-6" />
            <span className="ml-2">Filtros</span>
          </div>
          {/* Input para buscar */}
          {showFilterInput && (
            <input
              type="text"
              className="rounded p-3 text-black w-72 h-10"
              placeholder="Buscar por nombre de lista"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
          {!createLista && (
            <div className="flex items-center gap-4">
              <div
                className="flex flex-row items-center font-bold text-white text-sm rounded-lg p-2 bg-[#AA6D8B] shadow-lg w-[300px] cursor-pointer hover:bg-[#9c627f]"
                onClick={() => setCreateLista(true)}
              >
                <Plus className="w-6 h-6" />
                Añade otra lista
              </div>
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
                    <div className="flex justify-between">
                      <h2 className="font-bold text-md mb-2 flex items-center">
                        {column.name}
                        {columnId === "atrasada" && (
                          <>
                            <AlarmFill
                              className="ml-2 text-red-500"
                              size={20}
                            />
                            <span
                              style={{
                                animation: "blinkingText 1.5s infinite",
                                color: "red",
                              }}
                            >
                              ¡Atención!
                            </span>
                            <style>
                              {`
                          @keyframes blinkingText {
                            0% { color: red; }
                            50% { color: black; }
                            100% { color: red; }
                          }
                        `}
                            </style>
                          </>
                        )}
                        {columnId === "pendiente" && (
                          <Hourglass className="ml-2 text-gray-400" size={20} />
                        )}
                        {columnId === "enProgreso" && (
                          <HourglassBottom
                            className="ml-2 text-gray-400"
                            size={20}
                          />
                        )}
                        {columnId === "completado" && (
                          <CheckCircleFill
                            className="ml-2 text-green-600"
                            size={20}
                          />
                        )}
                      </h2>
                      {/* Botón de eliminar lista */}
                      <button
                        onClick={() => deleteList(columnId)} // Evento para eliminar la lista
                        className="bg-black-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    {column.items.length > 3 && (
                      <span className="text-sm text-red-500">
                        Cantidad máxima de tareas
                      </span>
                    )}
                    <div>
                      {column.items
                        .filter((item) =>
                          item.name.toLowerCase().includes(filter.toLowerCase())
                        )
                        .map((item, index) => (
                          <Draggable
                            key={item.name}
                            draggableId={item.name}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-2 mb-2 rounded text-sm cursor-pointer text-white ${
                                  snapshot.isDragging
                                    ? "bg-green-300"
                                    : "bg-custom-body"
                                } border border-transparent hover:border-white`}
                                onClick={() => openModal(item, columnId)}
                              >
                                {item.name}
                                <p className="text-custom-text">{item.user}</p>
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
                        onClick={() =>
                          setIsAddingCard({ ...isAddingCard, [columnId]: true })
                        }
                      >
                        <Plus className="w-6 h-6" />
                        <p className="text-sm">Añadir una tarjeta</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            ))}
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
                    {selectedCard.name}
                  </h2>
                )}

                {selectedColumn && columns[selectedColumn] && (
                  <p className="font-bold text-gray-900">
                    En la lista de {columns[selectedColumn].name}
                  </p>
                )}

                {/* Miembros y Notificaciones */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    {!!selectedCard && !!selectedCard.user && (
                      <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center">
                        <p>{selectedCard.user.charAt(0)}</p>
                      </div>
                    )}
                    <PlusCircle
                      className="mr-2 text-gray-900 hover:cursor-pointer"
                      onClick={() => setShowUsers(!showUsers)}
                      size={25}
                    />
                    {showUsers && (
                      <div className="flex flex-col gap-2">
                        {miembros.map((miembro) => (
                          <button
                            className="bg-gray-100 px-3 py-1 rounded hover:border"
                            onClick={() => asignarMiembro(miembro)}
                          >
                            {miembro.nombre}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={toggleFollow}
                      className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center"
                    >
                      <EyeFill className="mr-2 bg-gray-100" size={18} />
                      {follow ? "Siguiendo ✔" : "Seguir"}
                    </button>
                  </div>
                </div>
                {!showUsers && (
                  <div className="flex flex-row gap-2">
                    <p className="text-black font-bold">Responsable:</p>
                    <p className="text-black">
                      {selectedCard
                        ? selectedCard.user || "No asignado"
                        : "No asignado"}
                    </p>
                  </div>
                )}
                {/* Descripción */}
                <div className="mb-4 mt-4">
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
                        ha añadido esta tarjeta a la lista de tareas 1 sept
                        2024, 14:43
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Columna Derecha (Botones) */}
              <div className="w-64 flex flex-col gap-2 mt-4">
                <button className="bg-gray-100 px-3 py-1 rounded mt-8 text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <PersonFillAdd className="mr-2 bg-gray-100" size={18} />{" "}
                  Unirse
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <PersonFill className="mr-2 bg-gray-100" size={18} /> Miembros
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <TagFill className="mr-2 bg-gray-100" size={18} /> Etiquetas
                </button>

                <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                  <CardChecklist className="mr-2 bg-gray-100" size={18} />{" "}
                  Checklist
                </button>

                <button
                  className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold"
                  onClick={() => setShowDatePicker(!showDatePicker)} // Mostrar u ocultar el DatePicker
                >
                  <Clock className="mr-2 bg-gray-100" size={18} /> Fechas
                </button>

                {showDatePicker && (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => handleDateChange(date)} // Aquí manejamos la selección de fecha
                    dateFormat="dd/MM/yyyy"
                    className="mt-2 p-2 rounded border-4 border-gray-900 "
                    placeholderText="Seleccione la fecha"
                  />
                )}

                {/* Sección de Power-Ups , Automatización , Acciones */}
                <div className="mt-8">
                  <h4 className="font-bold text-gray-700 text-sm mb-2">
                    Power-Ups
                  </h4>
                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                    <Plus className="mr-2 bg-gray-100" size={18} /> Añadir
                    Power-Ups
                  </button>

                  <h4 className="font-bold text-gray-700 text-sm mt-4 mb-2">
                    Automatización
                  </h4>
                  <button className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold">
                    <Plus className="mr-2 bg-gray-100" size={18} /> Botón Añadir
                  </button>

                  <h4 className="font-bold text-gray-700 text-sm mt-4 mb-2">
                    Acciones
                  </h4>
                  {/*Opcion de mover Tarjetas a columnas.*/}
                  <button
                    className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold"
                    onClick={() => setShowMoveSelect(!showMoveSelect)}
                  >
                    <ArrowRight className="mr-2 bg-gray-100" size={18} /> Mover
                  </button>

                  {/*Mostramos el react-select para seleccionar el destino*/}
                  {showMoveSelect && (
                    <div className="mt-4">
                      <Select
                        options={columnOptions}
                        onChange={(selectedOption) =>
                          setSelectedDestinationColumn(selectedOption.value)
                        }
                        placeholder="Selecciona la tarjeta destino"
                        className="text-black"
                      />
                      {/*Boton para confirmar el traslado*/}
                      <button
                        className="bg-gray-800 px-3 py-1 mt-4 rounded text-white"
                        onClick={moveCard} //llamamos a la funcion que traslada la tarjeta
                      >
                        Confirmar
                      </button>
                    </div>
                  )}

                  <button
                    onClick={toggleDelete} //Evento para cambiar entre archivar y eliminar.
                    className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 mt-2 font-bold"
                  >
                    {showDelete ? (
                      <>
                        <Trash className="mr-2 bg-gray-100" size={18} />{" "}
                        Eliminar
                      </>
                    ) : (
                      <>
                        <Archive className="mr-2 bg-gray-100" size={18} />{" "}
                        Archivar
                      </>
                    )}
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
