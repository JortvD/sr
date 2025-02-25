import { useState } from "react";
import { UpdateCard } from "../../../types";
import { CardSuggestion } from "../CardSuggestion";

interface RawCardCreateProps {
	createCard: (card: UpdateCard) => void;
	show: boolean;
}

const DEFAULT_CARD: UpdateCard = {
	variants: [{ question: '', answer: '', alternatives: [] }]
}

export function RawCardCreate({createCard, show}: RawCardCreateProps) {
	const [card, setCard] = useState<UpdateCard>(DEFAULT_CARD);

	return (
		<div className={`flex flex-col gap-4 ${show ? '' : 'hidden'}`}>
			<CardSuggestion card={card} updateCard={setCard} onAccept={() => createCard(card)} onReject={() => setCard(DEFAULT_CARD)} />
		</div>
	)
}