import React from 'react';
import { authUser } from "@/utils/actions";
import styles from "@/styles/p-user/index/style.module.css";
import InfoBox from '@/components/templates/p-user/index/InfoBox';
import Tickets from '@/templates/p-user/index/Tickets';
import Orders from '@/components/templates/p-user/index/Orders';

const UserPanel = async () => {
    const user = await authUser();
    return (
        <main className='px-3'>
            <section className={`${styles.infoBox_grid_container} w-full`}>
                <InfoBox title="Total Comments" value={25} />
                <InfoBox title="Total Tickets" value={25} />
                <InfoBox title="Total Orders" value={25} />
                <InfoBox title="Total Wishes" value={25} />
            </section>
            <Tickets/>
            <Orders/>
        </main>
    );
}

export default UserPanel;
