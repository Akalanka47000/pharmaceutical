import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyIcon, MailIcon, UserIcon, LocationMarkerIcon, PhoneIcon, OfficeBuildingIcon, DocumentTextIcon } from '@heroicons/react/solid';
import { Input, Button, Lottie, Dropdown, Divider } from '../../components/common';
import { Layout } from '../../components/layout';
import { register } from '../../services';
import { setFormData } from '../../store/ui/register';
import toast from '../../libs/toastify';
import LoginAnimation from '../../../public/assets/animations/login.json';

const Register = () => {
  const navigateTo = useNavigate();

  const { formData, allowedRoles } = useSelector((state) => state.ui.register);

  const dispatch = useDispatch();

  const loginBtn = useRef();

  useEffect(() => {
    if (loginBtn.current) {
      loginBtn.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [formData.role]);

  const handleInputChange = ({ target: { id, value } }) => {
    dispatch(
      setFormData({
        ...formData,
        [id]: value?.trim(),
      }),
    );
  };

  const handleBusinessInputChange = ({ target: { id, value } }) => {
    dispatch(
      setFormData({
        ...formData,
        business: {
          ...formData.business,
          [id]: value.trim(),
        },
      }),
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await register({ ...formData, business: formData.role === 'seller' ? formData.business : undefined }).then((data) => {
      if (data) {
        navigateTo('/login');
        dispatch(setFormData({}));
        setTimeout(() => {
          toast.success(data.message);
        }, 300);
      }
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
          <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
            <Input id="password" type="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} prefixIcon={<KeyIcon />} wrapperclasses="w-full" />
            <Dropdown id="role" filterkey="role" options={allowedRoles} className="h-12 sm:h-14" wrapperclasses="my-2 sm:my-0" onChange={handleInputChange} />
          </div>
          {formData.role === 'seller' && (
            <>
              <span className="w-full text-center font-semibold mt-2">Business Details</span>
              <Divider className="my-4" />
              <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                <Input
                  type="text"
                  id="name"
                  placeholder="Business Name"
                  required
                  value={formData.business?.name}
                  onChange={handleBusinessInputChange}
                  prefixIcon={<OfficeBuildingIcon />}
                  wrapperclasses="w-full"
                />
                <Input
                  type="text"
                  id="email"
                  placeholder="Business Email"
                  required
                  value={formData.business?.email}
                  onChange={handleBusinessInputChange}
                  prefixIcon={<MailIcon />}
                  wrapperclasses="w-full"
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                <Input
                  type="text"
                  id="license_number"
                  placeholder="License Number"
                  required
                  value={formData.business?.license_number}
                  onChange={handleBusinessInputChange}
                  prefixIcon={<DocumentTextIcon />}
                  wrapperclasses="w-full"
                />
                <Input
                  type="text"
                  id="owner_nic"
                  placeholder="Owner NIC"
                  required
                  value={formData.business?.owner_nic}
                  onChange={handleBusinessInputChange}
                  prefixIcon={<DocumentTextIcon />}
                  wrapperclasses="w-full"
                />
              </div>
            </>
          )}
          <Button className="px-12 py-3.5 mt-5">Register</Button>
          <div className="group flex justify-end items-center mt-6">
            <div ref={loginBtn} className="flex justify-center items-center">
              <p className="text-sm mr-2 font-semibold">{`Already have an account -->`}</p>
              <Link className="cursor-pointer text-sm text-primary-base hover:text-primary-hover group-hover:mr-2 transition-all duration-300" to="/login">
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
