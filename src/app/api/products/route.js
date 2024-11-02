import connectToDB from "@/config/db";
import { productSchema } from "@/utils/zod";
import Product from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (req) => {
    try {
        connectToDB();
        const formData = await req.formData();
        const name = formData.get("name");
        const price = Number(formData.get("price"));
        const score = Number(formData.get("score"));
        const img = formData.get("img");
        const quantity = formData.get("quantity");
        const description = formData.get("description");
        const category = formData.get("category");

        if (!img) {
            return Response.json({ message: "product image not selected" }, {
                status: 422
            });
        }

        const isDataValid = productSchema.safeParse({ name, price, score, quantity, description });
        if (!isDataValid.success) {
            return Response.json({ message: isDataValid.error.issues[0].message }, {
                status: 422
            });

        }
        if (!category) {
            return Response.json({ message: "no category selected" }, {
                status: 422
            });
        }

        const buffer = Buffer.from(await img.arrayBuffer());
        const imgName = Date.now() + img.name;
        const imgPath = path.join(process.cwd(), "/public/uploads/products/" + imgName);
        await writeFile(imgPath, buffer);

        await Product.create({
            name,
            price,
            score,
            quantity,
            category,
            description,
            isExist: true,
            img: `http://localhost:3000/uploads/products/${imgName}`
        });


        return Response.json({ message: "product added successfully" }, {
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
        const products = await Product.find({},"-__v").populate("comments category");
        return Response.json(products);
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}