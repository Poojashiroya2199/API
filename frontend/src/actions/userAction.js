import {USER} from "./actionTypes";

export default setUSer(userData={}){
    return {
        payload:userData,
        type:USER
    }
}