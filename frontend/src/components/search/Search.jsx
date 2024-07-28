import React, { useEffect, useState } from 'react';
import '../search/search.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSearchGlobally } from '../../context/SearchContext';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons library

const Search = () => {
  const { searchQuery, setSearchQuery } = useSearchGlobally();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='searchBars'>
          <Skeleton height={40} width={180} className='searchSkeleton' />
        </div>
      ) : (
        <div className='searchBar'>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type='text'
            name='search'
            id='search'
            placeholder='Search By Address...'
          />
          <FaSearch className='searchIcon' />
        </div>
      )}
    </>
  );
};

export default Search;
