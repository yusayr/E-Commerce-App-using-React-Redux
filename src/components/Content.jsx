import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import ProductDetails from "./ProductDetails";

function Content({ selectedCategory, openCart }) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { results } = useSelector((state) => state.search); // ONLY use results
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  // 1️⃣ Filter by selected category
  const categoryFilteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (product) =>
            product.category.name.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  // 2️⃣ Filter by search results ONLY if Enter was pressed
  const searchFilteredItems =
    results !== null && results.trim() !== ""
      ? categoryFilteredItems.filter((product) =>
          product.title.toLowerCase().includes(results.toLowerCase())
        )
      : categoryFilteredItems;

  return (
    <>
      {searchFilteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {searchFilteredItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openCart={openCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-500">No items found</p>
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}

export default Content;
