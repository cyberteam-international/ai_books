import Link from 'next/link';

import { ROUTES } from '@/utils/config';

import Button from '@/UI/button';

import style from './style.module.scss'

type Props = {};

export const ModalWarningEnoughBalance = ({}: Props) => {

    return (
        <div className={style.modal__error}>
            <p className={style.modal__title}>Внимание!</p>
            <p className={style.modal__text}>Вы не сможете озвучить, то, количество символов, которое вы ввели. Так как у вас недостаточно баланса. Пополните или сократите количество символов</p>
            <Button><Link href={ROUTES.PAYMENT}>Пополнить</Link></Button>
        </div>
    );
}
