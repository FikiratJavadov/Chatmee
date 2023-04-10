import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { AxiosError } from 'axios';
import { log } from 'console';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  try {
    const chats = await prisma.chat.findMany();
    console.log(chats);

    return NextResponse.json({ data: chats }, { status: 200 });
  } catch (error) {
    console.log('error');

    if (error instanceof AxiosError)
      return new Response('Wrong', { status: 404 });
  }

  return new Response('Something went wrong!');
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  await prisma.post.create({
    data: {
      name: res,
    },
  });
  // console.log(res);

  return new Response('ok');
}
