import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import { DropdownMenuLabel } from '../ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../ui/dropdown-menu';
import logo from '../../assets/images/book-catalog-logo.png';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { logOut } from '@/redux/features/auth/authSlice';

export default function Navbar() {
  const currentUser = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('persist:book_catalog');
    dispatch(logOut());
  };

  return (
    <nav className="fixed z-10 w-full h-16 top backdrop-blur-lg">
      <div className="w-full h-full bg-white/60">
        <div className="flex items-center justify-between w-full h-full mx-auto md:max-w-7xl ">
          <Link to="/">
            <img className="h-8" src={logo} alt="logo" />
          </Link>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/add-book">Add book</Link>
                </Button>
              </li>

              <li className="ml-5">
                {currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Signed is as {currentUser?.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => logOutHandler()}
                        className="cursor-pointer"
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="link" asChild>
                    <Link to="/auth">Sign in</Link>
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
