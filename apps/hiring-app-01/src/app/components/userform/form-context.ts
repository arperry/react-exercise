import { createFormContext } from "@mantine/form";

interface UserFormValues {
  title: string;
  duration: number;
}

export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();
