import connectToDB from "@/config/db";
import Category from "@/models/Category";
import { authAdmin } from "@/utils/actions";
import { categoryTitleSchema } from "@/utils/zod";
import { writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";
import path from "path";

export const POST = async (req) => {
    try {
        connectToDB();
        const formData = await req.formData();
        const title = formData.get("title");
        const img = formData.get("img");

        const admin = await authAdmin();
        if (!admin) {
            return Response.json({ message: "access denied" }, {
                status: 403
            });
        }
        const isTitleValid = categoryTitleSchema.safeParse(title);
        if (!isTitleValid.success) {
            return Response.json({ message: isTitleValid.error.issues[0].message }, {
                status: 422
            });
        }
        if (!img) {
            return Response.json({ message: "category image not selected" }, {
                status: 422
            });
        }
        const buffer = Buffer.from(await img.arrayBuffer());
        const imgName = Date.now() + img.name;
        const imgPath = path.join(process.cwd(), "/public/uploads/categories/" + imgName);
        await writeFile(imgPath, buffer);

        await Category.create({
            title,
            img: `/uploads/categories/${imgName}`
        });
        revalidateTag("fetchCategories");
        return Response.json({ message: "category added successfully" }, {
            status: 201
        });

    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}

export const GET = async () => {
    try {
        connectToDB();
        const categories = await Category.find({}).sort({ _id: -1 }).lean();
        return Response.json(categories);
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        })
    }
}
