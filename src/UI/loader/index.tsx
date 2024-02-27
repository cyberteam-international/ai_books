import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef, useEffect } from "react";

import lottie_data from './lottie.json'

import style from './style.module.scss'

type Props = {
    
};

export default function Loader({  }: Props) {

    // const lottieRef = useRef<LottieRefCurrentProps | null>(null)

    // useEffect(()=>{
    //     if (lottieRef.current) {
    //         lottieRef.current.setSpeed(0.5)
    //     }
    // }, [lottieRef.current])

    return (
        // <Lottie
        //     className={style.loader}
        //     lottieRef={lottieRef}
        //     animationData={lottie_data}
        //     renderer={'svg'}
        //     loop={true}
        //     autoplay={true}
        //     rendererSettings={{
        //         progressiveLoad: true,
        //     }}
        // />
        <div className={style.loader}>
            <div className={style.loader__wrapper}>
                <span className={style.loader__animation}></span>
            </div>
            <p className={style.loader__text}>Работаем над вашей задачей.</p>
            <p className={style.loader__text}>Спасибо, что ждете</p>
        </div>
    );
}
