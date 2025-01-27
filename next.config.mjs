/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol:"https",
            hostname:"shopinogrocerystore.ir",
            port:"",
            pathname:"/uploads/**"
        }]
    }
};
export default nextConfig;
