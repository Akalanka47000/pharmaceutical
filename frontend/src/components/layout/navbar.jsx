import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from 'flowbite-react';
import { UserIcon, LogoutIcon } from '@heroicons/react/solid';
import { isEmpty } from 'lodash';
import { Button } from '../common';
import { logout } from '../../services';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavLink = ({ path, label }) => {
  const location = useLocation();
  return (
    <Navbar.Link href={path}>
      <span class={`hover:text-black hover:font-semibold ${location.pathname === path ? 'text-black font-semibold' : ''}`}>{label}</span>
    </Navbar.Link>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.data.user.authUser);

  const logoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar fluid={true} rounded={false} class="border-gray-200 bg-white px-2 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-4">
      <Navbar.Brand href="/">
        <img src="public/assets/logo.png" class="mr-3 h-6 sm:h-9" alt="Pharmaceutical Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-2">Pharmaceutical</span>
      </Navbar.Brand>
      <div class="flex md:order-2">
        <div class="flex justify-center items-center gap-x-2">
          {isEmpty(user) && (
            <>
              <Link to="/productAdd">
                <Button className="py-1.5 px-6">Add Product</Button>
              </Link>
              <Link to="/login">
                <Button className="py-1.5 px-6">Login</Button>
              </Link>
            </>
          )}
          {!isEmpty(user) && (
            <>
              <Link to="/profile" class="py-1.5 px-1.5 rounded-full mr-2 md:mr-3 shadow-lg border-2 border-primary-base">
                <UserIcon className="h-5 w-5" />
              </Link>
              <Button className="py-2 px-3 md:px-6" onClick={logoutClick}>
                <LogoutIcon className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink path="/" label="Home" />
        <NavLink path="/about" label="About" />
        <NavLink path="/services" label="Services" />
        <NavLink path="/pricing" label="Pricing" />
        <NavLink path="/contact" label="Contact" />
        {user?.role === 'admin' && (
          <>
            <NavLink path="/users" label="Users" />
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
