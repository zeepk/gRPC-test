const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

const text = process.argv[2];

client.createTodo(
  {
    id: -1,
    text,
  },
  (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  }
);

client.readTodos({}, (err, response) => {
  response.items.forEach((item) => {
    console.log(item);
  });
});
