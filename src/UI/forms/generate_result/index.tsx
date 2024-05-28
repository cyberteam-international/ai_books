'use client'

import {useForm} from "react-hook-form";
import {ReactNode, useContext, useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";

import {useIsClient} from "@/utils/hooks";

import {CreateWorks} from "@utils/interface";
import {SchemaTextArea} from "@utils/config/yupShemes";
import {ContextUser} from "@/utils/context";
import {PRICE} from "@/utils/config";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";

import style from './style.module.scss'

type Props = {
    submit: (data: { input_text: CreateWorks['input_text'] }) => void
    copyHandle: () => void
    canSubmit: boolean,
    handleEnoughBalance: () => void,
    handleRegistration: () => void,
    valueBeforeDecipherState: [string | undefined, (val: string) => void],
    valueState: [string | undefined, (val: string) => void],
    children?: ReactNode,
};

export default function FormGenerateResult({
                                               submit,
                                               copyHandle,
                                               canSubmit,
                                               handleEnoughBalance,
                                               handleRegistration,
                                               valueState,
                                               valueBeforeDecipherState,
                                               children
                                           }: Props) {

    const [characterCount, setCharacterCount] = useState(0);
    const [valueProps, setValueProps] = valueState

    const {userInfo} = useContext(ContextUser)

    const isClient = useIsClient()

    const [maxCharacterCount, setMaxCharacterCount] = useState(5000)

    const {
        register,
        formState: {touchedFields, isValid, errors,},
        handleSubmit,
        getValues,
        watch,
        setValue,
        trigger
    } = useForm<{ input_text: CreateWorks['input_text'] }>({
        resolver: yupResolver(SchemaTextArea),
        mode: 'onBlur',
        context: {maxCharacterCount},
    });

    const buttonCallback = () => {
        if (!isValid) {
            if (!userInfo?.id) {
                return handleRegistration()
            } else {
                return handleEnoughBalance()
            }
        } else return undefined
    }

    useEffect(() => {
        const currentValue = getValues('input_text')
        setCharacterCount(currentValue?.length || 0);
        if (currentValue.length > 0 && valueState) {
            if (userInfo?.id) {
                localStorage.setItem(`textareaGenerateResultValue_${userInfo?.id}`, currentValue)
            } else localStorage.setItem('textareaGenerateResult_default', currentValue)
        }
        setValueProps(currentValue)
    }, [watch('input_text'), userInfo]);

    useEffect(() => {
        if (valueProps) {
            setValue('input_text', valueProps, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
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
                placeholder={`Результат`}
                touched={touchedFields['input_text']}
                {...register('input_text', {required: true})}
            />
            <div className={style.form__control}>
                {children}
                <div className={style.form__control__block}>
                    <div className={style.form__control__wrapper}></div>
                    <div className={style.form__control__wrapper}>
                        <Button
                            type={'button'}
                            callback={copyHandle}
                            isActive={canSubmit && Boolean(getValues('input_text'))}
                        >Копировать</Button>
                        <Button
                            type={isValid ? 'submit' : 'button'}
                            callback={buttonCallback}
                            isActive={canSubmit && Boolean(getValues('input_text'))}
                        >Преобразовать в GIFT</Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
