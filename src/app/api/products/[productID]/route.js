import connectToDB from "@/config/db";
import { authAdmin } from "@/utils/actions";
import { productSchema } from "@/utils/zod";
import Product from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function PATCH(req, { params }) {
    try {
        connectToDB();
        const formData = await req.formData();
        const productID = params.productID;

        const admin = authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const name = formData.get("name");
        const price = Number(formData.get("price"));
        const img = formData.get("img");
        const quantity = formData.get("quantity");
        const description = formData.get("description");
        const category = formData.get("category");
        const isExist = formData.get("isExist");
        const isDataValid = productSchema.safeParse({ name, price, quantity, description, category });
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
        if (img) {
            const buffer = Buffer.from(await img.arrayBuffer());
            const imgName = Date.now() + img.name;
            const imgPath = path.join(process.cwd(), "/public/uploads/products/" + imgName);
            await writeFile(imgPath, buffer);
            await Product.findOneAndUpdate({ _id: productID }, {
                name,
                price,
                quantity,
                description,
                category,
                isExist: isExist ? true : false,
                img: `/uploads/products/${imgName}`
            })

        } else {
            await Product.findOneAndUpdate({ _id: productID }, {
                name,
                price,
                quantity,
                description,
                category,
                isExist: isExist ? true : false,
            })
        }
        return Response.json({ message: "the product was successfully edited." })
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}