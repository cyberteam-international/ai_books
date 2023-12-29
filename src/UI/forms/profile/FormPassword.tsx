'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowWidth } from "@react-hook/window-size";

import { SchemaProfilePassword } from "@/utils/config/yupShemes";
import { ProfileForm } from "@/utils/interface";
import { useIsClient } from "@/utils/hooks";
import { ENDPOINTS } from "@/utils/config";

import { ModalMessage } from "@/components/Modal";
import Input from "@/UI/input";
import Button from "@/UI/button";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'
import { AxiosError } from "axios";

type Props = {
    stepState: 'new password' | 'old password' | 'confirm password',
};

export const FormPassword = () => {

    const [step, setStep] = useState<Props['stepState']>('new password')
    const [completeMessage, setCompleteMessage] = useState<string>()

    const isClient = useIsClient()

    const windowWidth = useWindowWidth();

    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
        reset,
        setError,
        trigger,
    } = useForm<ProfileForm['FormPassword']>({
        resolver: yupResolver(SchemaProfilePassword),
        mode: 'onBlur',
    });

    const submit = (data: ProfileForm['FormPassword']) => {
        setCompleteMessage(undefined)
        ENDPOINTS.USERS.UPDATE_INFO(data)
        .then(res=>{
            if (res.status === 204) {
                reset()
                setStep('new password');
                setCompleteMessage(`Пароль успешно изменен на ${data.password}`)
            }
        }).catch((err: AxiosError<{message: string, key: string, statusCode: number}>)=>{
            if (err.response?.status === 400) {
                setError('old_password', {message: err.response.data.message})
            }
            console.log(err)
        })       
    }

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <div className={style.form__block}>
                    <Input
                        placeholder='Новый пароль'
                        type="password"
                        touched={touchedFields['password']}
                        error={errors['password']?.message}
                        onSubmit={handleSubmit(submit)}
                        {...register('password', { required: true, onBlur: ()=> touchedFields['confirm_password']? trigger('confirm_password') : null })}
                    >
                        {touchedFields['password'] && !errors['password']?.message && (
                            <Image onClick={() => setStep(step === 'new password' ? 'confirm password' : 'new password')} src={arrow_right} alt="new password" />
                        )}
                    </Input>
                </div>
                {step !== 'new password' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Повторите новый пароль'
                            type="password"
                            touched={touchedFields['confirm_password']}
                            error={errors['confirm_password']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('confirm_password', { required: true })}
                        >
                            {touchedFields['confirm_password'] && !errors['confirm_password']?.message && (
                                <Image onClick={() => {setStep(step === 'confirm password' ? 'old password' : 'confirm password'); trigger('password')}} src={arrow_right} alt="change password" />
                            )}
                        </Input>
                    </div>
                )}
                {step === 'confirm password' && isClient && windowWidth < 768 && (
                    <Button 
                        isActive={Boolean(touchedFields['confirm_password']) && !errors['confirm_password']?.message} 
                        callback={() => setStep('old password')}
                    >Подтвердить пароль</Button>
                )}
                {step === 'old password' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Текущий пароль'
                            type="password"
                            touched={touchedFields['old_password']}
                            error={errors['old_password']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('old_password', { required: true, onBlur: ()=> trigger('password') })}
                        >
                            
                        </Input>
                    </div>
                )}
                {step === 'old password' && isClient && windowWidth < 768 && (
                    <Button isActive={isValid} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage} />
        </div>
    )
}