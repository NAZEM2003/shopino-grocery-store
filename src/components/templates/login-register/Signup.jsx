"use client"
import SubmitBtn from '@/components/modules/buttons/SubmitBtn';
import { loginRegisterMethods } from '@/utils/constants';
import { signupSchema } from '@/utils/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter()
    const formRef = useRef();
    
    const signup = async () => {
        // data validation
        const isValidData = signupSchema.safeParse({ name , email , password });
        if (!isValidData.success) {
            Swal.fire({
                title: "Sign Up failed",
                icon: "error",
                text: isValidData.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
        if (confirmPassword !== password) {
            Swal.fire({
                title: "Sign Up faild",
                icon: "error",
                text: "Password Confirmation is not the same as Password",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
        // data validation end
        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("img", img)
        //send request
        const res = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        if (res.status === 201) {
            //reset the inputs
            formRef.current.reset();
            setConfirmPassword("")
            setPassword("");
            setName("");
            setEmail("");
            Swal.fire({
                title: "Done",
                icon: "success",
                text: "you have successfully Signed Up",
                confirmButtonText: "Ok",
                confirmButtonColor: "#499"
            }).then(()=>{
                router.replace("/")
            })
            return true
        } else {
            Swal.fire({
                title: "Sign Up faild",
                icon: "error",
                text: data.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }

    }
    return (
        <form ref={formRef} action={signup} className='w-64 sm:w-80 flex flex-col items-center bg-slate-200 text-zinc-800 mx-auto  mt-20 sm:ml-32 rounded-md px-4'>
            <h2 className='my-5 text-2xl font-semibold'>Sign Up</h2>
            <div className='flex w-full items-center'>
                <label className='w-5/12 text-zinc-700 font-semibold text-sm' htmlFor="img">Choose Picture :</label>
                <input onChange={(e) => setImg(e.target.files[0])} name='img' id='img' className='my-5 p-2 outline-none text-sm rounded shadow-md shadow-zinc-400 w-7/12' type="file" />
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} name='name' className='my-5 p-2 outline-none rounded shadow-md shadow-zinc-400 w-full' type="text" placeholder='Name...' />
            <input value={email} onChange={(e) => setEmail(e.target.value)} name='email' className='my-5 p-2 outline-none rounded shadow-md shadow-zinc-400 w-full' type="email" placeholder='Email...' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' className='my-5 p-2 outline-none rounded shadow-md shadow-zinc-400 w-full' type="password" placeholder='password...' />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirm_password' className='my-5 p-2 outline-none rounded shadow-md shadow-zinc-400 w-full' type="password" placeholder='Confirm Password...' />
            <SubmitBtn text="Sign Up" />
            <p className='my-7 text-zinc-700'>already Have an Account? <Link className='text-custom-dark-blue' href={`/login-register/?method=${loginRegisterMethods.signin}`}>Sign In</Link></p>

        </form>
    );
}

export default Signup;
