import { prisma } from "@/app/lib/Prisma";

export async function GET(req, { params }) {
    try {
        const employee = await prisma.employees.findMany({
            where: { id: parseInt(params.id) }
        });
        if (employee.length > 0) {
            return new Response(JSON.stringify(employee), { status: 200 });
        }
        else {
            return new Response(JSON.stringify("Somthing is wrong!!"), { status: 400 });
        }
    } catch (error) {
        console.log(error);
    }
}
// , include: {
//     employee_role: {
//         select: {
//             employee_role: true
//         }
//     }
// },