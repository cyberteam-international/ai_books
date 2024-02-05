'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowWidth } from "@react-hook/window-size";

import { SchemaProfilePassword } from "@/utils/config/yupShemes";
import { ProfileForm } from "@/utils/interface";
import { useIsClient } from "@/utils/hooks";
import { ENDPOINTS, ROUTES } from "@/utils/config";

import { ModalMessage } from "@/components/Modal";
import Input from "@/UI/input";
import Button from "@/UI/button";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'
import { AxiosError } from "axios";
import Link from "next/link";

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
        getFieldState,
    } = useForm<ProfileForm['FormPassword']>({
        resolver: yupResolver(SchemaProfilePassword),
        mode: 'all',
    });

    const submit = (data: ProfileForm['FormPassword']) => {
        setCompleteMessage(undefined)
        ENDPOINTS.USERS.UPDATE_INFO(data)
        .then(res=>{
            if (res.status === 204) {
                setStep('new password');
                reset()
                setCompleteMessage(`Пароль успешно изменен на ${data.password}`)
            }
        }).catch((err: AxiosError<{message: string, key: string, statusCode: number}>)=>{
            if (err.response?.status === 400) {
                // setError('old_password', {message: err.response.data.message})
                setError('old_password', {message: "Неверный пароль"})
            }
            console.log(err)
        })       
    }

    useEffect(()=>{
        const password = getFieldState('password')
        const confirmPassword = getFieldState('confirm_password')
        const oldPassword = getFieldState('old_password')
        if (password.isDirty && !password.invalid && !confirmPassword.isDirty && !oldPassword.isDirty) {
            setStep('confirm password')
        }

        if (confirmPassword.isDirty && !confirmPassword.invalid && !oldPassword.isDirty) {
            setStep('old password')
        }
    }, [getFieldState('password'), getFieldState('confirm_password'), getFieldState('old_password')])

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <div className={style.form__block}>
                    <Input
                        placeholder='Новый пароль'
                        type="password"
                        touched={!getFieldState('password').invalid && getFieldState('password').isDirty}
                        error={errors['password']?.message}
                        {...register('password', { required: true, onChange: ()=> touchedFields['confirm_password']? trigger('confirm_password') : null })}
                    >
                        {/* {!errors['password']?.message && (
                            <Image onClick={() => {trigger('password'); setStep(step === 'new password' ? 'confirm password' : 'new password')}} src={arrow_right} alt="new password" />
                        )} */}
                    </Input>
                </div>
                {step !== 'new password' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Повторите новый пароль'
                            type="password"
                            touched={!getFieldState('confirm_password').invalid && getFieldState('confirm_password').isDirty}
                            error={errors['confirm_password']?.message}
                            {...register('confirm_password', { required: true })}
                        >
                            {/* {!errors['confirm_password']?.message && (
                                <Image onClick={() => {trigger('confirm_password'); setStep(step === 'confirm password' ? 'old password' : 'confirm password'); trigger('password')}} src={arrow_right} alt="change password" />
                            )} */}
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
                            touched={!getFieldState('old_password').invalid && getFieldState('old_password').isDirty}
                            error={errors['old_password']?.message}
                            // onSubmit={handleSubmit(submit)}
                            {...register('old_password', { required: true, onChange: ()=> trigger('password') })}
                        >
                        </Input>
                        <Link className={style.form__fogot} href={ROUTES.RESET_PASSWORD}>Забыли пароль?</Link>
                    </div>
                )}
                {/* {step === 'old password' && isClient && windowWidth < 768 && ( */}
                {step === 'old password' && (
                    <Button isActive={isValid} className={style.form__wrapper__button} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage} />
        </div>
    )
}