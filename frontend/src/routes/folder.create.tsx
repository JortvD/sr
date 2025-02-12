import { createFileRoute, useRouter } from '@tanstack/react-router'
import { FolderEditor } from '../components/folder/FolderEditor'
import { fetchClient } from '../client'
import { UpdateFolder } from '../types'
import { PageContainer } from '../components/PageContainer'

export const Route = createFileRoute('/folder/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const onSave = async (folder: UpdateFolder) => {
    const response = await fetchClient.POST(`/folders`, {
      body: folder,
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
      <FolderEditor onSave={onSave} onExit={onExit} />
    </PageContainer>
  )
}
