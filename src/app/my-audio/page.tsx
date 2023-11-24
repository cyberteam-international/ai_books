'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import { PlayerFull } from '@UI/audioPlayer'

import { dataMyAudio } from './data'

import time from '@public/time.svg'
import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

enum filter {
    'name',
    'voice',
    'date',
    'time',
}

enum filterType {
    'up',
    'down',
}

export default function PageMyAudio() {

    const [activeFilter, setActiveFilter] = useState<keyof typeof filter>('name')
    const [filterMode, setFilterMode] = useState<keyof typeof filterType>()
    const [playingIndex, setPlayingIndex] = useState<number>(-1)

    const changeFilterHandler = (filterName: keyof typeof filter) => {
        if (filterName !== activeFilter) {
            return setActiveFilter(filterName)
        }
        else{
            setFilterMode(filterMode === 'down'? 'up' : 'down')
        }
    }

    return(
        <main className={clsx(style.page, 'container')}>
            <div className={style.page__table}>
                <div className={style.page__table__header}>
                    <p className={clsx(style.page__table__header__filter, style.page__table__header__filter_number)}>#</p>
                    <div onClick={()=>changeFilterHandler('name')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_name, activeFilter === 'name' && style.page__table__header__filter_active)}>
                        <p>Название</p>
                        <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'name' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter name' />
                    </div>
                    <div onClick={()=>changeFilterHandler('voice')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_voice, activeFilter === 'voice' && style.page__table__header__filter_active)}>
                        <p>Голос</p>
                        <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'voice' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter voice' />
                    </div>
                    <div onClick={()=>changeFilterHandler('date')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_date, activeFilter === 'date' && style.page__table__header__filter_active)}>
                        <p>Дата добавления</p>
                        <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'date' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter date' />
                    </div>
                    <div onClick={()=>changeFilterHandler('time')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_time, activeFilter === 'time' && style.page__table__header__filter_active)}>
                        <Image {...time} alt='filter time' />
                        <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'time' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter time' />
                    </div>
                </div>
                <div className={style.page__table__body}>
                    {dataMyAudio.map((item, index)=>{
                        return (
                            <PlayerFull
                                setPlayingIndex={()=>{setPlayingIndex(index)}} 
                                canPlay={playingIndex === index} 
                                {...item} 
                                index={index+1}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}