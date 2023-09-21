import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function register(req, res) {
    try {
        console.log(req);
        const { name, email, password } = req.body;
        console.log("Received data:", { name, email, password });
        const newUser = await prisma.users.create({data: { name, email, password,}});
        return newUser;
    } catch (error) {
        console.log("Error:", error);
    }
}
