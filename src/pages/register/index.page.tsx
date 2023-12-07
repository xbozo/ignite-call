import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import * as C from './styles';
import { ArrowRight } from 'phosphor-react';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter ao menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),

  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const query = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const username = query.get('username');
    if (username) {
      setValue('username', username);
    }
  }, [query, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      });

      await router.push('/register/connect-calendar');
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }

      console.error(err);
    }
  }

  return (
    <C.Container>
      <C.Header>
        <Heading as='strong'>Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </C.Header>

      <C.Form as='form' onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size='sm'>Nome de usuário</Text>
          <TextInput
            prefix='ignite.com/'
            placeholder='seu-usuario'
            crossOrigin=''
            {...register('username')}
          />

          {errors.username && (
            <C.FormError size='sm'>{errors.username.message}</C.FormError>
          )}
        </label>

        <label>
          <Text size='sm'>Nome completo</Text>
          <TextInput
            placeholder='Seu nome'
            crossOrigin=''
            {...register('name')}
          />

          {errors.name && (
            <C.FormError size='sm'>{errors.name.message}</C.FormError>
          )}
        </label>

        <Button type='submit' disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </C.Form>
    </C.Container>
  );
}
