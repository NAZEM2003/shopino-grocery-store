import SendTicketForm from '@/components/templates/p-user/tickets/send-ticket/SendTicketForm';
import React from 'react';

const SendTicket = () => {
    return (
        <main className='p-3'>
               <h1 className='text-3xl sm:text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Send New Ticket</h1>
               <SendTicketForm/>
        </main>
    );
}

export default SendTicket;
