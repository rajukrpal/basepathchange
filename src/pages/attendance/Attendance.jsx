import React, { useState, useEffect, useMemo } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Timer, 
    History, 
    Download, 
    Calendar as CalendarIcon,
    StickyNote,
    Clock,
    Coffee
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateAttendanceLogs } from '@/data/fakerData';
import Datatable from '@/components/common/Datatable';
import { PaginationProvider } from '@/hooks/usePagination.jsx';
import usePagination from '@/hooks/usePagination.jsx';
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';

import BorderButton from '@/components/common/BorderButton';

const AttendanceContent = ({ initialData }) => {
    const { state: { page, limit }, dispatch } = usePagination();

    // Sync total when initialData changes
    useEffect(() => {
        dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_TOTAL, payload: initialData.length });
    }, [initialData, dispatch]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * limit;
        return initialData.slice(start, start + limit);
    }, [initialData, page, limit]);

    // Format date properly (e.g., 14 Feb 2026)
    const formatDate = (dateStr) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch (e) {
            return dateStr;
        }
    };

    const columns = [
        {
            accessorKey: 'date',
            header: 'Date',
            cell: ({ row }) => <span className="font-semibold text-gray-900 tracking-tight">{formatDate(row.original.date)}</span>,
            size: 140
        },
        {
            accessorKey: 'clocking',
            header: 'Log (In / Out)',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-green-500/80 uppercase tracking-tighter leading-none mb-1">Clock In</span>
                        <span className="text-xs font-semibold text-gray-700 bg-green-50/50 border border-green-100/50 px-2 py-0.5 rounded-md">{row.original.clockIn}</span>
                    </div>
                    <div className="h-6 w-[1px] bg-gray-100 rotate-12 mx-1"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-rose-500/80 uppercase tracking-tighter leading-none mb-1">Clock Out</span>
                        <span className="text-xs font-semibold text-gray-700 bg-rose-50/50 border border-rose-100/50 px-2 py-0.5 rounded-md">{row.original.clockOut}</span>
                    </div>
                </div>
            ),
            size: 220
        },
        {
            accessorKey: 'workDuration',
            header: 'Work Hours',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 group/time">
                    <div className="h-7 w-7 rounded-lg bg-orange-50 flex items-center justify-center text-[#F97316] group-hover/time:bg-[#F97316] group-hover/time:text-white transition-colors">
                        <Timer className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-semibold text-[13px] text-gray-800 tracking-wider">
                        {row.original.workDuration}
                    </span>
                </div>
            ),
            size: 140
        },
        {
            accessorKey: 'breakDuration',
            header: 'Break',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 group/break">
                    <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover/break:bg-blue-500 group-hover/break:text-white transition-colors">
                        <Coffee className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-semibold text-[13px] text-gray-500">
                        {row.original.breakDuration}
                    </span>
                </div>
            ),
            size: 130
        },
        {
            accessorKey: 'notes',
            header: 'Remarks',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 max-w-[280px]">
                    <div className="h-6 w-6 rounded-md border border-gray-100 bg-gray-50/30 flex items-center justify-center shrink-0">
                        <StickyNote className="h-3 w-3 text-gray-300" />
                    </div>
                    <p className="text-[12px] font-medium text-gray-400 line-clamp-1 italic" title={row.original.notes || 'No remarks added'}>
                        {row.original.notes || 'No remarks added'}
                    </p>
                </div>
            ),
        }
    ];

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <Datatable 
                data={paginatedData} 
                columns={columns} 
                tableName="Attendance"
                pagination={true}
                loading={initialData.length === 0}
            />
        </div>
    );
};

const Attendance = () => {
    const [initialLogs, setInitialLogs] = useState([]);

    useEffect(() => {
        const savedLogs = JSON.parse(localStorage.getItem('timeTracker_logs') || '[]');
        const fakeLogs = generateAttendanceLogs(128); // Generate exactly 128 logs
        const combinedLogs = [...savedLogs, ...fakeLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        setInitialLogs(combinedLogs);
    }, []);

    const clearLogs = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            localStorage.removeItem('timeTracker_logs');
            setInitialLogs([]);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px-32px)] md:h-[calc(100vh-64px-48px)] lg:h-[calc(100vh-64px-64px)] space-y-6 animate-in fade-in duration-500 overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Time Logs</h1>
                    <p className="text-gray-500 font-medium text-sm">Review your work hours and attendance history.</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="ghost" 
                        className="rounded-lg text-[#F97316] hover:bg-orange-50 font-semibold text-xs px-4 h-9 cursor-pointer" 
                        onClick={clearLogs}
                    >
                        Clear History
                    </Button>
                    <BorderButton icon={Download} className="px-4 text-xs">
                        Export CSV
                    </BorderButton>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white p-6 flex flex-row items-center justify-between h-24">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80 leading-none">Total Sessions</p>
                        <div className="text-base font-semibold mt-1 leading-none">{initialLogs.length}</div>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                        <History className="h-5 w-5 text-white" />
                    </div>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-row items-center gap-4 h-24">
                    <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#F97316] shrink-0">
                        <Clock className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Avg. Work Day</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1 leading-none">08h 30m</p>
                    </div>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white p-6 flex flex-row items-center gap-4 h-24">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Coffee className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Avg. Break</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1 leading-none">45m</p>
                    </div>
                </Card>
            </div>

            {/* Full Width Table Section */}
            <Card className="flex-1 min-h-0 border-none shadow-sm rounded-[32px] bg-white flex flex-col overflow-hidden">
                <div className="flex-1 min-h-0 flex flex-col">
                    <PaginationProvider initialTotal={initialLogs.length} initialLimit={5}>
                        <AttendanceContent initialData={initialLogs} />
                    </PaginationProvider>
                </div>
            </Card>
        </div>
    );
};

export default Attendance;

