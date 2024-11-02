import React from 'react';
import { FcCheckmark, FcNews } from "react-icons/fc";

const Newsletter = () => {
    return (
        <div className='w-3/12 p-2 max-w-96 min-w-60'>
            <h2 className='flex items-center text-2xl'>Newsletter <FcNews className='ml-2'/></h2>
            <p className='text-lg text-justify leading-loose my-5'>be aware of the latest News and Discounts of Shopino by subscribing to the Newslatter.</p>
            <div className='mt-4 relative w-full'>
                <input className='p-2 w-full rounded-md outline-none border-none text-zinc-800 text-lg' type="email" placeholder='Email...' />
                <button className='text-4xl absolute right-0 top-0 p-1 rounded-r-md border-l border-zinc-400'><FcCheckmark/></button>
            </div>
        </div>
    );
}

export default Newsletter;
