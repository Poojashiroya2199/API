import React,{useState,useEffect} from "react";
import "./../../css/Home.css";
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Menubar from "./../reuseable/Menubar";
import MenuIcon from '@material-ui/icons/Menu';
import image from "./../../images/business-report.svg";
import userimage from "./../../images/user.svg";
import settingimage from "./../../images/settings.svg";
import recruitmentimage from "./../../images/recruitment.svg";
import axios from "axios";
import { Switch,Route,Redirect ,Link} from "react-router-dom";
import Analytics from "./Analytics";
import Profile from "./Profile";
import Setting from "./Setting";
import Recruitement from "./../recruitement/Recruitement";

const contentlist=["profile","Analytics","settings & privacy","Help center","logout"];
   
function Menu(props){
    // console.log(props);
    const usertitle={...props.title}
return <Menubar title={usertitle} list={contentlist} {...props}/>;
}
export default function Home(props){
   // console.log(props);
    let useraccess=localStorage.getItem("accessToken");
    let id=useraccess.split(" ");
    let userid=id[0];
    const [sidebar,setsidebar]=useState(true);
    const [user,setuser]=useState({});
    const handledashboard=()=>{
      setsidebar(!sidebar);
    }
    const finduser=async()=>{
      await  axios.get("http://localhost:5000/v1/user/"+userid)
        .then(res=>{
            setuser(res.data);
        })
        .catch(err=>console.log(err));
    }
    useEffect(()=>{
        finduser();
    },
    // eslint-disable-next-line
    [])

    return (
        <div className="dashboardcontainer">
            <div className={sidebar?"adminkitcontainer":"hideadminkitcontainer"}>
                <h1>HRMS</h1>
                <ul>
                    <li>
                        <Link to="/dashboard" className="link">
                        <img src={image} alt="logo" className="svg"/><h3>Dashboard</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="link" >
                        <img src={userimage} alt="logo" className="svg"/><h3>Profile</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/recruitement" className="link">
                        <img src={recruitmentimage} alt="logo" className="svg"/><h3>Recruitement</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/setting" className="link">
                        <img src={settingimage} alt="logo" className="svg"/><h3>Settings</h3>
                        </Link>
                    </li>
                   
                </ul>
               
            </div>
            <div className={sidebar?"maindashboard":"fulldashboard"}>
                <header>
                    <div className="headercontainer">
               <div className="search">
                    <MenuIcon  style={{fontSize:"2rem"}} className="menuicon" onClick={handledashboard}/>
                    <div>
                 <input type="search" placeholder="Search..." className="searchinput" />
                 <SearchIcon color="inherit"/>
                 </div>
                 </div>
                 <div className="headerbadge">
                 <Badge badgeContent="0"  color="primary" className="notification" >
                     < NotificationsNoneIcon color="inherit"/>
                 </Badge>
                 <ChatBubbleOutlineIcon className="chaticon" color="inherit"/>
                 <img src={userimage} alt="profile" className="profileimage"/>
                 <Menu {...props} title={user.userName}/>
                 </div>
                 </div>
                </header>
                <hr/>
                <main>
                  <Switch>
                      <Route path="/dashboard" render={(props)=><Analytics userdata={user} {...props}/>} />
                      <Route path="/profile" render={(props)=><Profile userdata={user} {...props}/>}/>
                      <Route path="/setting" render={(props)=><Setting userdata={user} {...props}/>}/> 
                      <Route path="/recruitement" render={(props)=><Recruitement userdata={user} {...props}/>}/>
                      <Redirect to="/dashboard"/>
                 </Switch>
                       
                </main>
            </div>
        </div>
    )
}