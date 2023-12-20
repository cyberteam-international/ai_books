'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { ENDPOINTS, ROUTES } from "@/utils/config";

import { SchemaRegistration } from "@/utils/config/yupShemes";
import { RegistrationForm } from "@/utils/interface";

import Input from "@/UI/input";
import Button from "@/UI/button";

import style from './style.module.scss'

type Props = {};

export default function FormRegistration({ }: Props) {

    const [fetchError, setFetchError] = useState<AxiosError<{message: string}>>()
    
    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
        reset,
    } = useForm<RegistrationForm>({
        resolver: yupResolver(SchemaRegistration),
        mode: 'all',
    });

    const submit = (data: RegistrationForm) => {
        axios({
           ...ENDPOINTS.AUTH.SIGNUP,
           data: data
        }).then(res => {
            axios({
                ...ENDPOINTS.AUTH.LOGIN,
                data: data
            }).then((res: AxiosResponse<{access_token: string}>) => {
                Cookies.set('token', res.data.access_token, {secure: true})
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
        <form className={style.form} onSubmit={handleSubmit(submit)}>
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
            <Button isActive={isValid} type="submit">Создать аккаунт</Button>
            {fetchError && <p className={style.form__error}>{fetchError.response?.data.message}</p>}
            <p className={style.form__description}>Нажимая на кнопку ”Создать аккаунт”, Вы подтверждаете свое согласие с <Link href={ROUTES.POLICY}>Правилами использования сервиса и Политикой конфиденциальности</Link></p>
        </form>
    )
}
