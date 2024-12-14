import Image from 'next/image';
import React from 'react';

const CartItemBox = ({ name, img, price, count }) => {
    return (
        <div className='p-2 border border-zinc-500 rounded-lg my-12 max-w-md mx-auto sm:max-w-[600px]'>

            <div className='sm:flex items-center'>
                <div className='flex items-center min-w-52 w-full max-w-80'>
                    <div className='relative w-16 h-16 min-w-14'>
                        <Image src={img} fill />
                    </div>
                    <h1 className='ml-5 text-xl font-semibold text-zinc-800 max-w-60 text-wrap'>{name}</h1>
                </div>

                <div className='flex items-center mt-5 sm:mt-0 sm:ml-5'>
                    <p className='text-lg font-semibold text-zinc-800'>Price :</p>
                    <p className='ml-10 text-lg font-medium'>{price.toLocaleString()} $</p>
                </div>
            </div>

            <div className='sm:flex items-center sm:mt-7'>
                <div className='flex items-center my-4 sm:max-w-64 w-full'>
                    <p className='text-lg font-semibold text-zinc-800'>Number :</p>
                    <div className='ml-10 text-lg font-medium flex items-center'>
                        <button className='w-8 h-8 border border-custom-dark-blue rounded-md text-custom-dark-blue hover:bg-custom-dark-blue hover:text-slate-200'>-</button>
                        <p className='mx-3'>{count}</p>
                        <button className='w-8 h-8 border border-custom-dark-blue rounded-md text-custom-dark-blue hover:bg-custom-dark-blue hover:text-slate-200'>+</button>
                    </div>
                </div>

                <div className='flex items-center sm:ml-'>
                    <p className='text-lg font-semibold text-zinc-800'>Plural Part :</p>
                    <p className='ml-10 text-lg font-medium'>{(price * count).toFixed(2)} $</p>
                </div>
            </div>
        </div>
    );
}

export default CartItemBox;
