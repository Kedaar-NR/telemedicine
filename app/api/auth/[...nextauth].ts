import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "doctor@reia.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Replace with real user lookup
                if (
                    credentials?.email === "doctor@reia.com" &&
                    credentials?.password === "password"
                ) {
                    return { id: "1", name: "Dr. REIA", email: "doctor@reia.com" };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/"
    }
}); 