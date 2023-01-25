import { NumberInput, TextInput } from "@mantine/core";
import { useUserFormContext } from "./form-context";

const TodoInput = () => {
  const form = useUserFormContext();
  return (
    <>
      <TextInput label="title" {...form.getInputProps("title")} />
      <NumberInput label="duration" {...form.getInputProps("duration")} />
    </>
  );
};

export default TodoInput;
