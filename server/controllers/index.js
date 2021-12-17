const getBodyData = require("../utils/get-body-data.js");
const TodosService = require("./../services/todo-service.js");
const { v4: uuid } = require("uuid");

// ! Read
const getTodos = async (req, res) => {
  try {
    const todos = await TodosService.getAll();
    res.statusCode = 200;
    res.end(JSON.stringify(todos));
  } catch (error) {
    console.log(error);
  }
};

const getOneTodo = async (req, res) => {
  try {
    const id = req.url.split("/")[2];

    const todo = await TodosService.getById(id);

    if (!todo) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Todo not found" }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify(todo));
    }
  } catch (error) {
    console.log(error);
  }
};

// ! Create
const createTodo = async (req, res) => {
  try {
    const body = await getBodyData(req);
    const { title, discription } = JSON.parse(body);

    const newTodo = {
      title,
      discription,
      id: uuid(),
    };

    res.statusCode = 201;

    const createdTodo = await TodosService.create(newTodo);

    req.end(JSON.stringify({ message: "Successfully created", createdTodo }));
  } catch (error) {
    console.log(error);
  }
};

// ! Update
const updateTodo = async (req, res) => {
  try {
    const id = req.url.split("/")[3];

    const todo = await TodosService.getById(id);
    if (!todo) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Todo not found" }));
    } else {
      const body = await getBodyData(req);

      let { title, description } = JSON.parse(body);

      title = title || todo.title;
      description = description || todo.description;

      const updatedTodo = await TodosService.update(id, { title, description });
      res.end(JSON.stringify({ message: " Todo was updated", updatedTodo }));
    }
  } catch (error) {
    console.log(error);
  }
};

// ! Delete
const deleteTodo = async (req, res) => {
  try {
    const id = req.url.split("/")[2];

    const todo = await TodosService.getById(id);

    if (!todo) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Todo not found" }));
    } else {
      await TodosService.deleteOne(id);
      res.end(JSON.stringify({ message: `Todo with id: ${id} was deleted` }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTodos,
  getOneTodo,
  deleteTodo,
  createTodo,
  updateTodo,
};
