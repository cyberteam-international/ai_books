import clsx from 'clsx';
import Image from 'next/image';
import { useState, FormEventHandler, useEffect, ChangeEvent } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

import { useIsClient, useOutsideClick } from '@/utils/hooks';
import { ResponseWork } from '@/utils/interface';
import { useAudio } from '@/utils/hooks';
import { ENDPOINTS, ENDPOINTS_URL } from '@/utils/config';

import DownloadFile from '@/components/DownloadFile';
import Button from '../button';
import Delete from '../delete';
import Label from './Label';

import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'
import download from '@public/download.svg'

import style from './ForFull.module.scss'
import Loading from "@/app/loading";


interface Props {
    data: ResponseWork,
    index: number,
    canPlay: boolean,
    setPlayingIndex: () => void,
    removeHandler: (data: ResponseWork) => void,
    handleDuration: (id: number, duration: number) => void,
    handleChangeAudioName: (newName: string) => void,
    isOptionTop: boolean
};

export const PlayerFull = ({ index, canPlay, setPlayingIndex, data, removeHandler, handleDuration, handleChangeAudioName, isOptionTop }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const {
        audioRef,
        progressBarRef,
        isPlaying, setIsPlaying,
        duration,
        currentTime, setCurrentTime,
        trackName, setTrackName,
        newTrackName, setNewTrackName,
        formatTime,
        formatDate,
        setVoice,
        handleChangeRange,
        audioUrl
    } = useAudio(data)

    const isClient = useIsClient()

    const windowWidth = useWindowWidth()

    const ref = useOutsideClick(()=>setMenuOpen(false))

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        ENDPOINTS.WORK.UPDATE_WORK(data.id, {name: newTrackName})
        .then(res => {
            console.log(res.data)
            setTrackName(newTrackName)
            setNewTrackName(newTrackName)
            handleChangeAudioName(newTrackName)
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length <= 100) {
            setNewTrackName(value)
        }
        else{
            const currentValue = value.split('').slice(0, 100).join('')
            setNewTrackName(currentValue)
        }
    }

    useEffect(() => {
        if (duration) {
            handleDuration(data.id, duration)
        }
    }, [duration])

    useEffect(() => {
        if (!canPlay && audioRef.current) {
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }, [canPlay])

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
                        onEnded={()=>setIsPlaying(false)}
                        controls
                        hidden
                        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                        src={audioUrl}
                    />
                    <form onSubmit={submitHandler} className={style.player__input}>
                        <input
                            type="text"
                            name='track_name'
                            id={`track_name ${data.id}`}
                            defaultValue={trackName}
                            value={newTrackName}
                            onChange={handleChangeName}
                        />
                        <Label isSubmit={trackName !== newTrackName} htmlFor={`track_name ${data.id}`}/>
                    </form>
                    {isClient && windowWidth > 1280 && (
                        <>
                            <p className={style.player__text}>{setVoice || <Loading/>}</p>
                            <p className={style.player__text}>{formatDate}</p>
                            <p className={style.player__text}>{formatTime()}</p>
                        </>
                    )}
                </div>
                {/* {isPlaying && ( */}
                {1 && (
                    <div className={style.player__wrapper_range}>
                        <input
                            className={clsx(style.player__range, 'track', 'play')}
                            ref={progressBarRef}
                            type="range"
                            value={currentTime}
                            defaultValue="0"
                            step={0.01}
                            max={duration}
                            onChange={(e)=>{handleChangeRange(e); setIsPlaying(false)}}
                        />
                    </div>
                )}
                {isClient && windowWidth < 1280 && (
                    <div className={style.player__bottom}>
                        <div className={style.player__bottom__wrapper}>
                            <p className={style.player__text}>{setVoice || <Loading/>}</p>
                            <p className={style.player__text}>{formatDate}</p>
                        </div>
                        <p className={style.player__text}>{formatTime()}</p>
                    </div>
                )}
                {menuOpen && (
                    <div ref={ref} className={clsx(style.player__options, isOptionTop && style.player__options_top)}>
                        <div className={style.player__options__download} onClick={() => { console.log('Скачать'); setMenuOpen(false) }}>
                            <Image {...download} alt='download' />
                            <DownloadFile textName={data.input_text} fileName={data.completed_file}><p>Скачать</p></DownloadFile>
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
