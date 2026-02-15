import { FolderKanban, Plus, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateProjects } from '@/data/fakerData';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BorderButton from '@/components/common/BorderButton';

const Projects = () => {
    const projects = generateProjects(9);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[20px] font-semibold text-gray-900 dark:text-white tracking-tight">Projects</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">Manage and track all your active projects.</p>
                </div>
                <BorderButton icon={Plus}>
                    New Project
                </BorderButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="border-none shadow-sm rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700/50 hover:shadow-md transition-all duration-300 overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-gray-50 dark:border-gray-800">
                            <CardTitle className="text-[15px] font-semibold text-gray-900 dark:text-white">{project.name}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-lg">
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-5">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="p-1.5 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                    <FolderKanban className="h-3.5 w-3.5 text-gray-400" />
                                </div>
                                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{project.client}</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="font-medium text-gray-500">Overall Progress</span>
                                    <span className="font-semibold text-[#F97316]">{project.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-[#F97316] rounded-full transition-all duration-1000"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <Badge className={`rounded-lg px-2.5 py-0.5 text-[10px] font-semibold border-none ${
                                        project.status === 'Completed' ? 'bg-green-50 text-green-600 dark:bg-green-500/10' : 
                                        project.status === 'Delayed' ? 'bg-red-50 text-red-600 dark:bg-red-500/10' : 
                                        'bg-orange-50 text-orange-600 dark:bg-orange-500/10'
                                    }`}>
                                        {project.status.toUpperCase()}
                                    </Badge>
                                    <div className="flex -space-x-2">
                                        {project.members.map((m, i) => (
                                            <div key={i} className="h-7 w-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-[10px] font-semibold text-gray-500">
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Projects;

