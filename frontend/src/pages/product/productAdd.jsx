import { useState } from 'react';
import { createProduct } from '../../services/product';
import Layout from '../../components/layout';
//import base64EncodeImage from '../../utils/image.js';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [measurement_unit, setMeasurement_unit] = useState('');
  const [age_limit, setAge_limit] = useState('');
  const [markup_price, setMarkup_price] = useState('');
  const [exp_date, setExp_date] = useState('');
  const [manufactured_date, setManufactured_date] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [seller, setSeller] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  function convertTobase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = {
      name,
      type,
      measurement_unit,
      age_limit,
      markup_price,
      exp_date,
      manufactured_date,
      description,
      quantity,
      seller,
      image,
    };

    const response = await createProduct(products);

    if (!response.success) {
      setError(JSON.error);
    }
    if (response) {
      setError(null);
      setName('');
      setType('');
      setMeasurement_unit('');
      setAge_limit('');
      setMarkup_price('');
      setExp_date('');
      setManufactured_date('');
      setDescription('');
      setQuantity('');
      setSeller('');
      setImage('');
    }
    console.log();
  };

  return (
    <div>
      <Layout title="Home">
        <div>
          <form onSubmit={handleSubmit}>
            <div class="bg-orange-100 rounded-xl shadow border p-12 m-24">
              <h1 class="text-5xl px-10">Add Product</h1>
              <div class="grid md:grid-cols-2 md:gap-4 mt-6 ">
                <div class="relative z-0 mb-4 w-full group ">
                  <div class="py-3 px-10">
                    <label class=" text-gray-600 text-xl">Product Name :</label>
                    <input
                      type="text"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>

                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-6">
                    <label class=" text-gray-600 text-xl">Category :</label>
                    <select
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option class="text-center">Choose the category... </option>
                      <option class="text-center">Supplements and Herbs </option>
                      <option class="text-center">Sports and Nutrition </option>
                      <option class="text-center"> Medicine</option>
                      <option class="text-center"> Beauty</option>
                      <option class="text-center">Bath </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-4">
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-10">
                    <label class=" text-gray-600 text-xl">Measurement Unit Per Product :</label>
                    <input
                      type="text"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      onChange={(e) => setMeasurement_unit(e.target.value)}
                      value={measurement_unit}
                    />
                  </div>
                </div>
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-6">
                    <label class=" text-gray-600 text-xl">Age Limit For Consuming Product :</label>
                    <input
                      type="text"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setAge_limit(e.target.value)}
                      value={age_limit}
                    />
                  </div>
                </div>
              </div>

              <div class="grid md:grid-cols-2 md:gap-4">
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-10">
                    <label class=" text-gray-600 text-xl">Markup Price Rs :</label>
                    <input
                      type="number"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setMarkup_price(e.target.value)}
                      value={markup_price}
                    />
                  </div>
                </div>
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-6">
                    <label class=" text-gray-600 text-xl">Quantity :</label>
                    <input
                      type="number"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-4">
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-10">
                    <label class=" text-gray-600 text-xl">Expiry Date :</label>

                    <input
                      type="date"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      onChange={(e) => setExp_date(e.target.value)}
                      value={exp_date}
                    />
                  </div>
                </div>
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-6">
                    <label class=" text-gray-600 text-xl"> Manufactured Date :</label>
                    <input
                      type="date"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setManufactured_date(e.target.value)}
                      value={manufactured_date}
                    />
                  </div>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-4">
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-10">
                    <label class=" text-gray-600 text-xl">Seller/Business Name :</label>

                    <input
                      type="text"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setSeller(e.target.value)}
                      value={seller}
                    />
                  </div>
                </div>
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-6">
                    <label class=" text-gray-600 text-xl">Product Image :</label>
                    <input
                      accept="image/"
                      type="file"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={convertTobase64}
                    />
                    {image == '' || image == null ? '' : <img class="w-16 h-1.5" src={image} />}
                  </div>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-4">
                <div class="relative z-0 mb-4 w-full group">
                  <div class="py-3 px-10">
                    <label class=" text-gray-600 text-xl">Product Description :</label>
                    <input
                      type="text-area"
                      placeholder="Maximum 300 characters allowed"
                      class="bg-gray-50 border border-stone-400 text-gray-600 text-lg flex-auto rounded-lg focus:ring-emerald-800 focus:border-emerald-800 block w-4/5 p-2.5 max-h-[300px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                </div>
              </div>

              <div class="relative z-0 mb-4 w-full group ">
                <div class="py-3 px-10 ">
                  <button class="group relative flex w-full justify-center rounded-2xl border border-transparent bg-stone-400 py-2 px-4 text-xl text-white hover:bg-emerald-700 focus:outline-none ">
                    {' '}
                    Add Batch
                  </button>
                  {error && <div class="error">{error}</div>}{' '}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ProductForm;
