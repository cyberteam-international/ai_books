import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx'

import logo from '@public/logo.svg'
import profile from '@public/profile.svg'

import style from './style.module.scss'

type Props = {
    
};

export default function Header({ }: Props) {
    return (
        <header className={clsx(style.header, 'container')}>
            <Link href={'/'}>
                <Image {...logo} alt='AI Books logo'/>
            </Link>
            <nav>
                <ul className={style.header__menu}>
                    <li className={style.header__menu__item}>
                        <Link href={'/'}>Мои аудио</Link>
                    </li>
                    <li className={style.header__menu__item}>
                        <Link href={'/'}>Баланс <span>2 999 000.49</span> ₽</Link>
                    </li>
                    <li className={style.header__menu__item}>
                        <Link href={'/'}>Справка</Link>
                    </li>
                </ul>
            </nav>
            <Link href={'/'} className={style.header__profile}>
                <p className={style.header__profile__name}>Александр</p>
                <Image {...profile} alt={'profile image'} />
            </Link>
        </header>
    );
}
