import React, {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { LoaderCircle, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type ListCtxData<T extends { key: string }> = {
  data: T[];
  isLoading: boolean;
  error: any;
  renderListItem: (data: T) => React.ReactNode;
};

type ListProviderProps<T extends { key: string }> = ListCtxData<T> &
  PropsWithChildren;

type ListSearchProps = {
  onSearchChange: (search: string | undefined) => void;
} & ComponentProps<'div'> &
  Pick<ComponentProps<'input'>, 'placeholder'>;

type ListAddButtonProps = {
  isLoading: boolean;
} & ComponentProps<'button'>;

type ListPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
} & ComponentProps<'div'>;

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

  if (props.error) {
    return <ListError />;
  }

  return (
    <ListContext.Provider value={restProps as any}>
      {children}
    </ListContext.Provider>
  );
}

function ListSkeleton() {
  return (
    <div className='flex flex-col gap-1 min-w-full'>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className='h-11 min-w-full transition-all' />
        ))}
    </div>
  );
}

function ListError() {
  return (
    <div className='min-w-full mx-auto bg-red-50 rounded py-2 '>
      <h4 className='my-2 text-2xl font-light text-red-500 text-center'>
        {'Oops! :('}
      </h4>
      <p className='text-lg font-light text-red-600 text-center'>
        Something went wrong, try again later.
      </p>
    </div>
  );
}

function ListView<T extends { key: string }>() {
  const { data, renderListItem } = useList<T>();

  return (
    <div className='flex flex-col gap-1'>
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

function ListSearch(props: ListSearchProps) {
  const { onSearchChange, className, placeholder } = props;
  const { error } = useList();
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value.trim();

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      onSearchChange(search ? search : undefined);
    }, 500);
  }, []);

  if (error) {
    return null;
  }

  return (
    <div className={cn('flex items-center relative', className)}>
      <Input
        type='text'
        placeholder={placeholder}
        className='px-8 py-4 focus-visible:ring-0'
        onChange={handleChange}
      />
      <Search className='absolute left-2.5' size='16' />
    </div>
  );
}

function ListAddButton(props: ListAddButtonProps) {
  const { isLoading, ...restProps } = props;

  return (
    <Button
      variant='outline'
      className='enabled:hover:cursor-pointer'
      disabled={isLoading}
      {...restProps}
    >
      {isLoading ? <LoaderCircle className='animate-spin' /> : <Plus />}
      <span>Add</span>
    </Button>
  );
}

function ListPagination(props: ListPaginationProps) {
  const { page, totalPages, onPageChange, className } = props;
  const { isLoading } = useList();

  if (isLoading) {
    return null;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div>
        <span className='text-sm font-light'>
          Page {page} of {totalPages}
        </span>
      </div>

      <Pagination className='w-min mx-0'>
        <PaginationContent className='inline-flex'>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              size='sm'
              className='[&>span]:hidden'
              aria-disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) {
                  onPageChange(page - 1);
                }
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href='#'
              size='sm'
              className='[&>span]:hidden'
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
    </div>
  );
}

ListProvider.Search = ListSearch;
ListProvider.AddButton = ListAddButton;
ListProvider.ListView = ListViewWrapper;
ListProvider.Pagination = ListPagination;
