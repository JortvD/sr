import { createFileRoute, useRouter } from '@tanstack/react-router'
import { UpdateCard } from '../types'
import { fetchClient } from '../client'
import { PageContainer } from '../components/PageContainer'
import { CardCreateEditor } from '../components/card/CardCreateEditor'

export const Route = createFileRoute('/folder/$folderId/card/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
	const { folderId } = Route.useParams()

	const onSave = async (card: UpdateCard) => {
		const response = await fetchClient.POST(`/cards`, {
			body: {
				...card,
				folder: folderId
			},
		})

		if (response.error) {
			return
		}

		return response.data
	}

	const onExit = () => {
		router.history.back()
	}

	return (
		<PageContainer>
			<CardCreateEditor onSave={onSave} onExit={onExit} />
		</PageContainer>
	)
}
