import prisma from '@/lib/prisma';
import { log } from 'console';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = await prisma.post.findMany();
  return NextResponse.json({ data });
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
