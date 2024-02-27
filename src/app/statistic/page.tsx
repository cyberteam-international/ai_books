'use client'

import clsx from 'clsx';
import DatePicker from "react-datepicker";
import { useEffect, useState } from 'react';
import { ru } from 'date-fns/locale'
import Image from 'next/image';
import { format } from 'date-fns';
import { AxiosError, AxiosResponse } from 'axios';
// import {
//     Chart,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// import { FontOnest } from '@/fonts';

import { useGETStatistic, useOutsideClick } from '@/utils/hooks';
import { ENDPOINTS, ROUTES } from '@/utils/config';
import { ResponseStatistic } from '@/utils/interface';

import settings from '@public/settings.svg'
import close_white from '@public/close_white.svg'

import style from './style.module.scss'

type Props = {};

export default function PageStatistic({ }: Props) {

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [settingsOpen, setSettingsOpen] = useState(false);
    // const [data, setData] = useState<ResponseStatistic>()

    const ref = useOutsideClick(() => setSettingsOpen(false))

    const { data } = useGETStatistic({startDate, endDate})

    const resetRange = () => {
        setStartDate(undefined)
        setEndDate(undefined)
        setSettingsOpen(false)
    }

    const onChange = (dates: [Date, Date]) => {
        const [start, end] = dates;
        if (start) {
            setStartDate(start);
        }
        if (end) {
            setEndDate(end);
            setSettingsOpen(false)
        }
    };

    const formatDate = (date: Date) => {
        const day = format(date, 'd', { locale: ru });
        const month = format(date, 'MMMM', { locale: ru });
        return `${day} ${month}`;
    };

    // useEffect(()=>{
    //     ENDPOINTS.STATISTIC.GET_STATISTIC(startDate, endDate)
    //     .then((res: AxiosResponse<ResponseStatistic>)=> {
    //         console.log('statistic', res)
    //         setData(res.data)
    //     })
    //     .catch((err: AxiosError)=>{
    //         console.log(err)
    //     })
    // }, [endDate])

    useEffect(()=>{
        console.log('data', data)
    }, [data])

    // Chart.register(
    //     CategoryScale,
    //     LinearScale,
    //     BarElement,
    //     Title,
    //     Tooltip,
    //     Legend
    // );
    // const options = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             display: false
    //         },
    //         title: {
    //             display: false,
    //         },


    //     },
    //     scales: {
    //         x: {
    //             grid: {
    //                 color: 'rgba(255, 255, 255, 0.6)'
    //             },
    //             ticks: {
    //                 color: 'rgba(255, 255, 255, 0.6)',
    //                 font: {
    //                     size: 12,
    //                     family: FontOnest.style.fontFamily
    //                 }
    //             }
    //         },
    //         y: {
    //             grid: {
    //                 color: 'rgba(255, 255, 255, 0.6)'
    //             },
    //             ticks: {
    //                 color: 'rgba(255, 255, 255, 0.6)',
    //                 font: {
    //                     size: 12,
    //                     family: FontOnest.style.fontFamily
    //                 }
    //             }
    //         }
    //     }

    // };
    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: labels.map((item, index) => 10 + index * 5),
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //             label: 'Dataset 2',
    //             data: labels.map((item, index) => 10 + index * 6),
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    useEffect(()=>{
        if (data) {
            console.log(Number.isInteger(data.cost_price))
        }
    }, [data])

    

    return (
        <main className={clsx(style.statistic, 'container')}>
            <h2>Статистика</h2>
            <div ref={ref} className={style.statistic__date}>
                <button className={style.statistic__date__input} onClick={() => { setSettingsOpen(!settingsOpen) }}>
                    <h5>
                        {startDate && formatDate(startDate)} {endDate && endDate.getTime() !== startDate?.getTime() && `- ${formatDate(endDate)}`}
                        {!startDate && 'За все время'}
                    </h5>
                    {!startDate && <Image {...settings} alt='Open range settings' />}
                    {startDate &&
                        <Image {...close_white} alt='Open range settings' onClick={(e) => { e.stopPropagation(); resetRange() }} />
                    }
                </button>
                {settingsOpen && (
                    <div className={style.statistic__date__calendar}>
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
                            className={style.statistic__date__calendar__item}
                        />
                    </div>
                )}
            </div>
            <section className={style.statistic__section}>
                <div className={style.statistic__section__column}>
                    <h4>Посещения</h4>
                    <h4>{data? Number.isInteger(data.number_visits)? data.number_visits : data.number_visits.toFixed(2) : 0}</h4>

                </div>
                <div className={style.statistic__section__column}>
                    <h4>Уникальные посещения</h4>
                    <h4>{data? Number.isInteger(data.unique_number_visits)? data.unique_number_visits : data.unique_number_visits.toFixed(2) : 0}</h4>
                </div>
                <div className={style.statistic__section__column}>
                    <h4>Озвучивания</h4>
                    <h4>{data? Number.isInteger(data.clicks_voice_button)? data.clicks_voice_button : data.clicks_voice_button.toFixed(2) : 0}</h4>
                </div>
                <div className={style.statistic__section__column}>
                    <h4>Озвученные символы</h4>
                    <h4>{data? Number.isInteger(data.number_voiced_characters)? data.number_voiced_characters : data.number_voiced_characters.toFixed(2) : 0}</h4>
                </div>
                <div className={style.statistic__section__column}>
                    <h4>Пополнение счета</h4>
                    <h4>{data? Number.isInteger(data.number_payments)? data.number_payments : data.number_payments.toFixed(2) : 0}</h4>
                </div>
                <div className={style.statistic__section__column}>
                    <h4>Сумма пополнений</h4>
                    <h4>{data? Number.isInteger(data.amount_payments)? data.amount_payments : data.amount_payments.toFixed(2) : 0}</h4>
                </div>
                <div className={style.statistic__section__column}>
                    <h4>Повторные пополнения</h4>
                    <h4>{data? Number.isInteger(data.number_repeated_payments)? data.number_repeated_payments : data.number_repeated_payments.toFixed(2) : 0}</h4>
                </div>
                <div className={style.statistic__section__column}>
                    <h4>Себестоимость</h4>
                    <h4>{data? Number.isInteger(data.cost_price)? data.cost_price : data.cost_price.toFixed(2) : 0}</h4>
                </div>
            </section>
            {/* <Bar options={options} data={data} /> */}
        </main>
    )
}
