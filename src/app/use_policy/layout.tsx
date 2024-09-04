import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Политика запрещенного использования',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}