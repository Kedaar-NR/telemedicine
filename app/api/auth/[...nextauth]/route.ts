import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // In a real application, you would validate credentials against a database
        // For demo purposes, we'll use hardcoded credentials
        if (credentials?.email === "doctor@reia.com" && credentials?.password === "demo123") {
          return {
            id: "1",
            email: "doctor@reia.com",
            name: "Dr. Smith",
          };
        }
        
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: "/", // Use our custom sign-in component
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
