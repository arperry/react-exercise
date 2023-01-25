import { Card, Text, Button, Group } from "@mantine/core";
import { toast } from "react-toastify";
import { deleteTodo, updateTodo } from "app/api";

const TodoCard = ({
  title,
  duration,
  uuid,
  completed,
  setTodoListUpdated,
}: {
  title: string;
  duration: number;
  uuid: string;
  completed: boolean;
  setTodoListUpdated: any;
}) => {
  const handleDelete = async () => {
    const response = await deleteTodo(uuid);
    if (response.ok) {
      toast.warn(`You're todo of ${title} was deleted`);
      setTodoListUpdated(true);
    } else {
      toast.error(`There was an error deleting ${title}`);
    }
  };

  const handleUpdate = async () => {
    const response = await updateTodo(uuid, title, true, duration);
    if (response.ok) {
      toast.success(`Successfully updated ${title}`);
      setTodoListUpdated(true);
    } else {
      toast.error(`There was an error processing the update for ${title} `);
    }
  };

  return (
    <div>
      <Card shadow="sm" p="xl" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
        </Group>
        <Text size="sm">Duration: {duration}</Text>
        <Text size="sm" color="blue">
          Completed: {`${completed}`}
        </Text>
        <Button
          variant="light"
          color="pink"
          size="md"
          mt="md"
          radius="md"
          onClick={handleDelete}
        >
          Delete Todo
        </Button>
        <Button
          variant="light"
          color="green"
          size="md"
          mt="md"
          radius="md"
          onClick={handleUpdate}
        >
          Complete Todo
        </Button>
      </Card>
    </div>
  );
};

export default TodoCard;
