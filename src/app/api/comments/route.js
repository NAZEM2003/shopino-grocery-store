import connectToDB from "@/config/db";
import { commentSchema } from "@/utils/zod";
import Comment from "@/models/Comment";
import Product from "@/models/Product";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        connectToDB();
        const body = await req.json();
        const { message, name, score, userID, productID } = body;

        const isDataValid = commentSchema.safeParse({ message, name, score });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 422
            });
        }

        const comment = await Comment.create({
            name,
            message,
            score,
            userID,
            productID,
            isAccepted: false
        });
        const comments = await Comment.find({productID});
        console.log(comments);
        
        await Product.findOneAndUpdate({ _id: productID }, {
            $push: {
                comments: comment._id
            }
        });
        await User.findOneAndUpdate({ _id: userID }, {
            $push: {
                comments: comment._id
            }
        });


        return Response.json({ message: "comment added successfully" }, {
            status: 201
        })

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export const GET = async () => {
    try {
        connectToDB();
        const comments = await Comment.find({}).populate("userID", "name img email");
        return Response.json(comments);
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}