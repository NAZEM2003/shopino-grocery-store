import connectToDB from "@/config/db";
import { updateUserSchema } from "@/utils/zod";
import User from "@/models/User";
import { authUser } from "@/utils/actions";
import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { generateAccessToken } from "@/utils/auth";

//update user data
export async function PATCH(req) {
    try {
        connectToDB();
        const user = await authUser();
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const img = formData.get("img");
        //data validation
        const isDataValid = updateUserSchema.safeParse({ name, email });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 400
            })
        }

        if (img) {
            const buffer = Buffer.from(await img.arrayBuffer());
            const imgName = Date.now() + img.name;
            const imgPath = path.join(process.cwd(), "/public/uploads/users/" + imgName)
            await writeFile(imgPath, buffer);
            await User.findOneAndUpdate({ _id: user._id }, {
                $set: {
                    name,
                    email,
                    img: `http://localhost:3000/uploads/users/${imgName}`
                }
            });
            const accessToken = generateAccessToken({ email });
            const cookieStore = cookies();
            cookieStore.set("token", accessToken, {
                httpOnly: true,
                path: "/"
            });
            return Response.json({ message: "the update was successful" });
        }

        const accessToken = generateAccessToken({ email });
        const cookieStore = cookies();
        cookieStore.set("token", accessToken, {
            httpOnly: true,
            path: "/"
        });
        await User.findOneAndUpdate({ _id: user._id }, {
            $set: {
                name,
                email,
            }
        });
        return Response.json({ message: "the update was successful" });
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}