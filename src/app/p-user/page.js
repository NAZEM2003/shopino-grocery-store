import React from 'react';
import { authUser, getUserComments, getUserTickets, getUserWishlist } from "@/utils/actions";
import styles from "@/styles/p-user/index/style.module.css";
import InfoBox from '@/components/modules/box/InfoBox';
import Tickets from '@/templates/p-user/index/Tickets';
import Orders from '@/components/templates/p-user/index/Orders';

const UserPanel = async () => {
    const user = await authUser();
    const comments = await getUserComments(user._id);
    const tickets = await getUserTickets(user._id);
    const wishes = await getUserWishlist(user._id);
    return (
        <main className='px-3'>
            <section className={`${styles.infoBox_grid_container} w-full`}>
                <InfoBox title="Total Comments" value={comments.length} />
                <InfoBox title="Total Tickets" value={tickets.length} />
                <InfoBox title="Total Orders" value={25} />
                <InfoBox title="Total Wishes" value={wishes.length} />
            </section>
            <Tickets userID={user._id}/>
            <Orders/>
        </main>
    );
}

export default UserPanel;
