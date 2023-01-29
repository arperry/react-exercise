import {
  Button,
  Checkbox,
  Group,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { AddTodo } from "../../api";
import { displaySequence } from "../../fixtures";

type FormDisplaySequence = { displaySequence: string };
type FormValues = Omit<AddTodo, "displaySequence"> & FormDisplaySequence;

type AddModalProps = {
  /** Indicates if the modal is open */
  open: boolean;
  /** Reverses the modal open state */
  handleOpen: () => void;
  /** Adds the new details to create a new Todo */
  handleOnAdd: (details: AddTodo) => void;
};
const AddModal = ({ open, handleOpen, handleOnAdd }: AddModalProps) => {
  const form = useForm({
    initialValues: {
      completed: false,
      duration: 60,
      title: "",
      displaySequence: "",
      color: "#FFF",
    },
    validate: {
      title: (value) => (value.length > 0 ? null : "Title is Required"),
      displaySequence: (value) =>
        value.length > 0 ? null : "Please pick a day to plan this todo",
    },
  });

  const onSubmit = (values: FormValues) => {
    const newTodo: AddTodo = {
      completed: values.completed,
      duration: values.duration,
      title: values.title,
      displaySequence: Number(values.displaySequence),
      color: values.color,
    };
    handleOnAdd(newTodo);
  };

  return (
    <Modal opened={open} onClose={handleOpen} centered>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          label="Title"
          placeholder="Todo Title"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <Checkbox
          mt="md"
          label="Completed"
          {...form.getInputProps("completed", { type: "checkbox" })}
        />
        <NumberInput
          placeholder="Time Spent"
          label="Estimate or give a completed time spent value in minutes"
          {...form.getInputProps("duration")}
        />
        <Select
          label="Day planned or completed"
          placeholder="Pick a day"
          withAsterisk
          data={displaySequence}
          {...form.getInputProps("displaySequence")}
        />
        <Select
          label="Select Color for note"
          data={[
            { value: "#FFF", label: "White" },
            { value: "#CCCCFF", label: "Periwinkle" },
            { value: "#A7C7E7", label: "Pastel Blue" },
            { value: "#96DED1", label: "Robin Egg" },
            { value: "#C1E1C1", label: "Lime" },
          ]}
          {...form.getInputProps("color")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddModal;
