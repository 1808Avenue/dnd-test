import { useState } from "react";
import { TId } from "../../../../../types";
import { Container, Input } from "./styles";

interface IProps {
  id: TId;
  createTask: (id: TId, title: string) => void;
  toggleEditMode: () => void;
}

export const InputCreateTask = (props: IProps) => {
  const { id, createTask, toggleEditMode } = props;
  const [value, setValue] = useState("");

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;

    setValue(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const title = target.value;

    if (e.key !== "Enter") return;
    if (title.trim() !== "") {
      createTask(id, title);
      setValue("");
      toggleEditMode();
    }
  };

  return (
    <Container>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Добавить задачу"
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </Container>
  );
};
