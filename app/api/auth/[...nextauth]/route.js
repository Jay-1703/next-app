import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITGUB_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials, req) {
                try {
                    console.log(credentials);
                    // const { email, password, name } = credentials;
                    // console.log(email , password , name);
                    const userdata = await prisma.users.findMany({where:{email:credentials.email}});
                    console.log(userdata);
                    if (userdata) {
                        return userdata;
                    }
                    else if (!userdata) {
                        const newuser = await prisma.users.create({data:{email:credentials.email,password:credentials.password}});
                        console.log(newuser);
                        return newuser;
                    }
                    else if (credentials.password !== userdata.password) {
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
            console.log("session ",session);
            try {
                const data = await prisma.users.findMany({ where: { email: session.user.email } });
                if (data) {
                    session.user.email = data.email;
                }
                if (!data) {
                    const newuser = await prisma.users.create({ data: { email: session.user.email } });
                    session.user.email = newuser.email;
                }
                return session;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});
export { handler as GET, handler as POST }