import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../../components/ProductCart";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
import { getProducts } from "../../features/products/productsSlice";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const { isLoading, products, isError, error } = useSelector(
    (state) => state.products
  );
  console.log(products);
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { brands, stock } = filters;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.data));
  // }, []);

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  if (products.length) {
    content = products.map((product) => (
      <ProductCart key={product.model} product={product} />
    ));
  }

  if (products.length && (filters.stock || filters.brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (filters.brands.length) {
          return filters.brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCart key={product.model} product={product} />);
  }
  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          } `}
          onClick={() => dispatch(toggleBrands("amd"))}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          } `}
          onClick={() => dispatch(toggleBrands("intel"))}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
