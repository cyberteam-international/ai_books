import clsx from 'clsx';
import Image from 'next/image';
import { useState, useRef, ChangeEvent, FormEventHandler, useEffect } from 'react';
import { ru } from 'date-fns/locale'
import { format } from 'date-fns';

import Button from '../button';
import Delete from '../delete';

import { IDataMyAudio } from '@/app/my-audio/data';

import change_white from '@public/change_white.svg'
import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'
import download from '@public/download.svg'

import style from './ForFull.module.scss'
import { useWindowWidth } from '@react-hook/window-size';

interface Props extends IDataMyAudio {
    index: number,
    canPlay: boolean,
    setPlayingIndex: () => void
};

export const PlayerFull = ({ index, src, trackName, voiceName, dateAdd, canPlay, setPlayingIndex }: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number | undefined>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [playLineWidth, setPlayLineWidth] = useState<number>(0)
    const [trackNameState, setTrackNameState] = useState(`Аудиокнига «${trackName}»`)
    const [newTrackName, setNewTrackName] = useState(trackNameState)
    const [voiceNameState, setVoiceNameState] = useState(voiceName)
    const [menuOpen, setMenuOpen] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const windowWidth = typeof window !== undefined ? useWindowWidth() : 1920

    const onLoadedMetadata = () => {
        if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
        }
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
        const data = new FormData(e.currentTarget)
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        })
        setNewTrackName(`Аудиокнига «${trackName}»`)

    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
        }
        else {
            audioRef.current?.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.1
        }
    }, [audioRef])

    useEffect(() => {
        if (!canPlay && audioRef.current) {
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }, [canPlay])

    useEffect(() => {
        if (progressBarRef.current && duration) {
            setPlayLineWidth((Number(progressBarRef.current.value) / duration) * 100)
        }
    }, [progressBarRef.current?.value, duration])

    return (
        <div className={clsx(style.player, isPlaying && style.player_active)}>
            {windowWidth > 1280 && (
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
                        controls
                        hidden
                        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                        src={src}
                    />
                    <form onSubmit={submitHandler} className={style.player__input}>
                        <input
                            type="text"
                            name='track_name'
                            id='track_name'
                            defaultValue={trackNameState}
                            value={newTrackName}
                            onChange={(e) => { setNewTrackName(e.currentTarget.value) }}
                        />
                        <label htmlFor="track_name">
                            <Image {...change_white} />
                        </label>
                    </form>
                    {windowWidth > 1280 && (
                        <>
                            <p className={style.player__text}>{voiceNameState}</p>
                            <p className={style.player__text}>{formatDate(dateAdd)}</p>
                            <p className={style.player__text}>{formatTime()}</p>
                        </>
                    )}
                </div>
                {isPlaying && (
                    <div className={style.player__wrapper_range}>
                        <input
                            className={style.player__range}
                            ref={progressBarRef}
                            type="range"
                            value={currentTime}
                            defaultValue="0"
                            max={duration}
                            onChange={handleChangeRange}
                        />
                        <span
                            style={{ width: `${playLineWidth}%` }}></span>
                    </div>
                )}
                {windowWidth < 1280 && (
                    <div className={style.player__bottom}>
                        <div className={style.player__bottom__wrapper}>
                            <p className={style.player__text}>{voiceNameState}</p>
                            <p className={style.player__text}>{formatDate(dateAdd)}</p>
                        </div>
                        <p className={style.player__text}>{formatTime()}</p>
                    </div>
                )}
                {menuOpen && (
                    <div className={style.player__options}>
                        <div className={style.player__options__download} onClick={() => { console.log('Скачать'); setMenuOpen(false) }}>
                            <Image {...download} alt='download' />
                            <p>Скачать</p>
                        </div>
                        <Delete callback={() => { console.log('Удалить'); setMenuOpen(false) }}><p>Удалить</p></Delete>
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
