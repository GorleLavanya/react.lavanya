import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { useState } from "react";
import "./NonVeg.css";  // Ensure the path is correct


function NonVeg()
    {  
        let dispatch=useDispatch()
        
        let NonVegItems= useSelector(state=>state.products.nonVeg)

    // State for checkboxes
    const [below100, setBelow100] = useState(false);
    const [above100, setAbove100] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Pagination state
    const [pagenumber, setPagenumber] = useState(1);
    const perPage = 3;

    // Filter function based on checkboxes
    let filteredItems = NonVegItems.filter(item => {
        if (below100 && above100) return true; // If both are selected, show all
        if (below100) return item.price < 100;
        if (above100) return item.price >= 100;
        return true; // Show all if nothing is selected
    }).filter(item => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))

       // Calculate total pages (always round up)
    let totalPages = Math.ceil(filteredItems.length / perPage);

    // Pagination logic (apply to filteredItems, NOT vegItems)
    let pageEndItemIndex = perPage * pagenumber;
    let pageStartItemIndex = pageEndItemIndex - perPage;
    let currentItems = filteredItems.slice(pageStartItemIndex, pageEndItemIndex);
    // Handle page change
    let handlePage = (page) => {
        setPagenumber(page);
        }
    
return(
    <>
    <div className="nonveg-container">
    <h1>NonVegItems....</h1>
        {/* Checkbox filters */}
        <div className="filter-container">
        <label>
        <input 
            type="checkbox" 
            checked={below100} 
            onChange={() => setBelow100(!below100)} 
        />
             Below $100
        </label>
            
        <label>
            <input 
             type="checkbox" 
             checked={above100} 
             onChange={() => setAbove100(!above100)} 
            />
            Above $100
        </label>
        </div>
        {/* Search Input */}
        <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search non-veg items..."
                />
            </div>
            <div className="nonveg-list">
                {filteredItems.length > 0 ? (
                    <ul>
                        {currentItems.map((item, index) => (
                            <li key={index} className="nonveg-item">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="nonveg-image"
                                    width="100"
                                />
                                {item.name} - ${item.price}
                                <button onClick={() => dispatch(addToCart(item))}>
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No  NonVeg Items Available</p>
                )}
                </div>

         {/* Pagination Controls */}
           <div className="pagination">
                <button onClick={() => handlePage(pagenumber - 1)} disabled={pagenumber === 1}>Previous</button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button  onClick={() => handlePage(index + 1)}>
                   {index + 1}
               </button>
           ))}
              <button onClick={() => handlePage(pagenumber + 1)} disabled={pagenumber === totalPages}> Next</button>
            </div>
          </div>
        </>
        )
    };
    export default NonVeg;