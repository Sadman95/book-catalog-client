import Navbar from '@/components/common/Navbar';
import { Outlet } from 'react-router-dom';

const GlobalLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default GlobalLayout;
