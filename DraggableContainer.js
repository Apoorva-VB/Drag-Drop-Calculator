import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useCalculatorStore from "../stores/useCalculatorStore";

const DraggableContainer = () => {
  const {
    components,
    updateLayout,
    removeComponent,
    calculateResult,
    clearCalculator,
    appendInput,
    undo,
    redo,
  } = useCalculatorStore();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...components];
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);
    updateLayout(items, true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="calculator-components" direction="vertical">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-4 gap-3 p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900"
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#d1d5db" : "#e5e7eb",
              transition: "background-color 0.2s ease",
            }}
          >
            {/* Undo/Redo Buttons */}
            <div className="col-span-4 flex justify-between mb-2">
              <button
                onClick={undo}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={redo}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Redo
              </button>
            </div>
            {components.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-lg col-span-4 text-center">
                Drag components here
              </p>
            )}
            {components.map((comp, index) => (
              <Draggable key={comp.id} draggableId={comp.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`relative cursor-pointer transition-all p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white 
                    border border-gray-300 dark:border-gray-600 rounded-lg text-center w-16 h-16 
                    flex items-center justify-center text-2xl shadow-md
                    ${
                      snapshot.isDragging
                        ? "opacity-50 scale-110 shadow-lg"
                        : "opacity-100"
                    }`}
                    style={{ ...provided.draggableProps.style }}
                    onClick={() => {
                      if (comp.label === "=") {
                        calculateResult();
                      } else if (comp.label === "C") {
                        clearCalculator();
                      } else {
                        appendInput(comp.label);
                      }
                    }}
                  >
                    <span>{comp.label}</span>
                    {/* Remove Button */}
                    <button
                      className="absolute -top-2 -right-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-full w-5 h-5 
                     flex items-center justify-center text-xs shadow-md hover:bg-red-500 hover:scale-110 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeComponent(comp.id, true);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContainer;
