import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Generatepassword(){
    const [formData, setFormData] = useState({ password: "", confirmpassword: ""});
    const location = useLocation(); 
    const [error, setError] = useState(location.state?.message || "");
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
            // await signin(formData); // --> the backend logic here
            navigate("/"); // Redirect to homepage after successful login
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
                <div className="mt-32 text-center text-sky-blue border-2 border-slate-50 rounded-xl p-5 md:w-[60%] sm:w-[60%] w-[80%]">
                    {/* sign in */}
                    <div className="text-green-500 text-3xl font-bold">Generate new password here</div>
                    <br />

                    {/* the form */}
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="password">New Password: </label>
                        <input type="password" id="password"  className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="password" value={formData.password} placeholder="enter new password" onChange={handleChange} required /> <br /> <br />
                        <label htmlFor="confirmpassword">Confirm password: </label>
                        <input type="password" id="confirmpassword"  className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="confirmpassword" value={formData.confirmpassword} placeholder="Confirm new password" onChange={handleChange} required /> <br /> <br />
                        <button type="submit" disabled={loading} className="border-[1px] p-2 rounded-xl w-[30%] border-slate-600 shadow-sm shadow-green-400 hover:shadow-md hover:shadow-green-400 ">
                            Set new password 
                        </button>
                        {loading && <p className="text-[10px] text-green-500 mt-4">Loading...</p>}
                        {error && <p className="text-[10px] text-red-500 mt-4">{error}</p>} {/* Display error message if login fails */}
                    </form> 

                </div>
            </div>
        </>
    );


}