import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { projectSchema } from '@/validation/schemas';
import FormProvider from '@/form/FormProvider';
import TextField from '@/form/TextField';
import SelectField from '@/form/SelectField';

const CreateProjectModal = ({ open, onOpenChange }) => {
    const methods = useForm({
        resolver: yupResolver(projectSchema),
        defaultValues: {
            projectName: '',
            clientName: '',
            description: '',
            status: '', // Set empty to show placeholder
            deadline: ''
        }
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = (values) => {
        console.log('Form Values submitted:', values);
        onOpenChange(false);
        reset();
    };

    const statusOptions = [
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Delayed', value: 'Delayed' },
        { label: 'Completed', value: 'Completed' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[32px]">
                <div className="bg-[#F97316] p-8 text-white relative">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">Create New Project</DialogTitle>
                        <DialogDescription className="text-orange-100 font-medium">
                            Enter the details below to start a new project workflow.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 bg-white">
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                name="projectName"
                                label="Project Name"
                                placeholder="e.g. Website Redesign"
                            />
                            <TextField
                                name="clientName"
                                label="Client Name"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>

                        <TextField
                            name="description"
                            label="Project Description"
                            placeholder="Describe the project goals..."
                            textarea
                        />

                        <div className="grid grid-cols-2 gap-4 items-start">
                            <SelectField
                                name="status"
                                label="Status"
                                placeholder="Select status"
                                options={statusOptions}
                            />
                            <TextField
                                name="deadline"
                                label="Deadline"
                                type="date"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="flex-1 h-11 md:h-12 rounded-xl border-gray-100 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="flex-1 h-11 md:h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold shadow-lg shadow-orange-500/20 cursor-pointer transition-all active:scale-95"
                            >
                                Create Project
                            </Button>
                        </div>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectModal;
