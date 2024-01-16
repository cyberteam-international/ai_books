'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

import { ENDPOINTS, ROUTES } from "@utils/config";
import { ContextUser } from "@utils/context";

import { SchemaLogin } from "@utils/config/yupShemes";
import { LoginForm, UserInfo } from "@utils/interface";

import Input from "@UI/input";
import Button from "@UI/button";

import style from './style.module.scss'

type Props = {};

export default function FormLogin({ }: Props) {

    const [fetchError, setFetchError] = useState<string>()

    const [userState, setUserState] = useContext(ContextUser)

    const router = useRouter()
    
    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
    } = useForm<LoginForm>({
        resolver: yupResolver(SchemaLogin),
        mode: 'onBlur',
    });

    const submit = (data: LoginForm) => {
        ENDPOINTS.AUTH.LOGIN(data)
        .then((res: AxiosResponse<{access_token: string}>) => {
            Cookies.set('token', res.data.access_token, { secure: true })
            ENDPOINTS.USERS.GET_iNFO(res.data.access_token)
            .then((resInfo: AxiosResponse<UserInfo>)=>{
                setUserState(resInfo.data)
                console.log(Cookies.get('token'))
            })
            .catch((err: AxiosError)=>{
                setFetchError('Ошибка сервера, попробуйте позже')
            })
        })
        .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
                setFetchError('Неправильный логин или пароль')
            }
            else setFetchError('Ошибка сервера, попробуйте позже')
        })
    }

    useEffect(()=> {console.log(fetchError)}, [fetchError])

    useEffect(()=> {
        if (userState) {
            router.push(ROUTES.WORK);
        }
    }, [userState])

    return (
        <form className={style.form} onSubmit={handleSubmit(submit)}>
            <Input
                placeholder='E-mail'
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
            <Button isActive={isValid} type="submit">Войти</Button>
            {fetchError && <p className={style.form__error}>{fetchError}</p>}
            <p className={style.form__description}>Нажимая на кнопку “Войти”, Вы подтверждаете свое согласие с <Link href={ROUTES.POLICY}>Правилами использования сервиса и Политикой конфиденциальности</Link></p>
        </form>
    )
}
