import { Close, MoreVert } from "@mui/icons-material";
import { StyledIconButton } from "./mui";

interface OptionButtonsProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactNode;
	fontSize?: 'small' | 'medium' | 'large';
}

export function OptionButtons({children, open, setOpen, fontSize}: OptionButtonsProps) {
	return (
		<div className="flex flex-row gap-2 items-center justify-end">
			<div className={`flex flex-row gap-2 ${open ? 'w-auto' : 'w-0'} transition-all overflow-hidden justify-end`}>
				{children}
			</div>
			{open ?
				<StyledIconButton onClick={() => setOpen(false)}>
					<Close fontSize={fontSize ?? 'medium'} />
				</StyledIconButton> :
				<StyledIconButton 
					onClick={() => setOpen(true)} 
					className="opacity-20 hover:opacity-100 transition-opacity"
				>
					<MoreVert fontSize={fontSize ?? 'medium'} />
				</StyledIconButton>
			}
		</div>
	);
}