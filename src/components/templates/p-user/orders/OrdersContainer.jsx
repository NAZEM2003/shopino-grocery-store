import { getUserOrders } from '@/utils/actions';
import React from 'react';
import OrderBox from '../index/OrderBox';

const OrdersContainer = async ({user}) => {
    const orders = await getUserOrders(user?._id);
 
    return (
        <section className='mt-8'>
            {
                orders.length ? 
                    orders.map(order => <OrderBox key={order._id} {...JSON.parse(JSON.stringify(order))}/>)
                :""
            }
        </section>
    );
}

export default OrdersContainer;
