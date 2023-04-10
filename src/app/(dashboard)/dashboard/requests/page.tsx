import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { FC } from 'react';

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  const requests = await prisma.request.findMany({
    where: {
      recipientId: session?.user.id,
    },
    include: {
      sender: true,
    },
  });

  return (
    <div className="pt-8">
      <h1 className="text-5xl font-bold">Friend requests</h1>
      {requests.map((r) => (
        <h1 key={r.id} className="text-red-600">
          {r.sender.email}
        </h1>
      ))}
    </div>
  );
};

export default page;
