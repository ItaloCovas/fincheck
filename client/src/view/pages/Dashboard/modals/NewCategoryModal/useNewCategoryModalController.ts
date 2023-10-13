import { z } from 'zod';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  userId: z.string().nonempty('Usuário é obrigatório'),
  name: z.string().nonempty('Nome é obrigatório'),
  file: z.string(),
  type: z.enum(['INCOME', 'EXPENSE'])
});

type FormData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const { isNewCategoryModalOpen, closeNewCategoryModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);
  });

  return {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    register,
    errors,
    control,
    handleSubmit,
    isLoading: false,
    reset
  };
}
