import { Card } from "../../types";
import { Mode } from "@mui/icons-material";
import moment from 'moment';
import { StyledIconButton } from "../mui";
import { DeleteButton } from "../DeleteButton";
import { useState } from "react";
import { OptionButtons } from "../OptionButtons";
import { fetchClient } from "../../client";
import { useNavigate } from "@tanstack/react-router";

interface QuickShowProps {
	card: Card;
	refetch: () => void;
}

export function QuickShow({card, refetch}: QuickShowProps) {
	const navigate = useNavigate();
	const [showButtons, setShowButtons] = useState(false);

	const deleteCard = async () => {
		const response = await fetchClient.DELETE(`/cards/{id}`, { params: { path: { id: card.id } } });

		if (response.error) {
			return console.error(response.error);
		}

		refetch();
	}

	return (
		<div className="flex flex-row gap-2 justify-between items-center">
			<div className="flex flex-col overflow-hidden">
				<div className="truncate max-w-full">{card.variants[0].question}</div>
				<div className="text-sm">{card.variants.length} variants, due {moment(card.dueDate).fromNow()} (created {moment(card.createdAt).toNow(true)} ago)</div>
			</div>
			<OptionButtons open={showButtons} setOpen={setShowButtons} fontSize="small">
				<DeleteButton onDelete={() => deleteCard()} />
				<StyledIconButton onClick={() => navigate({ to: '/card/$id/edit', params: { id: card.id } })}>
					<Mode />
				</StyledIconButton>
			</OptionButtons>
		</div>
	);
}