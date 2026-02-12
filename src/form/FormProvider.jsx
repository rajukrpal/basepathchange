import { cn } from '@/lib/utils';
import React from 'react';
import { FormProvider as Form } from 'react-hook-form';

const FormProvider = ({ children, onSubmit, methods, className, ...rest }) => {
  return (
    <Form {...methods}>
      <form noValidate className={cn(className)} onSubmit={onSubmit} {...rest}>
        {children}
      </form>
    </Form>
  );
};

export default FormProvider;
