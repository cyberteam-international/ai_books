import React from "react";

import { RulesData } from "./data";

import style from './style.module.scss'
import Image from "next/image";

type Props = {};

export default function Rules({}: Props) {

    const setItems = () => {
        return RulesData.map((item, index)=>{
            return (
                <div className={style.rules__item}>
                    <Image {...item.img} alt={`rules ${index+1}`}/>
                    <div className={style.rules__item__wrapper}>
                        <p>{item.title}</p>
                        <p>{item.subtitle}</p>
                    </div>
                </div>
            )
        })
    }
    
    return (
        <div className={style.rules}>
            {setItems()}
        </div>
    );
}
