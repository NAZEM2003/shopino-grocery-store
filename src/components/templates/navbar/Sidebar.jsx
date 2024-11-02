"use client"
import { loginRegisterMethods } from '@/utils/constants';
import Link from 'next/link';
import React from 'react';
import { FaAngleDown, FaSignInAlt } from 'react-icons/fa';
import { FcAbout, FcHome, FcRules, FcShop, FcViewDetails, FcVoicePresentation, FcWikipedia } from 'react-icons/fc';

const Sidebar = ({ isShown, isLogin }) => {
    return (
        <nav className={`absolute z-20 w-64 h-max bg-slate-200 ${isShown ? "right-4" : "-right-72"} top-20 transition-all duration-500 rounded-lg  shadow shadow-zinc-500`}>

            <ul className='flex flex-col items-center justify-center [&>*]:p-3 [&>*]:[&>*]:transition-all  [&>*]:text-zinc-800'>
                <li>
                    <Link className='hover:text-custom-light-blue flex items-center' href="/">Home <FcHome className="ml-1" /></Link>
                </li>
                <li>
                    <Link className='hover:text-custom-light-blue flex items-center' href="/shop">Shop <FcShop className="ml-1" /></Link>
                </li>
                <li>
                    <Link className='hover:text-custom-light-blue flex items-center' href="/blog">Blog <FcWikipedia className="ml-1" /></Link>
                </li>
                <li>
                    <Link className='hover:text-custom-light-blue flex items-center' href="/contact-us">Contact Us <FcVoicePresentation className="ml-1" /></Link>
                </li>
                <li>
                    <Link className='hover:text-custom-light-blue flex items-center' href="/about">About Us <FcAbout className="ml-1" /></Link>
                </li>
                <li>
                    <Link className='hover:text-custom-light-blue flex items-center' href="/rules">Rules <FcRules className="ml-1" /></Link>
                </li>
                <li className='group relative'>
                    {
                        isLogin ? <>
                            <Link className='hover:text-custom-light-blue flex items-center' href="/p-user">
                                Account <FaAngleDown className='ml-2 hidden sm:inline-block' />  <FcViewDetails className="ml-1" />
                            </Link>
                            <ul className='sm:group-hover:inline-block hidden absolute -top-5 bg-slate-200 p-4 w-max [&>*]:p-2 right-32 z-10 rounded-md shadow shadow-zinc-500'>
                                <li><Link className='hover:text-custom-light-blue' href="/p-user/orders">Orders</Link></li>
                                <li><Link className='hover:text-custom-light-blue' href="/p-user/tickets">Ticket</Link></li>
                                <li><Link className='hover:text-custom-light-blue' href="/p-user/comments">comments</Link></li>
                                <li><Link className='hover:text-custom-light-blue' href="/p-user/wishlist">Wishlist</Link></li>
                                <li><Link className='hover:text-custom-light-blue' href="/p-user/account-details">Account Details</Link></li>
                            </ul>
                        </> : <Link href={`/login-register/?method=${loginRegisterMethods.signin}`} className='hover:text-custom-light-blue flex items-center' >
                            Sign in <FaSignInAlt className='ml-2 text-cyan-500' />
                        </Link>
                    }


                </li>
            </ul>

        </nav>
    );
}

export default Sidebar;
