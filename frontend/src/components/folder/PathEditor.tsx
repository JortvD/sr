import { Add, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { StyledSmallTextField } from "../mui";

interface PathEditorProps {
	path: string[];
	setPath: (path: string[]) => void;
}



export function PathEditor({path, setPath}: PathEditorProps) {
	const updateFolder = (index: number, value: string) => {
		const newPath = [...path];
		newPath[index] = value;
		setPath(newPath);
	}

	const addFolder = () => {
		setPath([...path, '']);
	}

	const removeFolder = (index: number) => {
		const newPath = [...path];
		newPath.splice(index, 1);
		setPath(newPath);
	}

	return (
		<div className='flex flex-row gap-2 items-center flex-wrap'>
			{path.map((folder, index) => (
				<div key={index} className='flex flex-row gap-2 items-center'>
					<StyledSmallTextField
						className="w-32"
						value={folder}
						onChange={e => updateFolder(index, e.target.value)}
					/>
					{index > 0 && (
						<IconButton onClick={() => removeFolder(index)} size="small">
							<Delete className="*:fill-white" fontSize="small" />
						</IconButton>
					)}
					<div className="text-2xl">/</div>
				</div>
			))}
			<IconButton onClick={addFolder}>
				<Add className="*:fill-white" fontSize="small" />
			</IconButton>
		</div>
	);

}