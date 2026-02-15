import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';

const PaginationContext = createContext();

const initialState = {
  total: 0,
  limit: 10,
  page: 1,
};

function paginationReducer(state, action) {
  switch (action.type) {
    case PAGINATION_DISPATCH_TYPES.SET_PAGE:
      return { ...state, page: action.payload };
    case PAGINATION_DISPATCH_TYPES.SET_LIMIT:
      return { ...state, limit: action.payload, page: 1 };
    case PAGINATION_DISPATCH_TYPES.NEXT_PAGE:
      return { ...state, page: (state.page || 1) + 1 };
    case PAGINATION_DISPATCH_TYPES.PREV_PAGE:
      return { ...state, page: Math.max(1, (state.page || 1) - 1) };
    case PAGINATION_DISPATCH_TYPES.SET_TOTAL:
      return { ...state, total: action.payload };
    default:
      return state;
  }
}

export const PaginationProvider = ({ children, initialTotal = 0, initialLimit = 10 }) => {
  const [state, dispatch] = useReducer(paginationReducer, {
    ...initialState,
    total: initialTotal,
    limit: initialLimit,
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export default function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    return {
        state: initialState,
        dispatch: () => {}
    };
  }
  return context;
}

