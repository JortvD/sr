export function EditorBody({children}: {children: React.ReactNode}) {
	return (
		<div className="flex flex-col h-full p-4">
			{children}
		</div>
	)
}