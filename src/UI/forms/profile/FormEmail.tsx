'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowWidth } from "@react-hook/window-size";

import { SchemaProfileEmail } from "@/utils/config/yupShemes";
import { ProfileForm } from "@/utils/interface";

import Input from "@/UI/input";
import { ModalMessage } from "@/components/Modal";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'
import Button from "@/UI/button";

type Props = {
    stepState: 'none' | 'change email' | 'confirm code',
};

export const FormEmail = () => {

    const [step, setStep] = useState<Props['stepState']>('none')
    const [completeMessage, setCompleteMessage] = useState<string>()

    const windowWidth = typeof window !== undefined ? useWindowWidth() : 1920;

    const {
        register,
        formState: { errors, touchedFields, isValid },
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
        setStep('none')
        setCompleteMessage('Вы успешно изменили почту')
    }

    const sendCode = () => {
        setStep('confirm code')
    }

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <div className={style.form__block}>
                    <Input
                        placeholder='Почта'
                        type="email"
                        status="disable"
                        error={errors['email']?.message}
                        touched={touchedFields['email']}
                        {...register('email', { required: true })}
                    >
                        <Image onClick={() => step !== 'confirm code' ? setStep(step === 'none' ? 'change email' : 'none') : null} src={arrow_right} alt="change email" />
                    </Input>
                </div>
                {step !== 'none' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Новая почта'
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
                    </div>
                )}
                {step === 'change email' && windowWidth < 768 && (
                    <Button
                        isActive={touchedFields['new_email'] && !errors['new_email']?.message}
                        callback={() => sendCode()}
                    >Отправить код</Button>
                )}
                {step === 'confirm code' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Введите код из письма'
                            touched={touchedFields['confirm_email']}
                            error={errors['confirm_email']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('confirm_email', { required: false })}
                        />
                    </div>
                )}
                {step === 'confirm code' && windowWidth < 768 && (
                    <Button isActive={isValid} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage} />
        </div>
    )
}