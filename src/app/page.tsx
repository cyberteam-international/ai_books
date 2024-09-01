'use client'
import clsx from 'clsx'

import {FontUnbounded} from '@/fonts'

import About from '@/components/home/About'
import Voices from '@/components/home/Voices'
import Support from '@/components/home/Support'
import Copying from '@/components/home/Copying'

import './style.scss'
import {ModalTariffForm} from "@components/Modal/ModalTariffForm";
import {ModalMessage, ModalWrapper} from "@components/Modal";
import {useState} from "react";
import style from "@/app/work/style.module.scss";
import Tariffs from '@/components/home/Tariffs'

export default function PageHome() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [completeMessage, setCompleteMessage] = useState<string>()

    return (
        <>
            <main className={clsx(style.main, 'home', (modalOpen && 'modal'))}>
                <div className="home__container container">
                    <h1 className={clsx('home__title', FontUnbounded.className)}>Копирование голосов и озвучивание текстов</h1>
                    <h5 className={clsx('home__subtitle', FontUnbounded.className)}>ИИ клонирование голосов. Озвучивание текстов на разных языках. Создание аудиокниг.</h5>
                </div>
                <div className='home__wrapper'>
                    <div className='container excavation'></div>
                    <a href="#about_h" aria-description='' className="more_button"></a>
                </div>
                <About onClick={() => setModalOpen(true)}/>
                <Copying/>
                <Voices/>
                <Tariffs onClick={() => setModalOpen(true)}/>
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