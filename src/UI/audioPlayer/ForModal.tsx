'use client'

import Image from 'next/image';
import { ChangeEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Button from '../button';

import change_black from '@public/change_black.svg'
import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'

import style from './ForModal.module.scss'

type Props = {};

export const PlayerModal = ({ }: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number>()
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [playLineWidth, setPlayLineWidth] = useState<number>(0)
    const [trackName, setTrackName] = useState('Без названия #1')
    const [newTrackName, setNewTrackName] = useState('Без названия #1')
    const [voiceName, setVoiceName] = useState('Алиса')

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const onLoadedMetadata = () => {
        setDuration(audioRef.current?.duration)
    };

    const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value)
        }
    }

    const formatTime = () => {
        if (duration && currentTime) {
            const timeRemaning = duration - currentTime
            const minutes = Math.floor(timeRemaning / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(timeRemaning % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    };

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        data.forEach((value, key)=>{
            console.log(`${key}: ${value}`);
        })
        setNewTrackName('Без названия #1')
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

    useEffect(()=>{
        if (progressBarRef.current && duration) {
            setPlayLineWidth((Number(progressBarRef.current.value) / duration) * 100)
        }
    }, [progressBarRef.current?.value, duration])

    return (
        <div className={style.player}>
            <Button className={clsx(style.player__button)} callback={() => setIsPlaying(!isPlaying)}>
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
                        controls
                        hidden
                        onCanPlayThrough={()=>onLoadedMetadata()}
                        onLoadedMetadataCapture={()=>{onLoadedMetadata()}}
                        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                        src={'test_audio.mp3'}
                    />
                    {/* <p>{formatTime(currentTime)}</p> */}
                    <form onSubmit={submitHandler}  className={style.player__input}>
                        <input 
                            type="text"
                            name='track_name'
                            id='track_name'
                            defaultValue={trackName}
                            value={newTrackName}
                            onChange={(e)=>{setNewTrackName(e.currentTarget.value)}} 
                        />
                        <label htmlFor="track_name">
                            <Image {...change_black} />
                        </label>
                    </form>
                    <div className={style.player__wrapper_info__wrapper}>
                        <p>{voiceName}</p>
                        <p>{formatTime()}</p>
                    </div>
                </div>
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
                        style={{ width: `${playLineWidth}%`}}></span>
                </div>
            </div>
        </div>
    );
}

export default PlayerModal

