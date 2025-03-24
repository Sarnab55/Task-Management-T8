import * as api from '../api'
import { setcurrentUser } from './currentUser'
export const signUp =(signUpData)=>async(dispatch)=>{
    try {
        const {data}=await api.signUp(signUpData)
        localStorage.setItem('Profile', JSON.stringify(data));
        dispatch({type:"AUTH",data})
dispatch(setcurrentUser(data?.result))   } 
catch (error) {
    console.error("Signup failed", error.response?.data?.message || error.message)
    alert(error.response?.data?.message || error
    .message)

    }
}
