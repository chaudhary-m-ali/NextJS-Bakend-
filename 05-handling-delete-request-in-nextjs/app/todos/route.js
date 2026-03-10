import React from "react";
import todos from "../../todos.json" with { type: "json" };
import { writeFile } from "node:fs/promises";
console.log("Loaded todos:", todos);
export const GET = (abc) => {

  return Response.json(todos);
};
export const POST = async (request) => {
  console.log("request object",request)
const todo = await request.json(); 
console.log("Received todo:", todo);
const newTodo = {
  id:crypto.randomUUID(),
  text:todo.text,
  completed:false,
};
todos.push(newTodo); 
  await writeFile("todos.json",JSON.stringify(todos,null,2))
  return Response.json(newTodo); 
}; 