import { prisma } from "@/app/lib/Prisma";

export async function PUT(req, res) {
    try {
        const { id, name, email, city, number, } = await req.json();
        const updateEmployee = await prisma.employees.update({ where: { id: id }, data: { employee_name: name, email: email, city: city, number: parseInt(number) } });
        return new Response(JSON.stringify(updateEmployee), { status: 200 });
    } catch (error) {   
        console.log(error);
    }
}