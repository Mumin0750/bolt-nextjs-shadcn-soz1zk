"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/layout/card';
import { Lock } from 'lucide-react';
import { authenticate } from '@/lib/auth';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authenticate(username, password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push(user.role === 'admin' ? '/admin' : '/show');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <Lock className="h-12 w-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-gray-500">Enter your credentials to access the system</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </Card>
  );
}