const Todo = require("../models/todoModel");
const { getPostData } = require("../utils");

// @desc Gets all todos
// @route GET /api/todos
async function getTodos(req, res) {
  try {
    const todos = await Todo.findAll();

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));

  } catch (error) {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Cannot add todo'}))
    console.log(error);
  }
}

// @desc Get single todo
// @route GET /api/todo/:id
async function getTodo(req, res, id) {
    try {
        const todo = await Todo.findById(id);
        if(!todo) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Todo not found!'}))

        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(todo))
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc Create todo
// @route POST /api/todos
async function createTodo(req, res) {
    try {
        const body = await getPostData(req);
        const {name, completed} = JSON.parse(body);
        const todo = {
            name,
            completed
        }
        const newTodo = await Todo.create(todo);

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.writeHead(201, {'Content-Type':'application/json'})
        return res.end(JSON.stringify(newTodo));
    } catch (error) {
        console.log(error);
    }
}

// @desc Update a todo
// @route PUT /api/todo/:id
async function updateTodo (req, res, id){
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Todo not found!'}))
        } else {
            const body = await getPostData(req);
            const {name, completed} = JSON.parse(body);
            const todoData = {
                name: name || todo.name,
                completed: completed || todo.completed
            }

            const updTodo = await Todo.update(id, todoData);

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            res.writeHead(200, {'Content-Type':'application/json'})
            return res.end(JSON.stringify(updTodo));
        }
    } catch (error) {
        console.log(error);
    }
}

// @desc Delete todo
// @route DELETE /api/todo/:id
async function deleteTodo(req, res, id){
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Todo not found!'}))
        } 
        else {
            await Todo.remove(id);
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({message: `Todo ${id} removed.`}))
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}