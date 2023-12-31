import { LanguageSwitcher } from '../../components/LanguageSwitcher.tsx';
import { Logo } from '../../components/Logo';
import ThemeSwitcher from '../../components/ThemeSwitcher.tsx';
import { UserMenu } from '../../components/UserMenu';
import {
  DashboardContext,
  DashboardProvider
} from './DashboardContext/index.tsx';
import { Accounts } from './components/Accounts';
import { Fab } from './components/Fab/index.tsx';
import { Transactions } from './components/Transactions/index.tsx';
import { EditAccountModal } from './modals/EditAccountModal/index.tsx';
import { NewAccountModal } from './modals/NewAccountModal/index.tsx';
import { NewCategoryModal } from './modals/NewCategoryModal/index.tsx';
import { NewTransactionModal } from './modals/NewTransactionModal/index.tsx';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 flex flex-col gap-4 md:px-8 md:pb-8 md:pt-6 ">
            <header className="h-12 flex items-center justify-between">
              <Logo className="h-6 text-teal-900 dark:text-white" />
              <div className="flex items-center gap-x-8">
                <LanguageSwitcher />
                <ThemeSwitcher />
                <UserMenu />
              </div>
            </header>
            <main className="flex-1 flex flex-col gap-4 md:flex-row max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>
              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            <NewCategoryModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
