import ProfileSidebar from '@/components/ProfileSidebar';
import { LogOut, UserPlus, Users, UserCheck } from 'lucide-react';
import Link from 'next/link';

import LogoutButton from '@/components/LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
import FriendRequestButton from '@/components/FriendRequestButton';
import prisma from '@/lib/prisma';
import { useRequest } from '@/zustand/request-store';

const icons = {
  AddFriend: UserPlus,
  UserList: Users,
  Logout: LogOut,
  Friends: UserCheck,
};

type Icon = keyof typeof icons;

type SidebarOptionsType = {
  id: number;
  href: string;
  icons: Icon;
  text: string;
}[];

const sidebarOptions: SidebarOptionsType = [
  {
    id: 1,
    href: '/dashboard/add',
    icons: 'AddFriend',
    text: 'Add friend',
  },
  {
    id: 2,
    href: '/dashboard/friends',
    icons: 'Friends',
    text: 'Friends',
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  //* Check if session exist
  if (!session) {
    return notFound();
  }

  //* Get the request count;
  const friendRequests = await prisma.request.findMany({
    where: {
      recipientId: session.user.id,
    },
    include: {
      recipient: true,
      sender: true,
    },
  });

  //* Get the count of reuqest
  const reuqestCount = friendRequests.length;

  return (
    <section className="grid grid-cols-[300px_1fr] min-h-screen">
      <div className="py-12 px-8 flex flex-col border-r ">
        {/* @ts-expect-error Server Component */}
        <ProfileSidebar />

        {/* Displaying all chats */}
        {/* <p className="text-orange-600 mt-5 text-sm">All chats...</p> */}

        <ul role="list" className="h-full grow py-12 space-y-2">
          {sidebarOptions.map((option) => {
            const Icon = icons[option.icons];

            return (
              <li key={option.id}>
                <Link
                  href={option.href}
                  className="flex items-center gap-3 text-lg hover:bg-slate-200 rounded-md p-2"
                >
                  <Icon />
                  <p>{option.text}</p>
                </Link>
              </li>
            );
          })}
          <FriendRequestButton numberOfUnseenRequests={reuqestCount} />

          <hr />
          <p className="py-4">Chats...</p>
        </ul>

        <div>
          <LogoutButton />
        </div>
      </div>
      <div className="px-12 py-8">{children}</div>
    </section>
  );
}
