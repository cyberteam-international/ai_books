import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Пользовательское соглашение',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}