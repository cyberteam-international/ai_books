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

type Props = {
    stepState: 'change password' | 'confirm password',
};

export const FormPassword = () => {

    const [step, setStep] = useState<Props['stepState']>('change password')
    const [completeMessage, setCompleteMessage] = useState<string>()

    const isClient = useIsClient()

    const windowWidth = useWindowWidth();

    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
        reset,
    } = useForm<ProfileForm['FormPassword']>({
        resolver: yupResolver(SchemaProfilePassword),
        mode: 'all',
    });

    const submit = (data: ProfileForm['FormPassword']) => {
        setCompleteMessage(undefined) // Если обновляется тот же самый пароль, т.к. на фронте мы не можем проверить
        ENDPOINTS.USERS.UPDATE_INFO(data)
        .then(res=>{
            if (res.status === 204) {
                reset()
                setStep('change password');
                setCompleteMessage(`Пароль успешно изменен на ${data.password}`)
            }
        }).catch(err=>{
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
                        {...register('password', { required: false })}
                    >
                        {touchedFields['password'] && !errors['password']?.message && (
                            <Image onClick={() => setStep(step === 'change password' ? 'confirm password' : 'change password')} src={arrow_right} alt="change password" />
                        )}
                    </Input>
                </div>
                {step === 'change password' && isClient && windowWidth < 768 && (
                    <Button 
                        isActive={Boolean(touchedFields['password']) && !errors['password']?.message} 
                        callback={() => setStep('confirm password')}
                    >Изменить пароль</Button>
                )}
                {step === 'confirm password' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Повторите пароль'
                            type="password"
                            touched={touchedFields['confirm_password']}
                            error={errors['confirm_password']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('confirm_password', { required: false })}
                        />
                    </div>
                )}
                {step === 'confirm password' && isClient && windowWidth < 768 && (
                    <Button isActive={isValid} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage} />
        </div>
    )
}