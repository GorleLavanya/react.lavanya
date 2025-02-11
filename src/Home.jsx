import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";

function Home()
{
    // Memoized selector to get all items
const selectAllItems = createSelector(
    (state) => state.products, // Input selector to get products from state
    (products) => {
      return {
        veg: products?.veg || [],               // Fallback to empty array if undefined
        nonveg: products?.nonVeg || [],
        milk: products?.milk || [],

        all: [
          ...(products?.veg || []),
          ...(products?.nonVeg || []),
          ...(products?.milk || []),
          
          
        ], // Combine all categories into one array
      };
    }
  );
  
  
    const dispatch = useDispatch();

    // Use memoized selector
  const allItems = useSelector(selectAllItems);

  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("all"); // Default category: Show all items

  // Filter items based on search and category
  const filteredItems = (allItems[category] || []).filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  
  return (
    <div className="container">
      <h2>🏠 Welcome to Our Store 🛍</h2>

      {/* Search and Filter Section */}
      <div className="search-filter">
        {/* Search Input */}
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          
          placeholder="🔍 Search for items..."
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Items</option>
          <option value="veg">Veg 🥦</option>
          <option value="nonveg">NonVeg 🍗</option>
          <option value="milk">Milk 🥛</option>
        </select>
        </div>

       {/* Display Items */}
       <div className="product-list">
           {filteredItems.length > 0 ? (
             filteredItems.map((item, index) => (
                <div key={index} className="product-card">
             <div>
              <img
                  src={item.image || "placeholder.jpg"}
                  alt={item.name}
                  style={{ width: "150px", height: "150px" }}
          />
               <div>
                <h5 >{item.name}</h5>
                <p >₹{item.price}</p>
                <button
              onClick={() => dispatch(addToCart(item))}
              
            >
              🛒 Add to Cart
            </button>
          </div>
          </div>
            </div>
          ))
        ) : (
          <p className="no-items">No items found.</p>
        )}
      </div>
    </div>
  );
}
export default Home;
    
  