const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser")
const uuid = require("uuid");
const cors = require("cors")
const connectDB = require("./db"); 
const Todo = require("./model");

// Middilewares
app.use(bodyparser.json());
app.use(cors())
const tools =[

{
    id:1,
    desc: "write python code",
    completed: false,
},
{
    id:2,
    desc: "write python code",
    completed: true,
},

];

//GET,POST,PUT,DELETE,PATCH

app.get("/", (req,res,next) => {
    res.send("<h1>Todo List Home Page</h1>");
});
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/todos/:id",(req, res) => {
    console.log(req,params.id);
    let todo = tools.filter((todo) => 
        todo == req.params.id);
    res.json([]);
});

app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

connectDB();

app.listen(port, () => {
    console.log("App is listening in PORT:" , port);
});

