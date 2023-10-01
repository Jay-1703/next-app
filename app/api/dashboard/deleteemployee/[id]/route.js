import { prisma } from "@/app/lib/Prisma";

export async function DELETE(req,{params}) {
    try {
        const employees = await prisma.employees.delete({where:{id:parseInt(params.id)}});
        return new Response(JSON.stringify(employees),{status:200});
    } catch (error) {
        console.log("Error:", error);
    }
}
