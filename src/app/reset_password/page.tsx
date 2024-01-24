import clsx from "clsx";

import { FontUnbounded } from "@/fonts";

import FormResetPassword from "@/UI/forms/resetPassword";

import style from './style.module.scss'

type Props = {};

export default function PageLogin({ }: Props) {

    return (
        <main className={clsx(style.reset, 'container')}>
            <div className={style.reset__wrapper}>
                <h4 className={FontUnbounded.className}>Сброс пароля</h4>
                <FormResetPassword/>
            </div>
        </main>
    );
}
