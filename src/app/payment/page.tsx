'use client'

import clsx from 'clsx';
import Image from 'next/image';
import { useContext } from 'react';

import { ContextUser } from '@/utils/context';
import { PRICE } from '@/utils/config';

import { FontUnbounded } from '@/fonts';
import History from '@components/payment/History';

import FormPayment from '@UI/forms/payment';

import loading_1 from '@public/loading_1.svg'

import style from './style.module.scss'

export default function PagePayment() {

    const [userState, _setUserState] = useContext(ContextUser)

    const averageСharacters = () => {
        if (userState?.balance) {
            return Math.floor(userState?.balance / PRICE).toLocaleString('ru-RU')
        }
    }

    return (
        <main className={clsx(style.payment, 'container')}>
            <div className={style.payment__wrapper}>
                <div className={style.payment__balance}>
                    <p className={style.payment__title}>Текущий баланс</p>
                    <p className={clsx(style.payment__balance__value, FontUnbounded.className)}>
                        {userState?.balance.toLocaleString('ru-RU')} <span>₽</span>
                    </p>
                    <div className={style.payment__balance__subtitle}>
                        <Image {...loading_1} alt="loading_1"/>
                        <p>Этого хватит на озвучивание ~{averageСharacters()} символов</p>
                    </div>
                </div>
                <div className={style.payment__form}>
                    <p className={style.payment__title}>Пополнить баланс</p>
                    <FormPayment/>
                </div>
            </div>
            <div className={style.payment__wrapper}>
                <History/>
            </div>
        </main>
    );
}
