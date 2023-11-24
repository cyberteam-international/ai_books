import type { Metadata } from 'next'

import { FontOnest } from '@fonts/index'
import Header from '@components/Header'
import Footer from '@components/Footer'

import "normalize.css"
import '@styles/global.scss'
import '@styles/datepicker.scss'

export const metadata: Metadata = {
	title: 'AI Books',
	description: 'Автоматическое озвучивание текстов и аудиокниг',
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
					<Header/>
					{children}
				</div>
				<Footer/>
			</body>
		</html>
	)
}
