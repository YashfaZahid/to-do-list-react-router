const BASE_URL = "https://to-do-api-production-a194.up.railway.app/todos";

export async function getTodos(userId: string) {
  const res = await fetch(`${BASE_URL}?userId=${userId}`);
  return res.json();
}

export async function addTodo(title: string, userId: string) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
      headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify({
      title,
      completed: false,
      userId,
    }),
  });

  return res.json();
}

export async function deleteTodo(id: number) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function updateTodo(todo: any) {
  console.log("Updating:", todo);
  const res = await fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
      headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  console.log(data);

  return data;
}
