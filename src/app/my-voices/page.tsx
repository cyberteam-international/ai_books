'use client'

import clsx from 'clsx';
import {useState} from 'react';

import Button from '@/UI/button';

import style from './style.module.scss'

import {useGETVoices} from "@utils/hooks/useSwrGET";
import {ModalCreateVoice} from "@components/Modal/ModalCreateVoice";
import {ModalMessage, ModalWrapper} from "@components/Modal";
import Delete from "@UI/delete";
import {ENDPOINTS} from "@utils/config";

export default function PageMyVoices() {
    const [modalCreateVoiceOpen, setModalCreateVoiceOpen] = useState<boolean>(false)
    const {data, mutate} = useGETVoices()
    const [completeMessage, setCompleteMessage] = useState<string>()

    function onSubmitCreateVoice() {
        setCompleteMessage('Пожалуйста подождите. Голос обрабатывается')
        setModalCreateVoiceOpen(false)

        mutate().then(() => {
            setCompleteMessage('Голос успешно создан.')
        }).catch(() => {
            setCompleteMessage('Ошибка. Попробуйте позже')
        })
    }

    function onDeleteButton(voice_id: number) {
        setCompleteMessage('Удаление...')

        ENDPOINTS.VOICES.DELETE_VOICE(voice_id).then(() => {
            mutate().then(() => {
                setCompleteMessage('Успешно удалено.')
            }).catch(() => {
                setCompleteMessage('Ошибка. Попробуйте позже')
            })
        }).catch(() => {
            setCompleteMessage('Ошибка. Попробуйте позже')
        })
    }

    return (
        <main className={clsx(style.profile, 'container')}>
            {data && <>
                <div className={style.profile__wrapper}>
                    <div className={style.profile__header}>
                        <p className={style.profile__wrapper__title}>Мои голоса <span>({data.length}/10)</span>
                        </p>
                        <Button className={style.profile__btn} callback={() => {
                            return setModalCreateVoiceOpen(true)
                        }}>Создать</Button>
                    </div>

                    <div className={style.profile__voices}>
                        {data.map(voice => {
                            return <div className={style.profile__voice}>
                                <p className={style.profile__voice__title}>{voice.name}</p>

                                <Delete callback={() => {
                                    onDeleteButton(voice.id);
                                }}><p>Удалить</p></Delete>
                            </div>
                        })}
                    </div>
                </div>

                <ModalWrapper state={[modalCreateVoiceOpen, setModalCreateVoiceOpen]}>
                    <ModalCreateVoice onSubmit={onSubmitCreateVoice}/>
                </ModalWrapper>
            </>}

            <ModalMessage message={completeMessage} setMesage={setCompleteMessage}/>
        </main>
    );
}
