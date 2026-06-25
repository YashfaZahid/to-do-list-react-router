import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../lib/todos";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function loadTodos() {
      const user:any = auth.currentUser;
      if (!user) {
        navigate("/login");
}
      const data = await getTodos(user.uid);
      setTodos(data);
      console.log(data)
    }
    loadTodos();
  }, []);

  async function handleAddTodo() {
    if (!input.trim()) return;
    const user = auth.currentUser;
    if (!user) return;
    const newTodo = await addTodo(input, user.uid);
    setTodos([...todos, newTodo]);
    setInput("");
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  async function handleToggle(todo: any) {
    const updatedTodo = {...todo,completed:(todo.completed==true?false:true),};
    await updateTodo(updatedTodo);
    setTodos(todos.map((t) => (t.id===todo.id?updatedTodo:t)));
  }


  return (
    <div className="app-container">
      <h1>My Tasks</h1>
      <div className="row-container">
          <input value={input} className="task-input"
        onChange={(e) => setInput(e.target.value)} placeholder="new task..." />
          <button onClick={handleAddTodo} className="add-btn">Add</button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="task-container row-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo)}
          />
          <div id="task-content">{todo.title}</div>
          <button onClick={() => handleDelete(todo.id) } className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  );
}
export default Home;
