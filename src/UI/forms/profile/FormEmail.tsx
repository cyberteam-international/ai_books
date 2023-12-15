'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowWidth } from "@react-hook/window-size";

import { SchemaProfileEmail } from "@/utils/config/yupShemes";
import { ProfileForm } from "@/utils/interface";
import { useIsClient } from "@/utils/hooks";
import { ContextUser } from "@/utils/context";

import Input from "@/UI/input";
import Button from "@/UI/button";
import { ModalMessage } from "@/components/Modal";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'
import { ENDPOINTS } from "@/utils/config";
import axios from "axios";

type Props = {
    stepState: 'none' | 'change email' | 'confirm code',
};

export const FormEmail = () => {

    const [step, setStep] = useState<Props['stepState']>('none')
    const [completeMessage, setCompleteMessage] = useState<string>()
    const [userState, setUserState] = useContext(ContextUser)

    const windowWidth = useWindowWidth();

    const isClient = useIsClient()

    const {
        register,
        formState: { errors, touchedFields, isValid },
        reset,
        setValue,
        getValues,
        handleSubmit,
    } = useForm<ProfileForm['FormEmail']>({
        resolver: yupResolver(SchemaProfileEmail),
        mode: 'all',
        defaultValues: {
            email: userState?.email,
        },
    });

    const submit = (data: ProfileForm['FormEmail']) => {
        axios({
            ...ENDPOINTS.USERS.UPDATE_EMAIL_CONFIRM,
            data: data,
        }).then(res=>{
            setStep('none')
            reset()
            setCompleteMessage('Вы успешно изменили почту')
            if (userState) {
                setUserState({...userState, email: data.email})
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        if (userState?.name) {
            setValue('old_email', userState?.email)
        }
    }, [userState])

    const sendCode = () => {
        axios({
            ...ENDPOINTS.USERS.UPDATE_EMAIL,
            data: {"email": getValues('email')},
        }).then(res=>{
            console.log(res)
            setStep('confirm code')
            setCompleteMessage(`На адрес ${getValues('email')} выслано письмо подтверждения`)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <div className={style.form__block}>
                    <Input
                        placeholder='Почта'
                        type="email"
                        status="disable"
                        error={errors['old_email']?.message}
                        touched={touchedFields['old_email']}
                        {...register('old_email', { required: true })}
                    >
                        <Image onClick={() => step !== 'confirm code' ? setStep(step === 'none' ? 'change email' : 'none') : null} src={arrow_right} alt="change email" />
                    </Input>
                </div>
                {step !== 'none' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Новая почта'
                            type="email"
                            touched={touchedFields['email']}
                            error={errors['email']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('email', { required: false })}
                        >
                            {touchedFields['email'] && !errors['email']?.message && (
                                <Image onClick={() => sendCode()} src={arrow_right} alt="change email" />
                            )}
                        </Input>
                    </div>
                )}
                {step === 'change email' && isClient && windowWidth < 768 && (
                    <Button
                        isActive={Boolean(touchedFields['email']) && !errors['email']?.message}
                        callback={() => sendCode()}
                    >Отправить код</Button>
                )}
                {step === 'confirm code' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Введите код из письма'
                            touched={touchedFields['code']}
                            error={errors['code']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('code', { required: false })}
                        />
                    </div>
                )}
                {step === 'confirm code' && isClient && windowWidth < 768 && (
                    <Button isActive={isValid} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage} />
        </div>
    )
}