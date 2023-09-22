import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req,{params}) {
    try {
        const employees = await prisma.employees.delete({where:{id:parseInt(params.id)}});
        if (employees.length > 0) {
            return new Response(JSON.stringify(employees),{status:200});
        }
        else{
            return new Response(JSON.stringify("Delete is not successfully!!"),{status:400});
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
