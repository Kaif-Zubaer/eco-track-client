import React, { use, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { setUser, userLogin, googleLogin } = use(AuthContext);

    const [showPassword, setShowPassword] = useState(false)
    const [userEmail, setUserEmail] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then((result) => {
                setUser(result.user);
                setTimeout(() => {
                    toast.success('Login Successful')
                }, 300);
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(() => {
                toast.error('Invalid email or password')
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                setUser(result.user);
                setTimeout(() => {
                    toast.success('Login Successful')
                }, 300);
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => {
                toast.error(error.code);
            })
    }

    return (
        <div className='flex flex-col justify-center items-center my-15 mx-8'>
            <h1 className='text-2xl text-center text-primary font-bold mb-6'>Login to EcoTrack</h1>
            <div className='w-full md:w-120 rounded-md px-6 py-12 bg-no-repeat bg-cover bg-center bg-[url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5MC0wNWEta3MwMXF5bGQuanBn.jpg)]'>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col'>
                        <label className='font-bold mb-2'>Email</label>
                        <input onChange={(e) => setUserEmail(e.target.value)} className='bg-white px-4 py-2 outline-0 mb-4 rounded-sm font-bold' type="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='font-bold mb-2'>Password</label>
                        <input className='bg-white px-4 py-2 outline-0 mb-3 rounded-sm font-bold' type={showPassword ? "text" : "password"} name="password" placeholder='Password' required />
                        <div onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-10 cursor-pointer text-gray-600'>
                            {
                                showPassword
                                    ? <IoMdEyeOff className='w-6 h-6 text-accent' />
                                    : <IoMdEye className='w-6 h-6 text-accent' />
                            }
                        </div>
                    </div>
                    <Link to='/auth/forget-password' state={{ userEmail }} className='text-accent text-sm font-bold hover:underline cursor-pointer'>Forget password?</Link>
                    <div className='flex flex-col gap-1 mt-4'>
                        <button className='flex justify-center items-center gap-4 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer' type='submit'>
                            <MdOutlineMailOutline className='text-white w-7 h-7' />
                            Login with Email
                        </button>
                        <button onClick={handleGoogleLogin} className='flex justify-center items-center gap-4 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer' type='button'>
                            <FaGoogle className='text-white w-7 h-7' />
                            Login with Google
                        </button>
                    </div>
                </form>
            </div>
            <p className='mt-5 font-semibold'>Don't have an account? <Link className='font-bold text-primary hover:underline' to='/auth/register'>Register now!</Link></p>
        </div>
    );
};

export default LoginPage;