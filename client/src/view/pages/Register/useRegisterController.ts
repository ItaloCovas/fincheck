import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../shared/services/authService';
import { useMutation } from '@tanstack/react-query';
import { SignUpParams } from '../../../shared/services/authService/signup';
import toast from 'react-hot-toast';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z
    .string()
    .nonempty('Email é obrigatório.')
    .email('Informe um email válido.'),
  password: z
    .string()
    .nonempty('Senha é obrigatória.')
    .min(8, 'Senha deve conter ao menos 8 dígitos.')
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { t } = useTranslation();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignUpParams) => {
      return authService.signUp(data);
    }
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    // With those validations above, here its already validated (success case)
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
      setTimeout(() => {
        toast.success(t('toastMessages.register.userCreated'));
      }, 100);
    } catch {
      toast.error(t('toastMessages.register.userCreatedError'));
    }
  });

  return { handleSubmit, register, errors, isLoading, t };
}
