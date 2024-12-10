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
  ArrowRight,
  Archive,
  XLg,
  Trash,
  FunnelFill,
  Tags,
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
  const espacioTrabajo = useSelector(
    (state) => state.espacioTrabajo?.espacioTrabajo
  );
  const miembros = espacioTrabajo?.miembros || [];
  

  const tableros = useSelector((state) => state.tablero.tableros);
  const [showSubtaskModal, setShowSubtaskModal] = useState(false);//para las subtareas
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");//para los titulos de la subtareas.
  const [descripcion, setDescripcion] = useState(""); // Estado para la descripción
  const [descripcionGuardada, setDescripcionGuardada] = useState(null); // Estado para la descripción guardada dentro del modal  
  const [follow, setFollow] = useState(false); // Estado para el seguir y siguiendo.
  const [showDetails, setShowDetails] = useState(false); // Estado para el botón "Mostrar Detalles"
  const [showDelete, setShowDelete] = useState(false); // Estado para el boton Archivar -> Eliminar
  const [columns, setColumns] = useState(tableros); //Selector de columnas
  const [createLista, setCreateLista] = useState(false);
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [listaName, setListaName] = useState(""); // Estado para el nombre de la nueva lista
  const [newCardName, setNewCardName] = useState(""); // Estado para el nombre de la nueva tarjeta
  const [selectedCard, setSelectedCard] = useState(null);
  const [filter, setFilter] = useState(""); // Estado para el filtro por nombre tarjeta
  const [filterEtiquetas, setFilterEtiquetas] = useState([]); // Estado para las etiquetas seleccionadas en el filtro
  const [filterUser, setFilterUser] = useState(""); // Estado para el filtro por nombre de usuario
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
  //Estado para mostrar/ocultar el modal de la etiqueta
  const [showEtiquetaModal, setShowEtiquetaModal] = useState(false); // Mostrar/ocultar modal
  const [nombreEtiqueta, setNombreEtiqueta] = useState(""); // Nombre de la etiqueta
  const [colorEtiqueta, setColorEtiqueta] = useState("#FFFFFF"); // Color de la etiqueta
  const [etiquetas, setEtiquetas] = useState([]); // Lista de etiquetas
  const [showEtiquetaList, setShowEtiquetaList] = useState(false); // Mostrar/ocultar lista de etiquetas dentro del modal al clicar en el boton Etiquetas
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);//controlar el comportamiento del modal de subtareas.

  useEffect(() => {
    dispatch(tableroActions.setTableros(columns));
  }, [columns]);
  useEffect(() => {
    if (selectedColumn && selectedCard) {
      const currentCard = columns[selectedColumn]?.items.find(
        (item) => item.name === selectedCard.name
      );
      if (currentCard) {
        setSelectedCard(currentCard);
      }
    }
  }, [columns, selectedColumn, selectedCard?.name]);
  

  //Estado para mostrar ocultar creacion de etiquetas
  const crearEtiqueta = () => {
    if (nombreEtiqueta.trim() === "") {
      alert("El nombre de la etiqueta no puede estar vacío.");
      return;
    }

    const nuevaEtiqueta = {
      id: Date.now().toString(), // ID único
      nombre: nombreEtiqueta,
      color: colorEtiqueta,
    };

    setEtiquetas([...etiquetas, nuevaEtiqueta]); // Agregar etiqueta a la lista
    setNombreEtiqueta(""); // Resetear nombre
    setColorEtiqueta("#FFFFFF"); // Resetear color
    setShowEtiquetaModal(false); // Cerrar modal
  };

  //Estado para eliminar etiquetas
  const eliminarEtiqueta = (id) => {
    const nuevasEtiquetas = etiquetas.filter((etiqueta) => etiqueta.id !== id); // Filtrar etiquetas por ID
    setEtiquetas(nuevasEtiquetas); // Actualizar estado
  };

  //Estado y Funciones para el boton de Etiquetas dentro del modal
  // Función para alternar etiquetas seleccionadas en una tarjeta
  const toggleEtiquetaSeleccionada = (etiqueta) => {
    if (!selectedCard) return;

    // Crear una copia de la tarjeta seleccionada
    const tarjetaActualizada = {
      ...selectedCard,
      etiquetas: Array.isArray(selectedCard.etiquetas)
        ? [...selectedCard.etiquetas]
        : [],
    };

    // Verificar si la etiqueta ya existe en la tarjeta
    if (tarjetaActualizada.etiquetas.some((e) => e.id === etiqueta.id)) {
      // Si existe, la eliminamos
      tarjetaActualizada.etiquetas = tarjetaActualizada.etiquetas.filter(
        (e) => e.id !== etiqueta.id
      );
    } else {
      // Si no existe, la agregamos
      tarjetaActualizada.etiquetas.push(etiqueta);
    }

    // Actualizar la columna correspondiente
    setColumns((prevColumns) => ({
      ...prevColumns,
      [selectedColumn]: {
        ...prevColumns[selectedColumn],
        items: prevColumns[selectedColumn].items.map((item) =>
          item.name === tarjetaActualizada.name ? tarjetaActualizada : item
        ),
      },
    }));

    // Actualizar la tarjeta seleccionada
    setSelectedCard(tarjetaActualizada);
  };

  // Función para eliminar una etiqueta de la tarjeta
  const eliminarEtiquetaDeTarjeta = (etiqueta) => {
    const tarjetaActualizada = {
      ...selectedCard,
      etiquetas:
        selectedCard.etiquetas?.filter((e) => e.id !== etiqueta.id) || [],
    };

    setColumns({
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        items: columns[selectedColumn].items.map((item) =>
          item.name === tarjetaActualizada.name ? tarjetaActualizada : item
        ),
      },
    });

    setSelectedCard(tarjetaActualizada);
  };

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
    if (newCardName.trim() === "") return;
  
    const updatedColumn = {
      ...columns[columnId],
      items: [
        ...columns[columnId].items,
        {
          name: newCardName,
          description: "", 
          fechaCreacion: new Date(),
          subtasks: [], // Agrega subtareas como una lista vacía
          fechaInicio: null,
          fechaFin: null,
          user: null,
          etiquetas: [],
        },
      ],
    };
  
    setColumns({
      ...columns,
      [columnId]: updatedColumn,
    });
  
    setNewCardName("");
    setIsAddingCard({ ...isAddingCard, [columnId]: false });
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
    setShowEtiquetaList(false); // Oculta la lista de etiquetas
    setSelectedCard(null); // Limpia la tarjeta seleccionada
    setSelectedColumn(null);
    setShowDelete(false); // Resetea el comportamiento de archivar/eliminar
    setShowDetails(false);
    setShowDatePicker(false); // Oculta el datepicker al cerrar
    setShowMoveSelect(false); // Resetea el comportamiento del selector de mover
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

      // Si atrasada no existe, se agrega al principio de todo
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
      // Si atrasada sí existe, se debe actualizar luego de ...columns o sino si ponemos antes ...columns le sobreescribe
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

  //Almacenar descripcion de la tarjeta seleccionada
  const updateDescripcion = (descripcion) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [selectedColumn]: {
        ...prevColumns[selectedColumn],
        items: prevColumns[selectedColumn].items.map((item) =>
          item.name === selectedCard.name
            ? { ...item, description: descripcion } // Actualiza solo la tarjeta seleccionada
            : item
        ),
      },
    }));
  };
  
  //Funcion para el subtask
  const addSubtask = () => {
    if (!newSubtaskTitle.trim() || !selectedCard) return;
  
    const newSubtask = {
      id: Date.now(),
      title: newSubtaskTitle,
      description: "",
      completed: false,
    };
  
    const updatedCard = {
      ...selectedCard,
      subtasks: [...(selectedCard.subtasks || []), newSubtask],
    };
  
    // Actualizamos las columnas
    setColumns((prevColumns) => ({
      ...prevColumns,
      [selectedColumn]: {
        ...prevColumns[selectedColumn],
        items: prevColumns[selectedColumn].items.map((item) =>
          item.name === selectedCard.name ? updatedCard : item
        ),
      },
    }));
  
    // También actualizamos el estado de `selectedCard`
    setSelectedCard(updatedCard);
  
    setNewSubtaskTitle("");
  };
  
  


  const deleteSubtask = (subtaskId) => {
    if (!selectedCard) return;
  
    const updatedSubtasks = selectedCard.subtasks.filter(
      (subtask) => subtask.id !== subtaskId
    );
  
    setColumns((prevColumns) => ({
      ...prevColumns,
      [selectedColumn]: {
        ...prevColumns[selectedColumn],
        items: prevColumns[selectedColumn].items.map((item) =>
          item.name === selectedCard.name
            ? { ...item, subtasks: updatedSubtasks }
            : item
        ),
      },
    }));
  };

  const toggleSubtaskCompletion = (subtaskId) => {
    if (!selectedCard) return;
  
    const updatedSubtasks = selectedCard.subtasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
  
    const updatedCard = { ...selectedCard, subtasks: updatedSubtasks };
  
    // Actualizamos las columnas
    setColumns((prevColumns) => ({
      ...prevColumns,
      [selectedColumn]: {
        ...prevColumns[selectedColumn],
        items: prevColumns[selectedColumn].items.map((item) =>
          item.name === selectedCard.name ? updatedCard : item
        ),
      },
    }));
  
    // También actualizamos el estado de `selectedCard`
    setSelectedCard(updatedCard);
  };
  
  
  
  

  return (
    <TableroLayout>
      <div className="w-full h-full p-4 bg-[#8F3F65] overflow-auto">
        {/* Botón de Filtros */}
        <div className="flex flex-row gap-4 mb-3">
          {/* Botón Crear Etiqueta */}
          <div
            className="flex flex-row items-center font-bold text-white text-sm h-10 rounded-lg p-2 bg-[#AA6D8B] shadow-lg cursor-pointer hover:bg-[#9c627f]"
            onClick={() => setShowEtiquetaModal(true)} // Estado para mostrar el modal
          >
            <Tags className="w-6 h-6" />
            <span className="ml-2">Crear etiquetas</span>
          </div>
          {/* Modal para crear etiqueta */}
          {showEtiquetaModal && (
            <Modal
              isOpen={showEtiquetaModal}
              onRequestClose={() => setShowEtiquetaModal(false)}
              style={customModalStyles}
              contentLabel="Crear Etiqueta"
            >
              <div className="relative">
                <button
                  className="absolute top-2 right-2 hover:bg-gray-500 hover:rounded-full"
                  onClick={() => setShowEtiquetaModal(false)}
                >
                  <X className="w-6 h-6 cursor-pointer" />
                </button>

                <h2 className="font-bold text-lg mb-4 text-gray-900">
                  Crear Etiqueta
                </h2>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Nombre de la etiqueta"
                    className="p-2 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={nombreEtiqueta}
                    onChange={(e) => setNombreEtiqueta(e.target.value)} // Guardar nombre
                  />

                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold mb-2">
                      Seleccionar Color
                    </label>
                    <input
                      type="color"
                      className="w-16 h-16 cursor-pointer"
                      value={colorEtiqueta}
                      onChange={(e) => setColorEtiqueta(e.target.value)} // Guardar color
                    />
                  </div>

                  <button
                    className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-400"
                    onClick={crearEtiqueta} // Función para guardar etiqueta
                  >
                    Crear
                  </button>
                </div>
              </div>
              {/* Lista de etiquetas creadas */}
              <div className="mt-4">
                <h3 className="font-bold text-white mb-2">Etiquetas Creadas</h3>
                <div className="flex flex-wrap gap-2">
                  {etiquetas.map((etiqueta) => (
                    <div
                      key={etiqueta.id}
                      className="flex items-center gap-2 px-3 py-1 rounded shadow-md"
                      style={{ backgroundColor: etiqueta.color }}
                    >
                      <span className="text-white font-bold">
                        {etiqueta.nombre}
                      </span>
                      <button
                        className="bg-red 500 text-white px-2 py-1 rounded hover:bg-red-400"
                        onClick={() => eliminarEtiqueta(etiqueta.id)} //llamar a la funcion que elimina tarjetas
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Modal>
          )}
          <div
            className="flex flex-row items-center font-bold text-white text-sm h-10 rounded-lg p-2 bg-[#AA6D8B] shadow-lg cursor-pointer hover:bg-[#9c627f]"
            onClick={() => setShowFilterInput(!showFilterInput)}
          >
            <FunnelFill className="w-6 h-6" />
            <span className="ml-2">Filtros</span>
          </div>
          {/* Input para buscar por nombre de tarjeta y de etiqueta */}
          {showFilterInput && (
            <div className="flex gap-2">
              <input
                type="text"
                className="rounded p-3 text-black w-72 h-10"
                placeholder="Buscar por nombre de tarjeta"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <Select
                options={etiquetas.map((etiqueta) => ({
                  value: etiqueta.nombre,
                  label: etiqueta.nombre,
                  color: etiqueta.color, // Guardamos el color como parte de la opción
                }))} // Opciones del dropdown basadas en las etiquetas creadas
                isMulti // Permitir múltiples selecciones
                placeholder="Filtrar por etiquetas"
                value={filterEtiquetas.map((etiquetaNombre) => {
                  const etiqueta = etiquetas.find(
                    (e) => e.nombre === etiquetaNombre
                  );
                  return {
                    value: etiquetaNombre,
                    label: etiquetaNombre,
                    color: etiqueta?.color || "#FFFFFF", // Aplicamos el color correspondiente
                  };
                })} // Mantener las etiquetas seleccionadas con su color
                onChange={(selectedOptions) =>
                  setFilterEtiquetas(
                    selectedOptions.map((option) => option.value)
                  )
                } // Actualizar el estado al seleccionar etiquetas
                className="w-72 text-black"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                  }),
                  multiValue: (styles, { data }) => ({
                    ...styles,
                    backgroundColor: data.color, // Usar el color de la etiqueta
                    color: "white",
                    borderRadius: "4px",
                    padding: "2px 4px",
                  }),
                  multiValueLabel: (styles, { data }) => ({
                    ...styles,
                    color: "white", // Texto blanco para contraste
                  }),
                  multiValueRemove: (styles, { data }) => ({
                    ...styles,
                    color: "white",
                    ":hover": {
                      backgroundColor: data.color,
                      color: "black", // Cambia el color al hover para mejor usabilidad
                    },
                  }),
                }}
              />
              <input
                type="text"
                className="rounded p-3 text-black w-72 h-10"
                placeholder="Buscar por miembro"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
            </div>
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
                        .filter((item) => {
                          const matchesName = item.name
                            .toLowerCase()
                            .includes(filter.toLowerCase());
                          const matchesEtiquetas =
                            filterEtiquetas.length === 0 || // Si no hay etiquetas seleccionadas, no filtrar por etiquetas
                            filterEtiquetas.some((etiqueta) =>
                              item.etiquetas?.some(
                                (e) =>
                                  e.nombre.toLowerCase() ===
                                  etiqueta.toLowerCase()
                              )
                            ); // Verificar si al menos una etiqueta coincide
                          const matchesUser =
                            filterUser === "" ||
                            (item.user &&
                              item.user
                                .toLowerCase()
                                .includes(filterUser.toLowerCase()));

                          return matchesName && matchesEtiquetas && matchesUser; // Todas las condiciones deben cumplirse
                        })
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
                                {/* Título de la tarjeta */}
                                <div>{item.name}</div>

                                {/* Etiquetas visibles debajo del título */}
                                {item.etiquetas?.length > 0 && (
                                  <div className="flex flex-wrap mt-2">
                                    {item.etiquetas.map((etiqueta) => (
                                      <div
                                        key={etiqueta.id}
                                        className="px-2 py-1 text-xs font-bold rounded mr-2 mb-2"
                                        style={{
                                          backgroundColor: etiqueta.color,
                                          color: "#fff",
                                        }}
                                      >
                                        {etiqueta.nombre}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Usuario asignado */}
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
                <div>
                  <h2 className="font-bold text-lg mb-4 flex items-center text-gray-900">
                    <CardHeading className="mr-2" size={20} />
                    {selectedCard.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Fecha de creación:</strong>{" "}
                    {selectedCard.fechaCreacion
                      ? new Date(selectedCard.fechaCreacion).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "No disponible"}
                  </p>
                </div>
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
                            {miembro.nombre} {miembro.apellido}
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
                  {selectedCard?.editingDescription ? (
                    <>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Añadir una descripción más detallada..."
                        rows="3"
                        value={selectedCard?.description || ""}
                        onChange={(e) => {
                          const nuevaDescripcion = e.target.value;
                          setSelectedCard({ ...selectedCard, description: nuevaDescripcion }); // Actualiza localmente
                        }}
                      ></textarea>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-400"
                          onClick={() => {
                            if (selectedCard) {
                              updateDescripcion(selectedCard.description); // Guarda los cambios
                              setSelectedCard({ ...selectedCard, editingDescription: false });
                            }
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          className="bg-gray-500 px-3 py-2 rounded text-white hover:bg-gray-400"
                          onClick={() => {
                            if (selectedCard) {
                              setSelectedCard({ ...selectedCard, editingDescription: false }); // Cancela la edición
                            }
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-4">
                      <p className="text-gray-900">{selectedCard?.description || "Sin descripción"}</p>
                      <button
                        className="text-blue-500 text-sm underline"
                        onClick={() => setSelectedCard({ ...selectedCard, editingDescription: true })}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
                 {/* Aquí colocamos el formulario para agregar subtareas */}
                 {showSubtaskForm && (
                      <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-2">Añadir subtareas</h3>
                      <div>
                        <input
                          type="text"
                          placeholder="Título de la subtarea"
                          className="p-2 border border-gray-300 rounded w-full"
                          value={newSubtaskTitle}
                          onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        />
                        <button
                          className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-400 mt-2"
                          onClick={addSubtask}
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  )}
               {/* Lista de subtareas */}
              {selectedCard?.subtasks && selectedCard.subtasks.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 mb-2">Subtareas</h3>
                  {selectedCard.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className={`flex items-center justify-between p-2 mb-2 rounded ${
                        subtask.completed ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => toggleSubtaskCompletion(subtask.id)}
                        />
                        <span
                          className={`ml-2 ${
                            subtask.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {subtask.title}
                        </span>
                      </div>
                      <button
                        className="text-red-500 text-sm"
                        onClick={() => deleteSubtask(subtask.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
                
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

                {/* Botón para mostrar etiquetas */}
                <div className="w-full">
                  <button
                    className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold w-full"
                    onClick={() => setShowEtiquetaList(!showEtiquetaList)} // Estado para mostrar lista de etiquetas
                  >
                    <TagFill className="mr-2 bg-gray-100" size={18} /> Etiquetas
                  </button>

                  {/* Lista desplegable de etiquetas guardadas */}
                  {showEtiquetaList && (
                    <div className="mt-2 bg-white border rounded shadow-md p-2">
                      {etiquetas.map((etiqueta) => (
                        <div
                          key={etiqueta.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => toggleEtiquetaSeleccionada(etiqueta)} // Agregar o quitar etiqueta
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: etiqueta.color }}
                            ></div>
                            <span>{etiqueta.nombre}</span>
                          </div>
                          {selectedCard.etiquetas?.includes(etiqueta) && (
                            <CheckCircleFill
                              className="text-green-500"
                              size={18}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mostrar etiquetas seleccionadas */}
                  {selectedCard && (
                    <>
                      {selectedCard.etiquetas?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedCard.etiquetas.map((etiqueta) => (
                            <div
                              key={etiqueta.id}
                              className="flex items-center gap-2 px-3 py-1 rounded shadow-md"
                              style={{ backgroundColor: etiqueta.color }}
                            >
                              <span className="text-white font-bold">
                                {etiqueta.nombre}
                              </span>
                              <button
                                className="text-black font-bold px-2 py-1 rounded hover:bg-gray-200 hover:text-black"
                                style={{ backgroundColor: "transparent" }}
                                onClick={() =>
                                  eliminarEtiquetaDeTarjeta(etiqueta)
                                }
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <button
                  className="bg-gray-100 px-3 py-1 rounded text-gray-900 flex items-center hover:bg-gray-200 font-bold"
                  onClick={() => setShowSubtaskForm(!showSubtaskForm)}
                >
                  <CardChecklist className="mr-2 bg-gray-100" size={18} /> Checklist
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
