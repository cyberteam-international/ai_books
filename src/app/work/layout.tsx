import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'AI Books',
	description: 'Автоматическое озвучивание текстов и аудиокниг',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}