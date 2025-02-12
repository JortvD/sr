import { Card } from "../../types";
import { Mode } from "@mui/icons-material";
import moment from 'moment';
import { StyledIconButton } from "../mui";
import { DeleteButton } from "../DeleteButton";

interface QuickShowProps {
	card: Card;
}

export function QuickShow({card}: QuickShowProps) {
	return (
		<div className="flex flex-row gap-2 justify-between items-center">
			<div className="flex flex-col">
				<div>{card.variants[0].question}</div>
				<div className="text-sm">{card.variants.length} variants, due {moment(card.dueDate).fromNow()} (created {moment(card.createdAt).toNow(true)} ago)</div>
			</div>
			<div className="flex flex-row gap-2">
				<DeleteButton onDelete={() => {}} />
				<StyledIconButton>
					<Mode />
				</StyledIconButton>
			</div>
		</div>
	);
}