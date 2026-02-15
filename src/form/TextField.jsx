import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TextField = ({
  name,
  placeholder = '',
  textarea = false,
  numeric = false,
  label,
  className,
  prefix = null,
  postfix = null,
  reserveErrorSpace = false,
  ...other
}) => {
  const { control, clearErrors, setValue } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        const fieldError = get(errors, name);
        return (
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {label && (
              <label className="text-sm font-semibold text-gray-700 tracking-tight">
                {label}
              </label>
            )}
            <FormItem className="relative space-y-0">
                <FormControl>
                  {textarea ? (
                    <Textarea
                      {...field}
                      {...other}
                      autoComplete="off"
                      id={name}
                      required
                      placeholder={placeholder}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValue(name, value, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        if (value && String(value).trim() !== '') {
                          clearErrors(name);
                        }
                      }}
                      className={cn(
                        'h-[52px] min-h-[120px] rounded-[10px] bg-white px-6 pt-3 text-sm font-normal text-black placeholder:text-sm placeholder:font-light placeholder:text-[#8D8D8D] focus-visible:ring-1 focus-visible:ring-offset-0 sm:h-[58px] sm:placeholder:text-base md:text-base',
                        fieldError?.message
                          ? 'text-red-500 focus-visible:ring-red-500'
                          : 'text-primary focus-visible:border-[#F97316] focus-visible:ring-[#F97316]',
                        prefix ? 'pl-11 md:pl-12' : '',
                        postfix ? 'pr-11 md:pr-12' : '',
                        className
                      )}
                    />
                  ) : (
                    <Input
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const nextVal = numeric ? raw.replace(/[^0-9]/g, '') : raw;
                        setValue(name, nextVal, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        if (nextVal && String(nextVal).trim() !== '') {
                          clearErrors(name);
                        }
                      }}
                      {...(numeric && {
                        inputMode: 'numeric',
                        min: 0,
                      })}
                      autoComplete="off"
                      id={name}
                      required
                      placeholder={placeholder}
                      className={cn(
                        'h-[44px] md:h-[52px] rounded-xl bg-white px-4 md:px-5 text-sm md:text-base font-medium text-black placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 border-gray-200 transition-all',
                        fieldError?.message
                          ? 'border-red-500 text-red-500 focus-visible:ring-red-500'
                          : 'focus-visible:border-[#F97316] focus-visible:ring-[#F97316] disabled:text-[#969696f2]',
                        prefix ? 'pl-11 md:pl-12' : '',
                        postfix ? 'pr-11 md:pr-12' : '',
                        className
                      )}
                      {...other}
                    />
                  )}
                </FormControl>
                {prefix && (
                  <div
                    className={cn(
                      'absolute flex items-center justify-center left-3 md:left-4 pointer-events-none text-gray-400 transition-colors',
                      textarea ? 'top-4' : 'inset-y-0'
                    )}
                  >
                    {prefix}
                  </div>
                )}
                {postfix && (
                  <div
                    className={cn(
                      'absolute flex items-center justify-center right-3 md:right-4 pointer-events-none text-gray-400 transition-colors',
                      textarea ? 'top-4' : 'inset-y-0'
                    )}
                  >
                    {postfix}
                  </div>
                )}
              </FormItem>
              {fieldError?.message ? (
                <div className="pt-1 pl-3 text-start text-xs font-normal text-red-500 sm:text-sm">
                  {fieldError?.message}
                </div>
              ) : (
                reserveErrorSpace && !fieldError && <div className="h-5" />
              )}
          </div>
        );
      }}
    ></FormField>
  );
};

export default TextField;

