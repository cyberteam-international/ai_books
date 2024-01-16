'use client'

import style from './style.module.scss'

export default function ButtonUp() {
    return <button className={style.scroll} title="На верх" onClick={()=>window.scrollTo(0, 0)}></button>;
}
