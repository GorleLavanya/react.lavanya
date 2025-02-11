import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Cart from "./Cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import "./App.css"
import Milk from "./Milk";
import { useDispatch, useSelector} from "react-redux";
import "./Navbar.css"
import { logout } from "./store";
import Logins from "./Logins";
import '@fortawesome/fontawesome-free/css/all.min.css';

import NotFound from "./NotFount";





function App()
{ 
  const dispatch = useDispatch();
  const  carts=useSelector(state=>state.cart);
  const totalItems=carts.reduce((sum,item)=>sum+item.quantity,0);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  return(
    <>
    <BrowserRouter>
    <nav className="navbar">
    <Link to='/home' className="Linkstyle"><i class="fa-solid fa-house"></i>Home</Link>
    <Link to='/veg'className="Linkstyle"><i class="fa-solid fa-carrot"></i>Veg</Link>
    <Link to='/nonveg'className="Linkstyle"><i class="fa-solid fa-drumstick-bite"></i>NonVeg</Link>
    <Link to='/milk'className="Linkstyle"><i class="fa-solid fa-cow"></i>Milk</Link>
    <Link to='/cart'className="Linkstyle">Cart<i class="fa-solid fa-cart-shopping"></i><span>{totalItems}</span></Link>
    <Link to='/orders'className="Linkstyle"><i class="fa-brands fa-first-order"></i>Orders</Link>
    <Link to='/about'className="Linkstyle"><i class="fa-solid fa-address-card"></i>AboutUs</Link>
    <Link to='/contact'className="Linkstyle"><i class="fa-solid fa-address-book"></i>ContactUs</Link>
    

    <div>
        {isAuthenticated ? (
          <>
            <span className="welcome">Welcome, {user}!</span>
            <button onClick={() => dispatch(logout())} className="Logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="Login-btn">Sign In</Link>
        )}
      </div>
    </nav>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/veg" element={<Veg/>}/>
      <Route path="/nonveg" element={<NonVeg/>}/>
      <Route path="/milk" element={<Milk/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
      <Route path="/login" element={<Logins/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;