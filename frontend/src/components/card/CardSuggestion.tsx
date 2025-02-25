import { IconButton } from "@mui/material";
import { UpdateCard } from "../../types";
import { Add, Check, Close } from "@mui/icons-material";
import { StyledIconButton } from "../mui";
import { MarkdownInput } from "../MarkdownInput";

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

	const addVariant = () => {
		updateCard({ ...card, variants: [...card.variants, { question: '', answer: '', alternatives: [] }] });
	}

	return (
		<div className="flex flex-row gap-6 items-center pt-4">
			<div className="flex flex-col gap-6 grow">
				{card.variants.map((variant, index) => (
					<div key={index} className="flex flex-row gap-2 items-center">
						<IconButton onClick={() => removeVariant(index)}>
							<Close className="*:fill-white" />
						</IconButton>
						<div className="flex flex-col gap-4 grow">
							<MarkdownInput label="Question" value={variant.question} onChange={(value) => changeVariantQuestion(index, value)} />
							<MarkdownInput label="Answer" value={variant.answer} onChange={(value) => changeVariantAnswer(index, value)} />
						</div>
					</div>
				))}
				<div className="flex flex-col items-center">
					<StyledIconButton onClick={() => addVariant()}>
						<Add />
					</StyledIconButton>
				</div>
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