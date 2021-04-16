import React,{useState} from "react";
import "./../../css/Signup.css";
import {Link} from "react-router-dom";
import axios from "axios";
export default function Signup(props){
   const  [userdata,setUser]=useState({firstName:"",lastName:"",userName:"",phoneNumber:"",email:"",userType:"",
                                    password:"",confirmPassword:""  });
                                //     role:"",gender:"",dob:"",adress:{},joining:"",
                                //     depttitle:"",deptdescription:"",minExperience:"",minCompensation:"",maxCompensation:"",
                                // applicationStatus:"",designation:""
    const [error,seterror]=useState("");                     
    const handlechange=(property,event)=>{
        const copyuser={...userdata};
        copyuser[property]=event.target.value;
        setUser(copyuser);
    }
    const signup=()=>{

        if(userdata.password===userdata.confirmPassword){
            seterror("");
        console.log(userdata);
        const copyuser={
            firstName:userdata.firstName,
            lastName:userdata.lastName,
            userName:userdata.userName,
            phoneNumber:userdata.phoneNumber,
            email:userdata.email,
            userType:userdata.userType,
            password:userdata.password
        }
        axios.post("http://localhost:5000/v1/user",copyuser)
        .then(res=>{
            console.log(res);
            if(res.data==="User already exist, please sign in" ||res.data==="Please fill up data correctly"){
                seterror(res.data);
            }
            if(res.data!=="User already exist, please sign in" && res.data!=="Please fill up data correctly"){
                seterror("");
                props.history.push('/login');
            }
        })
        .catch(err=>console.log(err));
      }
      else{
        seterror("Please verify your password");
      }
    }
    return (
        <div className="formcontainer">
        <div className="container">
        <form>
            <h2 className="heading">Sign Up </h2>
           <p>{error}</p>
            <input type="text" name="firstName" placeholder="first name" className="input" value={userdata.firstName} onChange={(ev)=>handlechange("firstName",ev)}/><br />
            <input type="text" name="lastName" placeholder="last name" className="input" value={userdata.lastName} onChange={(ev)=>handlechange("lastName",ev)}/><br />
            <input type="text" name="userName" placeholder="user name" className="input" value={userdata.userName} onChange={(ev)=>handlechange("userName",ev)} /><br />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" className="input" value={userdata.phoneNumber} onChange={(ev)=>handlechange("phoneNumber",ev)}/><br/>
            <input type="email" name="email" placeholder="Email Id" className="input" value={userdata.email} onChange={(ev)=>handlechange("email",ev)} /><br />
            <select className="select" value={userdata.userType} onChange={(ev)=>handlechange("userType",ev)} >
                <option>User Type</option>
                <option value="0">Employee</option>
                <option value="1">Admin</option>
            </select>
           <br/>
           <input type="password" name="password" placeholder="Password" className="input" value={userdata.password} onChange={(ev)=>handlechange("password",ev)}/><br/>
            <input type="password" name="confirmPassword"  placeholder="Confirm Password" className="input" value={userdata.confirmPassword} onChange={(ev)=>handlechange("confirmPassword",ev)}/><br/>
            {/* <input type="text" name="role" placeholder="Enter roles with comma" className="input" value={userdata.role} onChange={(ev)=>handlechange("role",ev)}/><br/>
           <input type="radio" className="radiobtn" name="gender" value="0" onChange={(ev)=>handlechange("gender",ev)}/>
            <span>MALE</span>
            <input type="radio" className="radiobtn" name="gender"  value="1" onChange={(ev)=>handlechange("gender",ev)}/>
            <span>FEMALE</span>
            <input type="radio" className="radiobtn" name="gender" value="2" onChange={(ev)=>handlechange("gender",ev)}/>
            <span>OTHER</span>
            </div>
            <div className="signupdiv">
            <span  className="title">Date of Birth</span>
            <input type="date" className="input" name="dob" value={userdata.dob} onChange={(ev)=>handlechange("dob",ev)} placeholder="DOB"/>
            <br/>
            <input type="text" className="input" name="address" value={userdata.address} onChange={ev=>handlechange("address",ev)} placeholder="Address"/>
            <br/>
            <span className="title"> Joining date </span>
            <input type="date" className="input" name="joining" value={userdata.joining} onChange={(ev)=>handlechange("joining",ev)} placeholder="Joining Date"/>
            <br/>
            <input type="text" className="input" name="depttitle" value={userdata.depttitle} onChange={(ev)=>handlechange("depttitle",ev)} placeholder="Department title"/>
            <br/>
            <input type="text" className="input" name="deptdescription" value={userdata.deptdescription} onChange={(ev)=>handlechange("deptdescription",ev)} placeholder="Department Description"/>
            <br/>
            <input type="number" className="input" name="minExperience" value={userdata.minExperience} onChange={(ev)=>handlechange("minExperience",ev)} placeholder="minimum Experience"/>
            <br/>
            <input type="number" className="input" name="minCompensation" value={userdata.minCompensation} onChange={(ev)=>handlechange("minCompensation",ev)} placeholder="minimum compensation"/>
            <br/>
            <input type="number" className="input" name="maxCompensation" value={userdata.maxCompensation} onChange={(ev)=>handlechange("maxCompensation",ev)} placeholder="maximum Compensation"/>
            <br/>
            <input type="number" className="input" name="applicationStatus" value={userdata.applicationStatus} onChange={ev=>handlechange("applicationStatus",ev)} placeholder="applicaation status" />
            <br/>
            <input type="text" className="input" name="designation" value={userdata.designation} onChange={ev=>handlechange("designation",ev)} placeholder="designation" />
            <br/> */}
           
           
            <input type="button" value="Sign Up" className="btn" onClick={signup} />
          
            <p className="text">
            Already have an account?
            <Link to="/login" className="link"> Log In</Link>
            </p>
        </form>
        </div>
        </div>
    )
}