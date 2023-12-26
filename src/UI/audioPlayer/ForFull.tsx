import clsx from 'clsx';
import Image from 'next/image';
import { useState, useRef, ChangeEvent, FormEventHandler, useEffect } from 'react';
import { ru } from 'date-fns/locale'
import { format } from 'date-fns';
import { useWindowWidth } from '@react-hook/window-size';

import { useIsClient, useOutsideClick } from '@/utils/hooks';
import { ResponseWork } from '@/utils/interface';
import { ENDPOINTS } from '@/utils/config';

import DownloadFile from '@/components/DownloadFile';
import Button from '../button';
import Delete from '../delete';

import change_white from '@public/change_white.svg'
import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'
import download from '@public/download.svg'
import checkmark from '@public/checkmark_square.svg'

import style from './ForFull.module.scss'
import Label from './Label';

interface Props {
    data: ResponseWork,
    index: number,
    canPlay: boolean,
    setPlayingIndex: () => void,
    removeHandler: (data: ResponseWork) => void
};

export const PlayerFull = ({ index, canPlay, setPlayingIndex, data, removeHandler }: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number | undefined>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [trackName, setTrackName] = useState<string>('')
    const [newTrackName, setNewTrackName] = useState<string>('')
    const [menuOpen, setMenuOpen] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const isClient = useIsClient()

    const windowWidth = useWindowWidth()

    const ref = useOutsideClick(()=>setMenuOpen(false))

    const onLoadedMetadata = () => {
        // if (audioRef.current && audioRef.current.duration) {
        //     setDuration(audioRef.current.duration);
        // }
    };

    const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value)
        }
    }

    const formatTime = () => {
        if (duration) {
            const timeRemaning = duration - currentTime
            const minutes = Math.floor(timeRemaning / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(timeRemaning % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        else return '00:00';
    };

    const formatDate = (date: Date) => {
        const day = format(date, 'd', { locale: ru });
        const month = format(date, 'MMMM', { locale: ru });
        const year = format(date, 'yyyy', { locale: ru });
        return `${day} ${month.slice(0, 4)}. ${year}`;
    };

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        ENDPOINTS.WORK.UPDATE_WORK(data.id, {name: newTrackName})
        .then(res => {
            console.log(res.data)
            setTrackName(newTrackName)
            setNewTrackName(newTrackName)
        })
        .catch(err => {
            console.error(err)
        })
    }

    useEffect(()=>{
        if (data) {
            setTrackName(data.name)
            setNewTrackName(data.name)
            setDuration(data.completed_seconds)
        }
    }, [data])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
        }
        else {
            audioRef.current?.pause()
        }
    }, [isPlaying])

    // useEffect(() => {
    //     if (audioRef.current) {
    //         audioRef.current.volume = 0.1
    //     }
    // }, [audioRef])

    useEffect(() => {
        if (!canPlay && audioRef.current) {
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }, [canPlay])

    useEffect(()=>{
        if (currentTime < 1) {
            progressBarRef.current?.style.setProperty('--value', `${0}`);
        }
        else progressBarRef.current?.style.setProperty('--value', `${currentTime}`);
    }, [currentTime])

    useEffect(()=>{
        progressBarRef.current?.style.setProperty('--min', `${0}`);
        progressBarRef.current?.style.setProperty('--max', `${duration}`);
    }, [duration, progressBarRef.current])

    return (
        <div className={clsx(style.player, isPlaying && style.player_active)}>
            {isClient && windowWidth > 1280 && (
                <p className={style.player__index}>{index}</p>
            )}
            <Button className={clsx(style.player__button)} callback={() => { setIsPlaying(!isPlaying); setPlayingIndex() }}>
                <Image
                    className={clsx(style.player__button__img, isPlaying && style.player__button__img_active)}
                    {...pause}
                    alt="pause"
                />
                <Image
                    className={clsx(style.player__button__img, !isPlaying && style.player__button__img_active)}
                    {...play}
                    alt="play"
                />
            </Button>
            <div className={style.player__wrapper}>
                <div className={style.player__wrapper_info}>
                    <audio
                        ref={audioRef}
                        onCanPlayThrough={() => onLoadedMetadata()}
                        onEnded={()=>setIsPlaying(false)}
                        controls
                        hidden
                        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                        src={ENDPOINTS.AUDIO.GET_FILE + data.completed_file}
                    />
                    <form onSubmit={submitHandler} className={style.player__input}>
                        <input
                            type="text"
                            name='track_name'
                            id={`track_name ${data.id}`}
                            defaultValue={trackName}
                            value={newTrackName}
                            onChange={(e) => { setNewTrackName(e.currentTarget.value) }}
                        />
                        <Label isSubmit={trackName !== newTrackName} htmlFor={`track_name ${data.id}`}/>
                    </form>
                    {isClient && windowWidth > 1280 && (
                        <>
                            <p className={style.player__text}>{data.voice}</p>
                            <p className={style.player__text}>{formatDate(new Date(data.created_at))}</p>
                            <p className={style.player__text}>{formatTime()}</p>
                        </>
                    )}
                </div>
                {isPlaying && (
                    <div className={style.player__wrapper_range}>
                        <input
                            className={clsx(style.player__range, 'track', 'play')}
                            ref={progressBarRef}
                            type="range"
                            value={currentTime}
                            defaultValue="0"
                            max={duration}
                            onChange={handleChangeRange}
                        />
                    </div>
                )}
                {isClient && windowWidth < 1280 && (
                    <div className={style.player__bottom}>
                        <div className={style.player__bottom__wrapper}>
                            <p className={style.player__text}>{data.voice}</p>
                            <p className={style.player__text}>{formatDate(new Date(data.created_at))}</p>
                        </div>
                        <p className={style.player__text}>{formatTime()}</p>
                    </div>
                )}
                {menuOpen && (
                    <div ref={ref} className={style.player__options}>
                        <div className={style.player__options__download} onClick={() => { console.log('Скачать'); setMenuOpen(false) }}>
                            <Image {...download} alt='download' />
                            <DownloadFile fileName={data.completed_file}><p>Скачать</p></DownloadFile>
                        </div>
                        <Delete callback={() => { removeHandler(data); setMenuOpen(false) }}><p>Удалить</p></Delete>
                    </div>
                )}
            </div>
            <div className={clsx(style.player__menu, menuOpen && style.player__menu_active)} onClick={() => { setMenuOpen(!menuOpen) }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default PlayerFull
