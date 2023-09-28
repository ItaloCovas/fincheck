// import { useAuth } from '../../../app/hooks/useAuth';
import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { DashboardProvider } from './DashboardContext/index.tsx';
import { Accounts } from './components/Accounts';
import { Transactions } from './components/Transactions/index.tsx';

export function Dashboard() {
  // const { signOut } = useAuth();

  return (
    <DashboardProvider>
      <div className="h-full w-full p-4 flex flex-col gap-4 md:px-8 md:pb-8 md:pt-6">
        <header className="h-12 flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>
        <main className="flex-1 flex flex-col gap-4 md:flex-row max-h-full">
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>
          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
}
