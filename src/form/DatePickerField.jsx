import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const DatePickerField = ({ name, label, placeholder = "Pick a date", className, disabled = false }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = get(errors, name);

    return (
        <div className={cn("flex flex-col gap-1.5 sm:gap-2", className)}>
            {label && (
                <label className="text-sm font-semibold tracking-tight text-gray-700">
                    {label}
                </label>
            )}
            
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "h-[44px] md:h-[52px] w-full rounded-xl bg-white px-4 md:px-5 text-sm md:text-base font-medium border-gray-200 transition-all justify-start text-left shadow-sm hover:bg-gray-50/50",
                                    !field.value && "text-muted-foreground",
                                    error?.message 
                                        ? "border-red-500 text-red-500 ring-1 ring-red-100" 
                                        : "focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]",
                                    disabled && "opacity-50 cursor-not-allowed bg-gray-50"
                                )}
                                disabled={disabled}
                            >
                                <CalendarIcon className={cn(
                                    "mr-2 h-4 w-4 transition-colors",
                                    error ? "text-red-400" : "text-gray-400"
                                )} />
                                {field.value ? format(new Date(field.value), "PPP") : <span>{placeholder}</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-[24px] border border-gray-100 shadow-2xl bg-white z-[9999]" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date?.toISOString())}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            
            {error?.message && (
                <div className="pt-1.5 pl-3 text-start text-[11px] font-normal text-red-500">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default DatePickerField;
