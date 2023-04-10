import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import prisma from './prisma';
import GoogleProvider from 'next-auth/providers/google';

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOOGLE_CLIENT_ID');
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOOGLE_CLIENT_SECRET');
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/test',
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },

    redirect() {
      return '/dashboard';
    },
  },
};
