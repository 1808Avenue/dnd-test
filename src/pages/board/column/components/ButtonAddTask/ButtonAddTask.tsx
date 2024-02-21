import { AddTaskIcon } from "../../../../../icons/AddTaskIcon";
import { Button, Container, Title } from "./styles";

interface IProps {
  toggleEditMode: () => void;
}

export const ButtonAddTask = (props: IProps) => {
  const { toggleEditMode } = props;

  return (
    <Container>
      <Button onClick={toggleEditMode}>
        <AddTaskIcon />
      </Button>
      <Title>Добавить задачу</Title>
    </Container>
  );
};
