'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'

import { PlayerFull } from '@UI/audioPlayer'
import Select from '@/UI/select'

import { useIsClient } from '@/utils/hooks'

import { IDataFilter, IDataMyAudio, dataMyAudio, filter, filterOptionsMyAudio, filterType } from './data'

import time from '@public/time.svg'
import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'


export default function PageMyAudio() {

    const [selectFilterValue, setSelectFilterValue] = useState<IDataFilter>(filterOptionsMyAudio[0])
    const [activeFilter, setActiveFilter] = useState<keyof typeof filter>('name')
    const [filterMode, setFilterMode] = useState<keyof typeof filterType>('down')

    const [playingIndex, setPlayingIndex] = useState<number>(-1)

    const [defaultAudioList, setDefaultAudioList] = useState<IDataMyAudio[]>(dataMyAudio)
    const [filterAudioList, setFilterAudioList] = useState<IDataMyAudio[]>()

    const isClient = useIsClient()

    const windowWidth = useWindowWidth()

    const changeFilterHandler = (filterName: keyof typeof filter) => {
        if (filterName !== activeFilter) {
            setActiveFilter(filterName)
            setFilterMode('up')
        }
        else {
            setFilterMode(filterMode === 'down' ? 'up' : 'down')
        }
    }

    useEffect(() => {
        let newAudioList: IDataMyAudio[] | undefined;
        switch (activeFilter) {
            case 'date':
                newAudioList = [...defaultAudioList].sort((a, b) => filterMode === 'up' ? a.dateAdd.getTime() - b.dateAdd.getTime() : b.dateAdd.getTime() - a.dateAdd.getTime());
                break;
            case 'name':
                newAudioList = [...defaultAudioList].sort((a, b) => filterMode === 'up' ? a.trackName.localeCompare(b.trackName) : b.trackName.localeCompare(a.trackName))
                break;
            case 'voice':
                newAudioList = [...defaultAudioList].sort((a, b) => filterMode === 'up' ? a.voiceName.localeCompare(b.voiceName) : b.voiceName.localeCompare(a.voiceName))
                break;
            default:
                break;
        }
        console.log('newAudioList', newAudioList)
        setFilterAudioList(newAudioList)
    }, [defaultAudioList, activeFilter, filterMode]);

    useEffect(() => {
        if (windowWidth < 1280) {
            setActiveFilter(selectFilterValue.filter)
            setFilterMode(selectFilterValue.filterType)
        }
    }, [selectFilterValue])

    return (
        <main className={clsx(style.page, 'container')}>
            <div className={style.page__table}>
                <div className={style.page__table__header}>
                    {isClient && windowWidth > 1280 ? (
                        <>
                            <p className={clsx(style.page__table__header__filter, style.page__table__header__filter_number)}>#</p>
                            <div onClick={() => changeFilterHandler('name')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_name, activeFilter === 'name' && style.page__table__header__filter_active)}>
                                <p>Название</p>
                                <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'name' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter name' />
                            </div>
                            <div onClick={() => changeFilterHandler('voice')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_voice, activeFilter === 'voice' && style.page__table__header__filter_active)}>
                                <p>Голос</p>
                                <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'voice' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter voice' />
                            </div>
                            <div onClick={() => changeFilterHandler('date')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_date, activeFilter === 'date' && style.page__table__header__filter_active)}>
                                <p>Дата добавления</p>
                                <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'date' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter date' />
                            </div>
                            <div onClick={() => changeFilterHandler('time')} className={clsx(style.page__table__header__filter, style.page__table__header__filter_time, activeFilter === 'time' && style.page__table__header__filter_active)}>
                                <Image {...time} alt='filter time' />
                                <Image {...arrow_right} className={clsx(style.page__table__header__filter__image, activeFilter === 'time' && style[`page__table__header__filter__image_${filterMode}`])} alt='filter time' />
                            </div>
                        </>
                    ) : (
                        <>
                            {isClient && (
                                <Select
                                    options={filterOptionsMyAudio}
                                    value={selectFilterValue}
                                    inputStyle='withForm'
                                    onChange={(val) => { setSelectFilterValue(val as IDataFilter) }}
                                    type='banks'
                                />
                            )}
                        </>
                    )}

                </div>
                <div className={style.page__table__body}>
                    {filterAudioList?.map((item, index) => {
                        return (
                            <PlayerFull
                                setPlayingIndex={() => { setPlayingIndex(index) }}
                                canPlay={playingIndex === index}
                                {...item}
                                index={index + 1}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}