import { WebSocket, WebSocketServer } from "ws";
import express from "express";
import {createClient} from "redis"

const app = express();

const httpServer = app.listen(8080);

interface Message {
    userId : string;
    problemId? : string;
    status? : string;
    type : string
}

interface UserId {
    userId : string
}

const wss = new WebSocketServer({ server: httpServer });

const client = createClient({
    // pubsub url
})

let allUsersId : string[] = [];


wss.on("connection", async (ws) => {
   client.subscribe("problem_done", () => {
         console.log("Subscribed to the problem_done channel")
   });
    ws.on("message", (message: Message, isBinary) => {
        const data:Message = JSON.parse(message.toString()); 
        if(data.type === "client"){
            const userPresent = allUsersId.find((userId) =>  userId === data.userId)
            if(userPresent){
                allUsersId.map((userid: string) => {
                    if(userid !== data.userId){
                        allUsersId.push(...allUsersId, data.userId);
                        ws.send("Received User Id")
                    }
                })
            } 
        } 

        if(data.type === "server"){
            allUsersId.map((userId : string) => {
                if(data.userId === userId){
                    ws.send(JSON.stringify(data))
                }
            })
        }
        console.log(allUsersId)
    })
});



async function startPubSubClient(){
    await client.connect();
    console.log("Redis WebSocket Client is Connected");
}


startPubSubClient()