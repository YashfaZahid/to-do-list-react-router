import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/firebase";

function Login() {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  async function handleLogin() {
    setErrorMessage(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage("Invalid email or password.");
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
      <h2>Welcome to Login!</h2>
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
      {errorMessage && (
        <p className="inline-error-message">{errorMessage}</p>
      )}
      <button
        onClick={handleLogin}
        className="login-btn"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>Don't have an account?</p>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Login;
