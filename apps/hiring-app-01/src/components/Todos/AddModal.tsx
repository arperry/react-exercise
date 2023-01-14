import { useState } from 'react';
import { Modal, Button, Group, Box, TextInput, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { addNewTodo } from 'src/store/slices/todosSlice';
import { useAppDispatch } from 'src/store/hooks';

type NewTodo = {
  title: string;
  duration: number;
};

const AddModal = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      title: '',
      duration: 30
    },

    validate: {
      title: (value: string) => (value !== '' ? null : 'Enter title')
    }
  });

  const submitForm = async (vals: NewTodo) => {
    const newData = { title: vals.title, duration: vals.duration };
    dispatch(addNewTodo(newData));
    form.reset();
    setOpened(false);
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="New ToDo Item">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit((values: NewTodo) => submitForm(values))}>
            <TextInput withAsterisk label="Title" placeholder="Title" {...form.getInputProps('title')} />
            <NumberInput
              withAsterisk
              label="Duration (Minutes)"
              placeholder="Minutes"
              step={10}
              {...form.getInputProps('duration')}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Group position="left">
        <Button onClick={() => setOpened(true)}>Add Item</Button>
      </Group>
    </>
  );
};

export default AddModal;
