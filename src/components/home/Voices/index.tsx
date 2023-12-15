'use client'

import { useEffect, useRef, useState } from "react";
import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";

import { FontUnbounded } from "@/fonts";

import VoiceItem from "./VoiceItem";

import { data } from "./data";
import { useIsClient } from "@/utils/hooks";
type Props = {};

export default function Voices({ }: Props) {

    const [playIndex, setPlayIndex] = useState<number>()
    const [playColumn, setPlayColumn] = useState<number>()
    const [positions, setPositions] = useState<{one: number, two: number}>()
    const [translate, setTranslate] = useState<number>()

    const windowHeight = useWindowHeight()
    const voicesRef = useRef<HTMLDivElement>(null);
    const isClient = useIsClient()

    const scrollHandler = (e: any) => {
        if (positions) {
            if(window.scrollY >= positions.one && window.scrollY <= positions.two) {
                setTranslate((positions.one - window.scrollY) / 4)
            }
        }
    }
    const resizeHandler = (e: any) => {
        if (voicesRef.current) {
            setPositions({one: voicesRef.current.offsetTop - windowHeight, two: voicesRef.current.offsetTop + voicesRef.current.clientHeight})
        }  
    }

    useEffect(()=>{
        if (isClient && voicesRef.current) {
            setPositions({one: voicesRef.current.offsetTop - windowHeight, two: voicesRef.current.offsetTop + voicesRef.current.clientHeight})
            window.addEventListener("resize", resizeHandler)
        }
        return () => window.removeEventListener("resize", resizeHandler)
    }, [isClient, voicesRef.current])

    useEffect(()=>{
        if (isClient && positions) {
            window.addEventListener("scroll", scrollHandler)
        }
        return () => window.removeEventListener("scroll", scrollHandler)
    }, [isClient, positions])


    const setVoices = () => {
        return data.map((item, index) => {
            return (
                <div 
                    key={index} 
                    style={{transform: translate ? `translateX(${index % 2 === 0 ? -translate : translate}px)` : 'none'} }>
                    {item.map((target, key) => {
                        return <VoiceItem 
                            {...target} 
                            canPlay={playIndex === key && playColumn === index}
                            setPlayIndex={()=>{setPlayIndex(key); setPlayColumn(index)}}
                            key={key}
                        />
                    })}
                </div>
            )
        })
    }

    return (
        <div id="voices" ref={voicesRef}>
            <div className="container">
                <h2 className={FontUnbounded.className} id="voices_h">Озвучим текст любым <br />из следующих голосов</h2>
                <div className="voices">
                    {setVoices()}
                </div>
            </div>
        </div>
    );
}
