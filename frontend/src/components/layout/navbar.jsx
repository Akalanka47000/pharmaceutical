import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from 'flowbite-react';
import { isEmpty } from 'lodash';
import { Button } from '../common';
import { logout } from '../../services';
import { Link } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate()

  const user = useSelector((store) => store.data.user.authUser);

  const logoutClick = () => {
    logout()
    navigate("/login")
  }

  return (
    <Navbar fluid={true} rounded={false} class="border-gray-200 bg-white px-2 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-4">
      <Navbar.Brand href="/">
        <img src="public/assets/logo.png" className="mr-3 h-6 sm:h-9" alt="Pharmaceutical Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-2">Pharmaceutical</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="flex justify-center items-center gap-x-2">
          {isEmpty(user) && (
            <>
              <Link to="/login">
                <Button className="py-1.5 px-6">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="py-1.5 px-6">Register</Button>
              </Link>
            </>
          )}
          {!isEmpty(user) && (
            <Button className="py-1.5 px-6" onClick={logoutClick}>
              Logout
            </Button>
          )}
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
        {user?.role === "admin" && (
          <>
            <Navbar.Link href="/users">Users</Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
