import { Link, redirect } from "react-router";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

export const clientLoader=async()=> {
    if(localStorage.getItem("user_session_id")){
        throw redirect("/home")
    }
    else{
        return null;
    }
}

function Login() {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential);
      localStorage.setItem("user_session_id","test-token-12345")
      console.log("navigate");
      navigate("/home");
      console.log("navigate called");
    } catch (err: any) {
      console.log(err);
      if (err.code === "auth/invalid-credential") {
        setErrorMessage("Invalid email or password. Please try again.");
      }
      else {
    setErrorMessage("An unexpected error occurred.");
  }
    }
  }

  return (
    <div className="login-container">
      
      <h1>To-Do App</h1>
      <h2>Welcome to Login!</h2>
      <input
        type="email"
        placeholder="me@gmail.com"
        className="login-input"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="login-input"
        onChange={(e) => setpassword(e.target.value)}
      />
      {errorMessage && (
  <p className="inline-error-message">
    {errorMessage}
  </p>
)}
      <button onClick={handleLogin} className="login-btn">
        Login
      </button>
      <p>Don't have an account?</p>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}
export default Login;
