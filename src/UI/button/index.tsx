import { ReactNode } from "react";
import clsx from "clsx";

import style from './style.module.scss'

type Props = {
    type?: 'button' | 'submit',
    children: ReactNode,
    callback?: () => void,
    className?: string,
    isActive?: boolean,
    id?: string
};

export default function Button({ children, callback, type='button', className, isActive=true, id }: Props) {
    return (
        <button
            form={id}
            className={clsx(style.button, !isActive && style.button_disable, className)}
            onClick={callback}
            type={type}
        >
            {children}
        </button>
    );
}
