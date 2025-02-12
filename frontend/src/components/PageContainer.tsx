interface PageContainerProps {
	children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
	return (
		<div className="w-full max-w-[700px] mx-auto p-4 flex flex-col gap-4">
			{children}
		</div>
	);
}