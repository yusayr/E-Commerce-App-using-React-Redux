import { useDispatch, useSelector } from "react-redux";
import { setQuery, setResults } from "../store/searchSlice";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setResults(query.trim())); 
    }
  };

  return (
    <div className="w-full max-w-sm mt-5 mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        onKeyDown={handleKeyPress}
        placeholder="Search a Product"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
      />
    </div>
  );
};
