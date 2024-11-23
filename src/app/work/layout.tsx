import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Озвучить текст онлайн - AiBooks.ru',
	description: 'Озвучить текст на русском и других языках онлайн.',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}