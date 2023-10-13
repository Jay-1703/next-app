import { prisma } from "@/app/lib/Prisma";

export async function POST(req, res) {
    try {
        const { name, email, number, city } = await req.json();
        const newEmployee = await prisma.employees.create({
            data: {
                employee_name: name,
                email: email,
                city: city,
                number: parseInt(number)
            }
        });
       
        return new Response(JSON.stringify(newEmployee), { status: 200 });
    } catch (error) {
        console.log("Error:", error);
    }
}

// const employeeRole = await prisma.employeerole.create({
//   data: {
//     user: {
//       connect: { id: newEmployee.id }
//     }
//   }
// });