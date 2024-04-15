
import express from "express"

import { createClient } from "redis"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

app.post("/submit", async (req, res) => {
    const problemId = req.body.problemId;
    const userId = req.body.userId;
    const code = req.body.code;
    const language = req.body.language;

    try {
        await  client.lPush("problems", JSON.stringify({problemId, userId, code, language}))

        res.status(200).json({message : "Code submitted successfully"})
    } catch (error) {
        console.log("Redis Error is There " + error)
        res.status(500).json({message : "Failed to submit the code"})
    }

});


async function startServer(){
    try {
        await client.connect();
        console.log("Redis Client is Connected");

        app.listen(3000, () => {
            console.log(`Server is Running on Port 3000}`)
        })

    } catch (error) {
        console.error("Redis Connection Error", error)
    }
};


startServer();