
import WebSocket from "ws"

let wsClient = new WebSocket('ws://localhost:3001')



wsClient.onopen = (event) => {
    const userId = "1"
    const problemId = "2";

    wsClient.send(JSON.stringify({type : "CLIENT", data : {
        problemId,
        userId
    }}))

}

wsClient.onmessage = (event) => {
    console.log('hi there')
    const data = JSON.parse(event.data.toString());
    console.log(data)
}