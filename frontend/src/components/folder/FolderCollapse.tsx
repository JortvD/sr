import { useState } from 'react'
import type { Folder } from '../../types'
import { QuickShowList } from '../card/QuickShowList'
import { Collapse, IconButton, Typography } from '@mui/material'
import { Add, Edit, ExpandMore } from '@mui/icons-material'
import { useNavigate } from '@tanstack/react-router'
import { DeleteButton } from '../DeleteButton'
import { OptionButtons } from '../OptionButtons'

interface FolderCollapseProps {
	folder: Folder
	onDelete: (id: string) => void
}

export function FolderCollapse({folder, onDelete}: FolderCollapseProps) {
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const [showButtons, setShowButtons] = useState(false)

	const openEditPage = () => {
		navigate({ to: `/folder/${folder.id}/edit` })
	}

	const openNewCardPage = () => {
		navigate({ to: `/folder/${folder.id}/card/create` })
	}

	return (
		<div className='flex flex-col'>
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row items-center gap-2'>
					<IconButton
						onClick={() => setShow(!show)}
						aria-expanded={show}
						aria-label="show more"
					>
						<ExpandMore 
							className={`*:fill-white`}
							style={{ 
								transform: show ? 'rotate(0deg)' : 'rotate(-90deg)',
								transition: 'transform 0.3s'
							}}
						/>
					</IconButton>
					<Typography variant="h6">
						{folder.path.join('/')}
					</Typography>
				</div>
				<OptionButtons open={showButtons} setOpen={setShowButtons}>
					<DeleteButton onDelete={() => onDelete(folder.id)} />
					<IconButton onClick={() => openEditPage()} >
						<Edit className="*:fill-white" />
					</IconButton>
					<IconButton onClick={() => openNewCardPage()} >
						<Add className="*:fill-white" />
					</IconButton>
				</OptionButtons>
			</div>
			<Collapse in={show} timeout="auto" unmountOnExit>
				<div className="ml-[19px] py-4 pl-4 border-l border-white">
					<QuickShowList folderId={folder.id} />
				</div>
			</Collapse>
		</div>
	)
}