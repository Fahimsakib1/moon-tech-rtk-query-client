import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log("State in Cart Page: ", cart);


  return (

    <div>
      <h1 className="text-center my-10 text-xl">{cart.length}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
        {
          cart.map((product) => (
              <ProductCard key={product.model} product={product} />
            ))}
      </div>
    </div>


  );
};

export default Cart;
