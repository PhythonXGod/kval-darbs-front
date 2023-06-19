import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from 'react-icons/bs';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchTerm("");
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/products", {
        params: { searchTerm },
      });

      const productIds = response.data.map((product) => product._id);


      const categoryResponse = await axios.get("/api/categories", {
        params: { productIds },
      });
      const categoryData = categoryResponse.data;


      const productsWithCategory = response.data.map((product) => {
        const category = categoryData.find((category) => category._id === product.category);
        return { ...product, category };
      });

      setSearchResults(productsWithCategory);
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div ref={searchBoxRef} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Meklēt"
        className="px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
      >
        <BsSearch />
      </button>

      {searchResults.length > 0 && (
        <div className="absolute top-full w-full bg-white shadow-lg rounded-lg mt-2">
          {searchResults.map((product) => (
            <Link key={product._id} href={/product/+product._id} legacyBehavior>
              <a onClick={handleResultClick}>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-500">{product.description}</p>
                  <p className="text-gray-700">Cena: €{product.price}</p>
                  <p className="text-gray-700">Kategorija: {product.category.name}</p>
                  <img src={product.images} className="h-24 w-24 rounded-md" alt="Product" />
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;





