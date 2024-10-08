import {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ru} from 'date-fns/locale'
import {format} from 'date-fns';

import {ResponseWork} from '../interface';
import {ENDPOINTS_URL, VOICES} from '../config';
import {useGETVoices} from "@utils/hooks/useSwrGET";
import {Loader} from "next/dynamic";
import Loading from "@/app/loading";

export const useAudio = (data: ResponseWork) => {
    const myVoicesData = useGETVoices()
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState<number>()
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [trackName, setTrackName] = useState('')
    const [newTrackName, setNewTrackName] = useState('')
    const [audioUrl, setAudioUrl] = useState<string>('');

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    // Сервис временной почты для борьбы со спамом. sil<[2000]> Избавтесь от спама с нашей бесплатной, безопасной 10-минутной почтой.

    const formatTime = () => {
        if (duration) {
            // console.log('duration', typeof duration)
            // console.log('currentTime', currentTime)
            const timeRemaining = duration - currentTime

            const hours = Math.floor(timeRemaining / 3600);
            const formatHours = hours < 10 ? `0${hours}` : `${hours}`;
            const minutes = Math.floor(timeRemaining / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(timeRemaining % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

            return `${formatHours}:${formatMinutes}:${formatSeconds}`;
        }
        return '00:00:00';
    };

    const setVoice = useMemo(() => {
        const voice = VOICES.filter((el) => el.value === data.voice)[0]?.title
        if (voice) return voice

        const myVoice = myVoicesData?.data ? myVoicesData?.data.filter((el: any) => el.voice_id === data.voice)[0]?.name : ""
        if(myVoice) return `Мой голос (${myVoice})`

        return ""
    }, [data, myVoicesData.data])

    const formatDate = useMemo(() => {
        const date = new Date(data.created_at)
        const day = format(date, 'd', {locale: ru});
        const month = format(date, 'MMMM', {locale: ru});
        const year = format(date, 'yyyy', {locale: ru});
        return `${day} ${month.slice(0, 3)}. ${year}`;
    }, [data])

    const fetchAudioUrl = useCallback(async () => {
        const response = await fetch(ENDPOINTS_URL.AUDIO + data.completed_file);
        const blob = await response.blob();
        const newBlob = new Blob([blob], {type: 'audio/mpeg'});
        const url = URL.createObjectURL(newBlob);
        setAudioUrl(url);
    }, [data])

    const handleChangeRange = (e: Event | ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const target = e.target as HTMLInputElement;
            // console.log(audioRef.current.duration)
            audioRef.current.currentTime = Number(target.value)
            setCurrentTime(Number(target.value))
        }
    }

    useEffect(() => {
        if (progressBarRef.current) {
            progressBarRef.current.addEventListener('input', handleChangeRange)
        }
        return () => {
            progressBarRef.current?.removeEventListener('input', handleChangeRange)
        };
    }, [progressBarRef])

    // useEffect(()=>{
    //     if (audioRef.current) {
    //         audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata)
    //     }
    //     return () => {
    // 		audioRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata)
    // 	};
    // }, [audioRef])

    useEffect(() => {
        setTrackName(data.name);
        setNewTrackName(data.name);
        setDuration(data.completed_seconds);
        fetchAudioUrl();

        return () => {
            URL.revokeObjectURL(audioUrl);
        };
    }, [data]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
        } else {
            audioRef.current?.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (duration && progressBarRef.current) {
            progressBarRef.current.style.setProperty('--min', `${0}`);
            progressBarRef.current.style.setProperty('--max', `${duration}`);
            progressBarRef.current.style.setProperty('--value', `${currentTime}`);
        }
    }, [duration, progressBarRef, currentTime])

    return {
        audioRef,
        progressBarRef,
        isPlaying, setIsPlaying,
        duration, setDuration,
        currentTime, setCurrentTime,
        trackName, setTrackName,
        newTrackName, setNewTrackName,
        formatTime,
        formatDate,
        setVoice,
        handleChangeRange,
        audioUrl
    };
};