function setupWS(wss: any) {
    wss.on("connection", () => {
        console.log("WS conectado");

        wss.on("message", (data: JSON) => {
            const message = data.toString();
            console.log("📩 Mensagem recebida:", message);

            wss.send(
                JSON.stringify({
                    type: "MESSAGE_RECEIVED",
                    payload: message,
                })
            );
        });

        wss.on("close", () => {
            console.log("WS desconectado");
        });
    }
    )
}

module.exports = setupWS
