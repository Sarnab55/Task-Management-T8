import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkemail } from "../../api";

export default function Forgotpassword(){
    const [formData, setFormData] = useState({ email: ""});
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
            const response = await checkemail(formData); // Call API function
            if (response.status === 200) {
                navigate("/generatepassword"); 
            }// Redirect to homepage after successful login
        } catch (error) {
            console.error("Invalid credential", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Please enter your valid email");
        }finally {
            setLoading(false); // Hide loading message after response
        }
    };

    return (
        <>
            <div className="bg-slate-950 -mb-10 h-screen w-screen flex flex-col items-center text-white">
                {/* heading */}
                <div className="mt-32 text-center text-sky-blue border-2 border-slate-50 rounded-xl p-5 md:w-[60%] sm:w-[60%] w-[80%]">
                    {/* sign in */}
                    <div className="text-green-500 text-3xl font-bold">Forgot password, no worries!</div>
                    <br />

                    {/* the form */}
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="email">Email : </label>
                        <input type="text" id="email"  className="text-white bg-slate-700 ml-2 rounded-xl p-2" name="email" value={formData.email}  onChange={handleChange} required /> <br /> <br />
                        <button type="submit" disabled={loading} className="border-[1px] p-2 rounded-xl w-[30%] border-slate-600 shadow-sm shadow-green-400 hover:shadow-md hover:shadow-green-400 ">
                            Generate new password 
                        </button>
                        {loading && <p className="text-[10px] text-green-500 mt-4">Loading...</p>}
                        {error && <p className="text-[10px] text-red-500 mt-4">{error}</p>} {/* Display error message if login fails */}
                    </form> 

                </div>
            </div>
        </>
    );
}