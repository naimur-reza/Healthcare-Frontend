import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
};

type TProps = {
  children: ReactNode;
  submit: SubmitHandler<FieldValues>;
  defaultValues?: FieldValues;
} & TFormConfig;

const PHForm = ({ children, submit, resolver, defaultValues }: TProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
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
