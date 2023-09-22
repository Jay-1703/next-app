import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // GithubProvider({
        //     clientId:process.env.GITHUB_CLIENT_ID,
        //     clientSecret:process.env.GITGUB_CLIENT_SECRET,
        // }),
        Credentials({
            async authorize(credentials, req) {
                try {
                    const { email, password, name } = credentials;
                    const userdata = await prisma.users.findMany({where:{email: email}});
                    console.log(userdata);
                    if (!userdata) {
                        const newuser = await prisma.users.create({data:{username:name,email:email,password:password,number:0}});
                        return newuser;
                    }
                    if(userdata){
                        return userdata;
                    }
                    if (password !== userdata.password){
                        throw new Error('Password was not match');
                        return false;
                    }    
                } catch (error) {
                    console.log(error);
                }

            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                const data = await prisma.users.findMany({where:{email:session.user.email}});
                if(data){
                    session.user.email = data.email;
                }
                if(!data){
                    const newuser = await prisma.users.create({data:{username:session.user.name,email:session.user.email}});
                    session.user.email = newuser.email;
                }
                return session;
            } catch (error) {
                // console.log(error);
                // return false;
            }
        },
    }
    // secret:process.env.JWT_SECRET,
})

export { handler as GET, handler as POST }