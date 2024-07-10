'use client';
import LoginRegisterCard from '@/ui/organisms/loginRegisterCard/LoginRegisterCard';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const router = useRouter();
  const onLoginSuccess = async () => {
    router.push('/');
  };
  return (
    <>
      <div className="w-full min-h-[calc(100vh)] bg-black grid sm:grid-cols-2">
        <div className="hidden sm:block bg-[url(/images/model-test.jpg)] bg-center bg-cover relative">
          <div className="w-full h-full absolute bg-black/20 top-0 left-0"></div>
        </div>
        <div className="bg-app-background p-6 rounded-lg flex items-center justify-center">
          <div className="max-w-full sm:w-[400px] mx-auto">
            <LoginRegisterCard
              defaultForm="login"
              onLoginSuccess={onLoginSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
