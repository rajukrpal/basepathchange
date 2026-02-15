import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const PasswordField = ({ name, placeholder = '', label, className, prefix = null, ...other }) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
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
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
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
                      'pr-11 md:pr-12',
                      className
                    )}
                    {...other}
                  />
                </FormControl>
                {prefix && (
                  <div
                    className={cn(
                      'absolute flex items-center justify-center left-3 md:left-4 inset-y-0 pointer-events-none text-gray-400 transition-colors'
                    )}
                  >
                    {prefix}
                  </div>
                )}
                <div
                  className={cn(
                    'absolute flex items-center justify-center cursor-pointer right-3 md:right-4 inset-y-0'
                  )}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-[#F97316] transition-colors" />
                  ) : (
                    <EyeOff className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-[#F97316] transition-colors" />
                  )}
                </div>
              </FormItem>
              {fieldError?.message && (
                <div className="pt-1 pl-3 text-xs font-normal text-red-500 sm:text-sm">
                  {fieldError?.message}
                </div>
              )}
          </div>
        );
      }}
    ></FormField>
  );
};

export default PasswordField;


