import { FC, ReactNode } from 'react';
import { TiTick, TiWarningOutline } from 'react-icons/ti';
import { BiErrorCircle } from 'react-icons/bi';

const VARIANTS = {
  success:
    'bg-green-100 border border-green-500 text-green-500-foreground rounded solid',
  error: 'bg-red-100 border border-red-500 text-red-500 rounded solid',
  warning:
    'bg-orange-100 border border-orange-500 text-orange-500-foreground rounded solid',
};

interface IProps {
  variant: 'success' | 'error' | 'warning';
  children: ReactNode;
}

function renderIcon(variant: 'error' | 'warning' | 'success') {
  switch (variant) {
    case 'success':
      return <TiTick />;
    case 'error':
      return <BiErrorCircle />;
    case 'warning':
      return <TiWarningOutline />;
  }
}

const CoreAlert: FC<IProps> = ({ variant, children }) => {
  return (
    <div
      className={`p-4 w-full flex items-center justify-center gap-4 ${VARIANTS[variant]}`}
    >
      {renderIcon(variant)}
      {children}
    </div>
  );
};

export default CoreAlert;
