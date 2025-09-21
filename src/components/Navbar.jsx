import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { logout } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setCategory } from "../store/searchSlice"; // <-- Import action

function Navbar({ selectedCategory, setSelectedCategory, toggleCart }) {
  const categories = ["All", "Clothes", "Electronics", "Furniture", "Miscellaneous"];
  const items = useSelector((state) => state.cart.items);
  const cartCount = items.length;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isOrdersActive = location.pathname === "/MyOrders";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-end justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-400">
      {/* Left */}
      <div className="flex items-end space-x-4 md:space-x-6">
        <h1
          className="text-lg md:text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Shopi
        </h1>
        <ul className="flex space-x-3 md:space-x-6 text-gray-600 font-medium text-sm md:text-base">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => {
                dispatch(setCategory(category)); // Reset search and results
                setSelectedCategory(category);   // Update selected category state
                if (isOrdersActive) navigate("/home");
              }}
              className={`cursor-pointer hover:text-gray-900 relative pb-1 ${
                selectedCategory === category && !isOrdersActive ? "text-gray-900" : ""
              }`}
            >
              {category}
              {selectedCategory === category && !isOrdersActive && (
                <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-gray-900 rounded"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-6 text-gray-700 font-medium text-sm md:text-base">
        <span className="hidden md:inline text-sm md:text-base">
          userintheapp@test.com
        </span>

        <div className="relative cursor-pointer" onClick={() => navigate("/MyOrders")}>
          <span className={`pb-1 ${isOrdersActive ? "text-gray-900" : "hover:text-gray-900"}`}>
            My Orders
          </span>
          {isOrdersActive && (
            <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-gray-900 rounded"></span>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <span
            className="cursor-pointer hover:text-gray-900"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            My Account
          </span>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 md:space-x-2 cursor-pointer" onClick={toggleCart}>
          <FaShoppingCart size={18} className="md:w-6 md:h-6" />
          <span className="text-base md:text-lg font-medium">{cartCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
