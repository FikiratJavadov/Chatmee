import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';

const ProfileSidebar = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex items-center gap-3">
        {session?.user?.image && (
          <div className=" h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-red-500">
            <Image
              src={session?.user?.image}
              alt="image"
              width={300}
              height={300}
            />
          </div>
        )}
        <div>
          <h2 className="text-xl">{session?.user.name}</h2>
          <h5 className="text-sm">{session?.user.email}</h5>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
