'use client'

import Image from 'next/image';
import { ReactNode } from 'react';

import icon_trash from '@public/icon_trash.svg'

import style from './style.module.scss'

type Props = {
    callback: ()=>void,
    children: ReactNode,
};

export default function Delete({ callback, children }: Props) {

    return (
        <div className={style.delete} onClick={callback}>
            <Image {...icon_trash} alt='reset textarea'/>
            {children}
        </div>
    );
}
