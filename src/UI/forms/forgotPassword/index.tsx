'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ENDPOINTS, ROUTES } from "@/utils/config";

import { SchemaFogotPassword } from "@/utils/config/yupShemes";
import { FogotPasswordForm } from "@/utils/interface";

import Input from "@/UI/input";
import Button from "@/UI/button";

import style from './style.module.scss'

type Props = {};

export default function FormForgotPassword({ }: Props) {

    const [fetchError, setFetchError] = useState<AxiosError<{ message: string }>>()
    const [step, setStep] = useState<number>(0)

    const router = useRouter()

    const {
        register,
        formState: { errors, touchedFields, isValid },
        trigger,
        setValue,
        getValues,
        handleSubmit,
        reset,
    } = useForm<FogotPasswordForm>({
        resolver: yupResolver(SchemaFogotPassword),
        mode: 'onBlur',
    });

    const sendEmail = (data: FogotPasswordForm) => {
        console.log(data)
        ENDPOINTS.AUTH.FORGOT_PASSWORD(data)
            .then(res => {
                if (res.status === 204) {
                    console.log('send code', data)
                    setStep(1)
                }
            })
            .catch(err => {
                console.error(err)
                setFetchError({...err, response: { data: { message: 'Аккаунт с указаной почтной не найден' } }})
            })
    }

    const sendCode = () => {
        setStep(2)
        setFetchError(undefined)
    }

    const submit = (data: FogotPasswordForm) => {
        console.log(data)
        ENDPOINTS.AUTH.FORGOT_PASSWORD_CONFIRM(data)
            .then(res => {
                router.push(ROUTES.LOGIN)
            })
            .catch(err => {
                console.error(err)
                setStep(1)
                setFetchError({...err, response: { data: { message: 'Неверный код подтверждения' } }})
            })
    }

    return (
        <form className={style.form} onSubmit={step === 0? handleSubmit(sendEmail) : step === 1? handleSubmit(sendCode) : handleSubmit(submit)}>
            {step === 0 && (
                <>
                    <p className={style.form__description__code}>Введите адрес электронной почты аккаунта</p>
                    <Input
                        placeholder='E-mail'
                        type="email"
                        error={errors['email']?.message}
                        touched={touchedFields['email']}
                        {...register('email', { required: true })}
                    />
                </>
            )}
            {step === 1 && (
                <>
                    <p className={style.form__description__code}>Введите код, отправленый на адрес {getValues('email')}</p>
                    <Input
                        placeholder='Код подтверждения'
                        error={errors['code']?.message}
                        touched={touchedFields['code']}
                        {...register('code', {onChange(event) { setValue('code', event.target.value.trim()); trigger() } })}
                    />
                </>
            )}
            {step === 2 && (
                <>
                    <Input  
                        placeholder='Новый пароль'
                        type={'password'}
                        error={errors['password']?.message}
                        touched={touchedFields['password']}
                        {...register('password')}
                    />
                    <Input
                        placeholder='Подтверждение пароля'
                        type={'password'}
                        error={errors['confirm_password']?.message}
                        touched={touchedFields['confirm_password']}
                        {...register('confirm_password')}
                    />
                </>
            )}
            <Button isActive={isValid} type='submit'>{step !== 2 ? 'Отправить' : 'Изменить пароль'}</Button>
            {fetchError && <p className={style.form__error}>{fetchError.response?.data.message}</p>}
            {step === 0 && (
                <div className={style.form__links}>
                    <Link href={ROUTES.REGISTRATION}>Регистрация</Link>
                    <Link href={ROUTES.LOGIN}>Авторизация</Link>
                </div>
            )}
        </form>
    )
}
