'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { ru } from 'date-fns/locale'
import { format } from 'date-fns';
import clsx from 'clsx';
import { DateTime } from 'luxon'

import { useGETHistory, useOutsideClick } from '@/utils/hooks';

import { HistoryType, ResponsesHistory } from '@utils/interface';
import { ENDPOINTS } from '@/utils/config';

import settings from '@public/settings.svg'
import close_white from '@public/close_white.svg'

import style from './style.module.scss'
import { AxiosError, AxiosResponse } from 'axios';

type Props = {
    // data: History[]
};

export default function History({ }: Props) {

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    // const [data, setData] = useState<ResponsesHistory[]>()

    const ref = useOutsideClick(() => setSettingsOpen(false))

    const resetRange = () => {
        setStartDate(undefined)
        setEndDate(undefined)
    }

    const onChange = (dates: [Date, Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (end) {
            setSettingsOpen(false)
        }
        console.log(startDate, endDate)
    };

    const formatDate = (date: Date) => {
        const day = format(date, 'd', { locale: ru });
        const month = format(date, 'MMMM', { locale: ru });
        return `${day} ${month}`;
    };

    const setHistory = () => {
        if (data) {
            const histories: {[key:string]: ResponsesHistory[]} = {}

            data.forEach((item) => {
                if (!histories[DateTime.fromISO(item.created_at).toFormat('yyyy.MM.dd')]) {
                    histories[DateTime.fromISO(item.created_at).toFormat('yyyy.MM.dd')]=[item]
                }
                else{
                    histories[DateTime.fromISO(item.created_at).toFormat('yyyy.MM.dd')].push(item)
                }
            })

            return Object.keys(histories).map((item, index)=>{               
                const target: ResponsesHistory[] = histories[item]
                return (
                    <div key={index} className={style.history__date}>
                        <p className={style.history__date__title}>{DateTime.fromFormat(item, 'yyyy.MM.dd').setLocale('ru-RU').toFormat('dd LLLL')}</p>
                        <ul className={style.history__date__list}>
                            {target.map((point, key) => {
                                return (
                                    <li key={key} className={style.history__date__list__item}>
                                        <p className={style.history__date__list__item_cost}>+{point.amount} <span>₽</span></p>
                                        <p className={style.history__date__list__item_time}>{DateTime.fromISO(point.created_at).toFormat('HH:mm')}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })
        }
        else return (
            <div className={style.history__date}>

            </div>
        )
    }

    const { data } = useGETHistory({startDate, endDate})

    // useEffect(() => {
    //     ENDPOINTS.PAYMENT.GET_HISTORY(startDate, endDate)
    //         .then((res: AxiosResponse<ResponsesHistory[]>) => {
    //             console.log('statistic', res.data)
    //             setData(res.data)
    //         })
    //         .catch((err: AxiosError) => {
    //             console.log(err)
    //         })
    // }, [startDate, endDate])

    return (
        <div className={style.history}>
            <div ref={ref} className={style.history__header}>
                <p className={style.history__header__title}>История</p>
                <button className={style.history__header__settings} onClick={() => { setSettingsOpen(!settingsOpen) }}>
                    <p>
                        {startDate && formatDate(startDate)} {endDate && endDate.getTime() !== startDate?.getTime() && `- ${formatDate(endDate)}`}
                        {!startDate && 'За все время'}
                    </p>
                    {!startDate && <Image {...settings} alt='Open range settings' />}
                    {startDate &&
                        <Image {...close_white} alt='Open range settings' onClick={(e) => { e.stopPropagation(); resetRange() }} />
                    }
                </button>
                {settingsOpen && (
                    <div className={style.history__calendar}>
                        <DatePicker
                            locale={ru}
                            formatWeekDay={nameOfDay => nameOfDay.toUpperCase().slice(0, 1)}
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            scrollableMonthYearDropdown
                            inline
                        />
                    </div>
                )}
            </div>
            <div className={clsx(style.history__dates, settingsOpen && style.history__dates_fixed, 'scroll')}>
                {setHistory()}
            </div>
        </div>
    );
}
