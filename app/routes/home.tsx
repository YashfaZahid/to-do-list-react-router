import { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../lib/todos";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router";
import { redirect,useLoaderData } from "react-router";
import { onAuthStateChanged } from "firebase/auth";


function getFirebaseUser(): Promise<any>{
    return new Promise((resolve)=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            unsubscribe();
            resolve(user);
        })
    })
}

export const clientLoader=async()=> {
    if(!localStorage.getItem("user_session_id")){
        throw redirect("/")
    }
    const user = await getFirebaseUser();
    if (!user) {
    localStorage.removeItem("user_session_id"); 
    throw redirect("/"); 
  }
   
const res = await getTodos(user.uid);
  return res; 
    
}

clientLoader.hydrate = true;
// export const loader=async()=>{
//   const user=auth.currentUser
//   const data=getTodos(user.uid)
// }

function Home() {
  const navigate = useNavigate();
  const initialTodos=useLoaderData<typeof clientLoader>() 
  const [todos, setTodos] = useState<any[]>(initialTodos || []);
  const [input, setInput] = useState("");




function handleLogout(){
  localStorage.removeItem("user_session_id")
  navigate("/")
}

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
      <button className="login-btn logout-btn" onClick={handleLogout}>LogOut</button>
    </div>
  );
}
export default Home;
