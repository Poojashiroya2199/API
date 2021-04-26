import axios from "axios";
import React,{useState,useEffect} from "react";
import image1 from "./../../images/user.svg";
import "./../../css/Dashboard.css";
// import "tachyons";
export default function Analytics(props){
    console.log(props);
    const [employeelist,setemployeelist]=useState([]);
    const [userprofiles,setuserprofilelist]=useState([]);
    const getlist=async()=>{
        await axios.get("http://localhost:5000/v1/user")
        .then(res=>{
            console.log(res);
            setemployeelist(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    const getuserlist=async()=>{
        await axios.get("http://localhost:5000/v1/profile")
        .then(res=>{
            console.log(res.data);
            setuserprofilelist(res.data);
        })
        .catch(err=>console.log(err));
    }
    const handledelete=async(id,profileid,roleid,deptid)=>{
        await axios.delete("http://localhost:5000/v1/profile/"+profileid)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));

        await axios.delete("http://localhost:5000/v1/role/"+roleid)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));

        await axios.delete("http://localhost:5000/v1/department/"+deptid)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));

        await axios.delete("http://localhost:5000/v1/user/"+id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    }
    const checkprofileid=(id)=>{
        const imagecopy=image1;
        console.log(userprofiles);
        let val= userprofiles.find(profile=>profile._id===id);
        let imagevalue=val.image;
        console.log(val);
        
        if(imagevalue){
        return imagevalue;}
         else{     
           return imagecopy;    
         }   
    }
    const findrole=(id)=>{
        const profileuser=userprofiles.find(profile=>profile._id===id);
        if(profileuser.role){
            return profileuser.role;
        }
            return "NA";
    }
    useEffect(() => {
        getlist();
        console.log(employeelist);
        getuserlist();
        console.log(userprofiles);
        // eslint-disable-next-line
    }, [])
    return (
        <>
        <div className="part1ofmain">
        <h3><strong>Analytics</strong> Dashboard</h3>
        <p><span>HRMS</span>/<span>Dashboard</span>/<span>Analytics</span></p>
        </div>
        <div>
            <h4>Employees</h4>
            <table className="table">
                <thead>
                    <th>Sr. No.</th>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Phone No.</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>delete</th>

                </thead>
                <tbody>
                {
                    employeelist.map((employee,index)=>(
                        <tr key={employee.userName}>
                             <td>{index+1}</td>
                             <td>
                              <img src={checkprofileid(employee.userProfile)} alt="ffsfg" className="dashboardimage"/>
                           </td>
                            <td>{employee.userName}</td>
                           <td>{employee.phoneNumber}</td>
                           <td>{employee.email}</td>
                           <td>
                               {/* {employee.userType===0?"Employee":"Admin"} */}
                               {findrole(employee.userProfile)}
                           </td>
                           <td>
                               <button className="deletebtn" onClick={()=>handledelete(employee._id,employee.userProfile,employee.roleofuser,employee.userDept)}>Delete</button>
                           </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    </>
    )
}