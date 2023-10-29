import { Button, Text, TextInput } from '@ignite-ui/react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as C from './styles'
import { ArrowRight } from 'phosphor-react'

const claimUsernameFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'O usuário precisa ter ao menos 3 letras.' })
		.regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens.' })
		.transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ClaimUsernameFormData>({
		resolver: zodResolver(claimUsernameFormSchema),
	})

	async function handleClaimUsername(data: ClaimUsernameFormData) {
		console.log(data)
	}

	return (
		<>
			<C.Form
				as="form"
				onSubmit={handleSubmit(handleClaimUsername)}
			>
				<TextInput
					size="sm"
					prefix="ignite.com/"
					placeholder="seu-usuario"
					crossOrigin=""
					{...register('username')}
				/>
				<Button>
					Reservar
					<ArrowRight />
				</Button>
			</C.Form>
			<C.FormAnnotation>
				<Text size="sm">
					{errors.username ? errors.username.message : 'Digite o nome do usuário desejado'}{' '}
					{/* Essa msg default evita layout shift */}
				</Text>
			</C.FormAnnotation>
		</>
	)
}
