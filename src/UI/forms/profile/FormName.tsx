'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SchemaProfileName } from "@utils/config/yupShemes";
import { ProfileForm } from "@utils/interface";

import Input from "@/UI/input";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    stepState: 'none' | 'change name',
};

export const FormName = () => {

    const [step, setStep] = useState<Props['stepState']>('none');

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<ProfileForm['FormName']>({
        resolver: yupResolver(SchemaProfileName),
        mode: 'all',
        defaultValues: {
            name: 'Александр',
        },
    });

    const submit = (data: ProfileForm['FormName']) => {
        console.log(data);
    };

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <Input
                    placeholder='Имя'
                    status="disable"
                    touched={touchedFields['name']}
                    error={errors['name']?.message}
                    {...register('name', { required: true })}
                >
                    <Image onClick={() => setStep(step === 'none' ? 'change name' : 'none')} {...arrow_right} alt="change name" />
                </Input>
                {step === 'change name' && (
                    <Input
                        placeholder='Новое имя'
                        touched={touchedFields['new_name']}
                        error={errors['new_name']?.message}
                        onSubmit={handleSubmit(submit)}
                        {...register('new_name', { required: true })}
                    />
                )}
            </form>
        </div>
    );
}
