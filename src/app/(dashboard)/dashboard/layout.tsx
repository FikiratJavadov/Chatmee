import ProfileSidebar from '@/components/ProfileSidebar';
import { LogOut, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';

import LogoutButton from '@/components/LogoutButton';

const icons = {
  AddFriend: UserPlus,
  UserList: Users,
  Logout: LogOut,
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
    href: '/dashboard/requests',
    icons: 'UserList',
    text: 'Friend requests',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                  className="flex items-center gap-3 text-lg hover:bg-gray-100 hover:text-red-600 rounded-md p-2"
                >
                  <Icon />
                  <p>{option.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div>
          <LogoutButton />
        </div>
      </div>
      <div className="px-12 py-8">{children}</div>
    </section>
  );
}
