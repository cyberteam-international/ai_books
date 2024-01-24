'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ENDPOINTS, ROUTES } from "@/utils/config";

import { SchemaResetPassword } from "@/utils/config/yupShemes";
import { ResetPasswordForm } from "@/utils/interface";

import Input from "@/UI/input";
import Button from "@/UI/button";

import style from './style.module.scss'

type Props = {};

export default function FormResetPassword({ }: Props) {

    const [fetchError, setFetchError] = useState<AxiosError<{ message: string }>>()
    const [step, setStep] = useState<number>(0)

    // const [passwordVisibleNew, setPasswordVisibleNew] = useState(false)
    // const [passwordVisibleConfirm, setPasswordVisibleConfirm] = useState(false)
    // const [visibleConfirm, setVisibleConfirm] = useState(false)

    // useEffect(()=>{
    //     console.log('passwordVisibleNew', passwordVisibleNew)
    //     console.log('passwordVisibleConfirm', passwordVisibleConfirm)
    // }, [passwordVisibleNew, passwordVisibleConfirm])

    const router = useRouter()

    const {
        register,
        formState: { errors, touchedFields, isValid },
        trigger,
        setValue,
        getValues,
        handleSubmit,
        reset,
    } = useForm<ResetPasswordForm>({
        resolver: yupResolver(SchemaResetPassword),
        mode: 'onBlur',
    });

    const sendEmail = (data: ResetPasswordForm) => {
        console.log(data)
        setStep(1)
        // ENDPOINTS.AUTH.SIGNUP(data)
        //     .then(res => {
        //         if (res.status === 204) {
        //             console.log('send code', data)
        //             setStep(1)
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err)
        //         setFetchError(err)
        //     })
    }

    const sendCode = (data: ResetPasswordForm) => {
        setStep(2)
        // ENDPOINTS.AUTH.SIGNUP(data)
        //     .then(res => {
        //         if (res.status === 204) {
        //             console.log('send code', data)
        //             setStep(1)
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err)
        //         setFetchError(err)
        //     })
    }

    const submit = (data: ResetPasswordForm) => {
        console.log(data)
        // ENDPOINTS.AUTH.SIGNUP_CONFIRM(data)
        // .then(res => {
        //     console.log('submit', data)
        //     ENDPOINTS.AUTH.LOGIN(data)
        //     .then((res: AxiosResponse<{ access_token: string }>) => {
        //         Cookies.set('token', res.data.access_token, { secure: true })
        //         ENDPOINTS.USERS.GET_iNFO(res.data.access_token)
        //             .then((resInfo: AxiosResponse<UserInfo>) => {
        //                 setUserState(resInfo.data)
        //                 if (!Cookies.get('is_admin') && resInfo.data.is_admin) {
        //                     Cookies.set('is_admin', resInfo.data.is_admin? '1' : '0')
        //                 }
        //                 console.log(Cookies.get('token'))
        //             })
        //             .catch((err: AxiosError<{ message: string }>) => {
        //                 setFetchError({...err, message: 'Ошибка сервера, попробуйте позже'})
        //             })
        //     }).catch(err => {
        //         setFetchError(err)
        //     })
        // }).catch(err => {
        //     console.error(err)
        //     setFetchError(err)
        // })
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
                        type={'text'}
                        error={errors['password']?.message}
                        touched={touchedFields['password']}
                        {...register('password')}
                    />
                    <Input
                        placeholder='Подтверждение пароля'
                        type={'text'}
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
                    <Link href={ROUTES.REGISTRATION}><Button>Регистрация</Button></Link>
                    <Link href={ROUTES.LOGIN}><Button>Авторизация</Button></Link>
                </div>
            )}
        </form>
    )
}
