'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Button from '../button';

import play from '@public/player/play.svg'
import pause from '@public/player/pause.svg'

import style from './ForSelect.module.scss'

type Props = {
    src: string,
    setPlayingOption: ()=>void
    canPlay: boolean
};

export const PlayerSelect = ({ src, setPlayingOption, canPlay }: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null);

    const clickHandler = () => {
        setPlayingOption()
        setIsPlaying(!isPlaying)
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
        if (!canPlay && audioRef.current) {
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }, [canPlay])

    // useEffect(() => {
    //     if (audioRef.current) {
    //         audioRef.current.volume = 0.1
    //     }
    // }, [audioRef])

    return (
        <Button className={style.player} callback={() => clickHandler()}>
            <Image 
                className={clsx(style.player__img, isPlaying && style.player__img_active)} 
                {...pause} 
                alt="pause" 
            />
            <Image 
                className={clsx(style.player__img, !isPlaying && style.player__img_active)} 
                {...play} 
                alt="play" 
            />
            <audio
                ref={audioRef}
                controls
                hidden
                src={src}
            />
        </Button>
    );
}

export default PlayerSelect