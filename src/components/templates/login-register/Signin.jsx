"use client"
import SubmitBtn from '@/modules/buttons/SubmitBtn';
import { loginRegisterMethods } from '@/utils/constants';
import { signinSchema } from '@/utils/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signin = async () => {
        const userData = {
            email,
            password
        };
        const isUserDataValid = signinSchema.safeParse(userData);
        if (!isUserDataValid.success) {
            Swal.fire({
                title: "Sign in failed",
                icon: "error",
                text: isUserDataValid.error.issues[0].message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            })
            return false;
        }
        const res = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (res.status === 200) {
            setEmail("");
            setPassword("");
            Swal.fire({
                title: "Done",
                icon: "success",
                text: "you have successfully Signed In",
                confirmButtonText: "Ok",
                confirmButtonColor: "#499"
            }).then(()=>{
                router.replace("/");
            })
        } else{
            Swal.fire({
                title: "Sign in failed",
                icon: "error",
                text: data.message,
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return false
        }
    }

    return (
        <form action={signin} className='w-64 sm:w-80 flex flex-col items-center bg-slate-200 text-zinc-800 mx-auto  mt-20 sm:ml-32 rounded-md px-4'>
            <h2 className='my-5 text-2xl font-semibold'>Sign in</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='my-5 p-2 outline-none rounded shadow-md shadow-zinc-400 w-full' type="email" placeholder='Email...' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='my-5 p-2 outline-none rounded shadow-md shadow-zinc-400 w-full' type="password" placeholder='password...' />
            <SubmitBtn text="Sign In" />
            <p className='my-7 text-zinc-700'>Have no Account? <Link className='text-custom-dark-blue' href={`/login-register/?method=${loginRegisterMethods.signup}`}>Sign Up</Link></p>
        </form>
    );
}

export default Signin;
