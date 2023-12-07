'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowWidth } from "@react-hook/window-size";

import { SchemaProfileName } from "@utils/config/yupShemes";
import { ProfileForm } from "@utils/interface";

import Input from "@/UI/input";
import { ModalMessage } from "@/components/Modal";
import Button from "@/UI/button";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    stepState: 'none' | 'change name',
};

export const FormName = () => {

    const [step, setStep] = useState<Props['stepState']>('none');
    const [completeMessage, setCompleteMessage] = useState<string>()

    const windowWidth = typeof window !== undefined? useWindowWidth() : 1920;

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
    } = useForm<ProfileForm['FormName']>({
        resolver: yupResolver(SchemaProfileName),
        mode: 'all',
        defaultValues: {
            name: 'Александр',
        },
    });

    const submit = (data: ProfileForm['FormName']) => {
        console.log(data);
        setStep('none');
        setCompleteMessage(`Ваше имя изменено на ${data.new_name}`)
    };

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <div className={style.form__block}>
                    <Input
                        placeholder='Имя'
                        status="disable"
                        touched={touchedFields['name']}
                        error={errors['name']?.message}
                        {...register('name', { required: true })}
                    >
                        <Image onClick={() => setStep(step === 'none' ? 'change name' : 'none')} {...arrow_right} alt="change name" />
                    </Input>
                </div>
                {step === 'change name' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Новое имя'
                            touched={touchedFields['new_name']}
                            error={errors['new_name']?.message}
                            onSubmit={handleSubmit(submit)}
                            {...register('new_name', { required: true })}
                        />
                    </div>
                )}
                {step === 'change name' && windowWidth < 768 && (
                    <Button isActive={isValid} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage}/>
        </div>
    );
}
