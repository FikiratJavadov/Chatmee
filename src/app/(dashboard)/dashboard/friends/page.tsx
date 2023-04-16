import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface pageProps {}

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await prisma.friendShip.findMany({
    where: {
      OR: [
        {
          friendId: session.user.id,
        },
        {
          userId: session.user.id,
        },
      ],
    },

    include: {
      user: true,
      friend: true,
    },
  });

  const formattedFriends = friends.map((friendship) => {
    if (friendship.userId === session.user.id) {
      return { id: friendship.id, friend: friendship.friend };
    } else {
      return { id: friendship.id, friend: friendship.user };
    }
  });

  return (
    <div>
      {formattedFriends.map(({ id, friend }) => (
        <h1 key={friend.id} className="text-2xl">
          {friend.name}
        </h1>
      ))}
    </div>
  );
};

export default page;
