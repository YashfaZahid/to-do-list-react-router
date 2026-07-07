import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authFetch } from "../lib/api";
import { auth } from "../lib/firebase";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

function Home() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setReady(false);
        navigate("/login", { replace: true });
        return;
      }

      setReady(true);
      loadTodos();
    });

    return unsubscribe;
  }, [navigate]);

  async function loadTodos() {
    const res = await authFetch("/todos");

    if (res.status === 401) {
      navigate("/login", { replace: true });
      return;
    }

    const data = await res.json();
    setTodos(data);
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/login", { replace: true });
  }

  async function handleAddTodo() {
    if (!input.trim()) return;

    const res = await authFetch("/todos", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });

    if (!res.ok) return;

    const newTodo = await res.json();

    setTodos([...todos, newTodo]);
    setInput("");
  }

  async function handleDelete(id: string) {
    const res = await authFetch(`/todos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return;

    setTodos(todos.filter((todo) => todo._id !== id));
  }

  async function handleToggle(todo: Todo) {
    const res = await authFetch(`/todos/${todo._id}`, {
      method: "PUT",
      body: JSON.stringify({
        text: todo.text,
        completed: !todo.completed,
      }),
    });

    if (!res.ok) return;

    const updated = await res.json();

    setTodos(todos.map((t) => (t._id === updated._id ? updated : t)));
  }

  if (!ready) {
    return null;
  }

  return (
    <div className="app-container">
      <h1>My Tasks</h1>

      <div className="row-container">
        <input
          className="task-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />

        <button className="add-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <div className="tasks-full-container">
        {todos.map((todo) => (
          <div key={todo._id} className="task-container row-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />

            <div id="task-content">{todo.text}</div>

            <FontAwesomeIcon
              icon={faTrash}
              className="delete-icon"
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        ))}
      </div>

      <button className="login-btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
