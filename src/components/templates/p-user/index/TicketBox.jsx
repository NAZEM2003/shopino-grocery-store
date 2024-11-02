import Link from 'next/link';
import React from 'react';

const TicketBox = ({title , department , date ,isAnswerd}) => {
    return (
        <Link href={`/p-user/tickets/id`} className='w-full rounded-md text-slate-200 bg-zinc-700 p-3 my-5 sm:my-10 inline-block sm:flex items-center justify-between max-w-2xl'>
            <div className=''>
                <h2 className='text-xl'>{title}</h2>
                <p className='my-4 sm:mb-0 sm:mt-5'>{department} Department</p>
            </div>
            <div className='flex flex-col-reverse sm:flex-col h-full '>
                <p className='mt-4 sm:mt-0 ml-auto text-zinc-400'>{date}</p>
                <p className={`${isAnswerd ? "text-green-500" :"text-red-500"} font-semibold tracking-wider sm:mt-5`}>
                    {
                        isAnswerd?"Answerd":"Not Answerd"
                    }
                </p>
            </div>
        </Link>
    );
}

export default TicketBox;
