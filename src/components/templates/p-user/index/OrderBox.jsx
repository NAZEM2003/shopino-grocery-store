import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OrderBox = ({ name, img, price, isCompleted, date }) => {
    return (
        <Link href={`/p-user/orders/id`} className='w-full rounded-md text-slate-200 bg-zinc-700 p-3 my-5 sm:my-10 inline-block sm:flex items-center justify-between max-w-2xl'>
            <div className=''>
                <div className='flex items-center '>
                    <div className='w-14 h-14 relative rounded-xl bg-slate-200 overflow-hidden z-0'>
                        <Image src={img} fill  />
                    </div>
                    <h2 className='text-2xl ml-3 '>{name}</h2>
                </div>
                <p className={`my-4 sm:mb-0 sm:mt-5 ${isCompleted ? "text-green-500" : "text-red-500"}`}>{
                    isCompleted ? "Completed" : "Not Completed"
                }</p>
            </div>
            <div className='flex flex-col-reverse sm:flex-col h-full '>
                <p className='mt-4 sm:mt-0 ml-auto text-zinc-400'>{date}</p>
                <p className={`font-semibold sm:text-center tracking-wider sm:mt-5`}>
                    {price} $
                </p>
            </div>
        </Link>
    );
}

export default OrderBox;
