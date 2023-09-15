import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../../app/services/authService';
import { SignInDTO } from '../../../app/services/authService/signin';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const schema = z.object({
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

export function useLoginController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignInDTO) => {
      return authService.signIn(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    // With those validations above, here its already validated (success case)
    try {
      const { accessToken } = await mutateAsync(data);
    } catch {
      toast.error('Credenciais inválidas.');
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
