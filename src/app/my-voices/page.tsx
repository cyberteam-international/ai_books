'use client'

import clsx from 'clsx';
import {useContext, useEffect, useState} from 'react';

import {ENDPOINTS} from '@/utils/config';

import Button from '@/UI/button';

import style from './style.module.scss'

import {ContextUser} from '@/utils/context';
import {MyVoice} from "@utils/interface/MyVoice";
import {useGETVoices} from "@utils/hooks/useSwrGET";
import {ModalCreateVoice} from "@components/Modal/ModalCreateVoice";
import {ModalWarningEnoughBalance, ModalWrapper} from "@components/Modal";

export default function PageMyVoices() {
    const [myVoiceArray, setMyVoiceArray] = useState<MyVoice[]>([])
    const [modalCreateVoiceOpen, setModalCreateVoiceOpen] = useState<boolean>(false)
    const {userInfo, mutate} = useContext(ContextUser)
    const {data} = useGETVoices()

    useEffect(() => {
        if (userInfo) {
            ENDPOINTS.VOICES.GET_VOICES().then((res) => {
                const myVoiceArray: MyVoice[] = []

                for (let i = 0; i < res.length; i++) {
                    const r = res[i]

                    myVoiceArray.push({
                        title: r.name,
                        inputValue: r.name,
                        value: r.voice_id,
                    })
                }

                setMyVoiceArray(myVoiceArray)
            })
        }

    }, [userInfo, data]);

    function onSubmitCreateVoice() {}

    return (
        <main className={clsx(style.profile, 'container')}>
            <div className={style.profile__wrapper}>
                <div className={style.profile__header}>
                    <p className={style.profile__wrapper__title}>Мои голоса <span>({myVoiceArray.length}/10)</span>
                    </p>
                    <Button className={style.profile__btn} callback={() => {
                        return setModalCreateVoiceOpen(true)
                    }}>Создать</Button>
                </div>

                <div className={style.profile__voices}>
                    {myVoiceArray.map(voice => {
                        return <div className={style.profile__voice}>
                            {voice.title}
                        </div>
                    })}
                </div>
            </div>

            <ModalWrapper state={[modalCreateVoiceOpen, setModalCreateVoiceOpen]}>
                <ModalCreateVoice onSubmit={onSubmitCreateVoice}/>
            </ModalWrapper>

        </main>
    );
}
