import React, {useContext, useState} from 'react';


export const SearchContext = React.createContext('');
export const SearchUpdateContext = React.createContext({} as any);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useSearchUpdate = () =>{
  return useContext(SearchUpdateContext);
};
type Props = {
  children: JSX.Element | undefined;
};

const SearchProvider = ({children}: Props) => {
  const [search, setSearch] = useState('');

  const update = (newSearch: string) =>{
    setSearch(newSearch);
  };

  return (
    <SearchContext.Provider value={search}>
      <SearchUpdateContext.Provider value= {update}>
        {children}
      </SearchUpdateContext.Provider>
    </SearchContext.Provider>
  );
};

export default SearchProvider;
