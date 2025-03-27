import axios from 'axios'
const API = axios.create({baseURL:'http://localhost:7080'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const login=(loginData)=>API.post('/user/login', loginData)
export const signUp=(signUpData)=>API.post('/user/signup', signUpData)
export const checkemail = (emailData) => API.post('/user/checkemail', emailData);
export const changepassword = (passwordData) => API.post('/user/changepassword', passwordData);
