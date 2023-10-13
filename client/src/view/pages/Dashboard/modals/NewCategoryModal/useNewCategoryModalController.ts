import { z } from 'zod';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '../../../../../shared/services/categoriesService';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../shared/hooks/useAuth';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml'
];

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  file: z
    .any()
    .refine((file) => file !== undefined, 'Imagem é obrigatória')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Tamanho máximo é de 4MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Apenas .jpg, .jpeg, .png e .svg são suportados.'
    ),
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
      name: '',
      file: undefined
    }
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(categoriesService.create);
  const { user } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('icon', data.file.name);
      formData.append('userId', user?.id as string);
      formData.append('name', data.name);
      formData.append('type', data.type);

      await mutateAsync(formData);

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria cadastrada com sucesso!');
      closeNewCategoryModal();
      reset();
    } catch {
      toast.error('Erro ao cadastrar a categoria.');
    }
    reset();
  });

  return {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    register,
    errors,
    control,
    handleSubmit,
    isLoading,
    reset
  };
}
