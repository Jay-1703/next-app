import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider  from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import { PrismaClient } from '@prisma/client'
import { Update } from "@mui/icons-material";

const prisma = new PrismaClient();

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
        // GithubProvider({
        //     clientId:process.env.GITHUB_CLIENT_ID,
        //     clientSecret:process.env.GITGUB_CLIENT_SECRET,
        // }),
        Credentials({
            async authorize(credentials,req){
                try {
                    await connect();
                    const { email , password , name} = credentials;
                    console.log(email , password ,name);
                    // const userdata = await prisma.users.findOne({email:email});
                    // if(userdata){
                    //     return userdata;
                    // }
                    // if (!userdata) {
                    //     const newuser = await prisma.users.create({email:email,password:password,name:name});
                    //     return newuser;
                    // }
                    // if (password !== userdata.password){
                    //     throw new Error('Password was not match');
                    //     return false;
                    // }    
                } catch (error) {
                    console.log(error);
                }
                
            }, 
        }),
    ],
    // callbacks:{
    //     async session({ session }){
    //         try {
    //             await connect();
    //             const data = await user.findOne({email:session.user.email});
    //             if(data){
    //                 session.user.email = data.email;
    //             }
    //             if(!data){
    //                 const newuser = await user.create({email:session.user.email});
    //                 session.user.email = newuser.email;
    //             }
    //             return session;
    //         } catch (error) {
    //             console.log(error);
    //             return false;
    //         }
    //     },
    // }
    // secret:process.env.JWT_SECRET,
})