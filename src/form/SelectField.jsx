import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

const SelectField = ({
  name,
  label,
  placeholder = 'Select value',
  options = [],
  className,
  reserveErrorSpace = false,
  fullWidth = true,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        const fieldError = get(errors, name);
        return (
          <div className={cn("flex flex-col gap-1.5 sm:gap-2", fullWidth ? "w-full" : "")}>
            {label && (
                <label className="text-sm font-semibold tracking-tight text-gray-700">
                    {label}
                </label>
            )}
            <FormItem className="relative space-y-0">
                <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""} 
                      {...other}
                    >
                        <SelectTrigger className={cn(
                            "h-[44px] md:h-[52px] rounded-xl bg-white px-4 md:px-5 text-sm md:text-base font-medium text-black border-gray-200 transition-all focus:ring-1 outline-none shadow-sm",
                            fieldError?.message 
                                ? "border-red-500 text-red-500 ring-1 ring-red-100" 
                                : "focus:border-[#F97316] focus:ring-[#F97316]",
                            className
                        )}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl font-medium bg-white z-[9999]">
                            {options.map((option) => (
                                <SelectItem 
                                  key={option.value} 
                                  value={option.value}
                                  className="focus:bg-orange-50 focus:text-[#F97316] cursor-pointer py-2.5"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormControl>
            </FormItem>
            {fieldError?.message ? (
                <div className="pt-1.5 pl-3 text-start text-[11px] font-normal text-red-500">
                  {fieldError?.message}
                </div>
            ) : (
                reserveErrorSpace && <div className="h-5" />
            )}
          </div>
        );
      }}
    ></FormField>
  );
};

export default SelectField;
