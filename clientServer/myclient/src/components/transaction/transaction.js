import React,{useEffect,useState} from "react";
import { Client,Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";

import './transaction.css'
export default function Transaction(){
    const [amount,setAmount]=useState(0);
    const [toUser,setToUser]=useState('');

    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
   

    const [ws, setWs] = useState(null);


    //websocket 
    useEffect(() => {
        try{
            // Kết nối đến WebSocket server
            const webSocket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET}`);

            webSocket.onopen = () => {
                console.log('Connected to the server');
            };

            webSocket.onmessage = (event) => {
                
                const receivedMessages = JSON.parse(event.data);
                console.log('Received from server:', receivedMessages.data);
                if(receivedMessages.data){
                    
                    console.log(receivedMessages.data.amount)
                    
                    setMessages((prevMessages) => [...prevMessages, {amount: receivedMessages.data.amount,
                        from:receivedMessages.data.from,
                        to:receivedMessages.data.to,
                    }]);
                
                }
                // setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
                
            };

            webSocket.onclose = () => {
                console.log('Disconnected from the server');
            };

            setWs(webSocket);

            // Dọn dẹp khi component unmount
            return () => {
                webSocket.close();
            };
        }
        catch(e){
            console(e);
        }
        
    }, []);

    const sendMessage = (data) => {
        const message=JSON.stringify(data);
        if (ws && message) {
            ws.send(message);
        }
    };
    //end


    const fetchTransaction=async () => {
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/sendETH`,
                {from:sessionStorage.getItem('address'),
                    to:toUser,
                    key:sessionStorage.getItem('key'),
                    amount:amount}
               
            );
                console.log(response.data)
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className="trans-body">
            <div className="main-board">
            {messages.length !== 0 && 
                <ul className="notify">
                    {messages.map((mes, index) => (
                        <li>
                        <p style={{margin:'0',fontSize:'12px'}}>{`From ${mes.from} `}</p>
                        <p style={{margin:'0',fontSize:'12px'}}>{`To ${mes.to}`}</p>
                        <p style={{margin:'0'}}>{`Da chuyen ${mes.amount} ETH`}</p>
                        </li>
                    ))}
                </ul>
            }
                
                <div className="options">
                    <input id="id_amount" type="number" required value={amount}
                        onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount ETH to send"
                    />
                    <input id="id_to" type="text" required value={toUser}
                        onChange={(e)=>setToUser(e.target.value)} placeholder="To "
                    />
                    <button onClick={()=>{sendMessage({from:sessionStorage.getItem('address'),to:toUser,amount:amount});}} >Send</button>
                </div>
            </div>
        </div>
    );
}