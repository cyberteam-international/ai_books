'use client'

import {useForm} from "react-hook-form";
import {ReactNode, useContext, useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import Image from "next/image";

import {useIsClient} from "@/utils/hooks";

import {CreateWorks} from "@utils/interface";
import {SchemaTextArea} from "@utils/config/yupShemes";
import {ContextUser} from "@/utils/context";

import TextArea from "@/UI/textarea";
import Delete from "@/UI/delete";

import icon_warning from '@public/warning.svg'

import style from './style.module.scss'

type Props = {
    handleEnoughBalance: () => void,
    handleRegistration: () => void,
    valueBeforeDecipherState: [string | undefined, (val:string)=>void],
    valueState: [string | undefined, (val:string)=>void],
    children?: ReactNode,
};

export default function FormGenerate({ handleEnoughBalance, handleRegistration, valueState, valueBeforeDecipherState, children }: Props) {

    const [characterCount, setCharacterCount] = useState(0);
    const [valueProps, setValueProps] = valueState

    const { userInfo } = useContext(ContextUser)

    const isClient = useIsClient()

    const [maxCharacterCount, setMaxCharacterCount] = useState(15000)

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

    useEffect(() => {
        const currentValue = getValues('input_text')
        setCharacterCount(currentValue?.length || 0);
        if (currentValue.length > 0 && valueState) {
            if (userInfo?.id) {
                localStorage.setItem(`textareaGenerateValue_${userInfo?.id}`, currentValue)
            }
            else localStorage.setItem('textareaGenerateValue_default', currentValue)
        }
        setValueProps(currentValue)
    }, [watch('input_text'), userInfo]);

    useEffect(() => {
        if (valueProps) {
            setValue('input_text', valueProps, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
            trigger()
        }
    }, [isClient, userInfo, maxCharacterCount, valueState, valueBeforeDecipherState, valueState])

    return (
        <form id={'mainForm'} className={style.form}>
            <TextArea
                placeholder={`Вставьте или введите сюда текст`}
                touched={touchedFields['input_text']}
                {...register('input_text', { required: true })}
            />
            <div className={style.form__control}>
                {children}
                <div className={style.form__control__block}>
                    <div className={style.form__control__wrapper}>
                        {characterCount > maxCharacterCount && (
                            <Image {...icon_warning} alt="Вы ввели более 15000 символов" />
                        )}
                        <p className={style.form__control__character}>
                            <span>Символов</span> {characterCount.toLocaleString('ru')}/15000
                        </p>
                        <div className={style.form__control__delete}>
                            <Delete callback={() => setValue('input_text', '')}>
                                <p>Очистить</p>
                            </Delete>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
