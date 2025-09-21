import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductCard({ product, openCart, onSelect }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    if (openCart) openCart();
  };

  return (
    <div
      className="bg-white transition p-3 md:p-4 flex flex-col relative cursor-pointer 
                 w-56 md:w-64 mx-auto"
      onClick={() => onSelect(product)} 
    >
      <div className="w-full h-48 relative rounded-md overflow-hidden mb-3">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="object-contain md:object-cover w-full h-full rounded-md"
        />

        <span
          onClick={handleAdd}
          className="absolute top-2 right-2 bg-white text-black p-1.5 md:p-2 rounded-full flex items-center justify-center cursor-pointer shadow"
        >
          <IoMdAdd size={18} />
        </span>

        <div className="absolute bottom-2 left-2 bg-white/40 text-black text-[10px] md:text-sm px-1.5 py-0.5 rounded">
          {product.category.name}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between space-x-2">
        <span className="flex-1 text-[11px] md:text-sm text-gray-700 break-words line-clamp-2">
          {product.title}
        </span>
        <span className="text-sm md:text-lg font-bold text-gray-900 whitespace-nowrap">
          ${product.price}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
