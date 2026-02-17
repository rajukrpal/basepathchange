import React, { useEffect } from 'react';
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
import { taskSchema } from '@/validation/schemas';
import FormProvider from '@/form/FormProvider';
import TextField from '@/form/TextField';
import SelectField from '@/form/SelectField';
import CheckboxField from '@/form/CheckboxField';
import RadioField from '@/form/RadioField';
import DatePickerField from '@/form/DatePickerField';
import TimePickerField from '@/form/TimePickerField';
import { LayoutList } from 'lucide-react';
import DatePicker from 'react-datepicker';

const TaskModal = ({ open, onOpenChange, editData = null }) => {
    const isEdit = !!editData;

    const methods = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            taskName: '',
            description: '',
            project: '',
            priority: '',
            members: [],
            dueDate: '',
            reminderTime: '',
            taskType: 'work' // Default value for radio
        }
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        if (open) {
            if (editData) {
                reset({
                    taskName: editData.taskName || '',
                    description: editData.description || '',
                    project: editData.project || '',
                    priority: editData.priority || '',
                    members: editData.members || [],
                    dueDate: editData.dueDate || '',
                    reminderTime: editData.reminderTime || '',
                    taskType: editData.taskType || 'work'
                });
            } else {
                reset({
                    taskName: '',
                    description: '',
                    project: '',
                    priority: '',
                    members: [],
                    dueDate: '',
                    reminderTime: '',
                    taskType: 'work'
                });
            }
        }
    }, [open, editData, reset]);

    const onSubmit = (values) => {
        console.log(isEdit ? 'Updating Task:' : 'Creating Task:', values);
        onOpenChange(false);
        reset();
    };

    const projectOptions = [
        { label: 'E-commerce Redesign', value: 'ecommerce' },
        { label: 'Mobile App Dev', value: 'mobile_app' },
        { label: 'Marketing Campaign', value: 'marketing' },
        { label: 'Cloud Migration', value: 'cloud' }
    ];

    const priorityOptions = [
        { label: 'High Priority', value: 'High' },
        { label: 'Medium Priority', value: 'Medium' },
        { label: 'Low Priority', value: 'Low' }
    ];

    const memberOptions = [
        { label: 'Rahul Sharma', value: 'rahul' },
        { label: 'Priya Patel', value: 'priya' },
        { label: 'Amit Kumar', value: 'amit' },
        { label: 'Sneha Gupta', value: 'sneha' },
        { label: 'Vikram Singh', value: 'vikram' },
        { label: 'Neha Verma', value: 'neha' }
    ];

    const typeOptions = [
        { label: 'Work Task', value: 'work' },
        { label: 'Personal Task', value: 'personal' },
        { label: 'Urgent Fix', value: 'fix' }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-[32px]">
                <div className="bg-[#F97316] p-8 text-white relative">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <DialogHeader className="relative z-10">
                        <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-4 backdrop-blur-md">
                            <LayoutList className="h-6 w-6 text-white" />
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {isEdit ? 'Edit Task Details' : 'Create New Task'}
                        </DialogTitle>
                        <DialogDescription className="text-orange-100 font-medium">
                            {isEdit 
                                ? 'Update the task information and re-assign members if needed.' 
                                : 'Define a new task, set priorities, and assign it to your team.'
                            }
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 bg-white max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <TextField
                            name="taskName"
                            label="Task Title"
                            placeholder="e.g. Design Login Interface"
                        />
                        
                        <TextField
                            name="description"
                            label="Description"
                            placeholder="Describe the task in detail..."
                            isTextArea
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <SelectField
                                name="project"
                                label="Project"
                                options={projectOptions}
                                placeholder="Select Project"
                            />
                            <SelectField
                                name="priority"
                                label="Priority"
                                options={priorityOptions}
                                placeholder="Select Priority"
                            />
                        </div>

                        <RadioField
                            name="taskType"
                            label="Task Category"
                            options={typeOptions}
                        />

                        <CheckboxField
                            name="members"
                            label="Assign Team Members"
                            options={memberOptions}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <DatePickerField
                                name="dueDate"
                                label="Due Date"
                            />
                            <TimePickerField
                                name="reminderTime"
                                label="Reminder Time"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="flex-1 h-12 rounded-xl border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
                                onClick={() => onOpenChange(false)}
                            >
                                Discard
                            </Button>
                            <Button 
                                type="submit" 
                                className="flex-1 h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
                            >
                                {isEdit ? 'Update Task' : 'Create Task'}
                            </Button>
                        </div>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TaskModal;
