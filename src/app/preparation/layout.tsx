import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Подготовка текста',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}