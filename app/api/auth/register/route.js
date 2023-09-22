import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req,res) {
    try {
        const { name, email, password } = await req.json();
        console.log("Received data:", { name, email, password });
        const newUser = await prisma.users.create({data:{ username:name, email:email, password:password ,number:0}});
        return new Response(JSON.stringify(newUser),{status:200});
        // const users = await prisma.users.findMany();
        // console.log(users);
        
    } catch (error) {
        console.log("Error:", error);
    }
}
