import clsx from "clsx";
import Link from "next/link";

import { FontUnbounded } from "@/fonts";
import { ROUTES } from "@/utils/config";

import FormLogin from "@/UI/forms/login";

import style from './style.module.scss'

type Props = {};

export default function PageLogin({ }: Props) {

    return (
        <main className={clsx(style.registration, 'container')}>
            <div className={style.registration__wrapper}>
                <h4 className={FontUnbounded.className}>Личный кабинет</h4>
                <h5>Нет аккаунта? <Link href={ROUTES.REGISTRATION}>Зарегистрироваться</Link></h5>
                <FormLogin/>
            </div>
        </main>
    );
}
