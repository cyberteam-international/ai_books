import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef, useEffect } from "react";

import lottie_data from './lottie.json'

import style from './style.module.scss'

type Props = {
    
};

export default function Loader({  }: Props) {

    const lottieRef = useRef<LottieRefCurrentProps | null>(null)

    useEffect(()=>{
        if (lottieRef.current) {
            lottieRef.current.setSpeed(0.5)
        }
    }, [lottieRef.current])

    return (
        <Lottie
            className={style.loader}
            lottieRef={lottieRef}
            animationData={lottie_data}
            renderer={'svg'}
            loop={true}
            autoplay={true}
            rendererSettings={{
                progressiveLoad: true,
            }}
        />
    );
}
