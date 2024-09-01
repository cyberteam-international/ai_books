'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FontUnbounded } from "@/fonts";
import clsx from "clsx";

import { DataVoices } from "./data";

interface IVoiceItem extends DataVoices {
    canPlay: boolean,
    setPlayIndex: () => void
}

export default function VoiceItem({audio, title, gender, canPlay, setPlayIndex}: IVoiceItem) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number | undefined>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

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
        console.log('duration')
        progressBarRef.current?.style.setProperty('--min', `${0}`);
        progressBarRef.current?.style.setProperty('--max', `${duration}`);
    }, [duration, progressBarRef.current])

    useEffect(() => {
        if (!canPlay && audioRef.current) {
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }, [canPlay])

    return (
        <div className="voice">
            <a 
                href="" 
                className={clsx('play', isPlaying && 'stop')} 
                onClick={(e)=>{e.preventDefault(); setIsPlaying(!isPlaying); setPlayIndex()}}
            ></a>
            <div>
                <audio
                    ref={audioRef}
                    onCanPlayThrough={() => onLoadedMetadata()}
                    onEnded={()=>setIsPlaying(false)}
                    controls
                    hidden
                    onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
                    src={`audio/${audio}`}
                />
                <h4 className={`name ${FontUnbounded.className}`}>{title}</h4>
                <span className="gender">{gender}</span>
                <input
                    className='track play'
                    ref={progressBarRef}
                    type="range"
                    value={currentTime}
                    max={duration}
                    onChange={handleChangeRange}
                />
                {/* <input type='range' className="track" max="100" value="0" /> */}
            </div>
        </div>
    );
}
