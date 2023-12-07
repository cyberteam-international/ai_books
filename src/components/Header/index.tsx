'use client'

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx'
import { useWindowWidth } from '@react-hook/window-size';
import { useState } from 'react';

import { LINKS, ROUTES } from '@utils/config';

import logo from '@public/logo.svg'
import profile from '@public/profile.svg'
import burger_close from '@public/burger_close.svg'
import burger_open from '@public/burger_open.svg'
import vk from '@public/vk.svg'
import telegram from '@public/telegram.svg'
import whatsapp from '@public/whatsapp.svg'

import style from './style.module.scss'

type Props = {

};

export default function Header({ }: Props) {

    const windowWidth = typeof window !== undefined ? useWindowWidth() : 1920;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={clsx(style.header, (windowWidth < 768 && isOpen) && style.header_open, windowWidth > 768 && 'container')}>
            {windowWidth > 768 ? (
                <>
                    <Link href={ROUTES.HOME}>
                        <Image {...logo} alt='AI Books logo' />
                    </Link>
                    <nav>
                        <ul className={style.header__menu}>
                            <li className={style.header__menu__item}>
                                <Link href={ROUTES.MY_AUDIO}>Мои аудио</Link>
                            </li>
                            <li className={style.header__menu__item}>
                                <Link href={ROUTES.PAYMENT}>Баланс <span>2 999 000.49</span> ₽</Link>
                            </li>
                            <li className={style.header__menu__item}>
                                <Link href={ROUTES.HOME}>Справка</Link>
                            </li>
                        </ul>
                    </nav>
                    <Link href={ROUTES.PROFILE} className={style.header__profile}>
                        <p className={style.header__profile__name}>Александр</p>
                        <Image {...profile} alt={'profile image'} />
                    </Link>
                </>
            ) : (
                <div className={clsx(style.header__wrapper, 'container')}>
                    <div className={style.header__top}>
                        <Link onClick={()=>setIsOpen(false)} href={ROUTES.HOME}>
                            <Image {...logo} alt='AI Books logo' />
                        </Link>
                        {isOpen ? (
                            <Image {...burger_open} onClick={() => setIsOpen(false)} alt='close menu' />
                        ) : (
                            <Image {...burger_close} onClick={() => setIsOpen(true)} alt='open menu' />
                        )}
                    </div>
                    <nav className={clsx(style.header__burger, isOpen && style.header__burger_open)}>
                        <ul className={style.header__menu}>
                            <li className={style.header__menu__item}>
                                <p>Личный кабинет</p>
                                <Link onClick={()=>setIsOpen(false)} href={ROUTES.PROFILE}>Александр</Link>
                            </li>
                            <li className={style.header__menu__item}>
                                <p>Баланс</p>
                                <Link onClick={()=>setIsOpen(false)} href={ROUTES.PAYMENT}>2 999 000.49 ₽</Link>
                            </li>
                            <li className={style.header__menu__item}>
                                <Link onClick={()=>setIsOpen(false)} href={ROUTES.MY_AUDIO}><span>Мои аудио</span></Link>
                            </li>
                            <li className={style.header__menu__item}>
                                <Link onClick={()=>setIsOpen(false)} href={ROUTES.HOME}><span>Справка</span></Link>
                            </li>
                            <li className={style.header__menu__item}>
                                <a href={LINKS.ABOUT_US} target="_blank" rel="noopener noreferrer"><span>О проекте</span></a>
                            </li>
                            <li className={style.header__menu__item}>
                                <a href={'##'} target="_blank" rel="noopener noreferrer"><span>Тарифы</span></a>
                            </li>
                            <li className={style.header__menu__item}>
                                <a href={LINKS.VOICES} target="_blank" rel="noopener noreferrer"><span>Голоса</span></a>
                            </li>
                            <li className={style.header__menu__item}>
                                <a href={LINKS.SUPPORT} target="_blank" rel="noopener noreferrer"><span>Поддержка</span></a>
                            </li>
                        </ul>
                        <div className={style.header__social}>
                            <a href={LINKS.VK} target="_blank" rel="noopener noreferrer"><Image {...vk} alt='vk'/></a>
                            <a href={LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer"><Image {...telegram} alt='telegram'/></a>
                            <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer"><Image {...whatsapp} alt='whatsapp'/></a>
                        </div>
                        <p className={style.header__copyright}>© 2001-{new Date().getFullYear()}. Все права защищены</p>
                    </nav>
                </div>
            )}
        </header>
    );
}
