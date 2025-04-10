import { PropsWithChildren, ReactNode } from 'react';

type ResponsiveWrapperProps = {
  header?: ReactNode | undefined;
} & PropsWithChildren;

export function ResponsiveWrapper(props: ResponsiveWrapperProps) {
  return (
    <div className='max-w-4xl mx-auto px-6'>
      {props.header}
      <div className='my-8'>{props.children}</div>
    </div>
  );
}
