import { Skeleton } from "@mui/material";
import { client } from "../../client";
import { QuickShow } from "./QuickShow";

interface QuickShowListProps {
	folderId: string;
}

export function QuickShowList({folderId}: QuickShowListProps) {
	const { data: cards, error, isLoading, refetch } = client.useQuery('get', `/folders/{id}/cards`, {
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
		<div className="flex flex-col gap-1">
			{cards.map(card => (
				<QuickShow key={card.id} card={card} refetch={() => refetch()} />
			))}
			{cards.length === 0 && <span>No cards</span>}
		</div>
	);
}