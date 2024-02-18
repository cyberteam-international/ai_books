'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowWidth } from "@react-hook/window-size";

import { SchemaProfileName } from "@utils/config/yupShemes";
import { ProfileForm } from "@utils/interface";
import { useIsClient } from "@/utils/hooks";
import { ContextUser } from "@/utils/context";
import { ENDPOINTS } from "@/utils/config";

import Input from "@/UI/input";
import { ModalMessage } from "@/components/Modal";
import Button from "@/UI/button";

import arrow_right from '@public/arrow_right.svg'

import style from './style.module.scss'

type Props = {
    
};

type Steps = 'none' | 'change name'

export const FormName = ({}: Props) => {

    const [step, setStep] = useState<Steps>('none');
    const [completeMessage, setCompleteMessage] = useState<string>()

    const isClient = useIsClient()

    const { userInfo, mutate } = useContext(ContextUser)

    const windowWidth = useWindowWidth();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, touchedFields, isValid },
    } = useForm<ProfileForm['FormName']>({
        resolver: yupResolver(SchemaProfileName),
        mode: 'all',
        defaultValues: {
            name: userInfo?.name,
        },
    });

    const submit = (data: ProfileForm['FormName']) => {
        setCompleteMessage('')
        ENDPOINTS.USERS.UPDATE_INFO(data)
        .then(res=>{
            console.log(res)
            mutate()
            .then((res)=>{
                reset()
                setStep('none')
                setCompleteMessage(`Ваше имя изменено на ${data.name}`)
                if (res) {
                    setValue('old_name', res.name)
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    };

    useEffect(()=>{
        if (userInfo?.name) {
            setValue('old_name', userInfo?.name)
        }
    }, [userInfo])

    return (
        <div className={style.form}>
            <form className={style.form__wrapper} onSubmit={handleSubmit(submit)}>
                <div className={style.form__block}>
                    <Input
                        placeholder='Имя'
                        status="disable"
                        touched={touchedFields['old_name']}
                        error={errors['old_name']?.message}
                        {...register('old_name', { required: true })}
                    >
                        <Image onClick={() => setStep(step === 'none' ? 'change name' : 'none')} {...arrow_right} alt="change name" />
                    </Input>
                </div>
                {step === 'change name' && (
                    <div className={style.form__block}>
                        <Input
                            placeholder='Новое имя'
                            touched={touchedFields['name']}
                            error={errors['name']?.message}
                            // onSubmit={handleSubmit(submit)}
                            {...register('name', { required: true })}
                        />
                    </div>
                )}
                {/* {step === 'change name' && isClient && windowWidth < 768 && ( */}
                {step === 'change name' && (
                    <Button isActive={isValid} className={style.form__wrapper__button} type="submit">Применить изменения</Button>
                )}
            </form>
            <ModalMessage message={completeMessage} setMesage={setCompleteMessage}/>
        </div>
    );
}
