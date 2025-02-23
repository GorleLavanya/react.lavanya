import { useDispatch, useSelector } from "react-redux";
import { addPurchaseDetails, clearCart, decrement, increment, remove } from "./store";
import { useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";


function Cart()
    { 
        let dispatch=useDispatch()
        const navigate = useNavigate(); // Hook for navigation
        //get the cart items from store
        let  carts=useSelector(state=>state.cart);
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Get auth state

        //convert the above object into List items
        let cartItems = carts.map((item, index) => (
          <li key={index} className="cart-item">
            {item.name} - {item.price}
            <button 
              className="increase-button" 
              onClick={() => dispatch(increment(item))}>+</button>
              <button className="increase-button" onClick={() => dispatch(decrement(item))}>-</button>
              <p> Quantity: {item.quantity}</p>
               <button onClick={() => dispatch(remove(item))}>Remove</button>
          </li>
        ));
        
         //Calculate the totalPrice
         const totalPrice=carts.reduce((sum,item)=> sum+item.quantity*item.price,0);
         //Set the Discount Percentage
         const [discountPercentage,setDiscountPercentage]=useState(0);
         //Calculate the Discount Amount
         const discountAmount=totalPrice*discountPercentage/100;
         
         // Take the state variable showDiscount set to false.
         let [showDiscount,setShowDiscount]=useState(false);

         //Take the Text box the Cupon code name
         let[couponCode,setCouponCode]=useState('');

         // Set the cuponCode DiscountPercentage
         let [couponCodeDiscountPer,setcouponCodeDiscountPer]=useState(0);
         let handlingCoupon=()=>{
            switch(couponCode.toUpperCase()){
                case 'RATAN10':setcouponCodeDiscountPer(10);
                  break;
                case 'RATAN20':setcouponCodeDiscountPer(20);
                  break;
                case 'RATAN30':setcouponCodeDiscountPer(30);
                  break;
                case 'RATAN40':setcouponCodeDiscountPer(40);
                  break;
                default:alert('Invalid couponcode');
                 setcouponCodeDiscountPer(0);
            }
         };
         

        //Calculate coupon Discount
        let couponCodeDiscountAmount=totalPrice*couponCodeDiscountPer/100;
        //Calculate the Final Amount
        const finalAmount=totalPrice-discountAmount-couponCodeDiscountAmount;

        //
        let handleCompletePurchase=()=>{
          if (!isAuthenticated) {
            navigate('/login'); // Redirect to login page if not authenticated
            return;
          }
          let purchaseDate=new Date().toLocaleDateString();
          let purchaseDetails={
            date:purchaseDate,
            items:[...carts],
            totalPrice:totalPrice
          };
          //send the object to store
          dispatch(addPurchaseDetails(purchaseDetails));

          //clear the cart
          dispatch(clearCart());
          alert('Purchase Completed Successfully!');

       }
         return(
            <>
            {carts.length>0?
            <div className="cart-container">
            <h1> This is Cart page </h1>
            <ol className="cart-items">{cartItems}</ol>
            <p className="total-price">your TotalPrice:${totalPrice.toFixed(2)}</p>
             
             {showDiscount &&
             <div className="discount-section">
            <p style={{color:"pink",fontFamily:"fantasy"}}>your Discount:{discountPercentage}%</p>
            <p style={{color:"red",fontFamily:"monospace"}}>your DiscountAmount:{discountAmount.toFixed(2)}</p>
             </div>
             }
            <p className="net-amount">your Net Amount:{finalAmount.toFixed(2)}</p>
            <div className="coupon-section">
            <input 
               type="text"
               value={couponCode}
               onChange={(e)=>setCouponCode(e.target.value)}
               placeholder="Enter your couponCode"
            /> 
             <button style={{color:"black",background:"orange"}} onClick={()=>handlingCoupon()}>Apply Coupon</button>
             </div>

             {couponCodeDiscountPer > 0 && (
            <div className="coupon-discount">
            <p>your CouponCode Appiled:{couponCode}</p>
            <p>your CouponCode Discount:{couponCodeDiscountAmount}</p>
            </div>
            )}
           <br/><br/>
            <button className="apply-discount"onClick ={()=>{setDiscountPercentage(10),setShowDiscount(true)}}>Appliy 10% Discount</button>
            <button  className="apply-discount" onClick={()=>{setDiscountPercentage(20),setShowDiscount(true)}}>Appliy 20% Discount</button>
            <button  className="apply-discount" onClick={()=>{setDiscountPercentage(30),setShowDiscount(true)}}>Appliy 30% Discount</button><br/><br/>

            <button className="complete-purchase" onClick={handleCompletePurchase}>Complete Purchase</button>
            </div>
            :
            <div className="empty-cart">
             <p>Your Cart is Empty</p>
            </div>
            }
             </>
        )
    }
    export default Cart;