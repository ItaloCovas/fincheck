import { z } from 'zod';
import { useDashboard } from '../../DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '../../../../../shared/entities/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '../../../../../shared/services/categoriesService';
import { useAuth } from '../../../../../shared/hooks/useAuth';
import toast from 'react-hot-toast';

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

export function useEditCategoryModalController(
  category: Category | null,
  onClose: () => void
) {
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
      name: category?.name,
      file: category?.icon,
      type: category?.type
    }
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(categoriesService.update);
  const { user } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('icon', data.file.name);
      formData.append('userId', user?.id as string);
      formData.append('id', category?.id as string);
      formData.append('name', data.name);
      formData.append('type', data.type);
      await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria editada com sucesso!');
      onClose();
      reset();
    } catch {
      toast.error('Erro ao editar a categoria.');
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
    isLoading: false,
    reset
  };
}
