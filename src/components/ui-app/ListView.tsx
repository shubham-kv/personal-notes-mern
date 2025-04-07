import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

type ListCtxData<T extends { key: string }> = {
  data: T[];
  isLoading: boolean;
  error: any;
  page: number;
  pageLimit: number;
  totalPages: number;
  renderListItem: (data: T) => React.ReactNode;
  onPageChange: (newPage: number) => void;
  onPageLimitChange: (newPageLimit: number) => void;
};

type ListProviderProps<T extends { key: string }> = ListCtxData<T> &
  PropsWithChildren;

const ListContext = createContext(null);

function useList<T extends { key: string }>(): ListCtxData<T> {
  const value = useContext(ListContext);

  if (!value) {
    throw new Error(`useList hook must be used within it's provider`);
  }

  return value;
}

export function ListProvider<T extends { key: string }>(
  props: ListProviderProps<T>
) {
  const { children, ...restProps } = props;
  return (
    <ListContext.Provider value={restProps as any}>
      {children}
    </ListContext.Provider>
  );
}

function ListSkeleton() {
  return (
    <div className="flex flex-col gap-2 min-w-full">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-11 min-w-full transition-all" />
        ))}
    </div>
  );
}

function ListError() {
  return (
    <div className="min-w-full mx-auto bg-red-50 rounded py-2">
      <h4 className="my-2 text-2xl font-light text-center text-red-500">
        {'Oops! :('}
      </h4>
      <p className="text-lg text-center text-red-600">
        Something went wrong, try again later.
      </p>
    </div>
  );
}

function ListView<T extends { key: string }>() {
  const { data, renderListItem } = useList<T>();

  return (
    <div className="flex flex-col gap-2">
      {data.map((d) => (
        <div key={`li-${d.key}`}>{renderListItem(d)}</div>
      ))}
    </div>
  );
}

function ListViewWrapper() {
  const { data, error, isLoading } = useList();

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (error) {
    return <ListError />;
  }

  if (data) {
    return <ListView />;
  }

  return null;
}

function ListPaginationSkeleton() {
  return (
    <div className="flex flex-col gap-1 min-w-full">
      <div className="justify-end flex gap-1">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="w-9 h-9 transition-all" />
          ))}
      </div>
    </div>
  );
}

export function ListPagination() {
  const { isLoading, error, page, totalPages, onPageChange } = useList();

  if (isLoading) {
    return <ListPaginationSkeleton />;
  }

  if (error || totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="[&>span]:hidden"
            href="#"
            aria-disabled={page === 1}
            onClick={(e) => {
              e.preventDefault();

              if (page > 1) {
                onPageChange(page - 1);
              }
            }}
          />
        </PaginationItem>

        {Array(totalPages < 9 ? totalPages : 9)
          .fill(0)
          .map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            className="[&>span]:hidden"
            href="#"
            aria-disabled={page === totalPages}
            onClick={(e) => {
              e.preventDefault();

              if (page < totalPages) {
                onPageChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

ListProvider.ListView = ListViewWrapper;
ListProvider.Pagination = ListPagination;
