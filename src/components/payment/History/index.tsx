'use client'

import Image from 'next/image';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { ru } from 'date-fns/locale'
import { format } from 'date-fns';
import clsx from 'clsx';

import { History } from '@utils/interface';

import settings from '@public/settings.svg'
import close_white from '@public/close_white.svg'

import style from './style.module.scss'

type Props = {
    data: History[]
};

export default function History({ data }: Props) {

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const resetRange = () => {
        setStartDate(null)
        setEndDate(null)
    }

    const onChange = (dates: [Date | null, Date | null]) => {
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
        const currentData = startDate ?
            data.filter(
                (el) => endDate ?
                    el.date.getTime() >= startDate.getTime() && el.date.getTime() <= endDate.getTime()
                    : el.date.getTime() === startDate.getTime()
            )
            : data
        return currentData.map((item, index) => {
            return (
                <div key={index} className={style.history__date}>
                    <p className={style.history__date__title}>{formatDate(item.date)}</p>
                    <ul className={style.history__date__list}>
                        {item.items.map((target, key) => {
                            return (
                                <li key={key} className={style.history__date__list__item}>
                                    <p className={style.history__date__list__item_cost}>–{target.cost} <span>₽</span></p>
                                    <p className={style.history__date__list__item_time}>{target.time}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        })
    }

    return (
        <div className={style.history}>
            <div className={style.history__header}>
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
