import React from 'react';
import CartItem from '../../components/cards/CardItem';

const CartPage = () => {
  const { cart: cartItems, total_items, total_amount, clearCart } = useCartContext();

  if (cartItems.length < 1) {
    return (
      <div className="py-8 font-semibold text-center">No items found in the cart.</div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="py-6">
          <h3 className="text-2xl">Shopping Cart</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-lg">{total_items}</span> Courses in Cart
              </div>
              <button
                type="button"
                className="flex items-center text-pink-600 font-semibold text-sm"
                onClick={() => clearCart()}
              >
                <span>Clear All</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {cartItems.map(cartItem => (
                <CartItem key={cartItem.courseID} course={cartItem} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-lg font-semibold">Total:</div>
            <div className="text-3xl font-extrabold">${total_amount.toFixed(2)}</div>
            <button
              type="button"
              className="px-6 py-3 mt-4 text-lg font-semibold text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
