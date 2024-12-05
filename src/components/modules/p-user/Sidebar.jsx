"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FcSearch } from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";
import { FcPaid, FcAnswers, FcComments, FcLike, FcAbout, FcDownLeft } from 'react-icons/fc';
import styles from "@/styles/p-user/sidebar/style.module.css";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isShown, user }) => {
    const router = useRouter();
    const logoutHandler = async () => {
        Swal.fire({
            title: "Attention",
            icon: "warning",
            text: "are You sure You want to Log Out of Your Account?",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: "#a55",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch("/api/auth/signout", {
                    method: "POST"
                });
                if (res.status === 200) {
                    router.replace("/")
                }
                else {
                    Swal.fire({
                        title: "Operation Failed",
                        icon: "error",
                        text: "Somthing went wrong.Please try again later!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#333",
                    });
                    return
                }
            }
        })
    }

    return (
        <nav className={`${styles.sidebar_container} ${isShown ? "right-3" : "-right-96"} shadow shadow-zinc-500 lg:h-screen bg-slate-200 `}>


            <h2 className='w-full text-lg hidden sm:inline-block text-center border-b border-b-zinc-300 p-2 mt-5 mx-auto text-zinc-800 font-semibold'>
                Welcome Dear <span>{user.name}</span>
            </h2>

            <div className='flex items-center w-full sm:hidden'>
                <div className='w-16 h-16 relative rounded-full overflow-hidden'>
                    <Image src={user.img} alt='logo' fill />
                </div>
                <div className='ml-5 '>
                    <h2 title={user.name} className='text-xl cursor-pointer text-zinc-800 font-semibold'>{user.name.length > 16 ? `${user.name.slice(0, 10)} ...` : user.name}</h2>
                    <p className='mt-1 text-sm text-zinc-700'>{user.role}</p>
                </div>
            </div>

            <div className='relative flex my-8 h-10 lg:hidden items-center'>
                <input className='outline-none border border-r-0 h-full border-zinc-400 rounded-l-md p-1 text-lg w-9/12 text-zinc-700 font-semibold' type="text" placeholder='Search...' />
                <button className='text-2xl w-3/12 h-full bg-slate-200 rounded-r-md p-1 border border-zinc-400 flex items-center justify-center'><FcSearch /></button>
            </div>

            <ul className={`${styles.nav_list_container} lg:pl-2`}>
                <li><Link className='hover:text-custom-light-blue' href="/p-user">Counter <FcDownLeft className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/orders">Orders <FcPaid className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/tickets">Tickets <FcAnswers className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/comments">Comments <FcComments className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/wishlist">Wishlist <FcLike className='ml-2' /></Link></li>
                <li><Link className='hover:text-custom-light-blue' href="/p-user/account-details">Account Details <FcAbout className='ml-2' /></Link></li>
            </ul>
            <button onClick={logoutHandler} className='flex items-center p-2 lg:ml-4 my-5 border text-red-500 font-semibold border-red-500 transition-all hover:bg-red-500 hover:text-slate-200 rounded-md'>Log out <IoLogOutOutline className='text-xl ml-2' /></button>
        </nav>
    );
}

export default Sidebar;
