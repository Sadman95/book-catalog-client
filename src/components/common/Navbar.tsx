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
import { HiOutlineSearch } from 'react-icons/hi';
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
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
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

              <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
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
