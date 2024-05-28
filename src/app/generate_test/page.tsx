'use client'

import {useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import {useWindowWidth} from '@react-hook/window-size'
import {AxiosResponse} from 'axios'
import Image from 'next/image'

import {ENDPOINTS} from '@utils/config'
import {useIsClient} from '@/utils/hooks'
import {ContextUser} from '@/utils/context'

import {DecipherMode, ResponseWork} from '@utils/interface'

import {ModalMessage, ModalWarningRegistration, ModalWrapper} from '@/components/Modal'
import Select from '@UI/select'
import FormGenerate from '@UI/forms/generate'
import Loader from '@UI/loader'

// import abbreviations_img from '@public/decipher_abbreviations.svg'
// import numbers_img from '@public/decipher_numbers.svg'
import reset from '@public/reset.svg'

import style from './style.module.scss'
import {UseFreeGeneration} from "@utils/hooks/useFreeGeneration";
import {UseFreeGpt} from "@utils/hooks/useFreeGpt";
import FormGenerateResult from "@UI/forms/generate_result";

export default function PageGenerate() {
    const {getFreeGpt, addFreeGpt, maxFreeGpt} = UseFreeGpt()

    const [modalResultOpen, setModalResultOpen] = useState<boolean>(false)
    const [modalRegistrationOpen, setModalRegistrationOpen] = useState<boolean>(false)
    const [completeMessage, setCompleteMessage] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    const [valueBeforeDecipher, setValueBeforeDecipher] = useState<string>()
    const [value, setValue] = useState<string>()
    const [resultValue, setResultValue] = useState<string>("")

    const [decipherMode, setDecipherMode] = useState<DecipherMode>()

    const {userInfo, mutate} = useContext(ContextUser)

    const isClient = useIsClient()

    const windowWidth = useWindowWidth()

    const decipherOption: DecipherMode[] = [
        {
            title: 'Вопрос с единичным выбором',
            inputValue: 'Вопрос с единичным выбором',
            value: 'SINGLE'
        },
        {
            title: 'Вопрос с множественным выбором',
            inputValue: 'Вопрос с множественным выбором',
            value: 'MULTIPLE_CHOICE'
        },
        {
            title: 'Вопрос на совпадение',
            inputValue: 'Вопрос на совпадение',
            value: 'QUESTIONS_COMPARISON'
        },
        {
            title: 'Вопрос на последовательность',
            inputValue: 'Вопрос на последовательность',
            value: 'SEQUENCE'
        },
    ]

    const handleRegistration = () => {
        return setModalRegistrationOpen(true)
    }

    const handleGenerateTest = () => {
        const type = decipherMode?.value
        const text = value

        if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
            const freeGpt = (getFreeGpt() + 1)

            if (freeGpt > maxFreeGpt) {
                setCompleteMessage(`Вы исчерпали лимит бесплатной подготовки текста за сутки`)
                return
            }
        }


        if (text && type) {
            if (text.length >= 5000) {
                setCompleteMessage(`Вы можете подготовить текст длиной не более 5000 символов`)
                return;
            }

            setLoading(true)
            ENDPOINTS.GENERATE.TEST(type, text)
                .then((res: AxiosResponse<{ text: string }>) => {
                    setLoading(false)
                    setResultValue(res.data.text)

                    if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
                        const freeGpt = (getFreeGpt() + 1)
                        addFreeGpt()
                        setCompleteMessage(`Вы можете подготовить текст еще ${maxFreeGpt - freeGpt} из ${maxFreeGpt} раз за сутки`)
                    }
                })
        }
    }

    const handleConvertGift = () => {
        const text = value
        setLoading(true)

        function download(filename: string, text: string) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        if (text) {
            setLoading(true)

            ENDPOINTS.CONVERT.GIFT(text)
                .then((res: AxiosResponse<{ text: string }>) => {
                    const nameFile = new Date().getTime().toString() + ".txt"
                    const bodyFile = res.data.text
                        .replaceAll('```html', '')
                        .replaceAll('```', '')

                    download(nameFile, bodyFile)
                    setLoading(false)

                    // addFreeGpt()
                    // setCompleteMessage(`Вы можете подготовить текст еще ${maxFreeGpt - freeGpt} из ${maxFreeGpt} раз за сутки`)
                })
        }
    }

    const handleReset = () => {
        if (valueBeforeDecipher) {
            setValue(valueBeforeDecipher)
            setValueBeforeDecipher(undefined)
            setDecipherMode({
                title: 'Выберите преобработку',
                inputValue: 'Выберите преобработку',
            })
        }

    }

    const copyHandle = () => {
        navigator.clipboard.writeText(resultValue)
            .then(() => {
                setCompleteMessage(`Текст успешно скопирован.`)
            })
            .catch((err) => {
                setCompleteMessage(`Ошибка копирования текста в буфер обмена`)
                console.error('Ошибка копирования текста в буфер обмена: ', err);
            });

    }

    useEffect(() => {
        if (isClient) {
            if (userInfo?.id) {
                if (window.localStorage.getItem(`textareaGenerateValue_${userInfo?.id}`)) {
                    setValue(String(localStorage.getItem(`textareaGenerateValue_${userInfo?.id}`)))
                }

                if (window.localStorage.getItem(`textareaGenerateResultValue_${userInfo?.id}`)) {
                    setResultValue(String(localStorage.getItem(`textareaGenerateResultValue_${userInfo?.id}`)))
                }
            } else {
                if (window.localStorage.getItem(`textareaGenerateValue_default`)) {
                    setValue(String(localStorage.getItem('textareaGenerateValue_default')))
                }

                if (window.localStorage.getItem(`textareaGenerateResultValue_default`)) {
                    setResultValue(String(localStorage.getItem('textareaGenerateResultValue_default')))
                }
            }
        }
    }, [isClient, userInfo])

    useEffect(() => {
        if (value && value.length > 0) {
            if (!decipherMode?.value) {
                setDecipherMode({
                    title: 'Подготовка текста',
                    inputValue: 'Подготовка текста',
                })
            }
        } else setDecipherMode({
            title: 'Подготовка текста',
            inputValue: 'Подготовка текста',
        })
    }, [value])

    useEffect(() => {
        if (decipherMode?.value) {
            handleGenerateTest()
        }
    }, [decipherMode])

    return (
        <>
            <main
                className={clsx(style.main, 'container', ((modalResultOpen || modalRegistrationOpen) || loading) && 'modal')}>
                <div className={style.main__options}>
                    <Select
                        options={decipherOption}
                        value={decipherMode}
                        onChange={(data) => {
                            if (value) {
                                setDecipherMode((data as DecipherMode))
                            } else {
                                setCompleteMessage('')
                                setCompleteMessage('Для подготовки введите текст')
                            }
                        }}
                        type={'banks'}
                        inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
                    />
                </div>

                <div className={style.main__wrapper}>
                    <FormGenerate
                        handleRegistration={handleRegistration}
                        handleEnoughBalance={() => {
                        }}
                        valueBeforeDecipherState={[valueBeforeDecipher, setValueBeforeDecipher]}
                        valueState={[value, setValue]}
                    >
                        {<>
                            {(valueBeforeDecipher) && (
                                <div className={style.main__rules__buttons}>
                                    <button className={style.main__rules__buttons__item} type="button"
                                            onClick={handleReset}>
                                        <p>Сбросить</p>
                                        <Image {...reset} alt={'reset'}/>
                                    </button>
                                </div>
                            )}
                        </>}
                    </FormGenerate>
                    <div style={{display: resultValue.length > 0 ? "block" : "none"}}>
                        <FormGenerateResult submit={handleConvertGift}
                                            copyHandle={copyHandle}
                                            canSubmit={resultValue.length > 0}
                                            handleEnoughBalance={() => {
                                            }}
                                            handleRegistration={() => {
                                            }}
                                            valueBeforeDecipherState={[valueBeforeDecipher, setValueBeforeDecipher]}
                                            valueState={[resultValue, setResultValue]}/>
                    </div>
                </div>
            </main>
            {loading && (
                <Loader/>
            )}
            <ModalWrapper state={[modalRegistrationOpen, setModalRegistrationOpen]}>
                <ModalWarningRegistration/>
            </ModalWrapper>
            <ModalMessage message={completeMessage} setMesage={setCompleteMessage}/>
        </>
    )
}
