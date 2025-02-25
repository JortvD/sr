import { StyledTextField } from "./mui";
import { Markdown } from "./Markdown";

interface MarkdownInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export function MarkdownInput({ label, value, onChange }: MarkdownInputProps) {
	return (
		<div className="flex flex-col gap-1">
			<StyledTextField 
				label={label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				multiline
			/>
			<Markdown value={value} className="text-sm pl-2 border-l" />
		</div>
	)
}