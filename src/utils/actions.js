"use server"
import { cookies } from 'next/headers';
import { verifyAccessToken } from "./auth";
import User from "@/models/User";
import Product from "@/models/Product";
import Comment from "@/models/Comment";
import Category from "@/models/Category";
import Wishlist from "@/models/Wishlist";
import Ticket from "@/models/Ticket";
import connectToDB from "@/config/db";

export const authUser = async () => {
    let user = null;
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
        const tokenPayload = verifyAccessToken(token.value)
        if (tokenPayload) {
            connectToDB();
            user = await User.findOne({ email: tokenPayload.email }).lean();
            return JSON.parse(JSON.stringify(user));
        }
    }
    return user;
}

export const getProduct = async (productID) => {
    connectToDB();
    const product = await Product.findOne({ _id: productID }, "-__v").populate("category", "-__v").lean();
    return product;
}

export const getProductComments = async (productID) => {
    connectToDB()
    const comments = await Comment.find({ productID, isAccepted: true }, "-__v").populate("userID", "name email img").lean();
    return comments;
}
export const getUserComments = async (userID) => {
    connectToDB();
    const comments = await Comment.find({ userID }, "-__v").populate("productID", 'name')
    return comments;
}

export const getMoreProducts = async (category) => {
    connectToDB();
    const MoreProducts = await Product.find({ category }, "-__v");
    return JSON.parse(JSON.stringify(MoreProducts));
}

export const getCategories = async () => {
    connectToDB();
    const categories = await Category.find({}, "-__V").limit(6);
    return categories;
}
export const getLatestProducts = async () => {
    connectToDB();
    const products = await Product.find({}, '-__v').sort({ _id: -1 }).limit(8).lean();
    return JSON.parse(JSON.stringify(products));
}

export const getUserWish = async (userID, productID) => {
    connectToDB();
    const wish = await Wishlist.findOne({ user: userID, product: productID }, '-__v').lean();
    return JSON.parse(JSON.stringify(wish));
}
export const getUserWishlist = async (userID) => {
    connectToDB();
    const wishlist = await Wishlist.find({ user: userID }).populate("product", "img name price off");
    return JSON.parse(JSON.stringify(wishlist));
}

export const getQuestionTicket = async (ticketID) => {
    connectToDB();
    const ticket = await Ticket.findOne({ _id: ticketID }).populate("user").lean();
    return ticket;
};
export const getAnswerTicket = async (questionTicketID) => {
    connectToDB();
    const ticket = await Ticket.findOne({ questionTicket: questionTicketID }).populate("user").lean();
    return ticket;
};
export const getUserTickets = async (userID) => {
    connectToDB();
    const tickets = Ticket.find({user:userID});
    return tickets
}
export const getRecentTickets = async (userID) => {
    connectToDB();
    const tickets = Ticket.find({user:userID}).populate("department").sort({_id:-1}).limit(4);
    return tickets
}
