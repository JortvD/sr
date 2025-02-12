import { Check, Close, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

interface DeleteButtonProps {
	onDelete: () => void;
}

export function DeleteButton({onDelete}: DeleteButtonProps) {
	const [check, setCheck] = useState(false);

	return (
		<div className="flex flex-row gap-2 items-center">
			<div className={`flex flex-row gap-2 items-center ${check ? 'w-32' : 'w-0'} transition-all overflow-hidden`}>
				<div className="text-sm text-nowrap">Are you sure?</div>
				<IconButton onClick={() => onDelete()}>
					<Check className="*:fill-white" />
				</IconButton>
			</div>
			{check ? (
				<IconButton onClick={() => setCheck(false)}>
					<Close className="*:fill-white" />
				</IconButton>
			) : (
				<IconButton onClick={() => setCheck(true)}>
					<Delete className="*:fill-white" />
				</IconButton>
			)}
		</div>
	)
}