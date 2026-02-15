import React, { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import usePagination from '@/hooks/usePagination.jsx';
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';

const generatePaginationRange = (totalPages, currentPage) => {
  const siblingCount = 1;
  const totalNumbers = siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!showLeftDots && showRightDots) {
    return [
      ...Array.from({ length: 3 + 2 * siblingCount }, (_, index) => index + 1),
      '...',
      totalPages,
    ];
  }

  if (showLeftDots && !showRightDots) {
    const start = totalPages - (3 + 2 * siblingCount) + 1;
    return [
      firstPageIndex,
      '...',
      ...Array.from({ length: 3 + 2 * siblingCount }, (_, index) => start + index),
    ];
  }

  if (showLeftDots && showRightDots) {
    return [
      firstPageIndex,
      '...',
      ...Array.from({ length: 2 * siblingCount + 1 }, (_, index) => leftSiblingIndex + index),
      '...',
      lastPageIndex,
    ];
  }
};

const TablePagination = ({ count }) => {
  const paginationLimits = useMemo(() => [5, 10, 15, 30, 50], []);
  const {
    state: { total, limit, page },
    dispatch,
  } = usePagination();
  
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const paginationRange = useMemo(
    () => generatePaginationRange(totalPages, page) || [],
    [totalPages, page]
  );

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-2 bg-transparent px-3 pt-2 sm:flex-row sm:pt-2.5 md:px-4'
      )}
    >
      <div className="flex items-center gap-2.5">
        <p className="font-normal text-[#6C757D]">Rows per page : </p>
        <Select
          value={limit.toString()}
          onValueChange={(value) => {
            dispatch({
              type: PAGINATION_DISPATCH_TYPES.SET_LIMIT,
              payload: parseInt(value),
            });
          }}
        >
          <SelectTrigger className="border-input bg-background hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-[70px] rounded-md text-sm font-medium text-[#6C757D] shadow-xs transition-all focus-visible:ring-[3px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground min-w-[6rem] rounded-md border shadow-md">
            {paginationLimits.map((item, key) => (
              <SelectItem
                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-sm font-medium"
                key={key}
                value={item.toString()}
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center">
        <p className="w-full text-center text-[13px] font-semibold uppercase tracking-tight text-[#6C757D] sm:text-start">
          Showing {(page - 1) * limit + (count ? 1 : 0)}-{(page - 1) * limit + count} out of {total}{' '}
          Results
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <Pagination className="justify-center pt-0 sm:justify-end">
            <PaginationContent className="space-x-1">
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    'flex items-center justify-center aspect-square size-8 cursor-pointer p-0 text-gray-400 hover:text-[#F97316] hover:bg-orange-50 transition-all sm:size-9 border border-gray-100 rounded-full',
                    page === 1 && 'cursor-default opacity-30 pointer-events-none border-gray-50'
                  )}
                  onClick={() => {
                    if (!(page === 1)) {
                      dispatch({ type: PAGINATION_DISPATCH_TYPES.PREV_PAGE });
                    }
                  }}
                />
              </PaginationItem>
              {paginationRange.map((pageNumber, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page == pageNumber}
                    disabled={pageNumber === '...'}
                    onClick={() => {
                      if (pageNumber !== '...') {
                        dispatch({
                          type: PAGINATION_DISPATCH_TYPES.SET_PAGE,
                          payload: pageNumber,
                        });
                      }
                    }}
                    className={cn(
                      'flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-all sm:size-9 md:text-base border border-transparent',
                      pageNumber === '...'
                        ? 'cursor-default text-gray-400'
                        : page == pageNumber
                          ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/20 hover:bg-[#EA580C] hover:text-white'
                          : 'bg-white text-gray-500 hover:bg-orange-50 hover:text-[#F97316] hover:border-orange-100'
                    )}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className={cn(
                    'flex items-center justify-center aspect-square size-8 cursor-pointer p-0 text-gray-400 hover:text-[#F97316] hover:bg-orange-50 transition-all sm:size-9 border border-gray-100 rounded-full',
                    totalPages == page && 'cursor-default opacity-30 pointer-events-none border-gray-50'
                  )}
                  onClick={() => {
                    if (!(totalPages == page)) {
                      dispatch({ type: PAGINATION_DISPATCH_TYPES.NEXT_PAGE });
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;

