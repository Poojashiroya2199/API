import React,{useState} from "react";
import "./../../css/login.css";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Login(props){

    const [user,setuser]=useState({username:"",password:""});
    const [error,setError]=useState("");
    const handlechange=(property,event)=>{
        const copyuser={...user};
        copyuser[property]=event.target.value;
        setuser(copyuser);
    }

    const handlesubmit=()=>{
        const userdata={
            username:user.username,
            password:user.password
        };

        axios.post("http://localhost:5000/v1/auth/login",userdata)
        .then(res=>{
            console.log(res);
            if(res.data!=="User doesn't exists, please sign up" && res.data!=="password is incorrect"){
               setError()
            props.history.push("/");
            }
            if(res.data==="User doesn't exists, please sign up" || res.data==="password is incorrect"){
                setError(res.data);
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
            <div className="formcontainer">
            <div className="container">
            <form>
                <h2 className="heading">Sign In</h2>
                <input
                type="text"
                name="username"
                placeholder="Username"
                className="input"
                value={user.username}
                onChange={(event)=>handlechange("username",event)}
                />
                <br />
                <input
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                value={user.password}
                onChange={(event)=>handlechange("password",event)}
                />
                <br />
                <p>{error}</p>
                <input type="button" value="Log In" className="btn" onClick={handlesubmit} />
                <br/>
                <div className="links">
                <Link to="res" className="link ">Reset Password</Link>
                <Link to="for" className="link">Forgot Password</Link>
                </div>
                <p className="text">
                Don't have an account? <Link to="/signup" className="link"> Sign Up</Link>
                </p>
            </form>
        </div>
        </div>
    )
}