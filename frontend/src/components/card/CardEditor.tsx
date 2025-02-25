import { useEffect, useState } from "react";
import { Card, UpdateCard } from "../../types";
import { CardSuggestion } from "./CardSuggestion";
import moment from "moment";

interface CardEditorProps {
	card: Card;
	onSave: (card: UpdateCard) => void;
	onExit: () => void;
}

export function CardEditor({ card, onSave, onExit }: CardEditorProps) {
	const [updateCard, setUpdateCard] = useState<UpdateCard>(card);

	useEffect(() => {
		setUpdateCard(card);
	}, [card]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<span>Created: {moment(card.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
				<span>Due: {moment(card.dueDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
				<span>E-factor: {card.efactor}</span>
				<span>Interval: {card.interval}</span>
				<span>Repetition: {card.repetition}</span>
				<span>In: {card.folder}</span>
			</div>
			<CardSuggestion card={updateCard} updateCard={card => setUpdateCard(card)} onAccept={() => onSave(updateCard)} onReject={onExit} />
		</div>
	);
}