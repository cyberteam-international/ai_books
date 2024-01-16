import clsx from "clsx";
import Link from "next/link";

import { FontUnbounded } from "@/fonts";
import { ROUTES } from "@/utils/config";

import FormRegistration from "@/UI/forms/registration";

import style from './style.module.scss'

type Props = {};

export default function PageRegistration({ }: Props) {

    return (
        <main className={clsx(style.registration, 'container')}>
            <div className={style.registration__wrapper}>
                <h4 className={FontUnbounded.className}>Регистрация</h4>
                <h5>Уже есть аккаунт? <Link href={ROUTES.LOGIN}>Войти</Link></h5>
                <FormRegistration/>
            </div>
        </main>
    );
}
