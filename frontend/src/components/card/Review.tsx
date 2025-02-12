import { Skeleton } from "@mui/material";
import { client, fetchClient } from "../../client";
import { useEffect, useState } from "react";
import { StyledButton } from "../mui";
import Markdown from "react-markdown";
import RemarkMath from "remark-math";

const BUTTON_MAP = {
	"Hard": 0,
	"Okay": 2,
	"Good": 4,
	"Easy": 5,
}

export function Review() {
	const [variant, setVariant] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);

	const { data: card, error, isLoading, refetch } = client.useQuery('get', `/cards/review`, {}, {
		retry(_, error) {
			return error.statusCode !== 404;
		},
	});

	useEffect(() => {
		if(card) {
			setVariant(Math.floor(Math.random() * card.variants.length));
		}
	}, [card]);

	const handleReview = async (grade: number) => {
		if (card === undefined) {
			return;
		}

		await fetchClient.POST(`/cards/{id}/review`, {
			params: { path: { id: card.id } },
			body: {
				grade,
			}
		});

		refetch();
	}

	console.log(card);

	if (error) {
		return <div className="p-4 rounded border border-white">There are no cards that need to be reviewed.</div>
	}

	if(isLoading || card === undefined) {
		return <div className="p-4 rounded border border-white"><Skeleton variant="text" /></div>
	}

	return (
		<div className="p-4 rounded border border-white flex flex-col gap-4">
			<div>
				<Markdown className="text-sm" remarkPlugins={[RemarkMath]}>{card.variants[variant].question}</Markdown>
			</div>
			{!showAnswer && <StyledButton onClick={() => setShowAnswer(true)}>Show Answer</StyledButton>}
			{showAnswer && (
				<>
					<div className="border-t border-gray-600 pt-4">
						<Markdown className="text-sm" remarkPlugins={[RemarkMath]}>{card.variants[variant].answer}</Markdown>
					</div>
					<div className="flex flex-row justify-between gap-2">
						{Object.entries(BUTTON_MAP).map(([key, value]) => (
							<StyledButton key={key} onClick={() => handleReview(value)} className="flex-grow">{key}</StyledButton>
						))}
					</div>
				</>
			)}
		</div>
	)
}