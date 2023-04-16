'use client';

import { Prisma } from '@prisma/client';
import { FC } from 'react';
import Button from './ui/Button';
import { Check } from 'lucide-react';
import api from '@/lib/axios';

const requestInclude = {
  sender: true,
} satisfies Prisma.RequestInclude;

export type Request = Prisma.RequestGetPayload<{
  include: typeof requestInclude;
}>;

interface FriendRequestProps {
  request: Request;
}

const FriendRequest: FC<FriendRequestProps> = ({ request }) => {
  const acceptFriendRequest = async () => {
    try {
      const { data } = await api.patch(`/api/user/request/${request.id}`);
      alert('YES');
    } catch (error) {
      alert('NO');
    }
  };

  return (
    <div className="py-3 px-3 border-2 border-slate-900 rounded-md inline-flex items-center gap-3">
      <Button
        onClick={acceptFriendRequest}
        className=" bg-emerald-600 hover:bg-emerald-900"
      >
        &#10004;
      </Button>
      <Button className=" bg-red-600 hover:bg-red-900">X</Button>
      <p className="text-lg font-bold ml-2">{request.sender.email}</p>
    </div>
  );
};

export default FriendRequest;
