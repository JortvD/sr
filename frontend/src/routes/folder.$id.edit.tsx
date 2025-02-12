import { createFileRoute, useRouter } from '@tanstack/react-router'
import { client, fetchClient } from '../client'
import { CircularProgress } from '@mui/material'
import { FolderEditor } from '../components/folder/FolderEditor'
import { UpdateFolder } from '../types'
import { PageContainer } from '../components/PageContainer'

export const Route = createFileRoute('/folder/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { id } = Route.useParams()

  const {
    data: folder,
    error,
    isLoading,
  } = client.useQuery('get', `/folders/{id}`, {
    params: { path: { id } },
  })

  const onSave = async (folder: UpdateFolder) => {
    const response = await fetchClient.PUT(`/folders/{id}`, {
      params: { path: { id } },
      body: folder,
    })

    if (response.error) {
      console.error(response.error)
      return
    }

    onExit()
  }

  const onExit = () => {
    router.history.back()
  }

  if (isLoading || error || folder === undefined) {
    return <CircularProgress />
  }

  return (
    <PageContainer>
      <FolderEditor folder={folder} onSave={onSave} onExit={onExit} />
    </PageContainer>
  )
}
