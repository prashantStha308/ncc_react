import { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../../store/user.store.js";
import { Link, useNavigate } from "react-router-dom";
import BasicLoader from "../../Components/Loaders/BasicLoader.jsx";
import RevealingEye from "../../Components/icons/RevealingEye.jsx";

const LoginLayout = () => {
    const { login } = useUserStore(); // get login action
    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    });
    const [revealPassword, setRevealPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const naviage = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const toggleReveal = () => {
        setRevealPassword(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await login(formData);
            if (!res?.success) {
                throw new Error (res?.message);
            }
            console.log("Logged in:", res.data);
            naviage('/todo');
        } catch (error) {
            setError(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading) {
        return <BasicLoader />
    }

    return (
        <section className="min-h-screen flex justify-center items-center" >
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md m-auto"
            >
                <h1 className="text-2xl font-bold text-accentDark mb-6 text-center">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-semibold text-textDark">
                            Email
                        </label>
                        <input
                            type="email"
                            name="Email"
                            id="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="border-2 border-accentLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentDark transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-semibold text-textDark">
                            Password
                        </label>
                        <div className="border-2 border-accentLight rounded-lg px-3 py-2 flex justify-between items-center transition-all duration-200 focus-within:ring-2 focus-within:ring-accentDark" >
                            <input
                                type={ revealPassword ? "text" : "password" }
                                name="Password"
                                id="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="outline-none w-full"
                                required
                            />
                            <RevealingEye toggle={toggleReveal} revealState={revealPassword} />
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-2" >

                        <span className="text-xs flex gap-2" >
                            <input type="checkbox" name="rememberMe" id="rememberMe" className="cursor-pointer accent-accentDark" />
                            <label htmlFor="rememberMe" className="cursor-pointer" > Keep me logged in </label>
                        </span>

                        <span className=" text-[0.65rem] md:text-xs" >
                            Don't have an account? <Link to={'/register'} className="text-blue-500 hover:underline font-bold" > Register here! </Link>
                        </span>
                    </div>

                    <motion.button
                        whileHover={{
                            scale: 0.98
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        type="submit"
                        className="bg-accentDark text-white font-semibold py-2 rounded-lg hover:bg-accentLight hover:text-textDark transition cursor-pointer shadow"
                    >
                        Login
                    </motion.button>

                </form>
                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">
                        {error.message || error.toString()}
                    </p>
                )}
            </motion.section>
        </section>
    );
};

export default LoginLayout;
