// SearchContext.js

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchGlobally = () => {
  return useContext(SearchContext);
};

export { SearchContext, SearchProvider, useSearchGlobally };
