import AddFriendButton from '@/components/AddFriendForm';
import Sidebar from '@/components/Sidebar';
import { authOptions } from '@/lib/auth';
import { log } from 'console';
import { getServerSession } from 'next-auth';

const page = async ({}) => {
  return <main>This is main content</main>;
};

export default page;
