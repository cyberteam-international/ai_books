import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Как работает сервис озвучивания текстов - AiBooks.ru',
	description: 'Сколько символов можно озвучить бесплатно? Как скачать аудио озвучки? - Ответы на все вопросы в справке AIbooks.ru'
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}