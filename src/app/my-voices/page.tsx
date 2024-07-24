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
import {IDataEditVoice, ModalEditVoice} from "@components/Modal/ModalEditVoice";
import Settings from "@UI/settings";
import {ModalEditSettingsVoice} from "@components/Modal/ModalEditSettingsVoice";

export default function PageMyVoices() {
    const MAX_VOICE_SIZE = 10
    const [modalCreateVoiceOpen, setModalCreateVoiceOpen] = useState<boolean>(false)
    const [modalEditVoiceOpen, setModalEditVoiceOpen] = useState<boolean>(false)
    const [modalEditSettingsVoiceOpen, setModalEditSettingsVoiceOpen] = useState<boolean>(false)
    const {data, mutate} = useGETVoices()
    const [completeMessage, setCompleteMessage] = useState<string>()
    const [editData, setEditData] = useState<IDataEditVoice | undefined>(undefined)
    const [editDataSettings, setEditDataSettings] = useState<number | undefined>(undefined)

    function onSubmitEditSettingsVoice() {
        setCompleteMessage('Пожалуйста подождите. Сохранение')
        setModalEditVoiceOpen(false)

        mutate().then(() => {
            setCompleteMessage('Настройки успешно сохранены.')
        }).catch(() => {
            setCompleteMessage('Ошибка. Попробуйте позже')
        })
    }

    function onSubmitEditVoice() {
        setCompleteMessage('Пожалуйста подождите. Сохранение')
        setModalEditVoiceOpen(false)

        mutate().then(() => {
            setCompleteMessage('Голос успешно изменен.')
        }).catch(() => {
            setCompleteMessage('Ошибка. Попробуйте позже')
        })
    }

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
                        <p className={style.profile__wrapper__title}>Мои
                            голоса <span>({data.length}/{MAX_VOICE_SIZE})</span>
                        </p>
                        {data.length < MAX_VOICE_SIZE && <Button className={style.profile__btn} callback={() => {
                            return setModalCreateVoiceOpen(true)
                        }}>Создать</Button>}
                    </div>

                    <div className={style.profile__voices}>
                        {data.map((voice: any) => {
                            return <div className={style.profile__voice}>
                                <a className={style.profile__voice_link} onClick={() => {
                                    setModalEditVoiceOpen(true)
                                    setEditData({
                                        id: voice.id,
                                        name: voice.name,
                                        description: voice.description,
                                        samples: voice.samples,
                                    })
                                }}></a>
                                <p className={style.profile__voice__title}>{voice.name}</p>

                                <div className={style.profile__voice__tools}>
                                    <Settings callback={() => {
                                        setModalEditSettingsVoiceOpen(true)
                                        setEditDataSettings(voice.id)
                                    }}><p>Настройки</p></Settings>

                                    <Delete callback={() => {
                                        onDeleteButton(voice.id);
                                    }}><p>Удалить</p></Delete>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <ModalWrapper state={[modalCreateVoiceOpen, setModalCreateVoiceOpen]}>
                    <ModalCreateVoice onSubmit={onSubmitCreateVoice}/>
                </ModalWrapper>

                <ModalWrapper state={[modalEditVoiceOpen, setModalEditVoiceOpen]}>
                    <ModalEditVoice data={editData} onSubmit={onSubmitEditVoice}/>
                </ModalWrapper>

                <ModalWrapper state={[modalEditSettingsVoiceOpen, setModalEditSettingsVoiceOpen]}>
                    <ModalEditSettingsVoice id={editDataSettings} onSubmit={onSubmitEditSettingsVoice}/>
                </ModalWrapper>
            </>}

            <ModalMessage message={completeMessage} setMesage={setCompleteMessage}/>
        </main>
    );
}
