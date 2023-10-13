import { prisma } from "@/app/lib/Prisma";

export async function DELETE(req,{params}) {
    try {
        const employees = await prisma.employees.delete({where:{id:parseInt(params.id)}});
        return new Response(JSON.stringify(employees),{status:200});
    } catch (error) {
        console.log("Error:", error);
    }
}
// const employee_role = await prisma.employeerole.findMany({where:{employeeId:parseInt(params.id)}});
// if (employee_role) {
//     await prisma.employeerole.delete({
//       where: { id: employee_role[0].id }
//     });
// }