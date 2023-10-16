import { ExitIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from './DropdownMenu';
import { useAuth } from '../../shared/hooks/useAuth';

export function UserMenu() {
  const { signOut, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="rounded-full cursor-pointer bg-teal-50 w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            {user?.name.split(' ')[1]
              ? `${user?.name.split(' ')[0].charAt(0).toUpperCase()}${user?.name
                  .split(' ')[1]
                  .charAt(0)
                  .toUpperCase()}`
              : `${user?.name.split(' ')[0].slice(0, 2).toUpperCase()}`}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32 dark:bg-gray-700">
        <DropdownMenu.Item
          className="flex items-center justify-between dark:text-white dark:hover:!bg-gray-600"
          onSelect={() => signOut()}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
