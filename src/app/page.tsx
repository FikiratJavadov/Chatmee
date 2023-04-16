import Image from 'next/image';
import { Inter } from 'next/font/google';

import Button from '@/components/ui/Button';
import { signIn } from 'next-auth/react';

export const runtime = 'experimental-edge';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  return (
    <h1 className="bg-red-500">
      <Button>Button</Button>
    </h1>
  );
}
