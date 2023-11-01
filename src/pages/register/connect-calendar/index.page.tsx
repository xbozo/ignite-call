import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import * as CM from '../styles'
import * as C from './styles'
import { ArrowRight } from 'phosphor-react'

export default function Register() {
	return (
		<CM.Container>
			<CM.Header>
				<Heading as="strong">Conecte sua agenda!</Heading>
				<Text>
					Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos
					eventos à medida em que são agendados.
				</Text>

				<MultiStep
					size={4}
					currentStep={2}
				/>
			</CM.Header>

			<C.ConnectBox>
				<C.ConnectItem>
					<Text>Google Calendar</Text>
					<Button
						variant="secondary"
						size="sm"
					>
						Conectar
						<ArrowRight />
					</Button>
				</C.ConnectItem>

				<Button type="submit">
					Próximo passo
					<ArrowRight />
				</Button>
			</C.ConnectBox>
		</CM.Container>
	)
}
