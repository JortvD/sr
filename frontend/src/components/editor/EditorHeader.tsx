import { ArrowBack, Save } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface EditorHeaderProps {
	title: string;
	onSave?: () => void;
	onExit: () => void;
}

export function EditorHeader({ title, onSave, onExit }: EditorHeaderProps) {
	return (
		<div className='flex flex-row justify-between items-center'>
			<IconButton onClick={onExit}>
				<ArrowBack className="*:fill-white" />
			</IconButton>
			<div className=''>
				{title}
			</div>
			{onSave ? 
				<IconButton onClick={onSave}>
					<Save className="*:fill-white" />
				</IconButton> :
				<div></div>
			}
		</div>
	);
}