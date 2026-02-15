import { cn } from '@/lib/utils';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TablePagination from './TablePagination';

const Datatable = ({ data, columns, pagination = true, loading = false, tableName }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Table Container */}
      <div className="flex flex-1 flex-col overflow-hidden px-6 pt-2">
        
        {/* Modern Minimalist Header */}
        <div className="shrink-0 border-b border-gray-100 flex items-center h-14 px-4 mb-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <div className="flex w-full items-center" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                const size = header.column.columnDef.size;
                return (
                  <div
                    style={{
                      flex: size && size !== 150 ? `0 0 ${size}px` : '1 1 0%',
                      justifyContent: meta?.align ?? 'start',
                    }}
                    className={cn(
                      'flex items-center px-3 text-[11px] font-semibold uppercase tracking-[0.10em] text-gray-400'
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Scrollable Body with Clean Dividers */}
        <div className="flex-1 overflow-auto px-1 custom-scrollbar">
          {loading ? (
            <div className="flex h-full items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#F97316] border-t-transparent shadow-sm"></div>
                <p className="text-xs font-semibold text-gray-400 animate-pulse uppercase tracking-widest">Loading {tableName}...</p>
              </div>
            </div>
          ) : table.getRowModel()?.rows?.length > 0 ? (
            <div className="divide-y divide-gray-50/60 pb-4">
              {table.getRowModel().rows.map((row) => (
                <div 
                  className="group flex w-full items-center py-4 px-4 hover:bg-orange-50/30 transition-all duration-300 rounded-xl cursor-default" 
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;
                    const size = cell.column.columnDef.size;
                    return (
                      <div
                        style={{
                          flex: size && size !== 150 ? `0 0 ${size}px` : '1 1 0%',
                          justifyContent: meta?.align ?? 'start',
                        }}
                        className={cn(
                          'flex items-center px-3 text-[14px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors'
                        )}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-20 opacity-40">
              <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                 <div className="h-10 w-10 border-2 border-dashed border-gray-300 rounded-lg"></div>
              </div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">
                No {tableName} Records Found.
              </h2>
            </div>
          )}
        </div>
      </div>
      
      {/* Integrated Pagination Bar */}
      {pagination && (
        <div className="shrink-0 pt-2 px-8 border-t border-gray-50 bg-white/80 backdrop-blur-xl">
           <TablePagination count={data.length} />
        </div>
      )}
    </div>
  );
};

export default Datatable;

