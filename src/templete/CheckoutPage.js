import React, { useState, useEffect } from "react";
import { useCart } from "../templete/CartContext";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = cartItems.reduce(
      (acc, item) => acc + Number(item.foodPrice) * Number(item.quantity),
      0
    );
    setTotalPrice(calculateTotal);
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      toast.error("Quantity cannot be zero or negative.");
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty. Please add items to your cart.");
      return;
    }
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Container className="max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4 border-b"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.foodImage || "https://via.placeholder.com/150"}
                    alt={item.foodName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.foodName}</h3>
                    <p className="text-sm text-gray-600">
                      {item.foodDescription}
                    </p>
                    <p className="text-lg text-green-600">₹ {item.foodPrice}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-300 rounded-full"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-300 rounded-full"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center py-4 border-t mt-6">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-xl font-semibold text-green-600">
                ₹ {totalPrice}
              </p>
            </div>

            <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4"
                  onChange={(e) => {
                    if (!e.target.checked) {
                      toast.error("You must agree to the terms and conditions.");
                    }
                  }}
                />
                <label htmlFor="terms" className="text-xl  text-gray-600">
                  I agree to send my order screenshot to the kitchen <span className="text-red-600">7847*****8</span> Whatsapp and Call to confirm my order.
                </label>
              </div>
            <div className="mt-6 flex justify-center">
              
              <Link to="/home/checkout/order">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <Link to="/home" className="text-blue-500 hover:underline">
            Back to Menu
          </Link>
          {cartItems.length > 0 && (
            <button
              onClick={() => clearCart()} // Call clearCart function
              className="text-red-500 hover:underline"
            >
              Clear Cart
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
