'use client'

import clsx from 'clsx';
import {useState} from 'react';

import Button from '@/UI/button';

import style from './style.module.scss'

import {useGETVoices} from "@utils/hooks/useSwrGET";
import {ModalCreateVoice} from "@components/Modal/ModalCreateVoice";
import {ModalMessage, ModalWrapper} from "@components/Modal";
import Delete from "@UI/delete";
import {MAX_VOICE_SIZE} from '@utils/config';
import {ENDPOINTS} from "@utils/config";
import {IDataEditVoice, ModalEditVoice} from "@components/Modal/ModalEditVoice";
import Loading from "@/app/loading";

export default function PageMyVoices() {
    const [modalCreateVoiceOpen, setModalCreateVoiceOpen] = useState<boolean>(false)
    const [modalEditVoiceOpen, setModalEditVoiceOpen] = useState<boolean>(false)
    // const [modalEditSettingsVoiceOpen, setModalEditSettingsVoiceOpen] = useState<boolean>(false)
    const myVoices = useGETVoices()
    const [completeMessage, setCompleteMessage] = useState<string>()
    const [editData, setEditData] = useState<IDataEditVoice | undefined>(undefined)
    // const [editDataSettings, setEditDataSettings] = useState<number | undefined>(undefined)

    // function onSubmitEditSettingsVoice() {
    //     setCompleteMessage('Пожалуйста подождите. Сохранение')
    //     setModalEditVoiceOpen(false)
    //
    //     mutate().then(() => {
    //         setCompleteMessage('Настройки успешно сохранены.')
    //     }).catch(() => {
    //         setCompleteMessage('Ошибка. Попробуйте позже')
    //     })
    // }

    function onSubmitEditVoice() {
        setCompleteMessage('Пожалуйста подождите. Сохранение')
        setModalEditVoiceOpen(false)

        setTimeout(() => {
            myVoices.mutate().then(() => {
                setCompleteMessage('Голос успешно изменен.')
            }).catch(() => {
                setCompleteMessage('Ошибка. Попробуйте позже')
            })
        }, 500)
    }

    function onSubmitCreateVoice() {
        setCompleteMessage('Пожалуйста подождите. Голос обрабатывается')
        setModalCreateVoiceOpen(false)

        myVoices.mutate().then(() => {
            setCompleteMessage('Голос успешно создан.')
        }).catch(() => {
            setCompleteMessage('Ошибка. Попробуйте позже')
        })
    }

    function onDeleteButton(voice_id: number) {
        setCompleteMessage('Удаление...')

        ENDPOINTS.VOICES.DELETE_VOICE(voice_id).then(() => {
            myVoices?.mutate().then(() => {
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
            <div className={style.profile__wrapper}>
                <div className={style.profile__header}>
                    <p className={style.profile__wrapper__title}>Мои
                        голоса <span>({myVoices?.data?.length || 0}/{MAX_VOICE_SIZE})</span>
                    </p>
                    <Button className={style.profile__btn} callback={() => {
                        return setModalCreateVoiceOpen(true)
                    }}>Создать</Button>
                </div>

                {myVoices?.data && <div className={style.profile__voices}>
                    {myVoices?.data.map((voice: any) => {
                        return <div className={style.profile__voice}>
                            <a className={style.profile__voice_link} onClick={() => {
                                setModalEditVoiceOpen(true);
                                setEditData({
                                    id: voice.id,
                                    name: voice.name,
                                    samples: voice.samples,
                                })
                            }}></a>
                            <p className={style.profile__voice__title}>{voice.name}</p>

                            <div className={style.profile__voice__tools}>
                                {/*<Settings callback={() => {*/}
                                {/*    setModalEditSettingsVoiceOpen(true)*/}
                                {/*    setEditDataSettings(voice.id)*/}
                                {/*}}><p>Настройки</p></Settings>*/}

                                <Delete callback={() => {
                                    onDeleteButton(voice.id);
                                }}><p>Удалить</p></Delete>
                            </div>
                        </div>
                    })}
                </div>}
                {!myVoices?.data && <Loading/>}
            </div>

            <ModalWrapper state={[modalCreateVoiceOpen, setModalCreateVoiceOpen]}>
                <ModalCreateVoice onSubmit={onSubmitCreateVoice}/>
            </ModalWrapper>

            <ModalWrapper state={[modalEditVoiceOpen, setModalEditVoiceOpen]}>
                <ModalEditVoice data={editData} onSubmit={onSubmitEditVoice}/>
            </ModalWrapper>

            {/*<ModalWrapper state={[modalEditSettingsVoiceOpen, setModalEditSettingsVoiceOpen]}>*/}
            {/*    <ModalEditSettingsVoice id={editDataSettings} onSubmit={onSubmitEditSettingsVoice}/>*/}
            {/*</ModalWrapper>*/}

            <ModalMessage message={completeMessage} setMesage={setCompleteMessage}/>
        </main>
    );
}
