import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '../../components/layout';
import { Button } from '../../components/common';
import { setFormData } from '../../store/ui/products';
import { getSingleProduct, deleteProduct } from '../../services/product';

function ProductDetail() {
  const { product_id: productId } = useParams();
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.data.user.authUser);

  useEffect(() => {
    const singleProduct = async () => {
      const response = await getSingleProduct(productId);
      setProduct(response.data);
    };
    singleProduct();
  }, [productId]);

  const expiryDate = new Date(product.exp_date).toLocaleDateString();
  const manuDate = new Date(product.manufactured_date).toLocaleDateString();

  const onClickEdit = () => {
    navigate(`/product-edit/${productId}`);
    dispatch(setFormData({ ...product, exp_date: product.exp_date.substring(0, 10), manufactured_date: product.manufactured_date.substring(0, 10) }));
  };

  const onClickAddToCart = () => {};

  return (
    <Layout title="Home">
      <div title="ProductDetail">
        <div class=" bg-gray-100/10 rounded-xl shadow border-2 mx-6 md:mx-24 my-6 p-4 relative">
          <div class="px-4 md:px-10 pt-10">
            <img class="rounded shadow-md object-cover w-full h-[60vh]" src={product.image}></img>
          </div>
          <div class="grid md:grid-cols-2 md:gap-4 mt-6">
            <div class="relative z-0 mb-4 w-full group ">
              <div class="space-y-4 py-3 px-4 md:px-10">
                <div class="block font-bold text-gray-600 text-4xl md:text-6xl">{product.name}</div>
                <div class="block text-gray-600 text-xl"> {product.seller?.name}</div>
                <div class="block text-gray-600 text-lg">{product.description}</div>
                <div class="block font-bold text-gray-600 text-xl">Only {product.stock} Items Left</div>
                <p class="block font-bold text-gray-600 text-2xl"> Rs {product.selling_price}</p>
                <p class="text-base text-red-500 py-0 ">
                  <abbr title="Required field">*</abbr>
                  Inclusive of All Taxes & Charges
                </p>
              </div>
            </div>
            {/* bleh */}
            <div class="relative z-0 mb-4 w-full group  text-gray-600 text-xl ">
              <div class="space-y-4 py-3 px-4 md:px-10">
                <div class="grid md:grid-cols-2 md:gap-0.2 md:mt-4">
                  <div class=" relative z-0 mb-2 py-3 w-full group font-semibold">Type :</div>
                  <div class="relative z-0 mb-2 py-3 w-full group">{product.type}</div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 md:mt-4">
                  <div class=" relative z-0 mb-2 py-3 w-full group font-semibold">Per Unit :</div>
                  <div class="relative z-0 mb-2 py-3 w-full group">{product.measurement_unit}</div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 md:mt-4">
                  <div class=" relative z-0 mb-2 py-3 w-full group font-semibold">Age Limit :</div>
                  <div class="relative z-0 mb-2 py-3 w-full group">{product.age_limit}</div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 md:mt-4">
                  <div class=" relative z-0 mb-2 py-3 w-full group font-semibold">Expiry Date :</div>
                  <div class="relative z-0 mb-2 py-3 w-full group">{expiryDate}</div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-0.2 md:mt-4">
                  <div class=" relative z-0 mb-2 py-3 w-full group font-semibold">
                    <div> Manufactured Date : </div>
                  </div>
                  <div class="relative z-0 mb-2 py-3 w-full group">{manuDate}</div>
                </div>
                <Button className="w-full py-4 text-base mt-4" onClick={onClickAddToCart}>
                  Add to cart
                </Button>
                {user.role === 'admin' ||
                  (user.role == 'seller' && user._id == product.seller?._id && (
                    <>
                      <Link to="/">
                        <Button className="w-full py-4 text-base bg-red-500 hover:bg-red-600 mt-4" onClick={() => deleteProduct(productId)}>
                          Delete
                        </Button>
                      </Link>
                      <Button className="w-full py-4 text-base" onClick={onClickEdit}>
                        Edit
                      </Button>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
