import ChangePasswordForm from '@/components/templates/p-user/account-details/ChangePasswordForm';
import UserDataForm from '@/components/templates/p-user/account-details/UserDataForm';
import React from 'react';

const AccountDetails = () => {
    return (
        <main className='px-3'>
            <h1 className='text-3xl sm:text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Account Details</h1>
            <div className='flex flex-col md:flex-row flex-wrap justify-between xl:justify-around'>
                <UserDataForm />
                <ChangePasswordForm />
            </div>
        </main>
    );
}

export default AccountDetails;
