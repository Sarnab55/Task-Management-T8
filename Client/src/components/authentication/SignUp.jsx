import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {useDispatch} from "react-redux";
import {signUp} from "../../actions/signup";

export default function SignUp() {
    const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(""); // <-- Add this state to handle errors
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
const dispatch=useDispatch()
    const handleChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error
        setLoading(true);
        try {
       const response=await     dispatch(signUp(signUpData))
       alert("Signup successful");
            // await signup(formData); // Call API function
            navigate("/"); // Redirect to homepage after successful login
        } catch (error) {
            console.error("Signup failed", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false); // Hide loading message after response
        }
    };

    return (
        <>
            <div className="bg-slate-950 h-screen w-screen flex flex-col items-center text-white">
                {/* heading */}
                <div className="mt-32 text-center text-sky-blue border-2 border-slate-50 rounded-xl p-5 md:w-[35%] sm:w-[60%] w-[80%]">
                    {/* sign in */}
                    <div className="text-yellow-500 md:text-5xl sm:text-3xl text-2xl font-bold">Create your account</div>
                    
                    <br />

                    {/* the form */}
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="name">Username: </label>
                        <input type="text" id="name"  className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="name" value={signUpData.name} placeholder="Username" onChange={handleChange} required /> <br /> <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="password" value={signUpData.password} placeholder="Password" onChange={handleChange} required /> <br /> <br />
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="email" value={signUpData.email} placeholder="Your email" onChange={handleChange} required /> <br /> <br />
                        <button type="submit" className="border-[1px] p-2 rounded-xl w-[30%] border-slate-600 shadow-sm shadow-yellow-400 hover:shadow-md hover:shadow-yellow-400">Sign Up</button>
                        {loading && <p className="text-[14px] text-sky-500 mt-4">Signing you up...</p>}
                        {error && <p className="text-[10px] text-red-500">{error}</p>} {/* Display error message if login fails */}
                    </form> 
                </div>
            </div>
        </>
    );
}