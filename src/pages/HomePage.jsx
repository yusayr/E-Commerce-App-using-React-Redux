import { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import Content from "../components/Content";
import CartBar from "../components/CartBar";
import Checkout from "./Checkout";

export const HomePage = ({ selectedCategory, setSelectedCategory }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);

  return (
    <div>
      <SearchBox />
      <Content
        selectedCategory={selectedCategory}
        openCart={openCart}
      />
      <CartBar
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        onCheckout={() => setIsOrdersOpen(true)}
      />
      {isOrdersOpen && (
        <Checkout onClose={() => setIsOrdersOpen(false)} />
      )}
    </div>
  );
};