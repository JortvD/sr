import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { fetchClient } from "../../../client";
import { StyledButton, StyledTextField } from "../../mui";
import { UpdateCard } from "../../../types";
import { CardSuggestion } from "../CardSuggestion";
import { nanoid } from "nanoid";
import { ModelSelect } from "../ModelSelect";

interface FromTextCardCreateProps {
	createCard: (card: UpdateCard) => void;
	show: boolean;
}

export function FromTextCardCreate({createCard, show}: FromTextCardCreateProps) {
	const [text, setText] = useState<string>('')
	const [suggestedCards, setSuggestedCards] = useState<UpdateCard[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [model, setModel] = useState<string>('')

	const handleGenerate = async () => {
		setLoading(true)

		const response = await fetchClient.POST(`/cards/from-text`, {
			body: {
				text,
				model
			}
		})

		setLoading(false)

		if (response.error) {
			return
		}

		setSuggestedCards(response.data.map((card: UpdateCard) => ({
			id: nanoid(),
			...card
		})))
	}

	const updateCard = (index: number, card: UpdateCard) => {
		const newCards = [...suggestedCards]
		newCards[index] = card
		setSuggestedCards(newCards)
	}

	const deleteCard = (index: number) => {
		const newCards = [...suggestedCards]
		newCards.splice(index, 1)
		setSuggestedCards(newCards)
	}

	const acceptCard = async (index: number) => {
		const card = suggestedCards[index]

		await createCard(card)

		deleteCard(index);
	}

	return (
		<div className={`flex flex-col gap-4 ${show ? '' : 'hidden'}`}>
			<div className="flex flex-col gap-2">
				<StyledTextField 
					label="From" 
					value={text} 
					onChange={(e) => setText(e.target.value)} 
					multiline
					minRows={4}
				/>
				<div className="flex flex-row justify-between items-center">
					<ModelSelect model={model} setModel={setModel} />
					<StyledButton onClick={() => handleGenerate()}>Generate</StyledButton>
				</div>
			</div>
			{loading ? (
				<CircularProgress />
			) : (
				<div className="flex flex-col gap-4 divide-y">
					{suggestedCards.map((card, index) => (
						<CardSuggestion 
							card={card} 
							updateCard={(updatedCard: UpdateCard) => updateCard(index, updatedCard)} 
							onAccept={() => acceptCard(index)} 
							onReject={() => deleteCard(index)} 
						/>
					))}
				</div>
			)}
		</div>
	)
}