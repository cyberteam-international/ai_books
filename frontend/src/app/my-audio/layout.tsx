import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Мои аудио',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}