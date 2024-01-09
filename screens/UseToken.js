import { useContext } from "react";
import { TokenContext } from "../context/authTokenContext";

const useToken=()=>{
const {token,setToken}=useContext(TokenContext)
return {token,setToken}
}

export default useToken