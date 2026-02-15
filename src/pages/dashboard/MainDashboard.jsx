import React from 'react';
import { 
    LayoutDashboard, 
    FolderKanban, 
    CheckSquare, 
    Users, 
    TrendingUp, 
    Clock, 
    AlertCircle,
    Plus,
    MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TimeTracker from '@/components/dashboard/TimeTracker';

import BorderButton from '@/components/common/BorderButton';

const stats = [
    { title: "Total Projects", value: "12", icon: FolderKanban, color: "text-blue-600", bg: "bg-blue-50", change: "+2 this month" },
    { title: "Active Tasks", value: "48", icon: CheckSquare, color: "text-orange-600", bg: "bg-orange-50", change: "12 high priority" },
    { title: "Team Members", value: "24", icon: Users, color: "text-purple-600", bg: "bg-purple-50", change: "4 new joins" },
    { title: "Hours Logged", value: "124h", icon: Clock, color: "text-green-600", bg: "bg-green-50", change: "Last 7 days" },
];

const activeProjects = [
    { id: 1, name: "Website Redesign", client: "Acme Corp", progress: 75, status: "In Progress", members: ["RP", "AD", "JS"] },
    { id: 2, name: "Mobile App Development", client: "Global Tech", progress: 40, status: "Delayed", members: ["RP", "MK"] },
    { id: 3, name: "SEO Optimization", client: "Fresh Bakery", progress: 100, status: "Completed", members: ["JS", "AD"] },
];

const MainDashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Project Overview</h1>
                    <p className="text-gray-500 font-medium">Welcome back, Raju! Here's what's happening with your projects today.</p>
                </div>
                <BorderButton icon={Plus}>
                    New Project
                </BorderButton>
            </div>

            {/* Time Tracking & Priority Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <TimeTracker />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                    {stat.title}
                                </CardTitle>
                                <div className={`${stat.bg} ${stat.color} p-1.5 rounded-lg`}>
                                    <stat.icon className="h-3.5 w-3.5" />
                                </div>
                            </CardHeader>
                             <CardContent>
                                <div className="text-[15px] font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                                <p className="text-[9px] font-medium text-gray-500 mt-1 uppercase tracking-wider">
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Projects Table/List */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700/50 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 dark:border-gray-800 pb-4">
                        <div>
                            <CardTitle className="text-[15px] font-semibold text-gray-900 dark:text-white">Active Projects</CardTitle>
                            <CardDescription className="text-[11px] font-medium text-gray-500">Manage your ongoing workflows</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-lg">
                            <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Project</th>
                                        <th className="px-6 py-4">Progress</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Team</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {activeProjects.map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-900">{project.name}</span>
                                                    <span className="text-[10px] font-medium text-gray-400">{project.client}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                                                        <div 
                                                            className={`h-full rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-[#F97316]'}`}
                                                            style={{ width: `${project.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-900">{project.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold border-none ${
                                                    project.status === 'Completed' ? 'bg-green-50 text-green-600' : 
                                                    project.status === 'Delayed' ? 'bg-red-50 text-red-600' : 
                                                    'bg-orange-50 text-orange-600'
                                                }`}>
                                                    {project.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex -space-x-2">
                                                    {project.members.map((member, i) => (
                                                        <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-700">
                                                            {member}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Performance Chart / Recent Activity Card */}
                <Card className="border-none shadow-sm rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-100 dark:ring-gray-700/50 overflow-hidden">
                    <CardHeader className="border-b border-gray-50 dark:border-gray-800 pb-4">
                        <CardTitle className="text-[15px] font-semibold text-gray-900 dark:text-white">Task Performance</CardTitle>
                        <CardDescription className="text-[11px] font-medium text-gray-500">Weekly productivity metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
                        <div className="bg-orange-50 dark:bg-orange-500/10 p-5 rounded-full mb-4">
                            <TrendingUp className="h-10 w-10 text-[#F97316] opacity-80" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">Great Progress!</h3>
                        <p className="text-[11px] font-medium text-gray-500 mt-2 px-4 leading-relaxed">
                            "You have completed 85% of your assigned high-priority tasks this week. Keep up the momentum!"
                        </p>
                        <BorderButton className="mt-6 border-gray-100 dark:border-gray-800 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-9 px-6 cursor-pointer">
                            View Detailed Report
                        </BorderButton>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MainDashboard;

