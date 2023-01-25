import { UserFormProvider, useUserForm } from "./form-context";
import { toast } from "react-toastify";
import TodoInput from "./TodoInput";
import { addTodo } from "app/api";
import { Button, Grid } from "@mantine/core";

interface TodoInputType {
  title: string;
  duration: number;
}

const UserForm = () => {
  const form = useUserForm({
    initialValues: {
      title: "",
      duration: 0,
    },
    validate: {
      title: (value: string) =>
        value.length > 5 ? null : "The title needs to be at least 5 characters",
    },
  });

  return (
    <Grid.Col span={8}>
      <UserFormProvider form={form}>
        <form
          onSubmit={form.onSubmit(async (event: TodoInputType) => {
            await addTodo(event.title, event.duration);
            toast.success("You're todo was created!");
          })}
        >
          <TodoInput />
          <Button type="submit">Submit</Button>
        </form>
      </UserFormProvider>
    </Grid.Col>
  );
};

export default UserForm;
