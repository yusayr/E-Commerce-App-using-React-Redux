import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { orders } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  if (orders.length === 0) return <p className="p-6">No orders placed yet.</p>;

  const lastOrder = orders[orders.length - 1];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Order</h1>

        <div className="space-y-4">
          {lastOrder.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-lg" />
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-lg font-semibold">${item.price} x {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-lg font-bold flex justify-between">
          <span>Total:</span>
          <span>${lastOrder.total.toFixed(2)}</span>
        </div>

        <p className="mt-4 text-green-600 font-semibold">Order placed successfully!</p>

        
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/MyOrders")}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md shadow-lg hover:bg-gray-700 transition-colors"
          >
            Continue to My Orders
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;