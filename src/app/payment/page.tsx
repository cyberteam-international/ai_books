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

    const { userInfo } = useContext(ContextUser)

    const averageСharacters = () => {
        if (userInfo?.balance) {
            return Math.floor(userInfo?.balance / PRICE).toLocaleString('ru-RU')
        }
    }

    return (
        <main className={clsx(style.payment, 'container')}>
            <div className={style.payment__wrapper}>
                <div className={style.payment__balance}>
                    <p className={style.payment__title}>Текущий баланс</p>
                    <p className={clsx(style.payment__balance__value, FontUnbounded.className)}>
                        {userInfo?.balance? Number(userInfo?.balance.toFixed(2)).toLocaleString('ru-RU') : 0} <span>₽</span>
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
