'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'

import { useGETWorks, useIsClient } from '@/utils/hooks'
import { ENDPOINTS } from '@/utils/config'
import { ResponseWork } from '@/utils/interface'

import { ModalMessage } from '@/components/Modal'
import { PlayerFull } from '@UI/audioPlayer'
import Select from '@/UI/select'

import { IDataFilter, filter, filterOptionsMyAudio, filterType } from './data'

import time from '@public/time.svg'
import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'


export default function PageMyAudio() {

    const [selectFilterValue, setSelectFilterValue] = useState<IDataFilter>(filterOptionsMyAudio[0])
    const [activeFilter, setActiveFilter] = useState<keyof typeof filter>('name')
    const [filterMode, setFilterMode] = useState<keyof typeof filterType>('down')

    const [playingIndex, setPlayingIndex] = useState<number>(-1)

    const [defaultAudioList, setDefaultAudioList] = useState<ResponseWork[]>()
    const [filterAudioList, setFilterAudioList] = useState<ResponseWork[]>()

    const [completeMessage, setCompleteMessage] = useState<string>()

    const isClient = useIsClient()

    const { data } = useGETWorks()

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

    const removeHandler = (data: ResponseWork) => {
        setCompleteMessage('')
        ENDPOINTS.WORK.DELETE_WORK(data.id)
        .then(res => {
            if (res.status === 200) {
                if (filterAudioList) {
                    setFilterAudioList([...filterAudioList].filter((el) => el.id !== data.id))
                    setCompleteMessage(`Аудиозапись "${data.name}" удалена`)
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    const setCurrentDataListTime = (id: number, duration: number) => {
        // if (defaultAudioList) {
        //     const newList = [...defaultAudioList]
        //     if (newList[newList.findIndex((el)=>el.id === id)].completed_seconds !== duration) {
        //         newList[newList.findIndex((el)=>el.id === id)].completed_seconds = 10
        //         setDefaultAudioList([...newList])
        //     }
        // }
    }

    const handleChangeAudioName = (newName: string) => {
		setCompleteMessage('')
		setCompleteMessage(`Имя успешно изменено на ${newName}`)
	}

    useEffect(()=> {
        if (data) {
            setDefaultAudioList(data)
        }
    }, [data])

    useEffect(() => {
        if (defaultAudioList) {
            let newAudioList: ResponseWork[] | undefined;
            switch (activeFilter) {
                case 'date':
                    newAudioList = [...defaultAudioList].sort((a, b) => 
                        filterMode === 'up' ?
                        new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
                        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                    break;
                case 'name':
                    newAudioList = [...defaultAudioList].sort((a, b) => 
                        filterMode === 'down' ? 
                        a.name.localeCompare(b.name) 
                        : b.name.localeCompare(a.name)
                    );
                    break;
                case 'voice':
                    newAudioList = [...defaultAudioList].sort((a, b) => 
                        filterMode === 'down' ? 
                        a.voice.localeCompare(b.voice) 
                        : b.voice.localeCompare(a.voice)
                    );
                    break;
                case 'time':
                    newAudioList = [...defaultAudioList].sort((a, b) => 
                        filterMode === 'up' ?
                        a.completed_seconds - b.completed_seconds 
                        : b.completed_seconds - a.completed_seconds
                    );
                    break;
                default:
                    break;
            }
            console.log(newAudioList)
            setFilterAudioList(undefined)
            setFilterAudioList(newAudioList)
        }
    }, [defaultAudioList, activeFilter, filterMode]);

    useEffect(() => {
        if (windowWidth < 1280) {
            setActiveFilter(selectFilterValue.filter)
            setFilterMode(selectFilterValue.filterType)
        }
    }, [selectFilterValue])

    const setList = () => {
        if (filterAudioList) {
            return filterAudioList.map((item, index) => {
                return (
                    <PlayerFull
                        handleChangeAudioName={handleChangeAudioName}
                        setPlayingIndex={() => { setPlayingIndex(index) }}
                        canPlay={playingIndex === index}
                        data={item}
                        removeHandler={removeHandler}
                        index={index + 1}
                        isOptionTop={filterAudioList.length - (index + 1) < 2}
                        handleDuration={setCurrentDataListTime}
                    />
                )
            })
        }
    }

    return (
        <main className={clsx(style.page, 'container')}>
            <div className={style.page__table}>
                <div className={style.page__table__header}>
                    {isClient && (
                        <>
                            {windowWidth > 1280 ? (
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
                <div className={clsx('scroll', style.page__table__body)}>
                    {/* {filterAudioList?.map((item, index) => {
                        return (
                            <PlayerFull
                                handleChangeAudioName={handleChangeAudioName}
                                setPlayingIndex={() => { setPlayingIndex(index) }}
                                canPlay={playingIndex === index}
                                data={item}
                                removeHandler={removeHandler}
                                index={index + 1}
                                handleDuration={setCurrentDataListTime}
                            />
                        )
                    })} */}
                    {setList()}
                </div>
            </div>
            <ModalMessage message={completeMessage} setMesage={setCompleteMessage} />
        </main>
    )
}