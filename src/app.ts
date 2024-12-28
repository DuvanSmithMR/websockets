import { WebSocketServer } from "ws";

const port = 7535;

const wss = new WebSocketServer({ port });

wss.on("connection", function connection(ws) {
  console.log("Clietn connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("Hola desde el servidor");
});

console.log(`server running on ws://localhost:${port}`);