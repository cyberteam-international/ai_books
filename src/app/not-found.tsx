'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Button from '@UI/button'

import img_404 from '@public/img_404.svg'

import style from './not-found.module.scss'
import clsx from 'clsx'

export default function NotFound() {
	
	const router = useRouter()

	return (
		<main className={clsx(style.notfound, 'container')}>
			<Image className={style.notfound__image} {...img_404} alt='page not found' />
			<p className={style.notfound__title}>Такой страницы не существует</p>
			<p className={style.notfound__subtitle}>Приносим извинения, запрошенная вами страница не была найдена, пожалуйста, вернитесь на главную страницу</p>
			<Button className={style.notfound__button} callback={()=>router.back()}>Вернуться</Button>
		</main>
	)
}