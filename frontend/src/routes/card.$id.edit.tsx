import { createFileRoute, useRouter } from '@tanstack/react-router'
import { PageContainer } from '../components/PageContainer'
import { CardEditor } from '../components/card/CardEditor'
import { client, fetchClient } from '../client'
import { CircularProgress } from '@mui/material'
import { UpdateCard } from '../types'

export const Route = createFileRoute('/card/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const { id } = Route.useParams()

	const {
		data: card,
		error,
		isLoading,
	} = client.useQuery('get', `/cards/{id}`, {
		params: { path: { id } },
	})

	const onExit = () => {
    router.history.back()
  }

	const onSave = async (updatedCard: UpdateCard) => {
		if (card === undefined) {
			return
		}

		const response = await fetchClient.PUT(`/cards/{id}`, {
			params: { path: { id } },
			body: {
				...updatedCard,
				folder: card?.folder
			}
		});

		if (response.error) {
			console.error(response.error)
			return
		}

		onExit();
	}


  return (
		<PageContainer>
			{
				(isLoading || error || card === undefined) ? 
				<CircularProgress /> : 
				<CardEditor card={card} onSave={card => onSave(card)} onExit={onExit} />
			}
		</PageContainer>
	)
}
