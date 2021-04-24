import React,{useState,useEffect} from "react";
import userimage from "./../../images/user.svg";
import "./../../css/Profile.css";
import editimage from "./../../images/edit.svg";
import axios from "axios";
import male from "./../../images/man.svg";
import female from "./../../images/female.svg"; 
// import other from "./../../images/otherperson.svg";

export default function Profile(props){
    
    const [profile,setProfile]=useState({image:"",gender:"",dob:"",address:"",role:"",joining:""});
    const [edit,setedit]=useState(true);
    
    const {userdata}=props;
    // console.log(userdata);
    var id=userdata.userProfile;
    // console.log(id);
    // const gender=profile.gender;
   
    const startedit=()=>{
        setedit(!edit);
    }
  
    const updateProfile=async()=>{
        const profiledata={
            image:profile.image,
            gender:profile.gender,
            dob:profile.dob,
            address:profile.address,
            role:profile.role,
            joining:profile.joining
        }
        console.log(profiledata);
        await axios.put("http://localhost:5000/v1/user/profile/"+id,profiledata)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>console.log(err));     

        finduserprofile();
    }
    const handlechange=(property,event)=>{
        const copydata={...profile};
        copydata[property]=event.target.value;
        setProfile(copydata);
    }

    const finduserprofile=async()=>{
        await  axios.get("http://localhost:5000/v1/user/profile/"+id)
          .then(res=>{
              console.log(res.data[0]);
              const copyprofile=res.data[0];
              console.log(copyprofile.dob);
              setProfile({
                  image:copyprofile.image,
                  gender:copyprofile.gender,
                  dob:copyprofile.dob,
                  address:copyprofile.address,
                  role:copyprofile.role,
                  joining:copyprofile.joining
              });
          })
          .catch(err=>console.log(err));
      }

      useEffect(()=>{
          finduserprofile();
          // eslint-disable-next-line
      }, [])
    return (
        <div>
            <div className="profileheader">
            <h1>{userdata.userType===1?"Admin":"Employee"}  Profile</h1>
            <div>
            <p>Edit Profile</p>
            <img src={editimage} alt="image1" className="svg" onClick={startedit}/>
            </div>
            </div>
            <div className="profilecontent">
                <div className="inputcontainer">
            { 
              profile.image?<img src={profile.image} alt="img2" className="profilelogo"/>:
              <img src={userimage} alt="fdsg" className="profilelogo" />
            }
            <input  disabled={edit?true:false} type="text" value={profile.image} placeholder="Profile Image" onChange={(ev)=>handlechange("image",ev)} />
            <input disabled={edit?true:false} value={userdata.userName} className="userdata"/>
            <input disabled={edit?true:false} value={userdata.email} className="userdata"/>
            <input disabled={edit?true:false} value={userdata.phoneNumber} className="userdata"/>
            </div>
            <div>
                <div className="gendercontainer">
               <div className="gender" >
                    <input type="image" src={male} alt="ds" disabled={edit?true:false} name="gender"  className={profile.gender===0?"selectedgender":"gendersvg"} value={0} onClick={(ev)=>handlechange("gender",ev)}/>
                    <p>Male</p>
               </div>
               <div className="gender"> 
                   <input type="image" src={female} alt="sg" disabled={edit?true:false} name="gender" className={profile.gender===1?"selectedgender":"gendersvg"} value={1}  onClick={(ev)=>handlechange("gender",ev)}/>
                   <p>Female</p>
               </div>
               {/* <div className="gender"> 
                   <input type="image" src={other} alt="sg" disabled={edit?true:false} name="gender" className={profile.gender===2?"selectedgender":"gendersvg"} value={2}  onClick={(ev)=>handlechange("gender",ev)}/>
                   <p>Other</p>
               </div> */}
               </div>
               <div className="profiledatacontainer">
                   <span>Date Of Birth : </span>
                   <input type="date"  disabled={edit?true:false} className="userdata profiledata" value={profile.dob} onChange={(ev)=>handlechange("dob",ev)}/>
               </div>
               <div className="profiledatacontainer">
                   <span>Address :</span>
                   <input type="text" disabled={edit?true:false} className="userdata profiledata" value={profile.address} onChange={(ev)=>handlechange("address",ev)} />
                </div>
               <div className="profiledatacontainer">
                   <span>Role :</span>
                   <input type="text" disabled={edit?true:false} className="userdata profiledata" value={profile.role} onChange={(ev)=>handlechange("role",ev)} />
                </div>
               <div className="profiledatacontainer" >
                   <span>Joining Date: </span>
                   <input type="date" disabled={edit?true:false} className="userdata profiledata" value={profile.joining}  onChange={(ev)=>handlechange("joining",ev)}/>
                </div>
               <div>
                   <button  disabled={edit?true:false} onClick={updateProfile}>Upadte Profile</button>
               </div>
            </div>
            </div>
        </div>
    )
}