'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import s from './style.module.scss'
import clsx from "clsx";

type Props = {
	audio: string,
	canPlay: boolean,
	setPlayIndex: () => void
};

export default function SampleVoice({audio, canPlay, setPlayIndex}: Props) {

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
		} else {
			audioRef.current?.pause()
		}
	}, [isPlaying])

	useEffect(() => {
		if (currentTime < 1) {
			progressBarRef.current?.style.setProperty('--value', `${0}`);
		} else progressBarRef.current?.style.setProperty('--value', `${currentTime}`);
	}, [currentTime])

	useEffect(() => {
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
		<div  className={`${s.copying__voice}`}>
			<a 
				href="#"
				className={clsx(`${s.copying__play}`, isPlaying && `${s.copying__play_stop}`)} 
				onClick={(e) => {e.preventDefault(); setIsPlaying(!isPlaying); setPlayIndex()}}
			></a>
			<div className={`${s.copying__side}`} >
				<audio
					ref={audioRef}
					onCanPlayThrough={() => onLoadedMetadata()}
					onEnded={() => setIsPlaying(false)}
					controls
					hidden
					onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
					src={`audio/${audio}`}
				/>
				<input
					className='track play'
					ref={progressBarRef}
					type="range"
					value={currentTime}
					max={duration}
					onChange={handleChangeRange}
				/>
			</div>
		</div>
	);
}
