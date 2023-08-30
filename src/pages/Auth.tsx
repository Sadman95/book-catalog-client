import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useAppSelector } from '@/redux/hook';
import { IUser } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [toggleAuth, setToggleAuth] = useState(true);
  const currentUser = useAppSelector<IUser | null>(
    (state) => state.auth.userInfo
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(location.state?.from ?? '/', { replace: true });
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col w-full h-screen gap-4 md:flex-row">
      <div className="w-full h-1/2 md:h-full md:w-1/2">
        <img
          className="object-cover w-full h-full"
          src="https://source.unsplash.com/random"
          alt="random"
        />
      </div>
      {toggleAuth ? (
        <LoginForm toggleAuth={toggleAuth} setToggleAuth={setToggleAuth} />
      ) : (
        <SignupForm toggleAuth={toggleAuth} setToggleAuth={setToggleAuth} />
      )}
    </div>
  );
};

export default Auth;
