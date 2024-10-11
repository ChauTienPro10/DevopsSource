import express from 'express';
import cors from 'cors';
import wss, {handelMessage} from './socket.js';
import {createAccount,sendETH} from './interation/attacher.js'
import {WebSocket} from 'ws';
import dotenv from 'dotenv';
dotenv.config();
import neo4j from 'neo4j-driver';
const app = express();

const port = 4000;

// const corsOptions = {
//     origin: process.env.CLIENT, // Thay đổi thành địa chỉ nguồn của bạn
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Cho phép gửi cookie
//     optionsSuccessStatus: 204, // Một số trình duyệt cũ (IE11, Edge) yêu cầu mã trạng thái này
// };
const uri = process.env.NEO4J; // Địa chỉ của Neo4j
const user = 'neo4j'; // Tên người dùng
const password = 'testpassword'; // Mật khẩu của bạn
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();



app.use(cors());
app.use(express.json());



app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra xem username và password có được cung cấp hay không
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

   

    try {
        const accContract=await createAccount();
        // Thực hiện truy vấn Cypher để tạo tài khoản mới
        const result = await session.run(
            'CREATE (p:Account {username: $username, password: $password, address: $address, key: $key}) RETURN p',
            { username, password ,address:accContract.address,key:accContract.privateKey}
        );

        // Kiểm tra xem tài khoản đã được tạo thành công chưa
        if (result.records.length > 0) {
            const account = result.records[0].get('p');
            
            res.status(201).json({ success: true, account });
        } else {
            res.status(400).json({ success: false, message: 'Account creation failed' });
        }
    } catch (error) {
        console.error('Lỗi khi truy vấn Neo4j:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Đóng session
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra xem username và password có được cung cấp hay không
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }


    try {
        // Thực hiện truy vấn Cypher để tìm tài khoản
        const result = await session.run(
            'MATCH (p:Account {username: $username, password: $password}) RETURN p',
            { username, password }
        );

        // Kiểm tra xem có tài khoản nào được tìm thấy không
        if (result.records.length > 0) {
            const account = result.records[0].get('p');
            res.json({ success: true, account });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Lỗi khi truy vấn Neo4j:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Đóng session
      
    }
});

app.post("/sendETH", async (req, res) => {
    const {from,to,amount,key}=req.body;
    console.log(JSON.stringify({from,to,amount}))
    try{
        sendETH(from,key,to,amount);
        res.status(200).json({code:1000});
    }
    catch{
        res.status(500).json({code:9000});
    }
    
})

// Lắng nghe và khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Gửi tin nhắn chào mừng đến client khi kết nối được thiết lập
    ws.send(JSON.stringify({ content: "Hello from server" }));

    // Khi nhận được tin nhắn từ client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Gửi tin nhắn đến tất cả các client đã kết nối
        wss.clients.forEach((client) => {
            // Kiểm tra nếu client sẵn sàng nhận tin nhắn
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    data: handelMessage(message) // Gửi dữ liệu sau khi xử lý
                }));
            }
        });
    });
});
});


