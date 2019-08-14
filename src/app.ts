import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

interface Todo {
  id: number;
  title: string;
  createdAt: string;
  done: boolean;
}

interface TodoMap {
  [id: number]: Todo;
}

type NewTodo = Omit<Todo, "id">;

const todos: TodoMap = {
  1: {
    id: 1,
    title: "Learn Elixir",
    createdAt: "2019-07-04",
    done: false
  },
  2: {
    id: 2,
    title: "Get milk",
    createdAt: "2019-07-06",
    done: true
  }
};

let nextId = 3;

const updateTodos = todo => {
  todos[todo.id] = todo;
};

const newTodo = (data: NewTodo) => {
  const todo = { ...data, id: nextId };
  updateTodos(todo);
  nextId++;
  return todo;
};

const deleteTodo = id => {
  delete todos[id];
};

app.get("/api/todos", (req, res) => {
  res.json(Object.values(todos));
});

app.post("/api/todos", (req, res) => {
  const data: NewTodo = req.body;
  const todo = newTodo(data);
  res.json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo: Todo = req.body;
  updateTodos(todo);
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  deleteTodo(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
