import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/auth';
import { Button, Input, Lottie } from '../../components/common';
import { Layout } from '../../components/layout';
import Forgotten from '../../../public/assets/animations/forget-password.json';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    await forgotPassword({
      email: e.target.email.value,
    }).then((data) => {
      if (data) {
        toast.success('An email has been sent with a link to reset your password!', {
          autoClose: 3500,
        });
        setTimeout(() => {
          navigate('/login');
        }, 3500);
      }
    });
  };

  return (
    <Layout title="Reset Password">
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-16">
        <div className="h-[30vh] mb-12">
          <Lottie animationData={Forgotten} />
        </div>
        <span className="text-black font-medium text-3xl tracking-[-0.04em]">Forgot Password?</span>
        <p className="text-black font-light tracking-tight text-center text-lg w-11/12 mt-8 mb-[47px] sm:w-full">
          Please enter your registration email address. We'll send instructions to help reset your password.
        </p>
        <form onSubmit={handleForm} className="w-full mb-20">
          <Input wrapperclasses="w-full" className="w-full sm:h-12 lg:h-16 p-4 text-gray-100" type="email" name="email" placeholder="Email" required />
          <Button type="submit" className="w-full h-16 mt-6">
            Send Code
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
