import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Статистика',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}