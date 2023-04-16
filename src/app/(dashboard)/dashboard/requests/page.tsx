import FriendRequest from '@/components/FriendRequest';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const requests = await prisma.request.findMany({
    where: {
      recipientId: session.user.id,
    },
    include: {
      sender: true,
    },
  });

  return (
    <div className="pt-8">
      <h1 className="text-5xl font-bold">Friend requests</h1>
      <div className="mt-10 inline-flex flex-col gap-3">
        {requests.map((r) => (
          <FriendRequest key={r.id} request={r} />
        ))}
      </div>
    </div>
  );
};

export default page;
