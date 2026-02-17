import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import { Clock } from 'lucide-react';

const TimePickerField = ({ name, label, className, disabled = false }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = get(errors, name);

    return (
        <div className={cn("flex flex-col gap-1.5 sm:gap-2", className)}>
            {label && (
                <label className="text-sm font-semibold tracking-tight text-gray-700">
                    {label}
                </label>
            )}
            
            <div className="relative group">
                <Clock className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 transition-colors",
                    error ? "text-red-400" : "text-gray-400 group-focus-within:text-[#F97316]"
                )} />
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="time"
                            disabled={disabled}
                            className={cn(
                                "flex h-[44px] md:h-[52px] w-full rounded-xl border transition-all outline-none pl-12 pr-4 text-sm md:text-base font-medium",
                                "bg-white placeholder:text-gray-400 shadow-sm",
                                error 
                                    ? "border-red-500 text-red-500 ring-1 ring-red-100" 
                                    : "border-gray-200 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]",
                                disabled && "opacity-50 cursor-not-allowed bg-gray-50"
                            )}
                        />
                    )}
                />
            </div>
            
            {error?.message && (
                <div className="pt-1.5 pl-3 text-start text-[11px] font-normal text-red-500">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default TimePickerField;
