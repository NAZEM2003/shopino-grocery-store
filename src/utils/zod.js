import { number, z } from "zod";

export const signupSchema = z.object({
    name: z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
    password: z.string().trim().min(4, "password must be at least 4 characters").max(16, "password must be 16 characters maximum"),
});

export const signinSchema = z.object({
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
    password: z.string().trim().min(4, "password must be at least 4 characters").max(16, "password must be 16 characters maximum"),
});

export const productSchema = z.object({
    name: z.string().trim().min(3, "product name must be at least 3 characters").max(60, "product name must be 60 characters maximum"),
    price:z.number({ required_error: "please enter the price",}).positive("the price must be greater than 0"),
    score:z.number().gte(0,"the score must be between 0 and 5").lte(5,"the score must be between 0 and 5"),
    quantity:z.string().min(2,"quantity must be at least 2 characters").max(20,"quantity must be 20 characters maximum"),
    description:z.string().trim().min(3, "description must be at least 3 characters")
})

export const commentSchema = z.object({
    message:z.string().trim().min(3,"your comment must have at least 3 characters"),
    name: z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    score:z.number().gte(0,"the score must be between 0 and 5").lte(5,"the score must be between 0 and 5"),
    
})

export const categoryTitleSchema = z.string().trim().min(3,"title must be at least 3 characters").max(50 , "title must be 16 characters maximum");

export const contactUsSchema = z.object({
    name:z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
    number:z.string().trim().min(3,"Please enter a valid Phone Number").max(20,"Please enter a valid Phone Number"),
    message:z.string().trim().min(3,"message must be at least 3 characters")
})