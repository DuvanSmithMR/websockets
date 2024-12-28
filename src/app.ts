import { WebSocketServer, WebSocket } from "ws";

const port = 7535;

const wss = new WebSocketServer({ port });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const payload = {
      type: "custom-message",
      payload: data.toString().toUpperCase(),
    };

    //Todos los clientes conectados
    /*
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload), { binary: false });
      }
    });
    */

    //Todos los clientes conectados menos el que envio el mensaje
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload), { binary: false });
      }
    });
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