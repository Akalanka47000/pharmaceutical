import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyIcon, MailIcon } from '@heroicons/react/solid';
import { Input, Button, Checkbox, Lottie } from '../components/common';
import { Layout } from '../components/layout';
import { login } from '../services';
import { setFormData, toggleRememberMe } from '../store/ui/login';
import { setUser } from '../store/data/user';
import LoginAnimation from '../../public/assets/animations/login.json';

const Login = () => {
  const navigateTo = useNavigate();

  const { formData, rememberMe } = useSelector((state) => state.ui.login);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(
      setFormData({
        ...formData,
        [e.target.id]: e.target.value.trim(),
      }),
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email: formData.email, password: formData.password });
    if (rememberMe) localStorage.setItem('token', res.data.access_token);
    else sessionStorage.setItem('token', res.data.access_token);
    dispatch(setUser(res.data.user));
    navigateTo('/');
  };

  return (
    <Layout title="Home">
      <div className="w-full py-12 px-7 md:px-12 rounded-2xl">
        <div className="flex justify-center items-center">
          <div className="w-11/12 sm:w-7/12 xl:w-4/12 2xl:w-3/12 mb-10">
            <Lottie animationData={LoginAnimation} />
          </div>
        </div>
        <form className="flex flex-col " onSubmit={onSubmit}>
          <Input type="text" id="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} prefixIcon={<MailIcon />} />
          <Input id="password" type="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} prefixIcon={<KeyIcon />} />

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <Checkbox checked={rememberMe} toggle={() => dispatch(toggleRememberMe())} />
              <p className="text-sm ml-2 font-semibold">Remember Me</p>
            </div>
          </div>
          <Button className="px-12 py-3.5 mt-5">Login</Button>
          <div className="group flex justify-end items-center mt-6">
            <div className="flex justify-center items-center">
              <p className="text-sm mr-2 font-semibold">{`Don't have an account yet -->`}</p>
              <Link className="cursor-pointer text-sm text-primary-base hover:text-primary-hover group-hover:mr-2 transition-all duration-300" to="register">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
