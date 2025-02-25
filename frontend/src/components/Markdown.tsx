import ReactMarkdown from "react-markdown";
import RemarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownProps {
	value: string;
	className?: string;
}

export function Markdown({ value, className }: MarkdownProps) {
	return <ReactMarkdown className={className ?? ''} remarkPlugins={[RemarkMath]} rehypePlugins={[rehypeKatex]}>{value}</ReactMarkdown>
}