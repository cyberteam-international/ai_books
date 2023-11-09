'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SchemaProfileEmail } from "@/utils/config/yupShemes";
import { ProfileForm } from "@/utils/interface";

import Input from "@/UI/input";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    stepState: 'none' | 'change email' | 'confirm code',
};

export const FormEmail = () => {

    const [step, setStep] = useState<Props['stepState']>('none')

    const {
        register,
        formState: { errors, touchedFields },
        handleSubmit,
    } = useForm<ProfileForm['FormEmail']>({
        resolver: yupResolver(SchemaProfileEmail),
        mode: 'all',
        defaultValues: {
            email: 'donsky@email.com',
        },
    });
    
    const submit = (data: ProfileForm['FormEmail']) => {
        console.log(data)
    }

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <Input
                    label='Почта'
                    type="email"
                    status="disable"
                    error={errors['email']?.message}
                    touched={touchedFields['email']}
                    {...register('email', { required: true })}
                >
                    <Image onClick={() => step !== 'confirm code' ? setStep(step === 'none' ? 'change email' : 'none') : null} src={arrow_right} alt="change email" />
                </Input>
                {step !== 'none' && (
                    <Input
                        label='Новая почта'
                        type="email"
                        touched={touchedFields['new_email']}
                        error={errors['new_email']?.message}
                        onSubmit={handleSubmit(submit)}
                        {...register('new_email', { required: false })}
                    >
                        {touchedFields['new_email'] && !errors['new_email']?.message && (
                            <Image onClick={() => setStep(step === 'change email' ? 'confirm code' : 'change email')} src={arrow_right} alt="change email" />
                        )}
                    </Input>
                )}
                {step === 'confirm code' && (
                    <Input
                        label='Введите код из письма'
                        touched={touchedFields['email']}
                        error={errors['confirm_email']?.message}
                        onSubmit={handleSubmit(submit)}
                        {...register('confirm_email', { required: false })}
                    />
                )}
            </form>
        </div>
    )
}