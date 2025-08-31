import { useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../../store/user.store.js";
import { Link } from "react-router-dom";

const LoginLayout = () => {
    const { login } = useUserStore(); // get login action
    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await login(formData);
        if (res?.success) {
            console.log("Logged in:", res.data);
        } else {
            console.error("Failed to login:", res?.message);
        }
    };

    return (
        <section>
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto"
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
                            type="Email"
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
                        <input
                            type="Password"
                            name="Password"
                            id="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="border-2 border-accentLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accentDark transition"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center" >
                        <span className=" text-[0.65rem] md:text-xs" >
                            Don't have an account? <Link to={'/signup'} className="text-blue-500 hover:underline font-bold" > Register here! </Link>
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
                </motion.section>
            </section>
    );
};

export default LoginLayout;
