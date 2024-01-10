import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Публичная оферта',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}