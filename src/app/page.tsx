'use client'
import clsx from 'clsx'
import Link from 'next/link'

import {FontUnbounded} from '@/fonts'
import {ROUTES} from '@/utils/config'

import Button from '@/UI/button'
import About from '@/components/home/About'
import Voices from '@/components/home/Voices'
import Rates from '@/components/home/Rates'
import Support from '@/components/home/Support'

import './style.scss'
import {ModalTariffForm} from "@components/Modal/ModalTariffForm";
import {ModalMessage, ModalWrapper} from "@components/Modal";
import {useState} from "react";
import style from "@/app/work/style.module.scss";

export default function PageHome() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [completeMessage, setCompleteMessage] = useState<string>()

    return (
        <>
            <main className={clsx(style.main, 'home', (modalOpen && 'modal'))}>
                <div className="home__container container">
                    <h1 className={clsx('home__title', FontUnbounded.className)}>Автоматическое озвучивание текстов и
                        аудиокниг</h1>
                    <h5 className={clsx('home__subtitle', FontUnbounded.className)}>Создаем аудио на основе ваших текстов с
                        помощью технологий искусственного интеллекта. </h5>
                    <Button className='home__button'>
                        <Link href={ROUTES.WORK}><h5>Озвучить</h5></Link>
                    </Button>
                </div>
                <div className='home__wrapper'>
                    <div className='container excavation'></div>
                    <a href="#about_h" aria-description='' className="more_button"></a>
                </div>
                <About/>
                <Voices/>
                <Rates onClick={() => {
                    setModalOpen(true)
                }}/>
                <Support/>
            </main>
            <ModalWrapper state={[modalOpen, setModalOpen]} styles={{position: 'fixed', zIndex: 9999, maxWidth: 504, width: '100%', paddingTop: 50, paddingBottom: 50}}>
                <ModalTariffForm onSubmit={() => {
                    setModalOpen(false)
                    setCompleteMessage('Сообщение успешно отправлено!')
                }}/>
            </ModalWrapper>
            <ModalMessage message={completeMessage} setMesage={setCompleteMessage} />
        </>
    )
}