import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
// import {Provider} from "react-redux";
// import './App.css';
// import store from "./store";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
function App() {
  
  return (
    <>
     {/* <Provider store={store}> */}
       <BrowserRouter>
       <Switch>
         <Route path="/login" render={(props)=><Login {...props}/>}/>
         <Route path="/signup" render={(props)=><Signup {...props}/>}/>
        
        {/* <Route path="/recruitement" render={(props)=><Recruitement {...props}/>}/> */}
        <Route path="/"  render={(props)=><Home {...props}/>}/>
        {/* <Redirect to="/login"/> */}
       </Switch>
       </BrowserRouter>
     {/* </Provider> */}
    </>
  );
}

export default App;
