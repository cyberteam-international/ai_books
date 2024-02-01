import Link from 'next/link';

import { ROUTES } from '@/utils/config';

import Button from '@/UI/button';

import style from './style.module.scss'

type Props = {};

export const ModalWarningRegistration = ({}: Props) => {

    return (
        <div className={style.modal__error}>
            <p className={style.modal__title}>Внимание!</p>
            <p className={style.modal__text}>Для озвучки большего количесто символов необходимо пройти регистрацию</p>
            <Button><Link href={ROUTES.REGISTRATION}>Зарегистрироваться</Link></Button>
        </div>
    );
}