'use client'

import {useForm} from "react-hook-form";
import {ReactNode, useContext, useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import Image from "next/image";

import {useIsClient} from "@/utils/hooks";

import {CreateWorks} from "@utils/interface";
import {SchemaTextArea} from "@utils/config/yupShemes";
import {ContextUser} from "@/utils/context";
import {PRICE} from "@/utils/config";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";
import Delete from "@/UI/delete";

import icon_warning from '@public/warning.svg'

import style from './style.module.scss'

type Props = {
    submit: (data: { input_text: CreateWorks['input_text'] }) => void
    canSubmit: boolean,
    handleEnoughBalance: () => void,
    handleRegistration: () => void,
    valueBeforeDecipherState: [string | undefined, (val:string)=>void],
    valueState: [string | undefined, (val:string)=>void],
    children?: ReactNode,
};

export default function FormMain({ submit, canSubmit, handleEnoughBalance, handleRegistration, valueState, valueBeforeDecipherState, children }: Props) {

    const [characterCount, setCharacterCount] = useState(0);
    const [valueProps, setValueProps] = valueState

    const { userInfo } = useContext(ContextUser)

    const isClient = useIsClient()

    const [maxCharacterCount, setMaxCharacterCount] = useState(200)

    const {
        register,
        formState: { touchedFields, isValid, errors, },
        handleSubmit,
        getValues,
        watch,
        setValue,
        trigger
    } = useForm<{ input_text: CreateWorks['input_text'] }>({
        resolver: yupResolver(SchemaTextArea),
        mode: 'onBlur',
        context: { maxCharacterCount },
    });

    const buttonCallback = () => {
        if (!isValid) {
            if (!userInfo?.id) {
                return handleRegistration()
            }
            else {
                return handleEnoughBalance()
            }
        }
        else return undefined
    }

    // const decipher_abbreviations = () => {
    //     const textValue = getValues('input_text')
    //     setLoading(true)
    //     ENDPOINTS.GPT.REMOVE_ABBREVIATIONS(textValue)
    //         .then((res: AxiosResponse<{text: string}>)=>{
    //             setLoading(false)
    //             setValueBeforeDecipher(textValue)
    //             setValue('input_text', res.data.text, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    //         })
    // }

    // const decipher_numbers = () => {
    //     const textValue = getValues('input_text')
    //     setLoading(true)
    //     ENDPOINTS.GPT.REMOVE_NUMBERS(textValue)
    //         .then((res: AxiosResponse<{text: string}>)=>{
    //             setLoading(false)
    //             setValueBeforeDecipher(textValue)
    //             setValue('input_text', res.data.text, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    //         })
    // }

    // const handleReset = () => {
    //     if (valueBeforeDecipher) {
    //         setValue('input_text', valueBeforeDecipher, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
    //         setValueBeforeDecipher(undefined)
    //     }
        
    // }

    useEffect(() => {
        const currentValue = getValues('input_text')
        setCharacterCount(currentValue?.length || 0);
        if (currentValue.length > 0 && valueState) {
            if (userInfo?.id) {
                localStorage.setItem(`textareaValue_${userInfo?.id}`, currentValue)
            }
            else localStorage.setItem('textareaValue_default', currentValue)
        }
        setValueProps(currentValue)
    }, [watch('input_text'), userInfo]);

    useEffect(() => {
        if (valueProps) {
            setValue('input_text', valueProps, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
            trigger()
        }
    }, [isClient, userInfo, maxCharacterCount, valueState, valueBeforeDecipherState, valueState])

    useEffect(() => {
        if (userInfo?.id) {
            setMaxCharacterCount(Math.floor(userInfo.balance / PRICE) > 200 ? Math.floor(userInfo.balance / PRICE) : 200)
        }
    }, [userInfo])

    return (
        <form id={'mainForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            <TextArea
                placeholder={`Вставьте или введите сюда текст, можно озвучить до '5 000' символов`}
                touched={touchedFields['input_text']}
                {...register('input_text', { required: true })}
            />
            <div className={style.form__control}>
                {children}
                <div className={style.form__control__block}>
                    <div className={style.form__control__wrapper}>
                        {characterCount > maxCharacterCount && (
                            <Image {...icon_warning} alt="Вы ввели более 5000 символов" />
                        )}
                        <p className={style.form__control__character}>
                            <span>Символов</span> {characterCount.toLocaleString('ru')}/{maxCharacterCount.toLocaleString('ru')}
                        </p>
                        <div className={style.form__control__delete}>
                            <Delete callback={() => setValue('input_text', '')}>
                                <p>Очистить</p>
                            </Delete>
                        </div>
                    </div>
                    <Button
                        type={isValid ? 'submit' : 'button'}
                        callback={buttonCallback}
                        isActive={canSubmit && Boolean(getValues('input_text'))}
                    >Озвучить</Button>
                </div>
            </div>
        </form>
    );
}
