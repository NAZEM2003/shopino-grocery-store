"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link';
import { authUser, getUserWish } from '@/utils/actions';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { loginRegisterMethods } from '@/utils/constants';

const ProductCard = ({ img, name, price, off, _id }) => {
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const checkIsInWishlist = async () => {
        const user = await authUser();
        if (user) {
            const isInWish = await getUserWish(user._id, _id);
            setIsInWishlist(!!isInWish);
        }
    }
    useEffect(() => {
        checkIsInWishlist();
    }, [])
    const removeFromWishlist = async () => {
        const user = await authUser();
        const data = {
            user: user._id,
            product: _id
        };
        const res = await fetch("/api/wishlist", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            Swal.fire({
                title: "Operation was Successful",
                icon: "success",
                text: "the Product has been Successfully removed from Wishlist ",
                confirmButtonText: "Ok",
                confirmButtonColor: "#353"
            });
            checkIsInWishlist();
            return
        } else if (res.status === 400) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "User or Product Not found!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        else {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Somthing went wrong Please try again later!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
    }
    const addToWishlist = async () => {
        const user = await authUser();
        if (!user) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Please Log in to your Account first!",
                showDenyButton: true,
                denyButtonText: "cancel",
                confirmButtonText: "Login",
                confirmButtonColor: "#333"
            }).then((response) => {
                if (response.value) {
                    router.push(`/login-register/?method=${loginRegisterMethods.signin}`);
                    return false
                }
                return false

            });
            return false;
        }
        const data = {
            user: user._id,
            product: _id
        }
        const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.status === 201) {
            Swal.fire({
                title: "Operation was Successful",
                icon: "success",
                text: "the Product added to your wishlist Successfully",
                confirmButtonText: "Ok",
                confirmButtonColor: "#353"
            });
            checkIsInWishlist();
            return
        }
        else if (res.status === 400) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Invalid ID format!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        else if (res.status === 404) {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "User or Product Not found!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
        else {
            Swal.fire({
                title: "Operation failed",
                icon: "error",
                text: "Somthing went wrong Please try again later!",
                confirmButtonText: "Ok",
                confirmButtonColor: "#333"
            });
            return
        }
    }
    return (
        <div className='w-64 h-96 flex flex-col items-center border border-zinc-400 rounded-lg m-3 relative p-2 mx-auto'>
            <div className='w-full h-3/6 flex items-center justify-center'>
                <Link href={`/product/${_id}`}>
                    <Image className='w-32 h-32' src={img} width={150} height={150} alt='product' />
                </Link>

                <button onClick={isInWishlist ? removeFromWishlist : addToWishlist} title={isInWishlist ? "remove from Wishlist" : "Add to Wishlist"} className='absolute top-3 text-red-500 left-3 text-3xl'>
                    {
                        isInWishlist ? <FcLike /> : <FaRegHeart />
                    }
                </button>
            </div>
            <Link href={`/product/${_id}`} className='text-center flex items-center justify-center mt-3 font-semibold h-12'>
                {
                    name.length > 50 ? `${name.substring(0, 47)}...` : name
                }
            </Link>
            <div className='text-center mt-4 h-14 flex flex-col items-center justify-center'>
                <p className='text-lg font-semibold'>
                    {
                        off ? `${(price - (price * off / 100)).toFixed(2)} $`
                            : `${price} $`
                    }
                </p>
                <del className={`${!off && "hidden"} text-zinc-600`}>
                    {
                        price
                    }
                    $
                </del>
            </div>
            <button className='border mt-3 border-inc-400 p-2 rounded-md font-semibold text-lg bg-custom-dark-blue border-custom-dark-blue text-slate-200 hover:text-custom-dark-blue hover:bg-slate-200 transition-all duration-300'>Add to Cart</button>
        </div>
    );
}

export default ProductCard;
