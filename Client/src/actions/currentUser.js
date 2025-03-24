export const setcurrentUser=(data)=>
{
    return{
        type:"FETCH_CURRENT_USER",
        payload:data
    }
}