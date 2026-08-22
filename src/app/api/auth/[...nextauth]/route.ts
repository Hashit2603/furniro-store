import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication for now until Prisma is fully wired
        // This lets the user see the flow working immediately
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        
        // Let any email pass through right now for preview purposes 
        // since we haven't set up the register endpoint fully yet.
        if (credentials?.email && credentials?.password) {
           return { id: "99", name: credentials.email.split('@')[0], email: credentials.email };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
