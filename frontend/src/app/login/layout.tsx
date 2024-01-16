import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Войти',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}