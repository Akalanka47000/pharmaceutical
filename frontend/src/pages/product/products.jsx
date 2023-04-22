import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { getAllProducts } from '../../services/product.js';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Products() {
  const [bestSellingProducts, setBestSellers] = useState([]);
  const [usualProducts, setProducts] = useState([]);

  useEffect(() => {
    const allProducts = async () => {
      const response = await getAllProducts();
      const productList = response.data.docs;
      const bestSellers = productList.filter((product) => product.sold_amount > 5);
      setBestSellers(bestSellers);

      const ourProducts = productList.filter((product) => product.sold_amount <= 5);
      setProducts(ourProducts);
    };
    allProducts();
  }, []);

  return (
    <div title="Products">
      <Layout title="Home">
        <div class="px-16 py-6">
          <h4 class="text-gray-600 text-3xl font-semibold mt-12 p-4 border-b border-gray-200 justify-start"> Best Sellers</h4>
          <div class="mt-8 grid lg:grid-cols-3 gap-10">
            {bestSellingProducts &&
              bestSellingProducts.map((product) => (
                <div class="card">
                  <Link to={`/product-detail/${product._id}`}>
                    <img alt="Not available" class="img" src={product.image}></img>
                    <div m-3>
                      <span class="text-gray-600 text-xl p-4">{product.name}</span>
                      <span class="block text-gray-600 text-xl p-4">{product.markup_price}</span>
                      <span class="block text-gray-600 text-l p-4">{product.seller}</span>
                    </div>
                    <div class="badge">
                      <span>
                        {' '}
                        <BsCartPlus class="w-8 h-8 m-2" />
                        <Link to={`/order/${product._id}`}></Link>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <h4 class="text-gray-600 text-3xl font-semibold mt-12 p-4 border-b border-gray-200 justify-start"> Our Products</h4>
          <div class="mt-8 grid lg:grid-cols-3 gap-10">
            {usualProducts &&
              usualProducts.map((product) => (
                <div class="card">
                  <div>
                    <Link to={`/product-detail/${product._id}`}>
                      <img alt="Not available" class="img" src={product.image}></img>
                      <div m-3>
                        <span class="text-gray-600 text-xl px-4 pt-4">{product.name}</span>
                        <span class="block text-gray-600 text-xl px-4 -pt-3">Rs. {product.markup_price}</span>
                        <span class="block text-gray-600 text-l px-4 -pt-3">{product.seller}</span>
                      </div>
                    </Link>
                  </div>
                  <div class="p-4">
                    <Link to="/order">
                      <div class="cartBtn">
                        <BsCartPlus />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <div class="mt-8"></div>
          <div class="flex justify-center">
            <div class="bg-slate-50 text-zinc-400">Load more</div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Products;
