import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { HomePage } from './pages/HomePage';
import Checkout from './pages/Checkout';
import { MyOrders } from './pages/MyOrders';
import Navbar from './components/Navbar';
import CartBar from './components/CartBar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { auth } from './firebase';
import { useLocation } from "react-router-dom";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const location = useLocation();

  const hideNavbar = ["/signin", "/signup", "/"];
  const showNavbar = currentUser && !hideNavbar.includes(location.pathname);

  return (
    <Router>
      {showNavbar && (
        <>
          <Navbar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            toggleCart={() => setIsCartOpen((prev) => !prev)}
          />
          <CartBar
            isOpen={isCartOpen}
            setIsOpen={setIsCartOpen}
          />
        </>
      )}

      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={currentUser ? <HomePage selectedCategory={selectedCategory} /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/checkout"
          element={currentUser ? <Checkout /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/myorders"
          element={currentUser ? <MyOrders /> : <Navigate to="/signin" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
