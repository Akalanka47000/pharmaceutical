import Layout from '../../components/layout';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, deleteProduct } from '../../services/product.js';

function ProductDetail() {
  const { product_id: productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const SingleProduct = async () => {
      const response = await getSingleProduct(productId);
      console.log(response);
      setProduct(response.data);
    };
    SingleProduct();
  }, [productId]);

  if (!product) {
    return <div>Cannot find product</div>;
  }
  const expiryDate = new Date(product.exp_date).toLocaleDateString();
  const manuDate = new Date(product.manufactured_date).toLocaleDateString();

  const handleDelete = async () => {
    await deleteProduct(productId);
  };

  return (
    <Layout title="Home">
      <div title="ProductDetail">
        <div class=" bg-stone-200 m-20 p-4 relative">
          <div class="px-20 pt-10">
            <img class="rounded shadow-md object cover w-full h-3/6" src={product.image}></img>
          </div>
          <div class="grid md:grid-cols-2 md:gap-4 mt-6">
            <div class="relative z-0 mb-4 w-full group ">
              <div class="space-y-4 py-3 px-20">
                <div class="block font-bold text-gray-600 text-6xl p-4">{product.name}</div>
                <div class="block text-gray-600 text-lg p-4"> {product.seller}</div>
                <div class="block text-gray-600 text-xl p-4">{product.description}</div>
                <div class="block font-bold text-gray-600 text-xl p-4">Available Only {product.stock} Products</div>
                <p class="block font-bold text-gray-600 text-2xl p-4"> Rs {product.selling_price}</p>
                <p class="text-base text-red-500 px-4 py-0 ">
                  <abbr title="Required field">*</abbr>
                  Price Including Product commission
                </p>
              </div>
            </div>
            {/* bleh */}
            <div class="relative z-0 mb-4 w-full group  text-gray-600 text-xl ">
              <div class="space-y-4 py-3 px-10">
                <div class="grid md:grid-cols-2 md:gap-0.2 mt-6">
                  <div class=" relative z-0 mb-2 w-full group">
                    <div class="py-3 px-10">
                      <div> Type : </div>
                    </div>
                  </div>
                  <div class="relative z-0 mb-2 w-full group">
                    <div>
                      <div class="py-3"> {product.type}</div>
                    </div>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 mt-6">
                  <div class=" relative z-0 mb-2 w-full group">
                    <div class="py-3 px-10">
                      <div> Per Unit : </div>
                    </div>
                  </div>
                  <div class="relative z-0 mb-2 w-full group">
                    <div>
                      <div class="py-3"> {product.measurement_unit}</div>
                    </div>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 mt-6">
                  <div class=" relative z-0 mb-2 w-full group">
                    <div class="py-3 px-10">
                      <div> Age Limit : </div>
                    </div>
                  </div>
                  <div class="relative z-0 mb-2 w-full group">
                    <div>
                      <div class="py-3"> {product.age_limit}</div>
                    </div>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 mt-6">
                  <div class=" relative z-0 mb-2 w-full group">
                    <div class="py-3 px-10">
                      <div> Expiry Date : </div>
                    </div>
                  </div>
                  <div class="relative z-0 mb-2 w-full group">
                    <div>
                      <div class="py-3"> {expiryDate}</div>
                    </div>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 mt-6">
                  <div class=" relative z-0 mb-2 w-full group">
                    <div class="py-3 px-10">
                      <div> Manufactured Date : </div>
                    </div>
                  </div>
                  <div class="relative z-0 mb-2 w-full group">
                    <div>
                      <div class="py-3"> {manuDate}</div>
                    </div>
                  </div>
                </div>
                <div class="pr-10">
                  <Link to="/order">
                    <div class="cartBtn">Add to cart</div>
                  </Link>
                </div>
                <div class="pr-10">
                  <div onClick={handleDelete}>
                    <Link to="/products">
                      <div class="adminBtn"> Delete </div>
                    </Link>
                  </div>
                </div>
                <div class="pr-10">
                  <div class="adminBtn"> Edit </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
