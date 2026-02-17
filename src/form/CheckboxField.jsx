import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { get } from 'lodash';

const CheckboxField = ({ name, label, options, className }) => {
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
                render={({ field }) => {
                    const { value = [], onChange } = field;
                    
                    const handleCheckboxChange = (optionValue) => {
                        const newValue = value.includes(optionValue)
                            ? value.filter((v) => v !== optionValue)
                            : [...value, optionValue];
                        onChange(newValue);
                    };

                    return (
                        <div className={cn(
                            "grid grid-cols-2 gap-4 p-4 rounded-2xl border bg-gray-50/30 shadow-inner transition-all",
                            error ? "border-red-200 ring-1 ring-red-100" : "border-gray-100"
                        )}>
                            {options.map((option) => (
                                <div 
                                    key={option.value} 
                                    className="flex items-center space-x-2.5 group"
                                >
                                    <Checkbox 
                                        checked={value.includes(option.value)}
                                        onCheckedChange={() => handleCheckboxChange(option.value)}
                                        id={`${name}-${option.value}`}
                                        className={cn(
                                            "transition-colors",
                                            error ? "border-red-300" : ""
                                        )}
                                    />
                                    <Label 
                                        htmlFor={`${name}-${option.value}`}
                                        className="text-[13px] font-semibold cursor-pointer text-gray-600 group-hover:text-gray-900 transition-colors"
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    );
                }}
            />
            
            {error?.message && (
                <div className="pt-1.5 pl-3 text-start text-[11px] font-normal text-red-500">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default CheckboxField;
