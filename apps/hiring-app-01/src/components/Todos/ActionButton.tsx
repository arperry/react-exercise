import { ActionIcon } from '@mantine/core';
import { IconFlame, IconTrash } from '@tabler/icons';
import { setUrgent, deleteTodoItem } from 'src/store/slices/todosSlice';
import { useAppDispatch } from 'src/store/hooks';

type SelectButtonType = {
  itemId: string | unknown;
  type: string | unknown;
  urgent?: boolean | unknown;
};

const ActionButton = ({ itemId, type, urgent = false }: SelectButtonType) => {
  const dispatch = useAppDispatch();
  const variant = urgent ? 'filled' : 'transparent';
  const urgentColor = urgent ? 'orange.7' : 'gray';
  const color = type === 'urgent' ? urgentColor : 'red';

  const onClick = () => {
    if (!itemId) return;
    if (type === 'urgent') {
      const newStatus = !urgent;
      dispatch(setUrgent({ uuid: itemId as string, flag: newStatus }));
    } else if (type === 'delete') {
      dispatch(deleteTodoItem({ uuid: itemId as string }));
    }
  };

  return (
    <ActionIcon variant={variant} color={color}>
      {type === 'urgent' && <IconFlame size={20} onClick={onClick} />}
      {type === 'delete' && <IconTrash size={20} onClick={onClick} />}
    </ActionIcon>
  );
};

export default ActionButton;
