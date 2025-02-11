import { useSelector } from "react-redux";
import "./Orders.css";  // Ensure the path is correct

//get the purchase Objects in Oders
function Orders()
    { 
        //Get the Purchase history from Store
        const purchaseHistory=useSelector(state=>state.purchaseDetails);
        //convert the above object into List items
        let finalData=purchaseHistory.map((item,index)=>(
            <div key={index}>
                {/*date &totalprice directly calling*/}
             <p>Date:{item.date}</p>
             <p>TotalAmount:${item.totalPrice.toFixed(2)}</p>
            
            {/*all items are reading use Map */}
            <ul>
                {item.items.map((product)=>(
                  <li>
                  {product.name} - ${product.price} x {product.quantity}
                  </li>
            ))}
            </ul>
            </div>
            ))
        
        //dispaly the data in browser
        return(
            <>
            <div className="orders-container">
            {purchaseHistory.length>0?
                <div>
                <h1>Purchase History</h1>
                <ol className="orders-list">{finalData}</ol>
                </div>
            :
            <p className="empty-message"> No purchase History Avaliable</p>
            }
        </div>
       </>
            
        );
    }
    export default Orders;