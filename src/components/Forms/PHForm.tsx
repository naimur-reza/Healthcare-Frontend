import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

const PHForm = ({
  children,
  submit,
}: {
  children: ReactNode;
  submit: SubmitHandler<FieldValues>;
}) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    submit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
