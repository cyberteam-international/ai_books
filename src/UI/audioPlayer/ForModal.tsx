'use client'

import Image from 'next/image';
import { ChangeEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ResponseWork } from '@/utils/interface';
import { ENDPOINTS } from '@/utils/config';

import Button from '../button';

import change_black from '@public/change_black.svg'
import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'

import style from './ForModal.module.scss'

type Props = {
    data: ResponseWork
};

export const PlayerModal = ({ data }: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number>()
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [trackName, setTrackName] = useState('')
    const [newTrackName, setNewTrackName] = useState('')

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
        ENDPOINTS.WORK.UPDATE_WORK(data.id, {name: newTrackName})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
        }
        else {
            audioRef.current?.pause()
        }
    }, [isPlaying])

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

    useEffect(() => {
        setTrackName(data.name)
        setNewTrackName(data.name)
    }, [data]);
    

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
                        onEnded={()=>setIsPlaying(false)}
                        onLoadedMetadataCapture={()=>{onLoadedMetadata()}}
                        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                        src={'test_audio.mp3'}
                    />
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
                        <p>{data?.voice}</p>
                        <p>{formatTime()}</p>
                    </div>
                </div>
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
            </div>
        </div>
    );
}

export default PlayerModal

