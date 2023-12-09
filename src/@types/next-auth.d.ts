import NextAuth from 'next-auth';

declare module 'next-auth' {
  export type User = {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar_url: string;
  };
}
