import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Профиль',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}