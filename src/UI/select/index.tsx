'use client'

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { SelectProps } from "@utils/interface";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

export default function Select({value, onChange, placeholder, options }: SelectProps) {

    const [isOpen, setIsOpen] = useState(false)

    const setOptions = () => {
        return options.map((item, index)=>{
            return (
                <li 
                    key={index} 
                    className={style.select__options__list__item} 
                    onClick={()=>{onChange({...item}); setIsOpen(false)}}
                >
                    <Image {...item.img} alt={item.value}/>
                    <p>{item.title}</p>
                </li>
            )
        })
    }

    return (
        <div className={style.select}>
            <div className={style.select__input} onClick={()=>setIsOpen(!isOpen)}>
                <input value={value?.title} readOnly placeholder={placeholder} />
                <Image {...arrow_right} alt='open select'/>
            </div>
            {isOpen && (
                <div className={style.select__options}>
                    <ul className={clsx('scroll', style.select__options__list)}>
                        {setOptions()}
                    </ul>
                </div>
            )}
        </div>
    );
}
