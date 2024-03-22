import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Параметры',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}