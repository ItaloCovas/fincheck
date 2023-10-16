import { TFunction } from 'i18next';
import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface DeleteModalProps {
  onConfirm(): void;

  onClose(): void;

  title: string;

  description?: string;

  isLoading: boolean;

  t: TFunction<'translation', undefined>;
}

export function DeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
  t
}: DeleteModalProps) {
  return (
    <Modal open title={t('delete')} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold dark:text-white">
          {title}
        </p>
        {description && (
          <p className="tracking-[-0.5px] text-gray-800 dark:text-white">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {t('accounts.confirmDelete')}
        </Button>
        <Button
          className="w-full dark:text-white dark:!border-white dark:hover:!bg-gray-600"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          {t('accounts.cancelDelete')}
        </Button>
      </div>
    </Modal>
  );
}
