import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store";

function Logins()
{ 
    let username=useRef(null);
    let password=useRef(null);

    let dispatch=useDispatch();
    let navigate=useNavigate();

    let LoginCheck=()=>{
        if(username.current.value=== "lavanya"&&password.current.value==="lavanya@123"){
            dispatch(login(username.current.value))
            navigate("/home");
        }
        else{
            alert("your credentials wrong.Check once!");
        }
    }
    return(
      <>
      <h1>Login Page</h1>
      <label>UserName:</label>
      <input type='text' ref={username}/>
      <br/><br/>
      <label>Password:</label>
      <input type='password' ref={password}/>
      <br/><br/>
      <button style={{backgroundColor:'green'}}onClick={LoginCheck}>Login</button>
      </>
    )
}
export default Logins;