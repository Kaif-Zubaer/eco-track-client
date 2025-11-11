import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ForgetPasswordPage = () => {
    const { forgetpassword } = use(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const passedEmail = location.state?.userEmail || "";

    const [showEmail, setShowEmail] = useState(passedEmail);

    const handleForgetPassword = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;

        forgetpassword(email)
            .then(() => {
                window.open('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&dsh=S1176253537%3A1762872865013116&ifkv=ARESoU0maYU--F8fpI_qpmePYNAcStMAj0hSHxHcIB8rkH2kQa_GcQ26mWmrGZwKyYT_4Hd2wAa6Ng&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin', '_blank');
                setTimeout(() => {
                    toast.info('Check your email!!')
                }, 300);
                navigate("/auth/login");
            })
    }

    return (
        <div>
            <div className='flex flex-col justify-center items-center my-15 mx-8'>
                <h1 className='text-xl text-center text-primary font-bold mb-10 border-b-2 pb-2 w-full md:w-120'>Forget password?</h1>
                <h1 className='text-xl text-center text-accent font-bold mb-6'>Enter your email <br /> We'll send you a link to get back into your account.</h1>
                <div className='w-full md:w-120 rounded-md px-6 py-12 bg-no-repeat bg-cover bg-center bg-[url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5MC0wNWEta3MwMXF5bGQuanBn.jpg)]'>
                    <form onSubmit={handleForgetPassword}>
                        <div className='flex flex-col'>
                            <label className='font-bold mb-2'>Email</label>
                            <input className='bg-white px-4 py-2 outline-0 mb-4 rounded-sm font-bold' value={showEmail} onChange={(e) => setShowEmail(e.target.value)} type="email" name="email" placeholder='Enter your email' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <button className='flex justify-center items-center gap-2 bg-accent text-white font-semibold p-2 rounded-sm border-2 hover:opacity-85 duration-300 cursor-pointer'>
                                Send Login Link
                            </button>
                        </div>
                    </form>
                </div>
                <Link className='font-bold text-primary hover:underline mt-5' to='/auth/login'>Back to Login!!</Link>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;