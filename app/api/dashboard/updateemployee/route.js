import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req,res) {
    try {
        const { id , name , email , city , number ,} = await req.json();
        console.log(id  , name  ,email ,city ,number);
        // const updateEmployee = await prisma.employees.update({where:{id:id},data: {name:name, email:email, city:city, number: number}})
        return new Response(JSON.stringify("updateEmployee"),{status:200});
    } catch (error) {
        console.log(error);
    }
}