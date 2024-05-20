import React, { useEffect, useState } from 'react';
import CartItem from '../../components/cards/CartItem';
import useWishlistStore from '../../stores/useWishlistStore';
import Layout from "../../components/Layout.jsx";
import Modal from '../../components/modal/Modal.jsx';
import momoImage from './momo1.png';
import vietQrImage from './vietqr1.png';
import { CheckoutService } from '../../services/CheckoutService.js';

const Checkout = () => {
  const { wishlist, fetchWishlist, total: wishlistTotal } = useWishlistStore((state) => ({
    wishlist: state.wishlist,
    fetchWishlist: state.fetchWishlist,
    total: state.total,
  }));
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0); 
  const [storeTotal, setStoreTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchWishlist(); 
    setStoreTotal(wishlistTotal);
  }, [fetchWishlist, wishlistTotal]);

  useEffect(() => {
    const selectedTotal = calculateSelectedTotal();
    setCheckoutTotal(selectedTotal);
  }, [selectedItems]);

  const handleToggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleCheckoutAll = () => { 
    setSelectedItems([]);
  };

  const calculateSelectedTotal = () => {
    return wishlist.reduce((sum, course) => {
      const { id, price } = course.course;
      if (selectedItems.includes(id)) {
        sum += price || 0;
      }
      return sum;
    }, 0);
  };

  const handleCheckout = () => {
    setIsModalOpen(true);  
  };

  const checkOutMomo = async () => {
    try {
      const res = await CheckoutService.MomoCheckoutCourse(checkoutTotal, selectedItems);
      const payUrl = res.data.payUrl;
      console.log(payUrl);
      window.location.href = payUrl;
    } catch (error) {
      console.error("Error occurred during checkout:", error);
    }                                     
  };

  const checkOutVietQr = async () => {
    try {
      const res = await CheckoutService.VietQrCheckoutCourse(checkoutTotal, selectedItems);
      const payUrl = res.data.payUrl;
      console.log(payUrl);
      window.location.href = payUrl;
    } catch (error) {
      console.error("Error occurred during checkout:", error);
    }                                     
  };

  return (
    <Layout>
      <div className="cart-wrapper py-10 m-5">
        <div className="container mx-auto">
          <div className="cart-pg-title mb-6">
            <h3 className="text-3xl font-semibold">Courses Cart</h3>
          </div>
          <div className="cart-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="cart-grid-left col-span-2">
              <div className="flex justify-between mb-6">
                <div className="cart-count-info text-lg font-medium">
                  <span className="font-bold">{wishlist.length}</span> Course{wishlist.length > 1 && 's'} in Wishlist
                </div>
                <button 
                  type="button" 
                  className="checkout-btn bg-purple-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-purple-700 transition px-3"
                  onClick={handleCheckoutAll}
                  disabled={selectedItems.length === 0}
                >
                  Clear All
                </button>
              </div>
              <div className="cart-items-list grid gap-4">
                {wishlist.map((course) => {
                  const { id } = course.course;
                  const isSelected = selectedItems.includes(id);
                  return (
                    <CartItem 
                      key={id} 
                      course={course.course} 
                      isSelected={isSelected} 
                      onToggleItem={() => handleToggleItem(id)} 
                    />
                  );
                })}
              </div>
            </div>
            <div className="cart-grid-right">
              <div className="cart-total bg-gray-100 p-6 rounded-lg shadow-md">
                <span className="block text-xl font-semibold mb-4">Total:</span>
                <div className="cart-total-value text-4xl font-bold mb-4">
                  <span className="text-sm font-light align-text-top">vnđ</span>{' '}
                  {checkoutTotal.toLocaleString('en-US')}
                </div>
               
                <button type="button" className="checkout-btn w-full bg-purple-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-purple-700 transition" 
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal setOpenModal={setIsModalOpen}>
          <div className="title text-2xl font-bold mb-4">
            <h1>Confirm Checkout</h1>
          </div>
          <div className="body text-sm mb-4 leading-8">
            <p>Are you sure you want to checkout the selected items?</p>
          </div>
          <div className="footer gap-10 flex">
            <img 
              src={momoImage} 
              alt="momo" 
              className="w-32 h-32 cursor-pointer" 
              onClick={checkOutMomo}
            />
            <img 
              src={vietQrImage} 
              alt="vietqr" 
              className="w-32 h-32 cursor-pointer" 
              onClick={checkOutVietQr}
            />
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Checkout;
