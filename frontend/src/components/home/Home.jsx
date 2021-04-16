import React,{useState} from "react";
import "./../../css/Home.css";
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Menubar from "./../reuseable/Menubar";
import MenuIcon from '@material-ui/icons/Menu';
export default function Home(){
    const contentlist=["profile","Analytics","settings & privacy","Help center","logout"];
    const [sidebar,setsidebar]=useState(true);
    const handledashboard=()=>{
      setsidebar(!sidebar);
    }
    return (
        <div className="dashboardcontainer">
            <div className={sidebar?"adminkitcontainer":"hideadminkitcontainer"}>
                <h1>HRMS</h1>
                <h4>Pages</h4>
                <h3>Dashboard</h3>
                <h3>Profile</h3>
                <h3>Settings</h3>
                <h3>Invoice</h3>
                <h3>Blank</h3>
                <h4>Tables</h4>
                <h4>Charts</h4>
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
                 <Menubar title={"pooja shiroya"} list={contentlist}/>
                 </div>
                 </div>
                </header>
                <hr/>
                <main>
                    <div className="part1ofmain">
                        <h3><strong>Analytics</strong> Dashboard</h3>
                        <p><span>HRMS</span>/<span>Dashboard</span>/<span>Analytics</span></p>
                    </div>
                </main>
            </div>
        </div>
    )
}