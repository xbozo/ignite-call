import { signIn, useSession } from 'next-auth/react';

import { Button, Heading, MultiStep, Text } from '@ignite-ui/react';

import * as CM from '../styles';
import * as C from './styles';
import { ArrowRight, Check } from 'phosphor-react';
import { useSearchParams } from 'next/navigation';

export default function Register() {
  const session = useSession();
  const query = useSearchParams();

  const hasAuthError = !!query.get('error');
  const isSignedIn = session.status === 'authenticated';

  async function handleConnectCallendar() {
    await signIn('google');
  }

  return (
    <CM.Container>
      <CM.Header>
        <Heading as='strong'>Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </CM.Header>

      <C.ConnectBox>
        <C.ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size='sm' disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant='secondary'
              size='sm'
              onClick={handleConnectCallendar}>
              Conectar
              <ArrowRight />
            </Button>
          )}
        </C.ConnectItem>

        {hasAuthError && (
          <C.AuthError size='sm'>
            Falha ao se conectar ao Google. Verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </C.AuthError>
        )}

        <Button type='submit' disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </C.ConnectBox>
    </CM.Container>
  );
}
