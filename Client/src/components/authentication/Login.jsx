import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login(){
    const [formData, setFormData] = useState({ username: "", password: "" });
    const location = useLocation(); 
    const [error, setError] = useState(location.state?.message || ""); // <-- Add this state to handle errors
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error
        setLoading(true);
        try {
            // await signin(formData); // Call API function
            navigate("/dashboard"); // Redirect to homepage after successful login
        } catch (error) {
            console.error("Login failed", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }finally {
            setLoading(false); // Hide loading message after response
        }
    };

    return (
        <>
            <div className="bg-slate-950 h-screen w-screen flex flex-col items-center text-white">
                {/* heading */}
                <div className="mt-32 text-center text-sky-blue border-2 border-slate-50 rounded-xl p-5 md:w-[35%] sm:w-[60%] w-[80%]">
                    {/* sign in */}
                    <div className="text-yellow-500 text-5xl font-bold">Login here</div>
                    <br />

                    {/* the form */}
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username"  className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="username" value={formData.username} placeholder="Username" onChange={handleChange} required /> <br /> <br />
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required /> <br /> <br />
                        <button type="submit" disabled={loading} className="border-[1px] p-2 rounded-xl w-[30%] border-slate-600 shadow-sm shadow-yellow-400 hover:shadow-md hover:shadow-yellow-400 ">
                            Login 
                        </button>
                        {loading && <p className="text-[10px] text-sky-500 mt-4">Logging you in...</p>}
                        {error && <p className="text-[10px] text-red-500 mt-4">{error}</p>} {/* Display error message if login fails */}
                    </form> 

                    <br />
                    <div>No account, then create one <a href="/signup" className="underline text-sky-400 ">here</a></div>
                    <br />
                    <div>Forgot password, go <a href="/forgotpassword" className="underline text-yellow-300">here</a></div>
                </div>
            </div>
        </>
    );
}