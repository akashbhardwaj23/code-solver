import { WebSocket, WebSocketServer } from "ws";
import express from "express";

const app = express();

const httpServer = app.listen(8080);

interface Message {
    userId : string;
    problemId? : string;
    status? : string;
}

interface UserId {
    userId : string
}

const wss = new WebSocketServer({ server: httpServer });

let allUsersId : string[] = [];


wss.on("connection", (ws) => {
    ws.on("message", (message: Message, isBinary) => {
        const data:Message = JSON.parse(message.toString());
        console.log(typeof data)
        const userPresent = allUsersId.find((userId) =>  userId === data.userId)

        
        if(userPresent){
            console.log("There i am")
            allUsersId.map((userid: string) => {
                console.log(userid === data.userId)
                console.log(userid);
                console.log(data.userId)
                if(userid === data.userId){
                    console.log("here")
                   return  ws.send(JSON.stringify(data), {binary : isBinary})
                }
            });
        } else {
            allUsersId.push(...allUsersId, data.userId);
            ws.send("Received User Id")
        }
        

        ws.send("Send The Message")

        
console.log(allUsersId)
    })
})
