import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req,res) {
    try {
        const employees = await prisma.employees.findMany();
        return new Response(JSON.stringify(employees),{status:200});
    } catch (error) {
        console.log("Error:", error);
    }
}
