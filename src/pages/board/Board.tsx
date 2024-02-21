import { useMemo, useState } from "react";
import { TColumn, TId, TTask } from "../../types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Column } from "./column/Column";
import { createPortal } from "react-dom";
import { Task } from "./task/Task";
import { InputCreateColumn } from "./column/components/InputCreateColumn/InputCreateColumn";
import { Container } from "./styles";

const generateId = () => Math.floor(Math.random() * 1001);

export const Board = () => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [activeColumn, setActiveColumn] = useState<TColumn | null>(null);
  const [activeTask, setActiveTask] = useState<TTask | null>(null);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
  const [tasks, setTasks] = useState<TTask[]>([]);

  const createNewColumn = (title: string) => {
    const columnToAdd: TColumn = {
      id: generateId(),
      title,
    };

    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: TId) => {
    const filteredColumns = columns.filter((column) => column.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };

  // const updateColumn = (id: TId, title: string) => {
  //   const newColumns = columns.map((column) => {
  //     if (column.id !== id) return column;
  //     return { ...column, title };
  //   });

  //   setColumns(newColumns);
  // };

  const createTask = (columnId: TId, title: string) => {
    const newTask: TTask = {
      id: generateId(),
      columnId,
      title,
    };

    setTasks([...tasks, newTask]);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((cols) => {
      const activeColumnIndex = cols.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = cols.findIndex((col) => col.id === overColumnId);

      return arrayMove(cols, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <Container>
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <Column
              column={column}
              deleteColumn={deleteColumn}
              // updateColumn={updateColumn}
              createTask={createTask}
              tasks={tasks.filter((task) => task.columnId === column.id)}
              key={column.id}
            />
          ))}
        </SortableContext>
        <InputCreateColumn createNewColumn={createNewColumn} />
      </Container>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Column
              column={activeColumn}
              deleteColumn={deleteColumn}
              // updateColumn={updateColumn}
              createTask={createTask}
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
            />
          )}
          {activeTask && <Task task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
