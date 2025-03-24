import * as api from '../api'
import { setcurrentUser } from './currentUser'
export const login =(loginData)=>async(dispatch)=>{
    try {
        const {data}=await api.login(loginData)
        dispatch({type:"AUTH",data})
dispatch(setcurrentUser(data?.result))   
localStorage.setItem('profile', JSON.stringify(data))
return data
} 
catch (error) {
    console.error('Login failed', error.response?.data?.message || error.message);
    alert(error.response?.data?.message || error
        .message)
    }
}
