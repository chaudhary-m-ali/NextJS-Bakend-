import todos from "../../../todos";
import { writeFile } from "node:fs/promises";
export const GET = async (_, { params }) => {
  const { id } = await params;
  const todo = todos.find((todo) => id === todo.id.toLocaleString());
  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  return Response.json(todo);
};

export const PUT = async (request, { params }) => {
  const { id } = await params;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  const todo = todos[todoIndex];

  const editedTodoData = await request.json();
  if (editedTodoData.id) {
    return Response.json(
      { error: "Changing ID is not allowed" },
      { status: 403 },
    );
  }
  console.log("editedTodoData:", editedTodoData);
  const editedTodo = {
    ...todo,
    ...editedTodoData,
  };
  todos[todoIndex] = editedTodo;
  await writeFile("todos.json", JSON.stringify(todos, null, 2));
  return Response.json(editedTodo);
};
export const DELETE = async (_, { params }) => {
  const { id } = await params;
  const todoIndex = todos.findIndex((todo) => id === todo.id.toLocaleString());
  todos.splice(todoIndex, 1);
  await writeFile("todos.json", JSON.stringify(todos, null, 2));

  return new Response(null, { status: 204 });
};
