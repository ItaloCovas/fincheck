import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../shared/utils/cn';

interface DropdownMenuProps {
  children: React.ReactNode;

  className?: string;

  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;

  onSelect?(): void;
}

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none">
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

function DropdownMenuContent({ children, className, side }: DropdownMenuProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        side={side}
        className={cn(
          'rounded-2xl z-50 p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade',
          className
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

function DropdownMenuItem({
  children,
  className,
  onSelect
}: DropdownMenuProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[40px] cursor-pointer outline-none flex items-center px-4 py-2 text-sm text-gray-800 rounded-2xl transition-colors data-[highlighted]:bg-gray-50',
        className
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem
};
