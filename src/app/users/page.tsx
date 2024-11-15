'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'

import { useIsClient } from '@/utils/hooks'
import { ENDPOINTS } from '@/utils/config'

import { ModalMessage } from '@/components/Modal'
import Select from '@/UI/select'

import { IDataFilter, filter, filterOptionsMyAudio, filterType } from './data'

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'
import { UserInfoExtended } from '@/utils/interface/UserInfo'
import { DateTime } from 'luxon'
import Input from '@/UI/input'


export default function PageMyAudio() {

    const [selectFilterValue, setSelectFilterValue] = useState<IDataFilter>(filterOptionsMyAudio[0])
    const [activeFilter, setActiveFilter] = useState<keyof typeof filter>('name')
    const [filterMode, setFilterMode] = useState<keyof typeof filterType>('down')

    const [defaultUsersList, setDefaultUsersList] = useState<UserInfoExtended[]>()
    const [filterUsersList, setFilterUsersList] = useState<UserInfoExtended[]>()

    const [completeMessage, setCompleteMessage] = useState<string>()

    const isClient = useIsClient()

    const windowWidth = useWindowWidth()

    const changeFilterHandler = (filterName: keyof typeof filter) => {
        if (filterName !== activeFilter) {
            setActiveFilter(filterName)
            setFilterMode('down')
        }
        else {
            setFilterMode(filterMode === 'down' ? 'up' : 'down')
        }
    }

    useEffect(()=> {
        ENDPOINTS.USERS.GET_iNFO_ALL().then((res)=>{
            setDefaultUsersList(res)
        })
    }, [])

    useEffect(() => {
        if (defaultUsersList) {
            let newUsersList: UserInfoExtended[] | undefined;
            switch (activeFilter) {
                case 'created_at':
                    newUsersList = [...defaultUsersList].sort((a, b) => 
                        filterMode === 'up' ?
                        new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
                        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                    break;
                case 'name':
                    newUsersList = [...defaultUsersList].sort((a, b) => 
                        filterMode === 'down' ? 
                        a.name.localeCompare(b.name) 
                        : b.name.localeCompare(a.name)
                    );
                    break;
                case 'email':
                    newUsersList = [...defaultUsersList].sort((a, b) => 
                        filterMode === 'down' ? 
                        a.email.localeCompare(b.email) 
                        : b.email.localeCompare(a.email)
                    );
                    break;
                case 'id':
                    newUsersList = [...defaultUsersList].sort((a, b) => 
                        filterMode === 'up' ?
                        a.id - b.id 
                        : b.id - a.id
                    );
                    break;
                case 'balance':
                    newUsersList = [...defaultUsersList].sort((a, b) =>
                        filterMode === 'up' ?
                            a.id - b.id
                            : b.id - a.id
                    );
                    break;
                default:
                    break;
            }
            console.log(newUsersList)
            setFilterUsersList(undefined)
            setFilterUsersList(newUsersList)
        }
    }, [defaultUsersList, activeFilter, filterMode]);

    useEffect(() => {
        if (windowWidth < 1280) {
            setActiveFilter(selectFilterValue.filter)
            setFilterMode(selectFilterValue.filterType)
        }
    }, [selectFilterValue])

    const setList = useCallback(() => {
        if (filterUsersList) {
            return filterUsersList.map((item, index) => {
                return (
                    <div key={item.id} className={style.page__table__body__item}>
                        <p className={style.page__table__body__item__id}><span>id: </span>{item.id}</p>
                        <p className={style.page__table__body__item__name}>{item.name}</p>
                        <p className={style.page__table__body__item__name}>{item.balance.toFixed(2)}</p>
                        <p className={style.page__table__body__item__email}>{item.email}</p>
                        <p className={style.page__table__body__item__date}>
                            {DateTime.fromISO(item.created_at).setLocale('ru').toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <Input
                            className={style.page__table__body__item__password}
                            name={`${item.id}_${item.passwordUnHashed?? item.password}`}
                            touched
                            type='password'
                            status='disable'
                            value={item.passwordUnHashed?? item.password}
                        />
                    </div>
                )
            })
        }
    }, [filterUsersList])

    return (
        <main className={clsx(style.page, 'container')}>
            <div className={style.page__table}>
                <div className={style.page__table__header}>
                    {isClient && (
                        <>
                            {windowWidth > 1280 ? (
                                <>
                                    <div onClick={() => changeFilterHandler('id')}
                                         className={clsx(style.page__table__header__filter, activeFilter === 'id' && style.page__table__header__filter_active)}>
                                        <p>id</p>
                                        <Image {...arrow_right}
                                               className={clsx(style.page__table__header__filter__image, activeFilter === 'id' && style[`page__table__header__filter__image_${filterMode}`])}
                                               alt='filter id'/>
                                    </div>
                                    <div onClick={() => changeFilterHandler('name')}
                                         className={clsx(style.page__table__header__filter, activeFilter === 'name' && style.page__table__header__filter_active)}>
                                        <p>Имя</p>
                                        <Image {...arrow_right}
                                               className={clsx(style.page__table__header__filter__image, activeFilter === 'name' && style[`page__table__header__filter__image_${filterMode}`])}
                                               alt='filter name'/>
                                    </div>
                                    <div onClick={() => changeFilterHandler('balance')}
                                         className={clsx(style.page__table__header__filter, activeFilter === 'balance' && style.page__table__header__filter_active)}>
                                        <p>Баланс</p>
                                        <Image {...arrow_right}
                                               className={clsx(style.page__table__header__filter__image, activeFilter === 'balance' && style[`page__table__header__filter__image_${filterMode}`])}
                                               alt='filter name'/>
                                    </div>
                                    <div onClick={() => changeFilterHandler('email')}
                                         className={clsx(style.page__table__header__filter, activeFilter === 'email' && style.page__table__header__filter_active)}>
                                        <p>Почта</p>
                                        <Image {...arrow_right}
                                               className={clsx(style.page__table__header__filter__image, activeFilter === 'email' && style[`page__table__header__filter__image_${filterMode}`])}
                                               alt='filter email'/>
                                    </div>
                                    <div onClick={() => changeFilterHandler('created_at')}
                                         className={clsx(style.page__table__header__filter, activeFilter === 'created_at' && style.page__table__header__filter_active)}>
                                        <p>Дата регистрации</p>
                                        <Image {...arrow_right}
                                               className={clsx(style.page__table__header__filter__image, activeFilter === 'created_at' && style[`page__table__header__filter__image_${filterMode}`])}
                                               alt='filter created_at'/>
                                    </div>
                                    <div className={clsx(style.page__table__header__filter)}>
                                        <p>Пароль</p>
                                    </div>
                                </>
                            ) : (
                                <Select
                                    options={filterOptionsMyAudio}
                                    value={selectFilterValue}
                                    inputStyle='withForm'
                                    onChange={(val) => {
                                        setSelectFilterValue(val as IDataFilter)
                                    }}
                                    type='banks'
                                />
                            )}
                        </>
                    )}
                </div>
                <div className={clsx('scroll', style.page__table__body)}>
                    {setList()}
                </div>
            </div>
            <ModalMessage message={completeMessage} setMesage={setCompleteMessage} />
        </main>
    )
}