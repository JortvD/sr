import { IconButton } from "@mui/material";
import { UpdateCard } from "../../types";
import { Check, Close } from "@mui/icons-material";
import { StyledTextField } from "../mui";
import Markdown from 'react-markdown'
import RemarkMath from 'remark-math'

interface CardSuggestionProps {
	card: UpdateCard;
	updateCard: (card: UpdateCard) => void;
	onAccept: () => void;
	onReject: () => void;
}

export function CardSuggestion({ card, updateCard, onAccept, onReject }: CardSuggestionProps) {
	const removeVariant = (index: number) => {
		const newVariants = [...card.variants];
		newVariants.splice(index, 1);
		updateCard({ ...card, variants: newVariants });

		if (newVariants.length === 0) {
			onReject();
		}
	}

	const changeVariantQuestion = (index: number, question: string) => {
		const newVariants = [...card.variants];
		newVariants[index] = { ...newVariants[index], question };
		updateCard({ ...card, variants: newVariants });
	}

	const changeVariantAnswer = (index: number, answer: string) => {
		const newVariants = [...card.variants];
		newVariants[index] = { ...newVariants[index], answer };
		updateCard({ ...card, variants: newVariants });
	}

	return (
		<div className="flex flex-row gap-6 items-center pt-4">
			<div className="flex flex-col gap-4 grow">
				{card.variants.map((variant, index) => (
					<div key={index} className="flex flex-row gap-2 items-center">
						<IconButton onClick={() => removeVariant(index)}>
							<Close className="*:fill-white" />
						</IconButton>
						<div className="flex flex-col gap-2 grow">
							<StyledTextField 
								label="Question"
								value={variant.question}
								onChange={(e) => changeVariantQuestion(index, e.target.value)}
								multiline
							/>
							<Markdown className="text-sm" remarkPlugins={[RemarkMath]}>{variant.question}</Markdown>
							<StyledTextField 
								label="Answer"
								value={variant.answer}
								onChange={(e) => changeVariantAnswer(index, e.target.value)}
								multiline
							/>
							<Markdown className="text-sm" remarkPlugins={[RemarkMath]}>{variant.answer}</Markdown>
						</div>
					</div>
				))}
			</div>
			<div className="flex flex-col gap-4">
				<IconButton onClick={onAccept}>
					<Check className="*:fill-white" />
				</IconButton>
				<IconButton onClick={onReject}>
					<Close className="*:fill-white" />
				</IconButton>
			</div>
		</div>
	)
}