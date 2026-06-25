import { useState } from "react";
import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router";
function Signup(){
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    // const [username,setusername]=useState("")
     const navigate=useNavigate()

    async function handleSignup() {
       
        try{
            const userCredentials=await createUserWithEmailAndPassword(auth,email,password)
            console.log(userCredentials)
            alert("user created")
            navigate("/login")
            }
            
        catch(err:any){
            if (err.code === "auth/email-already-in-use") {
              alert("Account already in use!");
            } else if (err.code === "auth/invalid-credential") {
              alert("Invalid email or password.");
            }else if(err.code==="auth/weak-password"||err.code==="auth/missing-password"){
                alert("password must contain atleast 6 charaters")
            } 
            else {
              alert(err.message); 
            }
        }
    }

    return(
        <div className="login-container">
            <h1>To-Do App</h1>
            <h2>Welcome to SignUp!</h2>
            <input type="email"
            placeholder="me@gmail.com"
            className="login-input"
            onChange={(e)=>setemail(e.target.value)} />
            <input type="password" 
            placeholder="password"
            className="login-input"
            onChange={(e)=>setpassword(e.target.value)}/>
            <button onClick={handleSignup} className="login-btn">Signup</button>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </div>
    )
}
export default Signup;
