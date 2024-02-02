
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req){
                const res = await fetch("http://localhost:3000/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user?.data
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    secret: 'querty',
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    pages: {
        signIn: 'auth/signin',
    }
}

export default NextAuth(authOptions)