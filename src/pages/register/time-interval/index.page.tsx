import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react';

import * as CM from '../styles';
import * as C from './styles';
import { ArrowRight } from 'phosphor-react';

export default function TimeIntervals() {
  return (
    <CM.Container>
      <CM.Header>
        <Heading as='strong'>Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </CM.Header>

      <C.IntervalBox as='form'>
        <C.IntervalsContainer>
          <C.IntervalItem>
            <C.IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </C.IntervalDay>
            <C.IntervalInputs>
              <TextInput size='sm' type='time' step={60} crossOrigin={''} />
              <TextInput size='sm' type='time' step={60} crossOrigin={''} />
            </C.IntervalInputs>
          </C.IntervalItem>

          <C.IntervalItem>
            <C.IntervalDay>
              <Checkbox />
              <Text>Terça-feira</Text>
            </C.IntervalDay>
            <C.IntervalInputs>
              <TextInput size='sm' type='time' step={60} crossOrigin={''} />
              <TextInput size='sm' type='time' step={60} crossOrigin={''} />
            </C.IntervalInputs>
          </C.IntervalItem>
        </C.IntervalsContainer>

        <Button type='submit'>
          Próximo passo
          <ArrowRight />
        </Button>
      </C.IntervalBox>
    </CM.Container>
  );
}
