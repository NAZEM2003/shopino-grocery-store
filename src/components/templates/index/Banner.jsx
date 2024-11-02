import Image from 'next/image';
import React from 'react';
import banner from "@/images/banner.png"
import { caveat } from '@/utils/fonts';
import Link from 'next/link';

const Banner = () => {
    return (
        <section className={`${caveat.className} mx-auto w-full sm:w-11/12  relative text-slate-200 mt-20 rounded-md overflow-hidden`}>
            <div className='w-full flex flex-col md:flex-row md:justify-between p-8'>
                <div className='lg:ml-5 lg:mt-10'>
                    <p className='text-4xl sm:text-6xl'>Delicious</p>
                    <p className='text-custom-yellow text-7xl sm:text-9xl font-semibold'>Burger</p>
                    <p className='mt-16 md:mt-32 lg:mt-48 text-xl max-w-96'>Satisfy Your Cravings, Bite by Juicy Bite: Experience Perfection Between the Buns at Delicious Burger!</p>
                </div>

                <div className='mt-20 justify-between items-end sm:flex sm:mt-28 md:flex-col md:pr-10 lg:mr-10'>
                    <p className='flex w-max flex-col text-3xl items-center'>
                        <span>Up To</span>
                        <span className='text-custom-yellow text-7xl'>50%</span>
                        <span>Off</span>
                    </p>
                    <Link href="/shop" className='border inline-block mt-14 border-custom-yellow rounded-md p-3 text-custom-yellow text-3xl font-medium transition-all hover:text-zinc-800 hover:bg-custom-yellow md:mt-28'>Order Now</Link>
                </div>
            </div>

            <div className='absolute -z-10 top-0 left-0 w-full h-full'>
                <Image className='brightness-90' src={banner} fill alt='Banner'/>
            </div>

        </section>
    );
}

export default Banner;
