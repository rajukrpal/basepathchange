import { CheckSquare, Plus, Calendar as CalendarIcon, Flag, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateTasks } from '@/data/fakerData';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BorderButton from '@/components/common/BorderButton';

const Tasks = () => {
    const tasks = generateTasks(15);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[20px] font-semibold text-gray-900 dark:text-white tracking-tight">Active Tasks</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">Keep track of your daily tasks and milestones.</p>
                </div>
                <BorderButton icon={Plus}>
                    New Task
                </BorderButton>
            </div>
            
            <Card className="border-none shadow-sm rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700/50 overflow-hidden">
                <CardHeader className="border-b border-gray-50 dark:border-gray-800 pb-4">
                    <CardTitle className="text-[15px] font-semibold text-gray-900 dark:text-white">Task List</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <button className={cn(
                                        "h-9 w-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer group/check",
                                        task.status === 'Done' 
                                            ? "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600 shadow-sm" 
                                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-300 hover:border-[#F97316] hover:text-[#F97316]"
                                    )}>
                                        <CheckSquare className={cn(
                                            "h-4 w-4 transition-all",
                                            task.status === 'Done' ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover/check:opacity-40 group-hover/check:scale-100"
                                        )} />
                                    </button>
                                    <div>
                                        <p className={cn(
                                            "text-[14px] font-medium transition-all",
                                            task.status === 'Done' 
                                                ? "text-gray-400 line-through decoration-gray-300" 
                                                : "text-gray-900 dark:text-gray-100"
                                        )}>
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                                                <CalendarIcon className="h-3 w-3 text-gray-400" /> Due {task.dueDate}
                                            </span>
                                            <Badge className={cn(
                                                "rounded-lg px-2.5 py-0.5 text-[10px] font-semibold border-none",
                                                task.priority === 'High' ? "bg-red-50 text-red-600 dark:bg-red-500/10" : 
                                                task.priority === 'Medium' ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10" : 
                                                "bg-blue-50 text-blue-600 dark:bg-blue-500/10"
                                            )}>
                                                <div className="h-1 w-1 rounded-full bg-current mr-1.5 opacity-60" />
                                                {task.priority.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Tasks;

