import { useEffect, useState } from 'react';
import { default as Layout } from '../components/layout';
import { getAllOrdersNoPagination } from '../services';

const Cart = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrdersNoPagination().then((data) => {
      if (data) setOrders(data);
    });
  }, []);

  return (
    <Layout title="Cart">
      <div class="w-screen min-h-screen flex flex-col justify-center items-center">{orders?.length > 0 && <div></div>}</div>
    </Layout>
  );
};

export default Cart;
