'use client'

import Image from 'next/image';
import { ChangeEvent, FormEventHandler, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie'

import { ResponseWork } from '@/utils/interface';
import { useAudio } from '@/utils/hooks';
import { ENDPOINTS } from '@/utils/config';

import Button from '../button';
import Label from './Label';

import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'

import style from './ForModal.module.scss'

type Props = {
    data: ResponseWork
};

export const PlayerModal = ({ data }: Props) => {

    const {
        audioRef,
        progressBarRef,
        isPlaying, setIsPlaying,
        duration,
        currentTime, setCurrentTime,
        trackName, setTrackName,
        newTrackName, setNewTrackName,
        formatTime,
        setVoice
    } = useAudio(data)

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
                        onEnded={()=>setIsPlaying(false)}
                        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                        src={ENDPOINTS.AUDIO.GET_FILE + data.completed_file}
                    >
                        {/* <source src={ENDPOINTS.AUDIO.GET_FILE + data.completed_file} type="audio/mp3"/> */}
                    </audio>
                    <form onSubmit={submitHandler}  className={style.player__input}>
                        <input 
                            type="text"
                            name='track_name'
                            id={`track_name ${data.id}`}
                            defaultValue={trackName}
                            value={newTrackName}
                            onChange={(e)=>{setNewTrackName(e.currentTarget.value)}}
                            readOnly={Cookies.get('token')? false : true}
                        />
                        {Cookies.get('token') && <Label htmlFor={`track_name ${data.id}`} isSubmit={trackName !== newTrackName}/>}
                    </form>
                    <div className={style.player__wrapper_info__wrapper}>
                        <p>{setVoice()}</p>
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
                        step={0.01}
                        max={duration}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerModal