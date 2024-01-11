'use client'

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx'
import { useWindowWidth } from '@react-hook/window-size';
import { useContext, useState } from 'react';

import { LINKS, ROUTES } from '@utils/config';
import { useIsClient } from '@/utils/hooks';
import { ContextUser } from '@/utils/context';

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

    const [isOpen, setIsOpen] = useState(false);
    const isClient = useIsClient()

    const [userState, _setUserState] = useContext(ContextUser)

    const windowWidth = useWindowWidth()

    return (
        <header className={clsx(style.header, (isClient && windowWidth < 768 && isOpen) && style.header_open, isClient && windowWidth > 768 && 'container')}>
            {isClient && (
                <>
                    {windowWidth > 768 ? (
                        <>
                            <Link href={ROUTES.HOME} onClick={() => setIsOpen(false)}>
                                <Image {...logo} alt='AI Books logo' />
                            </Link>
                            <nav>
                                <ul className={style.header__menu}>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={ROUTES.WORK}>Озвучить</Link>
                                    </li>
                                    {userState && (
                                        <>
                                            <li className={style.header__menu__item}>
                                                <Link onClick={() => setIsOpen(false)} href={ROUTES.MY_AUDIO}>Мои аудио</Link>
                                            </li>
                                            <li className={style.header__menu__item}>
                                                <Link onClick={() => setIsOpen(false)} href={ROUTES.PAYMENT}>Баланс <span>{userState.balance}</span> ₽</Link>
                                            </li>
                                        </>
                                    )}
                                    <li className={style.header__menu__item}>
                                        <Link href={ROUTES.POLICY}>Справка</Link>
                                    </li>
                                </ul>
                            </nav>
                            {userState ? (
                                <Link href={ROUTES.PROFILE} className={style.header__profile}>
                                    <p className={style.header__profile__name}>{userState.name}</p>
                                    <Image {...profile} alt={'profile image'} />
                                </Link>
                            ) : (
                                <div className={style.header__block}>
                                    <Link onClick={() => setIsOpen(false)} href={ROUTES.REGISTRATION} className={style.header__profile}>
                                        Регистрация
                                    </Link>
                                    <Link onClick={() => setIsOpen(false)} href={ROUTES.LOGIN} className={style.header__profile}>
                                        Войти
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={clsx(style.header__wrapper, 'container')}>
                            <div className={style.header__top}>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.HOME}>
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
                                    {userState ? (
                                        <>
                                            <li className={style.header__menu__item}>
                                                <p>Личный кабинет</p>
                                                <Link onClick={() => setIsOpen(false)} href={ROUTES.PROFILE}>{userState.name}</Link>
                                            </li>
                                            <li className={style.header__menu__item}>
                                                <p>Баланс</p>
                                                <Link onClick={() => setIsOpen(false)} href={ROUTES.PAYMENT}>{userState.balance} ₽</Link>
                                            </li>
                                            <li className={style.header__menu__item}>
                                                <Link onClick={() => setIsOpen(false)} href={ROUTES.MY_AUDIO}><span>Мои аудио</span></Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className={style.header__menu__item}>
                                                <Link onClick={() => setIsOpen(false)} href={ROUTES.REGISTRATION} className={style.header__profile}>
                                                    <span>Регистрация</span>
                                                </Link>
                                            </li>
                                            <li onClick={() => setIsOpen(false)} className={style.header__menu__item}>
                                                <Link href={ROUTES.LOGIN} className={style.header__profile}>
                                                    <span>Войти</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={ROUTES.WORK}><span>Озвучить</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={ROUTES.POLICY}><span>Справка</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={LINKS.ABOUT_US} scroll={true}><span>О проекте</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={'##'}><span>Тарифы</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={LINKS.VOICES} scroll={true}><span>Голоса</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={LINKS.SUPPORT} scroll={true}><span>Поддержка</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={LINKS.SUPPORT} scroll={true}><span>Поддержка</span></Link>
                                    </li>
                                    <li className={style.header__menu__item}>
                                        <Link onClick={() => setIsOpen(false)} href={ROUTES.PUBLIC_OFFER} scroll={true}><span>Договор оферты</span></Link>
                                    </li>
                                </ul>
                                <div className={style.header__social}>
                                    <a href={LINKS.VK} target="_blank" rel="noopener noreferrer"><Image {...vk} alt='vk' /></a>
                                    <a href={LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer"><Image {...telegram} alt='telegram' /></a>
                                    <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer"><Image {...whatsapp} alt='whatsapp' /></a>
                                </div>
                                <p className={style.header__copyright}>© 2001-{new Date().getFullYear()}. Все права защищены</p>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </header>
    );
}
