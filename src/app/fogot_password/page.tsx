import clsx from "clsx";

import { FontUnbounded } from "@/fonts";

import FormFogotPassword from "@/UI/forms/fogotPassword";

import style from './style.module.scss'

type Props = {};

export default function PageFogotPassword({ }: Props) {

    return (
        <main className={clsx(style.reset, 'container')}>
            <div className={style.reset__wrapper}>
                <h4 className={FontUnbounded.className}>Сброс пароля</h4>
                <FormFogotPassword/>
            </div>
        </main>
    );
}
