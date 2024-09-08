import type {Metadata} from 'next'
import {Suspense} from 'react'

import {FontOnest} from '@fonts/index'

import ContextLayout from '@/components/ContextLayout'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Loading from './loading'

import "normalize.css"
import '@styles/datepicker.scss'
import '@styles/slick-theme.scss'
import '@styles/slick.scss'
import '@styles/global.scss'
import {Metrika} from "@components/Metrika/Metrika";

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
				<ContextLayout>
					<div className="page__wrapper">
						<Header/>
						<Suspense fallback={<Loading/>}>
							{children}
						</Suspense>
					</div>
					<Footer/>
				</ContextLayout>
				<Suspense>
					<Metrika/>
				</Suspense>
			</body>
		</html>
	)
}