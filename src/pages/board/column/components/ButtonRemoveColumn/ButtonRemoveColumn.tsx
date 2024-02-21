import { RemoveColumnIcon } from "../../../../../icons/RemoveColumnIcon";
import { TId } from "../../../../../types";
import { Button } from "./styles";

interface IProps {
  id: TId;
  deleteColumn: (id: TId) => void;
}

export const ButtonRemoveColumn = (props: IProps) => {
  const { deleteColumn, id } = props;

  return (
    <Button onClick={() => deleteColumn(id)}>
      <RemoveColumnIcon />
    </Button>
  );
};
