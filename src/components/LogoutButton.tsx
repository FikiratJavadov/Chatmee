'use client';

import { FC } from 'react';
import Button from './ui/Button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const LogoutButton = ({}) => {
  return (
    <Button
      onClick={async () => {
        try {
          await signOut();
        } catch (error) {
          alert('Signout error!');
        }
      }}
      size="lg"
      className="flex items-center w-full justify-around"
    >
      <p className="text-lg">Logout</p>
      <div>
        <LogOut />
      </div>
    </Button>
  );
};

export default LogoutButton;
