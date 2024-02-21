import { useState } from "react";
import { ControlsLeftIcon } from "../../../../../icons/ControlsLeftIcon";
import { Container, Input } from "./styles";

interface IProps {
  createNewColumn: (title: string) => void;
}

export const InputCreateColumn = (props: IProps) => {
  const { createNewColumn } = props;
  const [value, setValue] = useState("");

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;
    setValue(inputValue);
  };

  return (
    <Container>
      <ControlsLeftIcon />
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Новая колонка"
        autoFocus
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          const title = target.value;

          if (e.key !== "Enter") return;
          if (title.trim() !== "") {
            createNewColumn(title);
            setValue("");
          }
        }}
      />
    </Container>
  );
};
