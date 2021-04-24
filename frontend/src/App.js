import React from "react";
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom";
// import './App.css';
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
function App() {
  
  return (
    <>
       <BrowserRouter>
       <Switch>
         <Route path="/login" exact render={(props)=><Login {...props}/>}/>
         <Route path="/signup" exact render={(props)=><Signup {...props}/>}/>
        <Route path="/"  render={(props)=><Home {...props}/>}/>
        <Redirect to="/login"/>
       </Switch>
       </BrowserRouter>
    </>
  );
}

export default App;
