import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { HomePage } from './pages/HomePage';
import Checkout from './pages/Checkout';
import { MyOrders } from './pages/MyOrders';
import Navbar from './components/Navbar';
import CartBar from './components/CartBar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { auth } from './firebase';

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

  return (
    <Router>
      <AppContent
        currentUser={currentUser}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
    </Router>
  );
}

function AppContent({ currentUser, selectedCategory, setSelectedCategory, isCartOpen, setIsCartOpen }) {
  const location = useLocation();

  const hideNavbar = ["/signin", "/signup", "/"];
  const showNavbar = currentUser && !hideNavbar.includes(location.pathname);

  return (
    <>
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
    </>
  );
}

export default App;
