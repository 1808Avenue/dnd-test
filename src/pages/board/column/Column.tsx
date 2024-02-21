import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { ControlsLeftIcon } from "../../../icons/ControlsLeftIcon";
// import { ControlsRightIcon } from "../../icons/ControlsRightIcon";
import { TColumn, TId, TTask } from "../../../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { Task } from "../task/Task";
import { ColumnContainer, ColumnTitle, TasksContainer } from "./styles";
import { InputCreateTask } from "./components/InputCreateTask/InputCreateTask";
import { ButtonAddTask } from "./components/ButtonAddTask/ButtonAddTask";
import { ButtonRemoveColumn } from "./components/ButtonRemoveColumn/ButtonRemoveColumn";

interface IProps {
  column: TColumn;
  deleteColumn: (id: TId) => void;
  // updateColumn: (id: TId, title: string) => void;

  createTask: (columnId: TId, title: string) => void;
  tasks: TTask[];
}

export const Column = (props: IProps) => {
  const { column, deleteColumn, createTask, tasks } = props;
  const [editMode, setEditMode] = useState(false);
  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => setEditMode((prevMode) => !prevMode);

  if (isDragging) {
    return (
      <ColumnContainer>
        <ColumnTitle
          ref={setNodeRef}
          style={style}
          key={column.id}
          {...attributes}
          {...listeners}
        >
          <ControlsLeftIcon />
          <ColumnTitle>{column.title}</ColumnTitle>
        </ColumnTitle>
      </ColumnContainer>
    );
  }

  return (
    <ColumnContainer>
      <ColumnTitle
        ref={setNodeRef}
        style={style}
        key={column.id}
        {...attributes}
        {...listeners}
      >
        <ControlsLeftIcon />
        {column.title}
        <ButtonRemoveColumn id={column.id} deleteColumn={deleteColumn} />
      </ColumnTitle>
      {editMode ? (
        <InputCreateTask
          id={column.id}
          createTask={createTask}
          toggleEditMode={toggleEditMode}
        />
      ) : (
        <ButtonAddTask toggleEditMode={toggleEditMode} />
      )}
      <TasksContainer>
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </SortableContext>
      </TasksContainer>
    </ColumnContainer>
  );
};
