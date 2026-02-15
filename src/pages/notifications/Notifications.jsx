import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Info, ShieldAlert, Users, Package } from 'lucide-react';
import { generateNotifications } from '@/data/fakerData';
import Datatable from '@/components/common/Datatable';
import { PaginationProvider } from '@/hooks/usePagination.jsx';
import usePagination from '@/hooks/usePagination.jsx';
import { Badge } from "@/components/ui/badge";
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';

const NotificationsContent = ({ initialData }) => {
    const { state: { page, limit }, dispatch } = usePagination();

    useEffect(() => {
        dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_TOTAL, payload: initialData.length });
    }, [initialData, dispatch]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * limit;
        return initialData.slice(start, start + limit);
    }, [initialData, page, limit]);

    const columns = [
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => {
                const type = row.original.type;
                const iconMap = {
                    System: <Info className="h-4 w-4 text-blue-500" />,
                    Alert: <ShieldAlert className="h-4 w-4 text-red-500" />,
                    Team: <Users className="h-4 w-4 text-green-500" />,
                    Project: <Package className="h-4 w-4 text-orange-500" />
                };
                return (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                            {iconMap[type] || <Bell className="h-4 w-4 text-gray-400" />}
                        </div>
                        <span className="font-semibold text-xs uppercase tracking-widest text-gray-500">{type}</span>
                    </div>
                );
            },
            size: 140
        },
        {
            accessorKey: 'message',
            header: 'Message',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <p className={`text-sm ${row.original.status === 'Unread' ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'}`}>
                        {row.original.message}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: 'time',
            header: 'Received',
            cell: ({ row }) => (
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-tight italic">
                    {row.original.time}
                </span>
            ),
            size: 150
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Badge className={`rounded-xl px-3 py-1 text-[10px] font-semibold border-none ${
                    row.original.status === 'Unread' 
                        ? 'bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/10' 
                        : 'bg-gray-50 text-gray-400'
                }`}>
                    {row.original.status}
                </Badge>
            ),
            size: 100
        }
    ];

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <Datatable 
                data={paginatedData} 
                columns={columns} 
                tableName="Notifications"
                pagination={true}
                loading={initialData.length === 0}
            />
        </div>
    );
};

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Generate 60 fake notifications
        setNotifications(generateNotifications(60));
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-64px-32px)] md:h-[calc(100vh-64px-48px)] lg:h-[calc(100vh-64px-64px)] animate-in fade-in duration-500 overflow-hidden">
            {/* Main Table Card */}
            <Card className="flex-1 min-h-0 border-none shadow-sm rounded-[32px] bg-white flex flex-col overflow-hidden">
                <div className="flex-1 min-h-0 flex flex-col pt-4">
                    <PaginationProvider initialTotal={notifications.length} initialLimit={10}>
                        <NotificationsContent initialData={notifications} />
                    </PaginationProvider>
                </div>
            </Card>
        </div>
    );
};

export default Notifications;

