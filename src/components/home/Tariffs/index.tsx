'use client'

import Link from 'next/link';
import s from './style.module.scss'
import { FontUnbounded } from "@/fonts";
import { ROUTES } from '@/utils/config';


type Props = {
	onClick: () => void
};

const Tariffs = ({onClick}: Props) => {

	return (
		<div id="tariffs" className={`${s.tariffs}`}>
			<h2 className={`${s.tariffs__title} ${FontUnbounded.className}`} id="tariffs_h">Тарифы</h2>
			
			<div className={`${s.tariffs__items}`}>
				<div className={`${s.tariffs__item}`}>
					<h3 className={`${s.tariffs__subtitle} ${FontUnbounded.className}`}>Копирование голосов</h3>
					<div className={`${s.tariffs__price}`}>
						<span className={` ${FontUnbounded.className}`}>40 000 ₽</span>
						<span>за 1 млн символов<br/> 33р. минута</span>
					</div>
					<ul className={`${s.tariffs__list} list`}>
						<li>Создание персональных голосов</li>
						<li>Настройка персональных голосов</li>
						<li>Озвучивание до 5 000 символов за раз</li>
					</ul>
					<Link href={`${ROUTES.WORK}?start`} className={`${s.tariffs__button} button`}>Начать</Link>
				</div>

				<div className={`${s.tariffs__item}`}>
					<h3 className={`${s.tariffs__subtitle} ${FontUnbounded.className}`}>Библиотека голосов</h3>
					<div className={`${s.tariffs__price}`}>
						<span className={` ${FontUnbounded.className}`}>3 200 ₽</span>
						<span>за 1 млн символов</span>
					</div>
					<ul className={`${s.tariffs__list} list`}>
						<li>Доступ в личный кабинет</li>
						<li>Озвучивание до 5 000 символов за раз на русском и других языках</li>
						<li>Бесплатная обработка сложных текстовых фрагментов</li>
						<li>Выбираете голос диктора и скачиваете готовый аудиофайл</li>
					</ul>
					<Link href={ROUTES.WORK} className={`${s.tariffs__button} button`}>Попробовать бесплатно</Link>
				</div>

				<div className={`${s.tariffs__item}`} data-badge="под ключ">
					<h3 className={`${s.tariffs__subtitle} ${FontUnbounded.className}`}>Озвучивание для издательств</h3>
					<div className={`${s.tariffs__price}`}>
						<span className={` ${FontUnbounded.className}`}>75 000 ₽</span>
						<span>за 1 млн символов<br/> 3 000р. за авторский лист</span>
					</div>
					<ul className={`${s.tariffs__list} list`}>
						<li>Выбираете голос диктора</li>
						<li>Передаете нам фрагмент книги объемом до 10 000 символов</li>
						<li>Мы предварительно проверяем текст и делаем пробное озвучивание</li>
						<li>Производим аудио и передаем Вам готовое издание</li>
					</ul>
					<button className={`${s.tariffs__button} button`} onClick={onClick}>Получить предложение</button>
				</div>
			</div>
		</div>
	);
}

export default Tariffs;