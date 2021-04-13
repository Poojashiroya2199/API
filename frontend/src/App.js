import React from "react";
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom";
// import {Provider} from "react-redux";
import './App.css';
// import store from "./store";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Recruitement from "./components/recruitement/Recruitement";
function App() {
  return (
    <div className="App">
     {/* <Provider store={store}> */}
       <BrowserRouter>
       <Switch>
         <Route path="/login" render={(props)=><Login {...props}/>}/>
         <Route path="/signup" render={(props)=><Signup {...props}/>}/>
        <Route path="/" exact render={(props)=><Home {...props}/>}/>
        <Route path="/recruitement" render={(props)=><Recruitement {...props}/>}/>
        <Redirect to="/login"/>
       </Switch>
       </BrowserRouter>
     {/* </Provider> */}
    </div>
  );
}

export default App;
