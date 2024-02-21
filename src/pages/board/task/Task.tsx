import { useSortable } from "@dnd-kit/sortable";
import { TTask } from "../../../types";
import { CSS } from "@dnd-kit/utilities";
import { Container, Title } from "./styles";

interface IProps {
  task: TTask;
}

export const Task = ({ task }: IProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Container
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  }
  return (
    <Container ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Title>{task.title}</Title>
    </Container>
  );
};
