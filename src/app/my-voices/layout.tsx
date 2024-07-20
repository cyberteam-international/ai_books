import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Мои голоса',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}