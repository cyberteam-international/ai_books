'use client'

import {useContext, useState} from "react";
import Image from "next/image";
import clsx from "clsx";

import {Banks, DecipherMode, Languages, Voices} from "@utils/interface";
import {useOutsideClick} from "@/utils/hooks";

import {PlayerSelect} from "../audioPlayer";

import arrow_right from '@public/arrow_right.svg'
import add from '@public/add.svg'

import style from './style.module.scss'
import {IDataFilter} from "@/app/my-audio/data";
import Loading from "@/app/loading";
import {ContextUser} from "@utils/context";
import {PRICE} from "@utils/config";
import {IModel} from "@utils/config/models";

type Props = {
    value: Banks | Languages | Voices | IDataFilter | DecipherMode | IModel | undefined,
    onChange: (value: Props['value']) => void,
    placeholder?: string,
    type: 'banks' | 'languages' | 'voices',
    inputStyle?: 'withForm' | 'default',
    options: (Banks | Languages | Voices | IDataFilter | DecipherMode)[],
    disabled?: boolean,
    addButton?: () => void,
    isLoading?: boolean
    isAuth?: boolean
    isMin?: boolean
}

export default function Select({
                                   isAuth,
                                   isMin,
                                   isLoading,
                                   addButton,
                                   value,
                                   onChange,
                                   placeholder,
                                   options,
                                   type,
                                   disabled,
                                   inputStyle = 'withForm'
                               }: Props) {
    const {userInfo, mutate} = useContext(ContextUser)
    const [isOpen, setIsOpen] = useState(false)
    const [playingOption, setPlayingOption] = useState<number>(-1)

    const setOptions = () => {
        return options.map((item, index) => {
            if (type === 'banks' || type === 'languages') {
                return (
                    <li
                        key={index}
                        className={style.select__options__list__item}
                        onClick={() => {
                            onChange({...item});
                            setIsOpen(false)
                        }}
                    >
                        {(item as Banks || item as Languages).img && (
                            <Image {...(item as Banks || item as Languages).img}
                                   className={style.select__options__list__item__img} alt={item.title}/>
                        )}
                        <p>{item.title}</p>
                    </li>
                )
            } else return (
                <li
                    key={index}
                    className={style.select__options__list__item}
                    onClick={() => {
                        onChange({...item});
                        setIsOpen(false)
                    }}
                >
                    {(item as Voices).audio && <PlayerSelect
                        canPlay={playingOption === index}
                        setPlayingOption={() => setPlayingOption(index)}
                        src={(item as Voices).audio}
                    />}
                    <p>{item.title}</p>
                </li>
            )
        })
    }

    const ref = useOutsideClick(() => setIsOpen(false))

    return (
        <div ref={ref}
             className={clsx(style.select, inputStyle === 'withForm' && style.select_form, disabled && style.select_disabled)}>
            <div className={style.select__input} onClick={() => setIsOpen(!isOpen)}>
                {type === 'languages' && (value as Languages)?.img &&
                    <Image
                        className={style.select__input__image}
                        alt={value?.inputValue ?? 'select value'}
                        {...(value as Languages).img}
                    />
                }
                {inputStyle === 'withForm' ? (
                    <input
                        className={clsx(style.select__input__block, style.select__input__block_img)}
                        value={value?.inputValue}
                        readOnly
                        placeholder={placeholder}
                    />
                ) : (
                    <p className={style.select__input__block}>{value?.inputValue}</p>
                )}
                <Image
                    className={clsx(style.select__input__arrow, isOpen && style.select__input__arrow_active)} {...arrow_right}
                    alt='open select'/>
            </div>
            {isOpen && (
                <div className={clsx(style.select__options, (isAuth && !userInfo) && style.select__options_auth, (isMin) && style.select__options_min)}>
                    <ul className={clsx('scroll', style.select__options__list)}>
                        {isAuth && !userInfo ? <>
                            <li className={style.select__options__list__auth}>
                                <span>Озвучивание своим голосом доступно только авторизованным пользователям</span>
                                <a href="/login">Авторизоваться</a>
                            </li>
                        </> : <>
                            {isAuth && userInfo && Math.floor(userInfo.balance / PRICE) <= 0 ? <>
                                <li className={style.select__options__list__auth}>
                                    <span>Для использования данной функции необходимо пополнить баланс</span>
                                    <a href="/payment">Пополнить</a>
                                </li>
                            </> : <>
                                {addButton && <li
                                    className={style.select__options__list__item}
                                    onClick={() => {
                                        addButton()
                                    }}
                                >
                                    <p>Создать</p>
                                    <Image
                                        className={clsx(style.select__input__add)} {...add}
                                        alt='open select'/>
                                </li>}

                                {isLoading && <li className={style.select__options__list__loading}>
                                    <Loading isBlack={true}/>
                                </li>}

                                {setOptions()}
                            </>}
                        </>}
                    </ul>
                </div>
            )}
        </div>
    );
}
