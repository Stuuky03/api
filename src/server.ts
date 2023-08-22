import { app } from "./app";

app.listen({ port: 7777, host: "0.0.0.0" }).then(() => console.log('Hello Server!'));