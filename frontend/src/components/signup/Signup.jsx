import React,{useState} from "react";
import "./../../css/Signup.css";
import {Link} from "react-router-dom";
export default function Signup(){
   const  [userdata,setUser]=useState({firstName:"",lastName:"",userName:"",phoneNumber:0,email:"",userType:0,
                                    role:"",password:"",confirmPassword:"",gender:"",dob:"",adress:{},joining:"",
                                    depttitle:"",deptdescription:"",minExperience:0,minCompensation:0,maxCompensation:0,
                                applicationStatus:0,designation:""});
    const handlechange=(property,event)=>{
        const copyuser={...userdata};
        copyuser[property]=event.target.value;
        setUser(copyuser);
    }
    return (
        <>
        <div className="container">
        <form>
            <h2 className="heading">Sign Up </h2>
            <input type="text" name="firstName" placeholder="first name" className="input" value={userdata.firstName} onChange={(ev)=>handlechange("firstName",ev)}/><br />
            <input type="text" name="lastName" placeholder="last name" className="input" value={userdata.lastName} onChange={(ev)=>handlechange("lastName",ev)}/><br />
            <input type="text" name="userName" placeholder="user name" className="input" value={userdata.userName} onChange={(ev)=>handlechange("userName",ev)} /><br />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" className="input" value={userdata.phoneNumber} onChange={(ev)=>handlechange("phoneNumber",ev)}/><br/>
            <input type="email" name="email" placeholder="Email Id" className="input" value={userdata.email} onChange={(ev)=>handlechange("email",ev)} /><br />
            <select className="input" value={userdata.userType} onChange={(ev)=>handlechange("userType",ev)} >
                <option>Select userType</option>
                <option value="0">Employee</option>
                <option value="1">Admin</option>
            </select><br/>
            <input type="text" name="role" placeholder="Enter roles with comma" className="input" value={userdata.role} onChange={(ev)=>handlechange("role",ev)}/><br/>
            <input type="password" name="password" placeholder="Password" className="input" value={userdata.password} onChange={(ev)=>handlechange("password",ev)}/><br/>
            <input type="password" name="confirmPassword"  placeholder="Confirm Password" className="input" value={userdata.confirmPassword} onChange={(ev)=>handlechange("confirmPassword",ev)}/><br/>
            <input type="radio" className="radiobtn" name="gender" value="0" onChange={(ev)=>handlechange("gender",ev)}/>
            <span>MALE</span>
            <input type="radio" className="radiobtn" name="gender"  value="1" onChange={(ev)=>handlechange("gender",ev)}/>
            <span>FEMALE</span>
            <input type="radio" className="radiobtn" name="gender" value="2" onChange={(ev)=>handlechange("gender",ev)}/>
            <span>OTHER</span>
            <br/>
            <span>Date of Birth</span>
            <input type="date" className="input" name="dob" value={userdata.dob} onChange={(ev)=>handlechange("dob",ev)} placeholder="DOB"/>
            <br/>
            <input type="text" className="input" name="address" value={userdata.address} onChange={ev=>handlechange("address",ev)} placeholder="Address"/>
            <br/>
            <span></span>
            <input type="date" className="input" name="joining" value={userdata.joining} onChange={(ev)=>handlechange("joining",ev)} placeholder="Joining Date"/>
            <br/>
            <Link to="sucesssignup" className="link">
            <input type="button" value="Sign Up" className="btn" />
            </Link><br />
            <p className="text">
            Already have an account?
            <Link to="/login" className="link"> Log In</Link>
            </p>
        </form>
        </div>
        </>
    )
}