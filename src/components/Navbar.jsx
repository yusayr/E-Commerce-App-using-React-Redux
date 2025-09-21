import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { logout } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setCategory } from "../store/searchSlice"; 

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
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-400 px-4 py-2 sm:px-6 sm:py-3">

      {/* mobile view */}
      <div className="flex flex-col sm:hidden">
        <div className="flex justify-between items-center mb-2">
          <h1
            className="text-xl font-bold text-gray-800 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Shopi
          </h1>

          <div className="flex items-center space-x-4">
            <div className="cursor-pointer text-xs" onClick={() => navigate("/MyOrders")}>
              My Orders
            </div>

            <div className="relative" ref={dropdownRef}>
              <span
                className="cursor-pointer hover:text-gray-900 text-xs"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                My Account
              </span>
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-xs">
                  <ul className="py-2 text-gray-700">
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

            <div className="flex items-center space-x-1 cursor-pointer" onClick={toggleCart}>
              <FaShoppingCart className="w-3.5 h-3.5 cursor-pointer" />
              <span className="text-sm font-medium">{cartCount}</span>
            </div>
          </div>
        </div>

        
        <ul className="flex flex-wrap space-x-2 text-gray-600 font-medium text-sm overflow-x-auto">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => {
                dispatch(setCategory(category));
                setSelectedCategory(category);
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

      {/* desktop view */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        {/* Left: Shopi + Categories */}
        <div className="flex items-center space-x-6">
          <h1
            className="text-2xl font-bold text-gray-800 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Shopi
          </h1>
          <ul className="flex space-x-6 text-gray-600 font-normal text-base">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  dispatch(setCategory(category));
                  setSelectedCategory(category);
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

        {/* Right side */}
        <div className="flex items-center space-x-6 text-gray-700 font-medium text-base">
          <span className="text-base truncate max-w-[150px]">
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
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm">
                <ul className="py-2 text-gray-700">
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

          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleCart}>
            <FaShoppingCart className="w-4.5 h-4.5 md:w-6 md:h-6 cursor-pointer" />
            <span className="text-lg font-medium">{cartCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
