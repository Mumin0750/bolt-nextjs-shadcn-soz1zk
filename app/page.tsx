import { LoginForm } from '@/components/auth/login-form';
import { PageContainer } from '@/components/layout/page-container';

export default function LoginPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <LoginForm />
      </div>
    </PageContainer>
  );
}