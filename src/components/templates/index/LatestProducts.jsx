import React from 'react';
import ProductCard from '@/modules/product/ProductCard';
import styles from "@/styles/latest-products/style.module.css";
import { getLatestProducts } from '@/utils/actions';

const LatestProducts = async () => {
    const latestProducts = await getLatestProducts();
    return (
        <section className='p-3 mt-22'>
            <h2 className='sm:text-2xl text-xl text-zinc-800 font-semibold p-2'>Latest Products</h2>
            <div className={styles.products_grid_container}>
                {
                    latestProducts.map(product => <ProductCard key={product._id} {...JSON.parse(JSON.stringify(product))}/>)
                }
            </div>
        </section>
    );
}

export default LatestProducts;
