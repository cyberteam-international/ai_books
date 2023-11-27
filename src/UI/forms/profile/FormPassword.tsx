'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SchemaProfilePassword } from "@/utils/config/yupShemes";
import { ProfileForm } from "@/utils/interface";

import Input from "@/UI/input";
import { ModalMessage } from "@/components/Modal";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    stepState: 'none' | 'change password' | 'confirm password',
};

export const FormPassword = () => {

    const [step, setStep] = useState<Props['stepState']>('none')
    const [completeMessage, setCompleteMessage] = useState<string>()

    const {
        register,
        formState: { errors, touchedFields },
        handleSubmit,
    } = useForm<ProfileForm['FormPassword']>({
        resolver: yupResolver(SchemaProfilePassword),
        mode: 'all',
        defaultValues: {
            password: 'Password000111',
        },
    });
    
    const submit = (data: ProfileForm['FormPassword']) => {
        console.log(data)
        setStep('none')
        setCompleteMessage('Пароль успешно изменен')
    }

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <Input
                    placeholder='Пароль'
                    type="password"
                    status="disable"
                    error={errors['password']?.message}
                    touched={touchedFields['password']}
                    {...register('password', { required: true })}
                >
                    <Image onClick={() => step !== 'confirm password' ? setStep(step === 'none' ? 'change password' : 'none') : null} src={arrow_right} alt="change password" />
                </Input>
                {step !== 'none' && (
                    <Input
                        placeholder='Новый пароль'
                        type="password"
                        touched={touchedFields['new_password']}
                        error={errors['new_password']?.message}
                        onSubmit={handleSubmit(submit)}
                        {...register('new_password', { required: false })}
                    >
                        {touchedFields['new_password'] && !errors['new_password']?.message && (
                            <Image onClick={() => setStep(step === 'change password' ? 'confirm password' : 'change password')} src={arrow_right} alt="change password" />
                        )}
                    </Input>
                )}
                {step === 'confirm password' && (
                    <Input
                        placeholder='Повторите пароль'
                        type="password"
                        touched={touchedFields['confirm_password']}
                        error={errors['confirm_password']?.message}
                        onSubmit={handleSubmit(submit)}
                        {...register('confirm_password', { required: false })}
                    />
                )}
            </form>
            <ModalMessage message={completeMessage}/>
        </div>
    )
}