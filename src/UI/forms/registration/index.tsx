'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { ENDPOINTS, ROUTES } from "@/utils/config";

import { SchemaRegistration } from "@/utils/config/yupShemes";
import { RegistrationForm } from "@/utils/interface";

import Input from "@/UI/input";
import Button from "@/UI/button";

import style from './style.module.scss'

type Props = {};

export default function FormRegistration({ }: Props) {

    const [fetchError, setFetchError] = useState<AxiosError<{ message: string }>>()
    const [step, setStep] = useState<number>(0)

    const {
        register,
        formState: { errors, touchedFields, isValid },
        getValues,
        handleSubmit,
        reset,
    } = useForm<RegistrationForm>({
        resolver: yupResolver(SchemaRegistration),
        mode: 'all',
    });

    const sendCode = (data: RegistrationForm) => {
        ENDPOINTS.AUTH.SIGNUP(data)
            .then(res => {
                if(res.status === 204){
                    console.log('send code', data)
                    setStep(1)
                }
            })
            .catch(err => {
                console.error(err)
                setFetchError(err)
            })
    }

    const submit = (data: RegistrationForm) => {
        ENDPOINTS.AUTH.SIGNUP_CONFIRM(data)
            .then(res => {
                console.log('submit', data)
                ENDPOINTS.AUTH.LOGIN(data)
                    .then((res: AxiosResponse<{ access_token: string }>) => {
                        Cookies.set('token', res.data.access_token, { secure: true })
                        window.location.href = ROUTES.WORK;
                    }).catch(err => {
                        setFetchError(err)
                    })
                reset()
            }).catch(err => {
                console.error(err)
                setFetchError(err)
            })
    }

    return (
        <form className={style.form} onSubmit={step === 0? handleSubmit(sendCode) : handleSubmit(submit)}>
            {step === 0 && (
                <>
                    <Input
                        placeholder='Имя'
                        error={errors['name']?.message}
                        touched={touchedFields['name']}
                        {...register('name', { required: true })}
                    />
                    <Input
                        placeholder='E-mail'
                        type="email"
                        error={errors['email']?.message}
                        touched={touchedFields['email']}
                        {...register('email', { required: true })}
                    />
                    <Input
                        placeholder='Пароль'
                        type="password"
                        error={errors['password']?.message}
                        touched={touchedFields['password']}
                        {...register('password', { required: true })}
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
                        {...register('code', { required: true })}
                    />
                </>
            )}
            <Button isActive={isValid} type='submit'>{step === 0? 'Создать аккаунт' : 'Отправить'}</Button>
            {fetchError && <p className={style.form__error}>{fetchError.response?.data.message}</p>}
            {step === 0 && <p className={style.form__description}>Нажимая на кнопку ”Создать аккаунт”, Вы подтверждаете свое согласие с <Link href={ROUTES.POLICY}>Правилами использования сервиса и Политикой конфиденциальности</Link></p>}
        </form>
    )
}
