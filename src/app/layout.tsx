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
import Script from "next/script";

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
				<Script id="metrika-counter" strategy="afterInteractive">
					{`(function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
						m[i].l=1*new Date();
						for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
						k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
						(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
			
						ym(92974650, "init", {
						clickmap:true,
						trackLinks:true,
						accurateTrackBounce:true,
						webvisor:true
					});`}
				</Script>
				</body>
			</html>
	)
}