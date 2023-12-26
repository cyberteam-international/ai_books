import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Баланс',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}