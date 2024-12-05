import Link from 'next/link';
import React, { use } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import TicketBox from './TicketBox';
import { authUser, getRecentTickets } from '@/utils/actions';

const Tickets = async ({ userID }) => {
    const tickets = await getRecentTickets(userID);
    
    return (
        <section>
            <div className='mt-16 flex items-center justify-between'>
                <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Recent Tickets</h2>
                <Link className='flex items-center sm:text-lg text-base text-zinc-800 hover:text-custom-light-blue transition-all' href="/p-user/tickets">All Tickets <FaArrowRightLong className='ml-2 text-xl' /></Link>
            </div>
            <div className='mt-10 '>
                {
                    tickets.length > 0 ?
                        tickets.map(ticket => <TicketBox key={ticket._id} ticket={ticket}/>)
                        : <h2 className='text-center text-2xl text-zinc-800 font font-semibold my-20'>There is no Ticket!</h2>
                }
            </div>
        </section>
    );
}

export default Tickets;
