'use client'

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { Banks, Languages } from "@utils/interface";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    value: Banks | Languages | undefined
    onChange: (value: Props['value'])=>void,
    placeholder?: string,
    imgVisible?: boolean,
    styleInput?: boolean,
    options: (Banks | Languages)[],
}

export default function Select({value, onChange, placeholder, options, imgVisible, styleInput=true }: Props) {

    const [isOpen, setIsOpen] = useState(false)

    const setOptions = () => {
        return options.map((item, index)=>{
            return (
                <li 
                    key={index} 
                    className={style.select__options__list__item} 
                    onClick={()=>{onChange({...item}); setIsOpen(false)}}
                >
                    <Image {...item.img} alt={item.title}/>
                    <p>{item.title}</p>
                </li>
            )
        })
    }

    return (
        <div className={clsx(style.select, styleInput && style.select_form)}>
            <div className={style.select__input} onClick={()=>setIsOpen(!isOpen)}>
                {imgVisible && value?.img && 
                    <Image 
                        className={style.select__input__image} 
                        alt={value?.inputValue?? 'select value'}
                        {...value?.img} 
                    />
                }
                {styleInput? (
                    <input
                        className={clsx(
                            style.select__input__block,
                            (imgVisible && value?.img) && style.select__input__block_img,
                        )}
                        value={value?.inputValue} 
                        readOnly 
                        placeholder={placeholder} 
                    />
                ) : (
                    <p className={style.select__input__block}>{value?.inputValue}</p>
                )}
                <Image className={style.select__input__arrow} {...arrow_right} alt='open select'/>
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
