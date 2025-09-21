import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, clearCart } from "../store/cartSlice";
import { addOrder } from "../store/orderSlice";
import { IoMdAdd } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CartBar({ isOpen, setIsOpen }) {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    dispatch(addOrder({ items: [...items], total }));
    dispatch(clearCart());
    setIsOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="w-72 md:w-80 fixed bottom-0 md:top-16 md:bottom-0 right-0 bg-white shadow-lg p-3 md:p-4 flex flex-col z-40 border rounded-sm max-h-[70vh] md:max-h-full text-sm md:text-base">
      <div className="flex justify-between items-center mb-2 md:mb-4">
        <h1 className="text-base md:text-lg font-bold">My Order</h1>
        <button onClick={() => setIsOpen(false)} className="animate-pulse cursor-pointer">
          <AiOutlineClose size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 md:space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-4 md:mt-10">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2 md:pb-3 gap-2 md:gap-3">
              <div className="flex items-center gap-2 md:gap-3">
                <img src={item.image} alt={item.title} className="w-16 h-20 md:w-20 md:h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-normal text-xs md:text-sm">{item.title}</p>
                  <p className="text-sm md:text-lg">${item.price}</p>
                  <div className="flex items-center gap-2 md:gap-3 mt-1">
                    <button onClick={() => dispatch(decrement(item.id))} className="px-2 py-1 rounded-md bg-red-200 cursor-pointer">
                      <GrSubtract size={16} />
                    </button>
                    <span className="bg-gray-300 px-2 md:px-3 rounded-md text-xs md:text-sm">{item.quantity}</span>
                    <button onClick={() => dispatch(increment(item.id))} className="px-2 py-1 rounded-md bg-green-200 cursor-pointer">
                      <IoMdAdd size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={() => dispatch(decrement(item.id))} className="animate-pulse cursor-pointer">
                <AiOutlineClose size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-2 md:mt-4 border-t pt-2 md:pt-3">
        <div className="flex justify-between font-semibold text-sm md:text-lg mb-2 md:mb-3">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} className="w-full bg-black text-white font-bold py-1.5 md:py-2 rounded cursor-pointer hover:bg-gray-800">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartBar;
