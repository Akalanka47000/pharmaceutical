import { useSelector } from 'react-redux';
import Layout from '../components/layout';

const Home = () => {
  const user = useSelector((store) => store.data.user.authUser);

  console.log(user);

  return <Layout title="Home">home</Layout>;
};

export default Home;
