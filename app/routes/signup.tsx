import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormessage, seterrormessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home", { replace: true });
      } else {
        setAuthChecking(false);
      }
    });

    return unsubscribe;
  }, [navigate]);

  async function handleSignup() {
    seterrormessage(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home", { replace: true });
    } catch (error) {
      seterrormessage("Could not create account. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  }

  if (authChecking) {
    return null;
  }

  return (
    <div className="login-container">
      <h1>To-Do App</h1>
      <h2>Welcome to SignUp!</h2>
      <input
        type="email"
        placeholder="me@gmail.com"
        className="login-input"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="login-input"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {errormessage && (
        <p className="inline-error-message">{errormessage}</p>
      )}
      <button
        onClick={handleSignup}
        className="login-btn"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
