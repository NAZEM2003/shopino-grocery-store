"use client"
import React, { useEffect, useState } from 'react';
import CartItemBox from './CartItemBox';
import Total from './Total';

const CartTable = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
    }, []);

    const calcTotalPrice = () => {
        let totalPrice = 0
        if(cart.length){
            totalPrice = cart.reduce((prev , current)=> prev + (current.price * current.count) , 0);
        }
        return totalPrice;
    }

    return (
        <div className='lg:flex justify-around xl:justify-between lg:px-5'>
            <section className='mt-20'>
                {
                    cart.map(item => <CartItemBox key={item.id} {...item} />)
                }
            </section>
            <section>
                <Total cart={cart}/>
            </section>
        </div>
    );
}

export default CartTable;
