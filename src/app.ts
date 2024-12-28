import { WebSocketServer } from "ws";

const port = 7535;

const wss = new WebSocketServer({ port });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("Mensaje desde el cliente", data);
    const payload = {
      type: "custom-message",
      payload: data.toString().toUpperCase(),
    };
    ws.send(JSON.stringify(payload));
  });

  ws.send(
    JSON.stringify({
      type: "custom-message",
      payload: "Hola desde el servidor",
    })
  );

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

console.log(`server running on ws://localhost:${port}`);