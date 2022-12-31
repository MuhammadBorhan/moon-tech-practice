import React from "react";
import { useSelector } from "react-redux";
import ProductCart from "../../components/ProductCart";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
      {cart.map((product) => (
        <ProductCart key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Cart;
