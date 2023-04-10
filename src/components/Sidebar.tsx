import FriendRequests from './RequestList';
import ProfileSidebar from './ProfileSidebar';

const Sidebar = async ({}) => {
  return (
    <div className="py-12 px-8 border-r min-h-screen">
      {/* @ts-ignore */}
      <ProfileSidebar />
      <div className="mt-20">
        {/* @ts-ignore */}
        <FriendRequests />
      </div>
    </div>
  );
};

export default Sidebar;
