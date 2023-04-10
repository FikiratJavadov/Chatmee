import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('run');

  return NextResponse.json({
    statusText: 'success',
    status: 201,
    data: [],
  });
}

type ReqBody = {
  email: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReqBody;

    //* Check if email provided
    if (!body?.email) {
      return new Response('Please provide an email', {
        status: 400,
        statusText: 'fail',
      });
    }

    //*Check if User authenticated
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        'Unauthorized - please authenticate or provide valid credentials',
        { status: 401, statusText: 'fail' }
      );
    }

    //*Find the user
    const requestedUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!requestedUser) {
      return new Response('Requeted User does not exist!', {
        status: 404,
        statusText: 'fail',
      });
    }

    //* Check if requested user is not the requesting user

    if (requestedUser?.id === session?.user.id) {
      return new Response('You can not add yourseld as a friend', {
        status: 400,
        statusText: 'fail',
      });
    }

    // Check if a request already exists with senderId: recipientId and recipientId: senderId
    const existingRequest = await prisma.request.findFirst({
      where: {
        senderId: requestedUser.id,
        recipientId: session.user.id,
      },
    });

    if (existingRequest) {
      return new Response(
        'A friend request has already been sent to you by this user.',
        {
          status: 400,
          statusText: 'fail',
        }
      );
    }

    const data = await prisma.request.create({
      data: {
        senderId: session.user.id,
        recipientId: requestedUser.id,
      },
    });

    return NextResponse.json({
      statusText: 'success',
      status: 201,
      data: data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2002') {
        return new Response(
          'A friend request has already been sent to this user.',
          { status: 409, statusText: 'fail' }
        );
      }

    return new Response('Invalid request', { status: 400, statusText: 'fail' });
  }
}
