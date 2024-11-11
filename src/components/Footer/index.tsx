'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { LINKS, ROUTES } from '@utils/config';
import ButtonUp from '@/UI/buttonUp';

import style from './style.module.scss';

export default function Footer() {
    const pathname = usePathname();

    // Условие, чтобы не рендерить Footer на странице /chat
    if (pathname === '/chat') return null;

    return (
        <footer className={style.footer}>
            <div className={clsx(style.footer__wrapper, "container")}>
                <Link href={ROUTES.HOME}>
                    <Image src='/logo.svg' alt='AI Books logo' width={128} height={19} />
                </Link>
                <div className={style.footer__info}>
                    <p className={style.footer__info__adress}>ООО “Директ-Медиа” г. Москва, ул. Обручева, д. 34-63, стр. 3, этаж 1 пом 1, ком 1</p>
                    <a className={style.footer__info__phone} href="tel:+78003336845">8 800 333-68-45</a>
                    <a className={style.footer__info__email} href="mailto:info@directmedia.ru">info@directmedia.ru</a>
                </div>
                <div className={style.footer__nav}>
                    <nav>
                        <ul className={style.footer__nav__menu}>
                            <li className={style.footer__nav__menu__item}>
                                <Link href={LINKS.ABOUT_US}>О проекте</Link>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <Link href={LINKS.RATES}>Тарифы</Link>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <Link href={LINKS.VOICES}>Голоса</Link>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <Link href={ROUTES.HELP}>Тех. поддержка</Link>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <Link href={ROUTES.POLICY}>Политика конфиденциальности</Link>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <Link href={ROUTES.PUBLIC_OFFER}>Договор оферты</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={style.footer__nav__social}>
                        <a href={LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer">
                            <Image src='/telegram.svg' alt='telegram' width={40} height={40} />
                        </a>
                    </div>
                    <p className={style.footer__nav__copyright}>© 2001-{new Date().getFullYear()}. Все права защищены</p>
                </div>
                <div className={style.footer__scroll}>
                    <ButtonUp />
                </div>
            </div>
        </footer>
    );
}
