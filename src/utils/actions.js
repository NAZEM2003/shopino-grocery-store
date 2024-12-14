"use server"
import { cookies } from 'next/headers';
import { verifyAccessToken } from "./auth";
import User from "@/models/User";
import Product from "@/models/Product";
import Comment from "@/models/Comment";
import Category from "@/models/Category";
import Wishlist from "@/models/Wishlist";
import Ticket from "@/models/Ticket";
import Discount from "@/models/Discount";
import connectToDB from "@/config/db";
import { role } from './constants';

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
export const authAdmin = async () => {
    let admin = null;
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
        const tokenPayload = verifyAccessToken(token.value)
        if (tokenPayload) {
            connectToDB();
            admin = await User.findOne({ email: tokenPayload.email , role:role.admin}).lean();
            return admin
        }else{
            return null
        }
    }else{
        return null
    }
}


export const getProduct = async (productID) => {
    connectToDB();
    const product = await Product.findOne({ _id: productID }, "-__v").populate("category", "-__v").lean();
    return product;
}
export const getMoreProducts = async (category) => {
    connectToDB();
    const MoreProducts = await Product.find({ category }, "-__v");
    return JSON.parse(JSON.stringify(MoreProducts));
}
export const getLatestProducts = async () => {
    connectToDB();
    const products = await Product.find({}, '-__v').sort({ _id: -1 }).limit(8).lean();
    return JSON.parse(JSON.stringify(products));
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
export const getAllComments = async () => {
    connectToDB();
    const comments = Comment.find(({})).populate("userID productID").sort({ _id: -1 }).lean();
    return comments;
}

export const getCategories = async () => {
    connectToDB();
    const categories = await Category.find({}, "-__V").limit(6);
    return categories;
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
    const tickets = Ticket.find({ user: userID });
    return tickets
}
export const getRecentTickets = async (userID) => {
    connectToDB();
    const tickets = Ticket.find({ user: userID, isAnswer: false }).populate("department").sort({ _id: -1 }).limit(4);
    return tickets
}
export const getAllTickets = async () => {
    connectToDB();
    const tickets = await Ticket.find({ isAnswer: false }).populate("user").populate("department").sort({ _id: -1 }).lean();
    return tickets;
}

export const getAllUsers = async () => {
    connectToDB();
    const users = await User.find({}).sort({ _id: -1 }).lean();
    return users;
}

export const getDiscounts = async () => {
    connectToDB();
    const discounts = await Discount.find({}).populate("user", "name").sort({ _id: -1 }).lean();
    return discounts;
}