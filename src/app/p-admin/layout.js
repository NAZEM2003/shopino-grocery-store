import Sidebar from '@/modules/p-admin/Sidebar';
import Topbar from '@/modules/p-admin/Topbar';
import React from 'react';
import styles from "@/styles/p-admin/admin-panel-layout/style.module.css";
import { authUser } from '@/utils/actions';
import { role } from '@/utils/constants';
import { redirect } from 'next/navigation';

const Layout = async ({children}) => {
    const user = await authUser();
    if(!user || user.role != role.admin){
        redirect("/");
    }


    return (
        <div className='overflow-hidden min-h-screen relative' >
            <Topbar user={JSON.parse(JSON.stringify(user))} />
            <div className='flex lg:justify-end'>
                <div className='hidden lg:inline-block w-80 fixed top-20 left-0'>
                    <Sidebar user={JSON.parse(JSON.stringify(user))} />
                </div>
                <div className={`${styles.main_content_container}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
