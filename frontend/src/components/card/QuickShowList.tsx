import { Skeleton } from "@mui/material";
import { client } from "../../client";
import { QuickShow } from "./QuickShow";

interface QuickShowListProps {
	folderId: string;
}

export function QuickShowList({folderId}: QuickShowListProps) {
	const { data: cards, error, isLoading } = client.useQuery('get', `/folders/{id}/cards`, {
		params: {
			path: {
				id: folderId
			}
		}
	})

	if(isLoading || error || cards === undefined) {
		return <Skeleton variant="text" />
	}

	return (
		<div>
			{cards.map(card => (
				<QuickShow key={card.id} card={card} />
			))}
			{cards.length === 0 && <span>No cards</span>}
		</div>
	);
}