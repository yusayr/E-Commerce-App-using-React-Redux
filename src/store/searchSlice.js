// src/store/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  results: null,
  selectedCategory: "All",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      // Reset search when category changes
      state.query = "";
      state.results = null;
    },
    resetSearch: (state) => {
      state.query = "";
      state.results = null;
    },
  },
});

export const { setQuery, setResults, setCategory, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
