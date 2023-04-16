import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from 'flowbite-react';
import { isEmpty } from 'lodash';
import { Button } from '../common';
import { logout } from '../../services';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavLink = ({ path, label }) => {
  const location = useLocation()
  return <Navbar.Link href={path}><span className={`hover:text-black hover:font-semibold ${location.pathname === path ? "text-black font-semibold" : ""}`}>{label}</span></Navbar.Link>
}


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
        <NavLink path="/" label="Home"/>
        <NavLink path="/about" label="About"/>
        <NavLink path="/services" label="Services"/>
        <NavLink path="/pricing" label="Pricing"/>
        <NavLink path="/contact" label="Contact"/>
        {user?.role === "admin" && (
          <>
            <NavLink path="/users" label="Users"/>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
