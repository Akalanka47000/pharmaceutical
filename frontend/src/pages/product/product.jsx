//import { axiosInstance } from './core/axios';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { getAllProducts } from '../../services/product.js';

const Products = () => {
  // const [products, setProducts] = useState(null);
  // useEffect(() => {
  //   const AllProducts = async () => {
  //     const response = await getAllProducts();
  //     console.log(response);
  //     if (response) {
  //       setProducts(response.data.docs);
  //     }
  //   };

  //   AllProducts();
  //   console.log(products);
  // }, []);

  return (
    <div className="product">
      {/* add */}
      <Layout title="Home">
        <div>
          <h4> Best Sellers</h4>
          <div>
            {/* cards */}
            <div>
              <img src="" alt=""></img>
              <div>
                <span> Vitamin B</span>
                <span> Mal mal pharmacy</span>
              </div>
            </div>
          </div>
          <h4> Our Products</h4>
          <div></div>
          <div>
            <div>Load more</div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Products;
