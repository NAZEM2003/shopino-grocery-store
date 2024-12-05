import { cookies } from "next/headers"

export const POST = async () => {
    try {
        cookies().delete("token");
        return Response.json({ message: "logout was successful" })
    } catch (error) {
        return Response.json({ message: error.message }, {
            status: 500
        });
    }
}