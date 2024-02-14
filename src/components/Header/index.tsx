'use client'

import Image from 'next/image';
import clsx from 'clsx'
import { useWindowWidth } from '@react-hook/window-size';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { LINKS, ROUTES } from '@utils/config';
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

    const { userInfo } = useContext(ContextUser)

    const pathname = usePathname()
    const windowWidth = useWindowWidth()

    useEffect(()=>{
        if (windowWidth > 767.99) {
            setIsOpen(false)
        }
    }, [windowWidth])

    return (
        <header className={clsx(style.header, isOpen && style.header_open, 'container')}>
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
                    <li className={clsx(style.header__menu__item, pathname === ROUTES.WORK && style.header__menu__item_active)}>
                        <Link onClick={() => setIsOpen(false)} href={ROUTES.WORK}>Озвучить</Link>
                    </li>
                    {userInfo && (
                        <>
                            <li className={clsx(style.header__menu__item, pathname === ROUTES.MY_AUDIO && style.header__menu__item_active)}>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.MY_AUDIO}>Мои аудио</Link>
                            </li>
                            <li className={clsx(style.header__menu__item, pathname === ROUTES.PAYMENT && style.header__menu__item_active)}>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.PAYMENT}>Баланс <span>{userInfo.balance.toLocaleString('ru-RU')}</span> ₽</Link>
                            </li>
                            {userInfo?.balance > 0 && (
                                <li className={clsx(style.header__menu__item, pathname === ROUTES.PREPARATION && style.header__menu__item_active)}>
                                    <Link href={ROUTES.PREPARATION}>Подготовка</Link>
                                </li>
                            )}
                        </>
                    )}
                    {userInfo?.is_admin && (
                        <li className={clsx(style.header__menu__item, pathname === ROUTES.STATISTIC && style.header__menu__item_active)}>
                            <Link href={ROUTES.STATISTIC}>Статистика</Link>
                        </li>
                    )}
                </ul>
                <ul className={clsx(style.header__menu, style.header__menu_mobile)}>
                    {userInfo ? (
                        <>
                            <li className={clsx(style.header__menu__item, pathname === ROUTES.PROFILE && style.header__menu__item_active)}>
                                <p>Личный кабинет</p>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.PROFILE}>{userInfo.name}</Link>
                            </li>
                            <li className={clsx(style.header__menu__item, pathname === ROUTES.PAYMENT && style.header__menu__item_active)}>
                                <p>Баланс</p>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.PAYMENT}>{userInfo.balance.toLocaleString('ru-RU')} ₽</Link>
                            </li>
                            <li className={clsx(style.header__menu__item, pathname === ROUTES.MY_AUDIO && style.header__menu__item_active)}>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.MY_AUDIO}><span>Мои аудио</span></Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={clsx(style.header__menu__item, pathname === ROUTES.REGISTRATION && style.header__menu__item_active)}>
                                <Link onClick={() => setIsOpen(false)} href={ROUTES.REGISTRATION} className={clsx(style.header__profile, style.header__profile_mobile)}>
                                    <span>Регистрация</span>
                                </Link>
                            </li>
                            <li onClick={() => setIsOpen(false)} className={clsx(style.header__menu__item, pathname === ROUTES.LOGIN && style.header__menu__item_active)}>
                                <Link href={ROUTES.LOGIN} className={clsx(style.header__profile, style.header__profile_mobile)}>
                                    <span>Войти</span>
                                </Link>
                            </li>
                        </>
                    )}
                    <li className={clsx(style.header__menu__item, pathname === ROUTES.WORK && style.header__menu__item_active)}>
                        <Link onClick={() => setIsOpen(false)} href={ROUTES.WORK}><span>Озвучить</span></Link>
                    </li>
                    {userInfo && userInfo.balance > 0 && (
                        <li className={clsx(style.header__menu__item)}>
                            <Link onClick={() => setIsOpen(false)} href={ROUTES.PREPARATION}><span>Подготовка</span></Link>
                        </li>
                    )}
                    <li className={clsx(style.header__menu__item)}>
                        <Link onClick={() => setIsOpen(false)} href={LINKS.ABOUT_US}><span>О проекте</span></Link>
                    </li>
                    <li className={clsx(style.header__menu__item)}>
                        <Link onClick={() => setIsOpen(false)} href={LINKS.RATES}><span>Тарифы</span></Link>
                    </li>
                    <li className={clsx(style.header__menu__item)}>
                        <Link onClick={() => setIsOpen(false)} href={LINKS.VOICES}><span>Голоса</span></Link>
                    </li>
                    <li className={clsx(style.header__menu__item)}>
                        <Link onClick={() => setIsOpen(false)} href={LINKS.SUPPORT}><span>Поддержка</span></Link>
                    </li>
                    <li className={clsx(style.header__menu__item, pathname === ROUTES.POLICY && style.header__menu__item_active)}>
                        <Link onClick={() => setIsOpen(false)} href={ROUTES.POLICY}><span>Политика конфиденциальности</span></Link>
                    </li>
                    <li className={clsx(style.header__menu__item, pathname === ROUTES.PUBLIC_OFFER && style.header__menu__item_active)}>
                        <Link onClick={() => setIsOpen(false)} href={ROUTES.PUBLIC_OFFER}><span>Договор оферты</span></Link>
                    </li>
                    {userInfo && (
                        <li className={clsx(style.header__menu__item, pathname === ROUTES.STATISTIC && style.header__menu__item_active)}>
                            <Link onClick={() => setIsOpen(false)} href={ROUTES.STATISTIC}><span>Статистика</span></Link>
                        </li>
                    )}
                </ul>
                <div className={style.header__social}>
                    {/* <a href={LINKS.VK} target="_blank" rel="noopener noreferrer"><Image {...vk} alt='vk' /></a> */}
                    <a href={LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer"><Image {...telegram} alt='telegram' /></a>
                    {/* <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer"><Image {...whatsapp} alt='whatsapp' /></a> */}
                </div>
                <p className={style.header__copyright}>© 2001-{new Date().getFullYear()}. Все права защищены</p>
            </nav>
            {userInfo ? (
                <Link href={ROUTES.PROFILE} className={style.header__profile}>
                    <p className={style.header__profile__name}>{userInfo.name}</p>
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
        </header>
    );
}
