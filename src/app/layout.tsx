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
import clsx from "clsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
	title: 'Копирование голосов, озвучивание текстов. Создание аудиокниг - AIBooks.ru',
	description: 'Сервис заказа озвучивания книг. Создаем аудиокниги на основе вашего текст на русском языке.',
	other: {
		"yandex-verification": "a76852d20d305cf6"
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<html lang="ru">
			<body className={clsx(FontOnest.className)}>
				<ContextLayout>
					<div className="page__wrapper">
						<Header/>
						<Suspense fallback={<Loading/>}>
							{children}
						</Suspense>
					</div>
					<ToastContainer />
					<Footer/>
				</ContextLayout>
				<Suspense>
					<Metrika/>
				</Suspense>
			</body>
		</html>
	)
}