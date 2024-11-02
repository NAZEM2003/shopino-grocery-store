import Link from 'next/link';
import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import TicketBox from './TicketBox';

const Tickets = () => {
    return (
        <section>
            <div className='mt-16 flex items-center justify-between'>
                <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Recent Tickets</h2>
                <Link className='flex items-center sm:text-lg text-base text-zinc-800 hover:text-custom-light-blue transition-all' href="/p-user/tickets">All Tickets <FaArrowRightLong className='ml-2 text-xl'/></Link>
            </div>
            <div className='mt-10 '>
                <TicketBox title="problem in the player" department="Support" isAnswerd={false} date="12/06/20024 13:50"/>

                <TicketBox title="no return of funds to the account" department="Finance" isAnswerd={true} date="14/03/20024 14:02"/>

                <TicketBox title="problem in the player" department="support" isAnswerd={false} date="02/12/20024 07:00"/>

                <TicketBox title="problem in the player" department="support" isAnswerd={false} date="03/02/20024 15:30"/>

                {/* <h2 className='text-center text-2xl text-zinc-800 font font-semibold my-20'>There is no Ticket!</h2> */}
            </div>
        </section>
    );
}

export default Tickets;
