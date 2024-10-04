import { useSelector } from "react-redux";
import { TableroLayout } from "../components/TableroLayout";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-bootstrap-icons";

const initialColumns = {
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
  const tableros = useSelector((state) => state.tablero.tableros);
  const [columns, setColumns] = useState(initialColumns);
  const [createTablero, setCreateTablero] = useState(false);
  const [tableroName, setTableroName] = useState("");

  const onChange = (field) => (e) => {
    if (field === "tableroName") {
      setTableroName(e.target.value);
    }
  };

  const addNewList = () => {
    setColumns({
      ...columns,
      [tableroName.replace(" ", "")]: {
        name: tableroName,
        items: [],
      },
    });
    setCreateTablero(false);
    setTableroName("");
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

  return (
    <TableroLayout>
      <div className="w-full min-h-screen p-4 bg-[#8F3F65]">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row gap-4">
            {Object.entries(columns).map(([columnId, column], index) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="rounded-lg p-4 shadow-lg bg-black w-[300px] h-full"
                  >
                    <h2 className="font-bold text-md mb-2">{column.name}</h2>
                    <div className="">
                      {column.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-2 mb-2 rounded text-sm ${
                                snapshot.isDragging
                                  ? "bg-green-300"
                                  : "bg-custom-body"
                              } border border-transparent hover:border-white`}
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
            {!createTablero && (
              <div
                className="flex flex-row items-center font-bold text-white text-sm rounded-lg p-2 bg-[#AA6D8B] shadow-lg w-[300px] h-full cursor-pointer hover:bg-[#9c627f]"
                onClick={() => setCreateTablero(true)}
              >
                <Plus className="w-6 h-6" />
                Añade otra lista
              </div>
            )}
            {createTablero && (
              <div className="text-sm rounded-lg p-2 bg-black shadow-lg w-[300px] h-full">
                <input
                  className="bg-custom-body p-1 rounded w-full"
                  placeholder="Introduce el nombre de la lista"
                  type="text"
                  onChange={onChange("tableroName")}
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
                    onClick={() => setCreateTablero(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </DragDropContext>
      </div>
    </TableroLayout>
  );
}
