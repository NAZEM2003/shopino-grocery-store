import { authUser, getUserWishlist } from '@/utils/actions';
import React from 'react';
import styles from "@/styles/p-user/wishlist/style.module.css";
import WishBox from '@/components/templates/p-user/wishlist/WishBox';
import { revalidatePath } from 'next/cache';
const Wishlist = async () => {
    const user = await authUser();
    const wishlist = await getUserWishlist(user._id);
    const revalidatePage =async ()=>{
        "use server"
        revalidatePath("/p-user/wishlist","page")
    }

    return (
        <main className='p-2'>
            <h1 className='text-4xl text-zinc-800 font-semibold p-2 mt-5 border-b border-b-zinc-400'>Wishlist</h1>
            {
                wishlist.length ?
                    <div className={styles.wishlist_container}>
                        {
                            wishlist.map(wish => <WishBox revalidate={revalidatePage} key={wish._id} {...wish.product} />)
                        }
                    </div>
                    : <h1 className='text-center mx-auto mt-36 w-max text-3xl text-zinc-800'>There is no Wish!</h1>
            }
        </main>
    );
}

export default Wishlist;
