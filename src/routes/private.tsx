import { useAppSelector } from '@/redux/hook';
import { IUser } from '@/types/globalTypes';
import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PrivateRoute: FC<IProps> = ({ children }: IProps) => {
  const currentUser = useAppSelector<IUser | null>(
    (state) => state.auth.userInfo
  );
  const location = useLocation();
  return currentUser ? (
    children
  ) : (
    <Navigate to="/auth" replace state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
