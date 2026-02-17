import React, { useState, useEffect, useMemo } from 'react';
import { 
    Eye, 
    Edit, 
    Trash2, 
    Plus, 
    Search, 
    Filter, 
    Download,
    Package,
    AlertTriangle,
    CheckCircle2,
    Package2,
    ArrowUpRight,
    TrendingUp,
    RefreshCcw,
    Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Datatable from '@/components/common/Datatable';
import { generateInventory } from '@/data/fakerData';
import { cn } from "@/lib/utils";
import BorderButton from '@/components/common/BorderButton';
import { PaginationProvider } from '@/hooks/usePagination.jsx';
import usePagination from '@/hooks/usePagination.jsx';
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';
import InventoryProductModal from '@/components/common/modal/InventoryProductModal';

const InventoryContent = ({ initialData, onEdit }) => {
    const { state: { page, limit } } = usePagination();

    const paginatedData = useMemo(() => {
        const start = (page - 1) * limit;
        return initialData.slice(start, start + limit);
    }, [initialData, page, limit]);

    const columns = useMemo(() => [
        {
            header: 'Product Name',
            accessorKey: 'name',
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-gray-900 leading-tight group-hover:text-[#F97316] transition-colors line-clamp-1">{row.original.name}</span>
                    <span className="text-[10px] font-bold text-gray-400/80 uppercase tracking-widest leading-none">PMS-REF-{row.original.sku.split('-')[1]}</span>
                </div>
            ),
            size: 220
        },
        {
            header: 'SKU Code',
            accessorKey: 'sku',
            cell: ({ row }) => (
                <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100/60 uppercase tracking-tighter tabular-nums shadow-sm">
                    {row.original.sku}
                </span>
            ),
            size: 130
        },
        {
            header: 'Category',
            accessorKey: 'category',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span className="text-[12px] font-semibold text-gray-600">
                        {row.original.category}
                    </span>
                </div>
            ),
            size: 150
        },
        {
            header: 'Unit Price',
            accessorKey: 'price',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900 tabular-nums">{row.original.price}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase leading-none mt-0.5">per unit</span>
                </div>
            ),
            size: 100
        },
        {
            header: 'Stock Status',
            accessorKey: 'stock',
            cell: ({ row }) => {
                const stock = row.original.stock;
                const percentage = Math.min((stock / 500) * 100, 100);
                return (
                    <div className="flex flex-col gap-1.5 w-full max-w-[130px]">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={cn(
                                stock < 50 ? "text-rose-500" : stock < 150 ? "text-amber-500" : "text-emerald-500"
                            )}>{stock} units</span>
                            <span className="text-gray-400">{Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div 
                                className={cn(
                                    "h-full rounded-full transition-all duration-1000 ease-out",
                                    stock < 50 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : 
                                    stock < 150 ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : 
                                    "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                                )}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            },
            size: 180
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const status = row.original.status;
                const config = {
                    'In Stock': { color: 'emerald', icon: CheckCircle2 },
                    'Low Stock': { color: 'amber', icon: AlertTriangle },
                    'Out of Stock': { color: 'rose', icon: Package }
                };
                const { color, icon: Icon } = config[status] || config['In Stock'];
                
                return (
                    <div className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-tight shadow-sm",
                        `bg-${color}-50/50 text-${color}-600 border-${color}-100`
                    )}>
                        <Icon className="h-3 w-3" />
                        {status}
                    </div>
                );
            },
            size: 140
        },
        {
            header: 'Actions',
            id: 'actions',
            meta: { align: 'end' },
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-[#F97316] hover:bg-orange-50 transition-all cursor-pointer" title="Quick Edit" onClick={() => onEdit(row.original)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer" title="Remove">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
            size: 100
        }
    ], [onEdit]);

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <Datatable 
                data={paginatedData} 
                columns={columns} 
                tableName="Inventory"
                pagination={true}
                loading={initialData.length === 0}
            />
        </div>
    );
};

const Inventory = () => {
    const [data] = useState(() => generateInventory(100));
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredData = useMemo(() => {
        return data.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const handleAddClick = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px-32px)] md:h-[calc(100vh-64px-48px)] lg:h-[calc(100vh-64px-64px)] space-y-5 animate-in fade-in duration-700 overflow-hidden">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 px-1">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] shadow-inner">
                        <Layers className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Inventory Vault</h1>
                        <p className="text-gray-400 font-semibold text-[11px] uppercase tracking-[0.1em] mt-1.5 flex items-center gap-2">
                           <RefreshCcw className="h-3 w-3 animate-spin-slow" /> Real-time Warehouse Monitoring
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <Button variant="outline" className="h-10 rounded-xl border-gray-100 text-gray-500 font-bold text-xs hover:bg-gray-50 uppercase tracking-wider shadow-sm transition-all px-4">
                        <Download className="mr-2 h-3.5 w-3.5" /> Export Data
                    </Button>
                    <BorderButton icon={Plus} onClick={handleAddClick} className="h-10 px-6 text-xs uppercase tracking-[0.05em]">
                        New Product
                    </BorderButton>
                </div>
            </div>

            {/* Premium Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
                <Card className="border-none shadow-sm rounded-3xl bg-white p-5 flex flex-col justify-between group hover:shadow-md transition-all duration-300 ring-1 ring-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <Package2 className="h-5 w-5" />
                        </div>
                        <Badge className="bg-blue-50 text-blue-600 border-none text-[10px] font-bold">+12%</Badge>
                    </div>
                    <div className="mt-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Assets</p>
                        <div className="flex items-baseline gap-2 mt-1.5">
                            <h3 className="text-2xl font-black text-gray-900 leading-none">2,840</h3>
                            <span className="text-[10px] font-bold text-gray-400 underline decoration-blue-200 underline-offset-4 cursor-pointer">View All</span>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-white p-5 flex flex-col justify-between group hover:shadow-md transition-all duration-300 ring-1 ring-gray-50">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <Badge className="bg-orange-50 text-[#F97316] border-none text-[10px] font-bold">Hot</Badge>
                    </div>
                    <div className="mt-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Net Value</p>
                        <div className="flex items-baseline gap-2 mt-1.5">
                            <h3 className="text-2xl font-black text-gray-900 leading-none">$42.8k</h3>
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center"><ArrowUpRight className="h-3 w-3" /> 4%</span>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-[#F97316] p-5 flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl" />
                    <div className="flex justify-between items-start relative z-10">
                        <div className="h-10 w-10 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg group-hover:rotate-12 transition-transform">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                    </div>
                    <div className="mt-4 relative z-10">
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-none">Critical Stock</p>
                        <h3 className="text-2xl font-black text-white leading-none mt-1.5 tabular-nums">18 Items</h3>
                    </div>
                </Card>

                <Card className="border-none shadow-sm rounded-3xl bg-gray-900 p-5 flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <RefreshCcw className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Last Synced</p>
                        <div className="flex flex-col mt-1.5">
                           <h3 className="text-base font-bold text-white leading-none tracking-tight">2 Minutes Ago</h3>
                           <p className="text-[9px] font-medium text-gray-500 mt-1 uppercase tracking-tight">System is healthy</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Table Content Container */}
            <Card className="flex-1 min-h-0 border-none shadow-sm rounded-[32px] bg-white flex flex-col overflow-hidden ring-1 ring-gray-100">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0 bg-gray-50/20 backdrop-blur-md">
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-300 group-focus-within:text-[#F97316] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search products, SKUs, or categories..." 
                                className="h-9 w-72 rounded-xl border border-gray-100/80 bg-white/50 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100 hidden sm:block" />
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Total Result</span>
                                <span className="text-[13px] font-bold text-gray-800 tabular-nums">{filteredData.length} Items</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="flex items-center bg-gray-100/50 p-1 rounded-lg">
                            <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider text-[#F97316] bg-white shadow-sm rounded-md">All Entries</Button>
                            <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Archived</Button>
                         </div>
                         <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-900 rounded-xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                            <Filter className="h-4 w-4" />
                         </Button>
                    </div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col">
                    <PaginationProvider initialTotal={filteredData.length} initialLimit={5}>
                        <InventoryContent initialData={filteredData} onEdit={handleEditClick} />
                    </PaginationProvider>
                </div>
            </Card>

            {/* Modal */}
            <InventoryProductModal 
                open={isModalOpen} 
                onOpenChange={setIsModalOpen} 
                editData={selectedProduct}
            />
        </div>
    );
};

export default Inventory;
