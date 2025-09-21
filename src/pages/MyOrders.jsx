import React from "react";
import { useSelector } from "react-redux";

export const MyOrders = () => {
  const { orders } = useSelector((state) => state.orders);

  if (orders.length === 0)
    return (
      <p className="p-6 text-center">No orders placed yet.</p>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Order History</h1>
      {orders.map((order, index) => (
        <div key={index} className="mb-8 rounded-md p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Order #{index + 1}</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 bg-gray-50 rounded-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
                <span className="text-sm font-semibold">
                  ${item.price} x {item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};