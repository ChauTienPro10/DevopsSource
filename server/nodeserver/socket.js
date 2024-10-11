import { json } from 'express';
import { WebSocketServer } from 'ws'; // Đảm bảo import WebSocketServer


const wss = new WebSocketServer({ port: 4001 }); // Sử dụng WebSocketServer

// wss.on('connection', (ws) => {
//     console.log('Client connected');

//     // Khi nhận được tin nhắn từ client
//     ws.on('message', (message) => {
//         console.log(`Received: ${message}`);
//         ws.send(JSON.stringify({data:handoleMessag(message)}) );
        
//     });

//     // Gửi tin nhắn đến client khi kết nối được thiết lập
//     ws.send(JSON.stringify({content:"hello form server"}));
// });

export const handelMessage=(message)=>{
    const parsedMessage = JSON.parse(message); // Giả sử tin nhắn là JSON
    console.log(parsedMessage);
    return parsedMessage;
}

console.log('WebSocket server is running on ws://localhost:4001');

export default wss
