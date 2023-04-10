import { Users } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface FriendRequestButtonProps {
  numberOfUnseenRequests: number;
}

const FriendRequestButton: FC<FriendRequestButtonProps> = ({
  numberOfUnseenRequests,
}) => {
  return (
    <Link
      href={`dashboard/requests`}
      className="flex items-center gap-3 text-lg hover:bg-slate-200  rounded-md p-2"
    >
      <Users />
      <p>Friend requests</p>
      {numberOfUnseenRequests > 0 && (
        <div className="bg-red-500 h-6 w-6 rounded-md flex items-center justify-center text-white font-semibold">
          {numberOfUnseenRequests > 10 ? `9+` : numberOfUnseenRequests}
        </div>
      )}
    </Link>
  );
};

export default FriendRequestButton;
