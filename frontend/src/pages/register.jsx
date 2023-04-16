import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyIcon, MailIcon, UserIcon, LocationMarkerIcon, PhoneIcon } from '@heroicons/react/solid';
import { Input, Button, Lottie } from '../components/common';
import { Layout } from '../components/layout';
import { login } from '../services';
import { setFormData } from '../store/ui/login';
import toast from '../libs/toastify';
import LoginAnimation from '../../public/assets/animations/login.json';

const Register = () => {
  const navigateTo = useNavigate();

  const { formData } = useSelector((state) => state.ui.login);

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
    if (formData.role != 'seller') delete formData.business;
    await login(formData).then((data) => {
      navigateTo('/login');
      setTimeout(() => {
        toast.success(data.message);
      }, 300);
    });
  };

  return (
    <Layout title="Home">
      <div className="w-full py-12 px-7 md:px-12 rounded-2xl">
        <div className="flex justify-center items-center">
          <div className="w-11/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 mb-10">
            <Lottie animationData={LoginAnimation} />
          </div>
        </div>
        <form className="flex flex-col " onSubmit={onSubmit}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input type="text" id="name" placeholder="Name" required value={formData.name} onChange={handleInputChange} prefixIcon={<UserIcon />} wrapperclasses="w-full" />
            <Input type="text" id="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} prefixIcon={<MailIcon />} wrapperclasses="w-full" />
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input type="text" id="address" placeholder="Address" required value={formData.address} onChange={handleInputChange} prefixIcon={<LocationMarkerIcon />} wrapperclasses="w-full" />
            <Input type="text" id="mobile" placeholder="Mobile" required value={formData.mobile} onChange={handleInputChange} prefixIcon={<PhoneIcon />} wrapperclasses="w-full" />
          </div>
          <Input id="password" type="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} prefixIcon={<KeyIcon />} />
          <Button className="px-12 py-3.5 mt-5">Register</Button>
          <div className="group flex justify-end items-center mt-6">
            <div className="flex justify-center items-center">
              <p className="text-sm mr-2 font-semibold">{`Already have an account -->`}</p>
              <Link className="cursor-pointer text-sm text-primary-base hover:text-primary-hover group-hover:mr-2 transition-all duration-300" to="register">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
