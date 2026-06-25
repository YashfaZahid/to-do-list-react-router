import { Link, redirect } from "react-router";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

function Login() {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential);
      console.log("navigate");
      navigate("/home");
      console.log("navigate called");
    } catch (err: any) {
      console.log(err);
      if (err.code === "auth/invalid-credential") {
        alert("invalid credentials");
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
      <button onClick={handleLogin} className="login-btn">
        Login
      </button>
      <p>Don't have an account?</p>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}
export default Login;
