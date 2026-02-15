import React, { useState, useMemo } from 'react';
import { 
    Users, 
    UserPlus, 
    Mail, 
    MoreHorizontal, 
    Search, 
    Filter, 
    MessageSquare, 
    ShieldCheck, 
    MapPin, 
    Briefcase,
    TrendingUp,
    Phone,
    ArrowUpRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateTeamMembers } from '@/data/fakerData';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import BorderButton from '@/components/common/BorderButton';

const Team = () => {
    // Simplified specific departments
    const staticDepts = ['Engineering', 'Design', 'Marketing', 'Product'];
    
    // Generate static team members with cleaner data
    const [team] = useState(() => generateTeamMembers(12).map((m, i) => ({
        ...m,
        department: staticDepts[i % staticDepts.length],
        status: Math.random() > 0.3 ? 'Online' : 'Away',
        activeProjects: Math.floor(Math.random() * 5) + 1,
        performance: Math.floor(Math.random() * 20) + 80
    })));

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    const departments = ['All', ...staticDepts];

    const filteredTeam = useMemo(() => {
        return team.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                m.role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDept = selectedDept === 'All' || m.department === selectedDept;
            return matchesSearch && matchesDept;
        });
    }, [searchQuery, selectedDept, team]);

    const stats = [
        { label: 'Total', value: team.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { label: 'Online', value: team.filter(m => m.status === 'Online').length, icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10' },
        { label: 'Perf.', value: '94%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-500/10' },
    ];

    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-x-hidden">
            {/* Header Section - More Compact */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Team Directory</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">Efficiently manage your project collaborators.</p>
                </div>
                <BorderButton icon={UserPlus}>
                    Invite Member
                </BorderButton>
            </div>

            {/* Main Controls Row: Search + Filter + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-1">
                {/* Search & Dept */}
                <div className="lg:col-span-8 flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800/40 p-2 rounded-2xl ring-1 ring-gray-100 dark:ring-gray-800/50">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#F97316] transition-colors" />
                        <Input 
                            placeholder="Search by name, role or department..." 
                            className="h-10 bg-transparent border-none focus-visible:ring-0 pl-11 font-medium text-[13px] text-gray-700 dark:text-white placeholder:text-gray-400 placeholder:font-normal"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer",
                                    selectedDept === dept 
                                        ? "bg-[#F97316] text-white shadow-sm" 
                                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Compact Stats */}
                <div className="lg:col-span-4 flex items-center gap-3">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex-1 bg-white dark:bg-gray-800/40 p-3 rounded-2xl ring-1 ring-gray-100 dark:ring-gray-800/50 flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", stat.bg, stat.color)}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold text-gray-400 truncate">{stat.label}</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Team Grid - Compact Cards */}
            {filteredTeam.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredTeam.map((member, idx) => (
                        <Card 
                            key={member.id} 
                            style={{ animationDelay: `${idx * 40}ms` }}
                            className="border-none shadow-sm rounded-2xl bg-white dark:bg-gray-800 group hover:shadow-md transition-all duration-300 ring-1 ring-gray-100 dark:ring-gray-700/50 overflow-hidden"
                        >
                            <div className="p-5 flex flex-col items-center">
                                {/* Compact Top Section */}
                                <div className="relative mb-3">
                                    <Avatar className="h-16 w-16 rounded-2xl border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                        <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                                        <AvatarFallback className="rounded-2xl bg-gray-50 text-[#F97316] font-semibold text-sm">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={cn(
                                        "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm",
                                        member.status === 'Online' ? "bg-green-500" : "bg-amber-500"
                                    )} />
                                </div>

                                <div className="text-center w-full min-w-0 mt-3">
                                    <h3 className="text-[13px] font-medium text-gray-900 dark:text-white truncate tracking-tight">{member.name}</h3>
                                    <p className="text-[11px] font-medium text-gray-400 truncate mt-0.5 lowercase">{member.email}</p>
                                    <div className="mt-2 flex items-center justify-center gap-2">
                                        <Badge variant="secondary" className="bg-orange-50 text-[#F97316] hover:bg-orange-100 border-none text-[9px] font-semibold rounded-md px-2 py-0">
                                            {member.role}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Compact Stats Row */}
                                <div className="mt-4 flex items-center justify-between w-full px-2 py-2 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl">
                                    <div className="text-center">
                                        <p className="text-[9px] font-semibold text-gray-400 leading-none">PROJECTS</p>
                                        <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">{member.activeProjects}</p>
                                    </div>
                                    <Separator orientation="vertical" className="h-6 bg-gray-200 dark:bg-gray-700" />
                                    <div className="text-center">
                                        <p className="text-[9px] font-semibold text-gray-400 leading-none">PERF.</p>
                                        <p className="text-xs font-semibold text-gray-900 dark:text-white mt-1">{member.performance}%</p>
                                    </div>
                                </div>

                                {/* Compact Actions */}
                                <div className="mt-5 grid grid-cols-5 gap-2 w-full">
                                    <Button variant="outline" className="col-span-3 h-8 rounded-lg border-gray-200 text-gray-600 font-semibold text-[10px] hover:bg-gray-50 transition-all cursor-pointer">
                                        View Profile
                                    </Button>
                                    <Button variant="outline" size="icon" className="col-span-1 h-8 w-full rounded-lg border-gray-100 text-gray-400 hover:text-[#F97316] hover:border-[#F97316]/30 hover:bg-orange-50 transition-all cursor-pointer">
                                        <Mail className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="col-span-1 h-8 w-full rounded-lg border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-600/30 hover:bg-blue-50 transition-all cursor-pointer">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="h-60 flex flex-col items-center justify-center space-y-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                    <Users className="h-10 w-10 text-gray-200" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">No results found</h3>
                    <Button 
                        variant="ghost" 
                        className="text-xs font-semibold text-[#F97316]"
                        onClick={() => { setSearchQuery(''); setSelectedDept('All'); }}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Team;

