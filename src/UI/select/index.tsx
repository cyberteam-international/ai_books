'use client'

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { Banks, Languages, Voices } from "@utils/interface";

import { PlayerSelect } from "../audioPlayer";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    value: Banks | Languages | Voices | undefined,
    onChange: (value: Props['value'])=>void,
    placeholder?: string,
    type: 'banks' | 'languages' | 'voices',
    inputStyle?: 'withForm' | 'default',
    options: (Banks | Languages | Voices)[],
}

export default function Select({value, onChange, placeholder, options, type, inputStyle='withForm' }: Props) {

    const [isOpen, setIsOpen] = useState(false)
    const [playingOption, setPlayingOption] = useState<number>(-1)

    const setOptions = () => {
        return options.map((item, index)=>{
            if (type === 'banks' || type === 'languages') {
                return (
                    <li 
                        key={index} 
                        className={style.select__options__list__item} 
                        onClick={()=>{onChange({...item}); setIsOpen(false)}}
                    >
                        <Image {...(item as Banks || item as Languages).img} className={style.select__options__list__item__img} alt={item.title}/>
                        <p>{item.title}</p>
                    </li>
                )
            }
            else return(
                <li 
                    key={index} 
                    className={style.select__options__list__item} 
                    onClick={()=>{onChange({...item}); setIsOpen(false)}}
                >
                    <PlayerSelect 
                        canPlay={playingOption === index} 
                        setPlayingOption={()=>setPlayingOption(index)} 
                        src={(item as Voices).audio}
                    />
                    <p>{item.title}</p>
                </li>
            )
        })
    }

    return (
        <div className={clsx(style.select, inputStyle === 'withForm' && style.select_form)}>
            <div className={style.select__input} onClick={()=>setIsOpen(!isOpen)}>
                {type === 'languages' && (value as Languages)?.img && 
                    <Image 
                        className={style.select__input__image} 
                        alt={value?.inputValue?? 'select value'}
                        {...(value as Languages).img} 
                    />
                }
                {inputStyle === 'withForm'? (
                    <input
                        className={clsx(style.select__input__block, style.select__input__block_img)}
                        value={value?.inputValue}
                        readOnly 
                        placeholder={placeholder} 
                    />
                ) : (
                    <p className={style.select__input__block}>{value?.inputValue}</p>
                )}
                <Image className={clsx(style.select__input__arrow, isOpen && style.select__input__arrow_active)} {...arrow_right} alt='open select'/>
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
