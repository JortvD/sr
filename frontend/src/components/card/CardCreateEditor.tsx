import { useState } from "react";
import { Card, UpdateCard } from "../../types";
import { EditorHeader } from "../editor/EditorHeader";
import { Editor } from "../editor/Editor";
import { EditorBody } from "../editor/EditorBody";
import { Tab } from "@mui/material";
import { FromTextCardCreate } from "./editors/FromTextCardCreate";
import { StyledTabs } from "../mui";
import { ImproveTextCardCreate } from "./editors/ImproveTextCardCreate";

interface CardCreateEditorProps {
	onSave: (card: UpdateCard) => Promise<Card | undefined>;
	onExit: () => void;
}

enum TabIndex {
	FromText = 0,
	ImproveText = 1,
	Raw = 2,
}

export function CardCreateEditor({onSave, onExit}: CardCreateEditorProps) {
	const [tab, setTab] = useState<TabIndex>(0);
	const [createdCards, setCreatedCards] = useState<Card[]>([]);

	const createCard = async (card: UpdateCard) => {
		const data = await onSave(card);

		if (!data) return;

		setCreatedCards([...createdCards, data]);
	}

	return (
		<Editor>
			<EditorHeader title={`Create Card`} onExit={onExit} />
			<EditorBody>
				<div className="p-4">
					{createdCards.length === 0 ? (
						<div>No cards created yet</div>
					) : (
						<div>{createdCards.length} cards created</div>
					)}
				</div>
				<StyledTabs value={tab} onChange={(_, value) => setTab(value)} className="border-b border-gray-600">
					<Tab label="From Text" />
					<Tab label="Improve Single"/>
					<Tab label="Raw"/>
				</StyledTabs>
				<div className="p-4">
					{tab === TabIndex.FromText && (
						<FromTextCardCreate createCard={createCard}/>
					)}
					{tab === TabIndex.ImproveText && (
						<ImproveTextCardCreate createCard={createCard}/>
					)}
					{tab === TabIndex.Raw && (
						<div>Raw</div>
					)}
				</div>
			</EditorBody>
		</Editor>
	)
}