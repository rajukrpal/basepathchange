import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"

const Form = FormProvider

const FormItemContext = React.createContext({})

const FormField = ({ ...props }) => {
  return (
    <FormItemContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormItemContext.Provider>
  )
}

const useFormField = () => {
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const fieldState = getFieldState(itemContext.name, formState)

  return {
    id: React.useId(),
    name: itemContext.name,
    formItemId: `${itemContext.name}-form-item`,
    formDescriptionId: `${itemContext.name}-form-item-description`,
    formMessageId: `${itemContext.name}-form-item-message`,
    ...fieldState,
  }
}



const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  return (
    <Slot
      ref={ref}
      {...props}
    />
  )
})


FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

