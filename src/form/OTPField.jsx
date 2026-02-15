import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const OTPField = ({
  name,
  label,
  className,
  maxLength = 6,
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
          <div className="flex flex-col gap-3">
            {label && (
              <label className="text-sm font-semibold text-gray-700 tracking-tight">
                {label}
              </label>
            )}
            <FormItem className="space-y-0">
              <FormControl>
                <InputOTP
                  maxLength={maxLength}
                  {...field}
                  {...other}
                  containerClassName="justify-center lg:justify-start"
                >
                  <InputOTPGroup className="gap-2 sm:gap-3">
                    {Array.from({ length: maxLength }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={cn(
                          'h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm font-semibold transition-all outline-none',
                          'data-[active=true]:border-[#F97316] data-[active=true]:bg-white data-[active=true]:ring-0',
                          fieldError ? 'border-red-500 bg-red-50/50' : ''
                        )}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {fieldError?.message && (
                <div className="pt-2 pl-1 text-xs font-normal text-red-500 sm:text-sm animate-in fade-in slide-in-from-top-1">
                  {fieldError?.message}
                </div>
              )}
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export default OTPField;

