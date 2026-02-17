import React, { useState, useEffect, useMemo } from 'react';
import { 
    Eye, 
    Edit, 
    Trash2, 
    Plus, 
    Search, 
    Filter, 
    Download,
    CheckCircle2,
    Calendar,
    Clock,
    LayoutGrid,
    Users,
    AlertCircle,
    ClipboardList
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Datatable from '@/components/common/Datatable';
import { generateTasks } from '@/data/fakerData';
import { cn } from "@/lib/utils";
import BorderButton from '@/components/common/BorderButton';
import { PaginationProvider } from '@/hooks/usePagination.jsx';
import usePagination from '@/hooks/usePagination.jsx';
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';
import TaskModal from '@/components/common/modal/TaskModal';

const TasksContent = ({ initialData, onEdit, onView }) => {
    const { state: { page, limit } } = usePagination();

    const paginatedData = useMemo(() => {
        const start = (page - 1) * limit;
        return initialData.slice(start, start + limit);
    }, [initialData, page, limit]);

    const columns = useMemo(() => [
        {
            header: 'Task Information',
            accessorKey: 'taskName',
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 max-w-[250px]">
                    <span className="text-[14px] font-bold text-gray-900 leading-tight group-hover:text-[#F97316] transition-colors line-clamp-1">{row.original.taskName}</span>
                    <p className="text-[11px] font-medium text-gray-400 line-clamp-1 italic">{row.original.description}</p>
                </div>
            ),
            size: 250
        },
        {
            header: 'Project',
            accessorKey: 'project',
            cell: ({ row }) => {
                const projects = {
                    'ecommerce': 'E-commerce',
                    'mobile_app': 'Mobile App',
                    'marketing': 'Marketing',
                    'cloud': 'Cloud Dev'
                };
                return (
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter bg-blue-50/50 text-blue-600 border-blue-100 rounded-lg">
                        {projects[row.original.project] || row.original.project}
                    </Badge>
                );
            },
            size: 130
        },
        {
            header: 'Priority',
            accessorKey: 'priority',
            cell: ({ row }) => {
                const priority = row.original.priority;
                const colors = {
                    'High': 'text-rose-600 bg-rose-50 border-rose-100',
                    'Medium': 'text-amber-600 bg-amber-50 border-amber-100',
                    'Low': 'text-emerald-600 bg-emerald-50 border-emerald-100'
                };
                return (
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter", colors[priority])}>
                        <AlertCircle className="h-3 w-3" />
                        {priority}
                    </div>
                );
            },
            size: 120
        },
        {
            header: 'Team',
            accessorKey: 'members',
            cell: ({ row }) => (
                <div className="flex -space-x-2 overflow-hidden">
                    {row.original.members.slice(0, 3).map((member, idx) => (
                        <div key={idx} className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600 uppercase">
                            {member.substring(0, 1)}
                        </div>
                    ))}
                    {row.original.members.length > 3 && (
                        <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                            +{row.original.members.length - 3}
                        </div>
                    )}
                </div>
            ),
            size: 100
        },
        {
            header: 'Due Date',
            accessorKey: 'dueDate',
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-900">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-[12px] font-bold tabular-nums">{row.original.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span className="text-[10px] font-semibold">{row.original.reminderTime}</span>
                    </div>
                </div>
            ),
            size: 140
        },
        {
            header: 'Actions',
            id: 'actions',
            meta: { align: 'end' },
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8.5 w-8.5 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer" title="View" onClick={() => onView(row.original)}>
                        <Eye className="h-4.5 w-4.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8.5 w-8.5 rounded-xl text-gray-400 hover:text-[#F97316] hover:bg-orange-50 transition-all cursor-pointer" title="Edit" onClick={() => onEdit(row.original)}>
                        <Edit className="h-4.5 w-4.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8.5 w-8.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer" title="Delete" onClick={() => console.log('Delete Task', row.original.id)}>
                        <Trash2 className="h-4.5 w-4.5" />
                    </Button>
                </div>
            ),
            size: 130
        }
    ], [onEdit, onView]);

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <Datatable 
                data={paginatedData} 
                columns={columns} 
                tableName="Tasks"
                pagination={true}
                loading={initialData.length === 0}
            />
        </div>
    );
};

const Tasks = () => {
    const [data] = useState(() => generateTasks(128));
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const filteredData = useMemo(() => {
        return data.filter(task => 
            task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const handleNewTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleView = (task) => {
        console.log('Viewing Task:', task);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px-32px)] md:h-[calc(100vh-64px-48px)] lg:h-[calc(100vh-64px-64px)] space-y-6 animate-in fade-in duration-500 overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-[20px] bg-[#F97316]/10 flex items-center justify-center text-[#F97316] shadow-inner border border-white/40">
                        <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">Project Tasks</h1>
                        <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest mt-1">Manage & Track Workspace Workflows</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" className="rounded-xl text-gray-400 hover:text-[#F97316] hover:bg-orange-50 font-bold text-xs px-4 h-10 border border-gray-100 cursor-pointer">
                        <Download className="mr-2 h-4 w-4" /> Export Tasks
                    </Button>
                    <BorderButton icon={Plus} onClick={handleNewTask} className="px-6 h-10 text-xs font-black">
                        NEW TASK
                    </BorderButton>
                </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
                <Card className="border-none shadow-sm rounded-[32px] bg-white p-5 flex items-center gap-4 ring-1 ring-gray-100 hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <LayoutGrid className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Active</p>
                        <h3 className="text-xl font-black text-gray-900 mt-1.5 leading-none">128</h3>
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-[32px] bg-white p-5 flex items-center gap-4 ring-1 ring-gray-100 hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Approaching</p>
                        <h3 className="text-xl font-black text-gray-900 mt-1.5 leading-none">05</h3>
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-[32px] bg-white p-5 flex items-center gap-4 ring-1 ring-gray-100 hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Completed</p>
                        <h3 className="text-xl font-black text-gray-900 mt-1.5 leading-none">842</h3>
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-[32px] bg-gray-900 p-5 flex items-center gap-4 hover:shadow-md transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Collaborators</p>
                        <h3 className="text-xl font-black text-white mt-1.5 leading-none">12</h3>
                    </div>
                </Card>
            </div>

            {/* List Container */}
            <Card className="flex-1 min-h-0 border-none shadow-sm rounded-[40px] bg-white flex flex-col overflow-hidden ring-1 ring-gray-100">
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/20 shrink-0">
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Find specific tasks..." 
                            className="h-10 w-full sm:w-80 rounded-xl border border-gray-100/80 bg-white/50 pl-11 text-xs font-bold focus:outline-none focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Showing</span>
                            <span className="text-[13px] font-bold text-gray-900 tabular-nums">{filteredData.length} records</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-900 rounded-xl border border-gray-100 bg-white transition-all cursor-pointer">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                
                <div className="flex-1 min-h-0 flex flex-col">
                    <PaginationProvider initialTotal={filteredData.length} initialLimit={7}>
                        <TasksContent initialData={filteredData} onEdit={handleEdit} onView={handleView} />
                    </PaginationProvider>
                </div>
            </Card>

            <TaskModal 
                open={isModalOpen} 
                onOpenChange={setIsModalOpen} 
                editData={selectedTask}
            />
        </div>
    );
};

export default Tasks;
