const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("localhost:40000", grpc.ServerCredentials.createInsecure());

const todos = [];
const createTodo = (call, callback) => {
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(todoItem);
  callback(null, todoItem);
};

const readTodos = (call, callback) => {
  callback(null, { items: todos });
};

const call = client.readTodosStream();
call.on("data", (data) => {
  console.log(data);
});
call.on("end", () => {
  console.log("end");
});

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

server.start();
