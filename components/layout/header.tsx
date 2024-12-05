"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';

export function Header({ user }: { user: User }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {user.role === 'admin' ? 'Admin Dashboard' : `Show ${user.showNumber} Dashboard`}
          </h1>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    </header>
  );
}