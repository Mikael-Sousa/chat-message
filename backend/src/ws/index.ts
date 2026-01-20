const jwt = require("jsonwebtoken");
const messageService = require("../services/message.service")

function setupWS(wss: any) {
    const clients = new Map();

    wss.on("connection", async (ws: any) => {
        console.log("WS connected");

        ws.isAuthenticated = false;

        ws.on("message", async (data: any) => {
            let msg;

            try {
                msg = JSON.parse(data.toString());
            } catch {
                ws.close();
                return;
            }

            if (msg.type === "AUTH") {
                try {
                    const decoded = jwt.verify(msg.token, process.env.JWT_SECRET!);

                    ws.userId = decoded.id;
                    ws.isAuthenticated = true;

                    clients.set(ws.userId, ws);

                    ws.send(JSON.stringify({
                        type: "AUTH_SUCCESS"
                    }));

                    console.log("authenticated:", ws.userId);
                } catch {
                    ws.close();
                }
                return;
            }

            if (!ws.isAuthenticated) {
                ws.close();
                return;
            }

            if (msg.type === "PRIVATE_MESSAGE") {
                const receiver = clients.get(msg.to);

                if (receiver) {
                    receiver.send(JSON.stringify({
                        type: "PRIVATE_MESSAGE",
                        from: ws.userId,
                        message: msg.message
                    }));
                }

                try {
                    await messageService.saveMessage({
                        senderId: ws.userId,
                        receiverId: msg.to,
                        content: msg.message
                    });
                } catch (err) {
                    console.error("DB error:", err);
                }

            }

        });

        ws.on("close", () => {
            if (ws.userId) {
                clients.delete(ws.userId);
                console.log("Disconnected:", ws.userId);
            }
        });
    });
}

module.exports = setupWS;
