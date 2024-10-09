import React,{useEffect,useState} from "react";
import './login.css';
import axios from 'axios';

export default function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('')
    const fetchLogin=async ()=>{
        
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/login`,{username,password});
                console.log(response.data)
                
        }
        catch(e){
            console.log(e);
        }
    }
    const signup=async()=>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/signup`,{username,password}
               
            );
                console.log(response.data)
        }
        catch(e){
            console.log(e);
        }
    }
    return(
        <div className="login-body">
            <div className="username-block block-opt">
                <label style={{marginRight:'10px'}} htmlFor="input-username" > username</label>
                <input style={{width:'500px', height:'30px', outline:'none'
                    ,padding:'5px 10px 5px 10px'
                }}
                    id="input-username"
                    type="text" value={username} placeholder="username" required 
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </div>
            <div className="password-block block-opt">
                <label style={{marginRight:'10px'}} htmlFor="input-username" > password</label>
                <input style={{width:'500px', height:'30px', outline:'none'
                    ,padding:'5px 10px 5px 10px'
                }}
                    id="input-password"
                    type="text" value={password} placeholder="password" required 
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button onClick={()=>{fetchLogin()}} className="block-opt">login</button>
            <button onClick={()=>signup()} className="block-opt">signup</button>
        </div>
    );
}