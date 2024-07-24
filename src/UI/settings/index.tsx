'use client'

import Image from 'next/image';
import { ReactNode } from 'react';

import icon_settings from '@public/cog.svg'

import style from './style.module.scss'

type Props = {
    callback: ()=>void,
    children: ReactNode,
};

export default function Settings({ callback, children }: Props) {

    return (
        <div className={style.settings} onClick={callback}>
            <Image {...icon_settings} alt='reset textarea'/>
            {children}
        </div>
    );
}
