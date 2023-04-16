import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type Params = {
  id: string;
};

export async function PATCH(request: Request, context: { params: Params }) {
  try {
    //*Check if User authenticated
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        'Unauthorized - please authenticate or provide valid credentials',
        { status: 401, statusText: 'fail' }
      );
    }

    const request = await prisma.request.findUnique({
      where: {
        id: context.params.id,
      },
    });

    if (!request) {
      return new Response('There is not request with this id', {
        status: 404,
        statusText: 'fail',
      });
    }

    if (request.recipientId !== session.user.id) {
      return new Response('This is not your request!', {
        status: 400,
        statusText: 'fail',
      });
    }

    const [_, friendShip] = await prisma.$transaction([
      prisma.request.delete({
        where: {
          id: request.id,
        },
      }),
      prisma.friendShip.create({
        data: {
          user: {
            connect: {
              id: request.recipientId,
            },
          },
          friend: {
            connect: {
              id: request.senderId,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      statusText: 'success',
      status: 201,
      data: friendShip,
    });
  } catch (error) {
    return new Response('Invalid request', { status: 400, statusText: 'fail' });
  }
}
