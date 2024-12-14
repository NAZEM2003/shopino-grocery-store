import { discountCodeSchema } from '@/utils/zod';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Total = ({ cart }) => {
    const fare = 2.5;
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceWithFare, setTotalPriceWithFare] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState();
    const [discountedTotalPrice, setDiscountedTotalPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);


    useEffect(() => {
        if (cart.length) {
            const totalPrice = cart.reduce((prev, current) => prev + (current.price * current.count), 0);
            setTotalPrice(totalPrice)
            setTotalPriceWithFare(totalPrice + fare);
        } else {
            setTotalPrice(0);
        }
    }, [cart]);


    const applyDiscount = async () => {
        const isCodeValid = discountCodeSchema.safeParse(discountCode);
        if (!isCodeValid.success) {
            Swal.fire({
                title: "Operation Failed",
                text: "The Discount Code is Invalid",
                icon: "error"
            });
            return
        };
        if (discount) {
            if (discount.code === discountCode) {
                Swal.fire({
                    title: "Done",
                    text: "Discount Applied Successfully",
                    icon: "success"
                });
                return
            }
        }
        const res = await fetch("/api/discount/use", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: discountCode })
        });
        if (res.status === 500) {
            Swal.fire({
                title: "Operation Failed",
                text: "Somthing went Wrong , Please try again later",
                icon: "error"
            });
            return
        } else if (res.status === 404) {
            Swal.fire({
                title: "Operation Failed",
                text: "The Discount Code is Invalid",
                icon: "error"
            });
            setDiscount('');
            setDiscountPercent(0);
            setDiscountedTotalPrice(0);
            return;
        } else if (res.status === 422) {
            Swal.fire({
                title: "Operation Failed",
                text: "The Discount Code has Expired",
                icon: "error"
            });
            setDiscount('');
            setDiscountPercent(0);
            setDiscountedTotalPrice(0);
            return;
        } else if (res.status === 200) {
            const resData = await res.json();
            setDiscount(resData);
            Swal.fire({
                title: "Done",
                text: "Discount Applied Successfully",
                icon: "success"
            });
            const disPercent = resData.percent;
            setDiscountPercent(disPercent);
            const discountedPrice = totalPriceWithFare - (totalPriceWithFare * disPercent) / 100
            setDiscountedTotalPrice(discountedPrice.toFixed(2));
            return
        }
    }

    return (
        <div className='p-1 w-full max-w-md flex flex-col items-center border border-zinc-400 rounded-md lg:mt-32 lg:w-[400px] mx-auto'>
            <h1 className='mt-5 mb-9 text-xl font-semibold text-zinc-800 text-center'>Total Shopping Cart</h1>
            <div className='w-full flex items-center justify-between text-lg font-medium'>
                <p>Total Amount</p>
                <p>{totalPrice} $</p>
            </div>
            <div className='w-full flex items-center justify-between text-lg font-medium my-6'>
                <p>Transportation Fare</p>
                <p>{fare} $</p>
            </div>
            <div className='w-full flex items-center justify-between text-lg font-medium mt-10 p-2 border-t border-t-zinc-400'>
                <p>Total</p>
                {
                    discount ? <div>
                        <del className='text-zinc-600'>{totalPriceWithFare} $</del>
                        <p className='my-2'>{discountPercent}% OFF</p>
                        <p className='bg-zinc-800 rounded p-1 text-slate-200 text-center font-semibold'>{discountedTotalPrice} $</p>
                    </div> : <p>{totalPriceWithFare} $</p>
                }

            </div>

            <form action={applyDiscount} className='w-full flex flex-col my-4 sm:flex-row justify-center'>
                <input
                    className='outline-none rounded-md border border-zinc-400 p-2 text-lg font-medium text-zinc-800 sm:w-7/12 sm:rounded-r-none'
                    type="text"
                    placeholder='Discount Code'
                    value={discountCode}
                    onChange={e => setDiscountCode(e.target.value)}
                />
                <button
                    className='w-max border border-zinc-800 rounded-md outline-none mt-3 p-2 text-lg font-medium text-zinc-800 transition-all duration-200 hover:bg-zinc-800 hover:text-slate-200 sm:mt-0 sm:rounded-l-none'
                    type='submit'
                >Apply Discount</button>
            </form>

            <button className='p-2 w-10/12 mt-10 mb-3 rounded-md border border-custom-dark-blue text-custom-dark-blue font-semibold hover:text-slate-200 hover:bg-custom-dark-blue transition-all duration-200'>Continue / Pay</button>
        </div>
    );
}

export default Total;
