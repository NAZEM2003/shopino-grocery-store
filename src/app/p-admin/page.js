import InfoBox from '@/modules/box/InfoBox';
import React from 'react';
import styles from "@/styles/p-admin/index/style.module.css";
import SaleChart from '@/components/templates/p-admin/index/SaleChart';
import GrowthRate from '@/components/templates/p-admin/index/GrowthRate';
const AdminPanel = () => {
    return (
        <main className='px-3'>
            <section className={`${styles.infoBox_grid_container} w-full`}>
                <InfoBox title="Received Tickets" value={11} />
                <InfoBox title="Total Products" value={256} />
                <InfoBox title="Total Orders" value={25} />
                <InfoBox title="Total Users" value={45} />
            </section>
            <section className='flex flex-col items-center '>
                <SaleChart/>
                <GrowthRate/>
            </section>
        </main>
    );
}

export default AdminPanel;
