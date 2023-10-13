import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import { prisma } from "@/app/lib/Prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITGUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const res = await prisma.users.findMany({ where: { email: credentials.email } });
          const user = res[0];
          if (user) {
            if (user.email == credentials.email) {
              if (user.password == credentials.password) {
                return user;
              }
              else {
                console.log('password is worng !!');
              }
            }
            else {
              console.log('not email done');
            }
          }
          else {
            if (credentials?.name) {
              const res = await prisma.users.create({ data: { username: credentials.name, email: credentials.email, password: credentials.password } });
              return res;
            } else if (credentials?.name && !credentials.password) {
              const generateRandomNumber = () => {
                return Math.floor(Math.random() * 9999) + 1;
              };
              const userPassword = generateRandomNumber();
              const res = await prisma.users.create({ data: { username: credentials.name, email: credentials.email, password: userPassword.toString() } });
              console.log("New user : ", res);
              return res;
            }
            else {
              console.log('Username is required for registration !!');
            }
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        const res = await prisma.users.findMany({
          where: { email: session.user.email }
        });
        const userdata = res[0];
        if (userdata) {
          session.user.name = userdata.username;
          session.user.email = userdata.email;
        } else {
          if (session?.user?.name && !session?.user?.password) {
            const generateRandomNumber = () => {
              return Math.floor(Math.random() * 9999) + 1;
            };
            const userPassword = generateRandomNumber();
            const res = await prisma.users.create({ data: { username: session.user.name, email: session.user.email, password: userPassword.toString() } });
            session.user.name = res.username;
            session.user.email = res.email;
          } else {
            console.log('Username is required for registration !!');
          }
        }
        return session;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }