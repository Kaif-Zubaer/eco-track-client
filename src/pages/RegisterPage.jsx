import React, { use, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const { createUser, googleLogin, setUser, userUpdate } = use(AuthContext);

    const navigate = useNavigate();

    const [errorName, setErrorName] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;

        if (name.length < 4) {
            setErrorName('Enter at least 4 chars...');
            return;
        }
        else {
            setErrorName('');
        }

        const email = form.email.value;
        const photo = form.photo.value;

        const password = form.password.value;

        if (password.length < 6) {
            return setErrorPass('At least 6 characters!!');
        }
        if (!/[a-z]/.test(password)) {
            return setErrorPass('Include a lowercase letter!!');
        }
        if (!/[A-Z]/.test(password)) {
            return setErrorPass('Include an uppercase letter!!');
        }
        if (!/[0-9]/.test(password)) {
            return setErrorPass('Include a number!!');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return setErrorPass('Include a special character!!');
        }
        else {
            setErrorPass('');
        }

        createUser(email, password)
            .then(result => {
                userUpdate({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...result.user, displayName: name, photoURL: photo });
                        setTimeout(() => {
                            toast.success('Registration Successful')
                        }, 300);
                        navigate("/");
                    })
                    .catch((error) => {
                        toast.error(error.code);
                        setUser(result.user);
                    });
            })
            .catch(error => {
                toast.error(error.code);
            })

        form.reset();
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                setUser(result.user);
                setTimeout(() => {
                    toast.success('Registration Successful')
                }, 300);
                navigate("/");
            })
            .catch(error => {
                toast.error(error.code);
            })
    }

    return (
        <div className='flex flex-col justify-center items-center my-15 mx-8'>
            <h1 className='text-xl text-center text-primary font-bold mb-6'>Start Your Sustainability Journey <br /> with EcoTrack</h1>
            <div className='w-full md:w-120 rounded-md px-6 py-8 bg-no-repeat bg-cover bg-center bg-[url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5MC0wNWEta3MwMXF5bGQuanBn.jpg)]'>
                <form onSubmit={handleSignup}>
                    <div className='flex flex-col'>
                        <label className='font-bold mb-2'>Name</label>
                        <input className={`bg-white px-4 py-2 outline-0 ${errorName ? 'mb-1.5' : 'mb-4'} rounded-sm font-bold`} type="text" name='name' placeholder='Enter your name' required />
                        {
                            errorName &&
                            <p className='text-sm font-bold text-red-600 mb-4'>{errorName}</p>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold mb-2'>Email</label>
                        <input className='bg-white px-4 py-2 outline-0 mb-4 rounded-sm font-bold' type="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold mb-2'>Photo URL</label>
                        <input className='bg-white px-4 py-2 outline-0 mb-4 rounded-sm font-bold' type="text" name='photo' placeholder='Enter your photo URL' required />
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='font-bold mb-2'>Password</label>
                        <input className={`bg-white px-4 py-2 outline-0 rounded-sm font-bold pr-11 ${errorPass ? 'mb-1.5' : 'mb-3'}`} type={showPassword ? "text" : "password"} name="password" placeholder='Password' required />
                        {
                            errorPass &&
                            <p className='text-sm font-bold text-red-600 mb-4'>{errorPass}</p>
                        }
                        <div onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-10 cursor-pointer text-gray-600'>
                            {
                                showPassword
                                    ? <IoMdEyeOff className='w-6 h-6 text-accent' />
                                    : <IoMdEye className='w-6 h-6 text-accent' />
                            }
                        </div>
                    </div>
                    <div className='mb-4 flex gap-1'>
                        <input className='w-4 h-4' type="checkbox" required />
                        <label className='text-accent text-sm font-bold'>Accept Terms & Conditions</label>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <button className='flex justify-center items-center gap-2 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer' type='submit'>
                            <MdOutlineMailOutline className='text-white w-7 h-7' />
                            Sign up with Email
                        </button>
                        <button onClick={handleGoogleLogin} className='flex justify-center items-center gap-2 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer' type='button'>
                            <FaGoogle className='text-white w-7 h-7' />
                            Sign up with Google
                        </button>
                    </div>
                </form>
            </div>
            <p className='mt-5 font-semibold'>Already have an account? <Link className='font-bold text-primary hover:underline' to='/auth/login'>Login</Link></p>
        </div>
    );
};

export default RegisterPage;