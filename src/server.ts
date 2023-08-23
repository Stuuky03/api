import { app } from "./app";

app.get("/", () => {
  return "Hello World";
})
app.post("/user/create", (request) => {
  const reply = JSON.stringify(request.body);

  console.log(reply);
  return reply;
})

app.listen({ port: 7777, host: "localhost" }).then(() => console.log('Hello Server!'));