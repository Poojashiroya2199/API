import React,{useState,useEffect} from "react";
import userimage from "./../../images/user.svg";
import "./../../css/Profile.css";
import editimage from "./../../images/edit.svg";
import axios from "axios";
export default function Profile(props){
    // console.log(props)
    const userdata={...props.userdata};
    
    const [edit,setedit]=useState(true);
    const startedit=()=>{
        setedit(!edit);
    }
    const [profile,setProfile]=useState({image:"",gender:0,dob:"",address:"",role:"",joining:""})
    const updateProfile=()=>{
        const id=userdata.userProfile[0];
        const profiledata={
            image:profile.image,
            gender:profile.gender,
            dob:profile.dob,
            address:profile.address,
            role:{role:profile.role},
            joining:profile.joining
        }
        axios.put("http://localhost:5000/v1/user/profile/"+id,profiledata)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    const handlechane=(property,event)=>{
       
        const copydata={...profile};
        copydata[property]=event.target.value;
        setProfile(copydata);
    }
    const getprofile=()=>{
        const id=userdata.userProfile[0];
       axios.get("http://localhost:5000/profile/"+id)
       .then(data=>console.log(data))
       .catch(err=>console.log(err));
    }
    useEffect(() => {
      getprofile();
    }, [])
    // console.log(userdata);
    return (
        <div>
            <div className="profileheader">
            <h1>{userdata.userType===1?"Admin":"Employee"}  Profile</h1>
            <div><p>Edit Profile</p>
            <img src={editimage} alt="image1" className="svg" onClick={startedit}/></div>
            </div>
            <div className="profilecontent"><div className="inputcontainer">
            <img src={userimage} alt="" className="profilelogo" />
            <input type="text" value={profile.image} placeholder="Profile Image" onChange={(ev)=>handlechane("image",ev)} />
            <input disabled={edit?true:false} value={userdata.userName} className="userdata"/>
            <input disabled={edit?true:false} value={userdata.email} className="userdata"/>
            <input disabled={edit?true:false} value={userdata.phoneNumber} className="userdata"/>
            </div>
            <div>
                <div className="gendercontainer">
               <div className="gender">
                <input type="radio" name="gender"  className="userdata" value="0" onChange={(ev)=>handlechane("gender",ev)}/>
                <p>Male</p>
               </div>
               <div className="gender"> 
                <input type="radio" name="gender" value="1" className="userdata" onChange={(ev)=>handlechane("gender",ev)}/>
                <p>Female</p>
               </div>
               <div className="gender">
                <input type="radio" name="gender" value="2" className="userdata" onChange={(ev)=>handlechane("gender",ev)}/>
                <p>Other</p>
               </div>
               </div>
               <div className="profiledatacontainer">
                   <span>Date Of Birth : </span>
                   <input type="date"  className="userdata profiledata" value={profile.dob} onChange={(ev)=>handlechane("dob",ev)}/>
               </div>
               <div className="profiledatacontainer">
                   <span>Address :</span>
                   <input type="text" className="userdata profiledata" value={profile.address} onChange={(ev)=>handlechane("address",ev)} />
                </div>
               <div className="profiledatacontainer">
                   <span>Role :</span>
                   <input type="text" className="userdata profiledata" value={profile.role} onChange={(ev)=>handlechane("role",ev)} />
                </div>
               <div className="profiledatacontainer" >
                   <span>Joining Date: </span>
                   <input type="date" className="userdata profiledata" value={profile.joining}  onChange={(ev)=>handlechane("joining",ev)}/>
                </div>
               <div>
                   <button onClick={updateProfile}>Upadte Profile</button>
               </div>
            </div>
            </div>
        </div>
    )
}