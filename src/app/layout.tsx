import type { Metadata } from 'next'

import { FontOnest } from '@fonts/index'

import ContextLayout from '@/components/ContextLayout'
import Header from '@components/Header'
import Footer from '@components/Footer'

import "normalize.css"
import '@styles/global.scss'
import '@styles/datepicker.scss'
import '@styles/slick-theme.scss'
import '@styles/slick.scss'

export const metadata: Metadata = {
	title: 'Создание аудиокниг. Озвучивание текстов. AIBooks',
	description: 'Сервис заказа озвучивания книг. Создаем аудиокниги на основе вашего текст на русском языке.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
			<html lang="ru">
				<body className={FontOnest.className}>
					<div className="page__wrapper">
						<ContextLayout>
							<Header/>
						{children}
						</ContextLayout>
					</div>
					<Footer/>
				</body>
			</html>
	)
}