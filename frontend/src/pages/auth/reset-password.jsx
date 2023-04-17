import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Lottie } from '../../components/common';
import { Layout } from '../../components/layout';
import { resetPassword } from '../../services/auth';
import Unlock from '../../../public/assets/animations/unlock.json';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword(code, {
      new_password: e.target.password.value,
    }).then((data) => {
      if (data) {
        toast.success('Password reset successfully!', {
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
        <div className="h-[40vh] mb-12">
          <Lottie animationData={Unlock} />
        </div>
        <span className="text-black font-medium text-3xl tracking-[-0.04em] mb-8">Reset Your Password</span>
        <form onSubmit={handleReset} className="w-full mb-56">
          <Input wrapperclasses="w-full" className="w-full sm:h-12 lg:h-16 p-4 text-gray-100" placeholder="New Password" type="password" name="password" required />
          <Button type="submit" className="w-full h-16 mt-6">
            Reset Password
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
