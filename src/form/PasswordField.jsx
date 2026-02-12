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
              <label className="text-sm font-bold text-gray-700 tracking-tight">
                {label}
              </label>
            )}
            <FormItem className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    id={name}
                    required
                    placeholder={placeholder}
                    className={cn(
                      'h-[42px] md:h-[48px] rounded-[10px] bg-white px-4 md:px-5 text-xs md:text-sm font-medium text-black placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0',
                      fieldError?.message
                        ? 'text-red-500 focus-visible:ring-red-500'
                        : 'focus-visible:border-[#F97316] focus-visible:ring-[#F97316] disabled:text-[#969696f2]',
                      prefix ? 'pl-[40px] md:pl-[48px]' : '',
                      'pr-[40px] md:pr-[48px]',
                      className
                    )}
                    {...other}
                  />
                </FormControl>
                {prefix && (
                  <div
                    className={cn(
                      'absolute flex items-center left-[16px] sm:left-[20px] top-1/2 -translate-y-1/2'
                    )}
                  >
                    {prefix}
                  </div>
                )}
                <div
                  className={cn(
                    'absolute flex items-center cursor-pointer right-[16px] sm:right-[20px] top-1/2 -translate-y-1/2'
                  )}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
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

