import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { LINKS, ROUTES } from '@utils/config';

import logo from '@public/logo.svg'
import vk from '@public/vk.svg'
import telegram from '@public/telegram.svg'
import whatsapp from '@public/whatsapp.svg'

import style from './style.module.scss'

type Props = {};

export default function Footer({ }: Props) {
    return (
        <footer className={style.footer}>
            <div className={clsx(style.footer__wrapper, "container")}>
                <Link href={ROUTES.HOME}>
                    <Image {...logo} alt='AI Books logo'/>
                </Link>
                <div className={style.footer__info}>
                    <p className={style.footer__info__adress}>ООО “Директ-Медиа” г. Москва, ул. Обручева, д. 34-63, стр. 3, этаж 1 пом I, ком 1</p>
                    <a className={style.footer__info__phone} href="tel:+78003336845">8 800 333-68-45</a>
                    <a className={style.footer__info__email} href="mailto:info@directmedia.ru">info@directmedia.ru</a>
                </div>
                <div className={style.footer__nav}>
                    <nav>
                        <ul className={style.footer__nav__menu}>
                            <li className={style.footer__nav__menu__item}>
                                <a href={LINKS.ABOUT_US} target="_blank" rel="noopener noreferrer">О проекте</a>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <a href={'##'} target="_blank" rel="noopener noreferrer">Тарифы</a>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <a href={LINKS.VOICES} target="_blank" rel="noopener noreferrer">Голоса</a>
                            </li>
                            <li className={style.footer__nav__menu__item}>
                                <a href={LINKS.SUPPORT} target="_blank" rel="noopener noreferrer">Поддержка</a>
                            </li>
                        </ul>
                    </nav>
                    <div className={style.footer__nav__social}>
                        <a href={LINKS.VK} target="_blank" rel="noopener noreferrer"><Image {...vk} alt='vk'/></a>
                        <a href={LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer"><Image {...telegram} alt='telegram'/></a>
                        <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer"><Image {...whatsapp} alt='whatsapp'/></a>
                    </div>
                    <p className={style.footer__nav__copyright}>© 2001-{new Date().getFullYear()}. Все права защищены</p>
                </div>
            </div>
        </footer>
    );
}
