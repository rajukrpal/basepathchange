import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BorderButton = React.forwardRef(({ 
    children, 
    icon: Icon, 
    className, 
    variant = "outline",
    ...props 
}, ref) => {
    return (
        <Button 
            ref={ref}
            variant={variant} 
            className={cn(
                "border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white rounded-lg px-6 h-9 font-semibold transition-all group cursor-pointer shadow-sm",
                className
            )}
            {...props}
        >
            {Icon && <Icon className="mr-2 h-3.5 w-3.5" />}
            <span className="text-xs">{children}</span>
        </Button>
    );
});

BorderButton.displayName = "BorderButton";

export default BorderButton;
