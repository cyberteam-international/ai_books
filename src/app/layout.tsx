import type { Metadata } from 'next'
import { Suspense } from 'react'

import { FontOnest } from '@fonts/index'

import { ENDPOINTS_URL } from '@/utils/config'

import ContextLayout from '@/components/ContextLayout'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Loading from './loading'

import "normalize.css"
import '@styles/datepicker.scss'
import '@styles/slick-theme.scss'
import '@styles/slick.scss'
import '@styles/global.scss'

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
				<head>
					<link rel="preload" href={ENDPOINTS_URL.USERS} as="fetch" crossOrigin="anonymous"/>
				</head>
				<body className={FontOnest.className}>
				<ContextLayout>
					<div className="page__wrapper">
						<Header/>
						<Suspense fallback={<Loading/>}>
							{children}
						</Suspense>
					</div>
					<Footer/>
				</ContextLayout>
				</body>
			</html>
	)
}