import mongoose from "mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import Wishlist from "@/models/Wishlist";
import connectToDB from "@/config/db";

export const POST = async (req) => {
    try {
        connectToDB()
        const body = await req.json();
        const { user, product } = body;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
            return Response.json({ message: "Invalid ID format" }, {
                status: 400
            });
        }
        const isUserExist = await User.findOne({ _id: user });
        const isProductExist = await Product.findOne({ _id: product });
        if (!isUserExist) {
            return Response.json({ message: "user not found" }, {
                status: 404
            })
        }
        if (!isProductExist) {
            return Response.json({ message: "product not found" }, {
                status: 404
            })
        }
        await Wishlist.create({ user, product });
        return Response.json({ message: "product added to wishlist successfully" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }

}
export const DELETE = async (req) => {
    try {
        connectToDB()
        const body = await req.json();
        const { user, product } = body;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
            return Response.json({ message: "Invalid ID format" }, {
                status: 400
            });
        }
        await Wishlist.findOneAndDelete({user,product});
        return Response.json({message:"the Product has been successfully removed from wishlist"});

    } catch (error) {

    }
}