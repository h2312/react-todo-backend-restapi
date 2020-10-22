const http = require('http');
const {getTodos, getTodo, createTodo, updateTodo, deleteTodo} = require ('./controllers/todoController');

const server = http.createServer((req, res) => {
    if(req.url === '/api/todos' && req.method === 'GET') {
        getTodos(req, res);
    }
    else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getTodo(req,res, id);
    } 
    else if (req.url === '/api/todos' && req.method === 'POST') {
        createTodo(req, res);
    }
    else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateTodo(req, res, id);
    }
    else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteTodo(req, res, id);
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route Not Found !'}))
    }
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))