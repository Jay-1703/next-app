import { prisma } from "@/app/lib/Prisma";

export async function POST(req, res) {
    try {
        const { search } = await req.json();
        const searchData = await prisma.employees.findMany({
            where: { employee_name: { contains: search } }
        });
        if (!searchData) {
            return new Response(JSON.stringify("No data found !!"), { status: 201 });
        }
        return new Response(JSON.stringify(searchData), { status: 200 });
    } catch (error) {
        console.log("Error:", error);
    }
}
// where: { employee_name: { contains: search } }, include: {
//     employee_role: {
//         select: {
//             employee_role: true
//         }
//     }
// },