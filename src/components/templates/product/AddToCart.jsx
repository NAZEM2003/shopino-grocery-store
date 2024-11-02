"use client"
import React, { useState } from 'react';

const AddToCart = () => {
    const [quantity , setQuantity] = useState(1);
    const decreaseHandler = ()=>{
        if(quantity <= 1){
            return false
        }
        setQuantity(prevState => prevState - 1);
    }
    const increaseHandler = ()=>{
        setQuantity(prevState => prevState + 1);
    }
    return (
        <div className='flex my-6'>
            <div className='border-zinc-500 overflow-hidden w-32 text-3xl border rounded-md flex items-center justify-center'>
                <button className='border-zinc-400 border-r w-10 transition-all hover:text-custom-dark-blue' onClick={decreaseHandler}>-</button>
                <span className='w-12 text-center overflow-hidden'>{quantity}</span>
                <button className='border-zinc-400 border-l w-10 transition-all hover:text-custom-dark-blue' onClick={increaseHandler}>+</button>
            </div>
            <button className='p-3 rounded-md bg-custom-dark-blue border border-custom-dark-blue text-slate-200 ml-4 font-semibold transition-all hover:bg-slate-200 hover:text-custom-dark-blue'>Add to Cart</button>
        </div>
    );
}

export default AddToCart;
