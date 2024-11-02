import connectToDB from "@/config/db";
import { signupSchema } from "@/utils/zod";
import User from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { role } from "@/utils/constants";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
    try {
        connectToDB();
        const formData = await req.formData();

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const img = formData.get("img");
        //if an image is not selected:
        let imgName = "defaultProfile.png";
        //if an image is selected:
        if (img) {
            const buffer = Buffer.from(await img.arrayBuffer());
            imgName = Date.now() + img.name;
            const imgPath = path.join(process.cwd(), "/public/uploads/users/" + imgName)
            await writeFile(imgPath, buffer);
        }
        //validation of received data
        const isDataValid = signupSchema.safeParse({ name, email, password });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 422
            });
        }
        //check if there is a user with the received Email:
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return Response.json({ message: "this email already exists" }, {
                status: 422
            })
        };
        //hashing password
        const hashedPassword = await hashPassword(password);
        // generating access token 
        const accessToken = generateAccessToken({ email });
        //does the user already exist or not. if YES : role = USER    and if NO : role = ADMIN 
        const users = await User.find({});
        await User.create({
            name,
            email,
            password: hashedPassword,
            role: users.length > 0 ? role.user : role.admin,
            img: `http://localhost:3000/uploads/users/${imgName}`
        });
        //storing AccessToken in Cookies
        const cookieStore = cookies();
        cookieStore.set("token", accessToken, {
            httpOnly: true,
            path: "/"
        })
        return Response.json({ message: "you have successfully signed up" }, {
            status: 201
        })
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }

}