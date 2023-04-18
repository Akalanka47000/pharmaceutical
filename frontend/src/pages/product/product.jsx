//import { axiosInstance } from './core/axios';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
//import { getAllProducts } from '../../services/product.js';

const Products = () => {
  const [products, setProducts] = useState(null);
  // const [page, setPage] = useState(1);
  // const [filterQuery, setFilterQuery] = useState('');
  // const [sortQuery, setSortQuery] = useState('');

  //   useEffect(() => {
  //     getAllProducts(filterQuery, sortQuery, page).then(({ data }) => {
  //       setProducts(data);
  //     });
  //   }, []);

  useEffect(() => {
    const AllProducts = async () => {
      const response = await fetch('http://localhost:8082/api/v1/product/');
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    AllProducts();
  }, []);

  return (
    <div className="product">
      <Layout title="Home">
        <h2> Products </h2>
        {products && products.map((product) => <p key={product._id}>{product.name}</p>)}
      </Layout>
    </div>
  );
};

export default Products;
