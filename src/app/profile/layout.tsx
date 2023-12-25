import ContextLayout from "@/components/ContextLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Профиль',
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ContextLayout>
			{children}
		</ContextLayout>
	)
}