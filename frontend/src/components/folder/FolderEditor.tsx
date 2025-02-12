import { useEffect, useState } from "react";
import { Folder, UpdateFolder } from "../../types";
import { EditorHeader } from "../editor/EditorHeader";
import { Editor } from "../editor/Editor";
import { EditorBody } from "../editor/EditorBody";
import { PathEditor } from "./PathEditor";

interface FolderEditorProps {
	folder?: Folder;
	onSave: (folder: UpdateFolder) => void;
	onExit: () => void;
}

export function FolderEditor({folder, onSave, onExit}: FolderEditorProps) {
	const [isNew, setIsNew] = useState(false);
	const [path, setPath] = useState<string[]>([]);

	useEffect(() => {
		if (!folder) {
			setIsNew(true);
			setPath(['']);
		} else {
			setIsNew(false);
			setPath(folder.path);
		}
	}, [folder]);

	const handleSave = async () => {
		await onSave({
			path
		});
		onExit();
	}

	return (
		<Editor>
			<EditorHeader title={`${isNew ? 'Add' : 'Edit'} Folder`} onSave={handleSave} onExit={onExit} />
			<EditorBody>
				<PathEditor path={path} setPath={setPath} />
			</EditorBody>
		</Editor>
	)
}