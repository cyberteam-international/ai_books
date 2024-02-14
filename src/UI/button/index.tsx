'use client'

import { ReactNode } from "react";
import clsx from "clsx";

import style from './style.module.scss'

type Props = {
    type?: 'button' | 'submit',
    children: ReactNode,
    callback?: () => void,
    onMouseEnter?: () => void,
    className?: string,
    isActive?: boolean,
    id?: string
};

export default function Button({ children, callback=()=>{}, type='button', className, isActive=true, id, onMouseEnter=()=>{} }: Props) {
    return (
        <button
            form={id}
            className={clsx(style.button, !isActive && style.button_disable, className)}
            onClick={(e)=>{e.stopPropagation(); callback()}}
            type={type}
            onMouseEnter={onMouseEnter}
        >
            {children}
        </button>
    );
}
