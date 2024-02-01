import clsx from "clsx";

import { FontUnbounded } from "@/fonts";

import FormForgotPassword from "@/UI/forms/forgotPassword";

import style from './style.module.scss'

type Props = {};

export default function PageForgotPassword({ }: Props) {

    return (
        <main className={clsx(style.reset, 'container')}>
            <div className={style.reset__wrapper}>
                <h4 className={FontUnbounded.className}>Сброс пароля</h4>
                <FormForgotPassword/>
            </div>
        </main>
    );
}
