import { CircularProgress, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { client, fetchClient } from '../../client';
import { FolderCollapse } from './FolderCollapse'
import { useNavigate } from '@tanstack/react-router';

interface FolderCollapseListProps {}

export function FolderCollapseList({}: FolderCollapseListProps) {
	const navigate = useNavigate();

	const folders = client.useQuery('get', '/folders');
	
	if(folders.isLoading || folders.error || folders.data === undefined) {
    return <CircularProgress />
  }

	const openCreateFolder = () => {
		navigate({ to: '/folder/create' });
	}

	const onDelete = async (id: string) => {
		const response = await fetchClient.DELETE(`/folders/{id}`, { params: { path: { id } } });

		if(response.error) {
			return console.error(response.error)
		}

		folders.refetch();
	}

	return (
		<div className='flex flex-col gap-2'>
			{folders.data.map(folder => (
				<FolderCollapse key={folder.id} folder={folder} onDelete={onDelete} />
			))}
			{folders.data.length === 0 && <span>No folders</span>}
			<div className='flex flex-row justify-center'>
				<IconButton onClick={() => openCreateFolder()}><Add className='*:fill-white'/></IconButton>
			</div>
		</div>
	)
}