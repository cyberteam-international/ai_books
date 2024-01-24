'use client'

import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";

import { useIsClient } from "@/utils/hooks";

import { CreateWorks } from "@utils/interface";
import { SchemaTextArea } from "@utils/config/yupShemes";
import { ContextUser } from "@/utils/context";
import { PRICE, ROUTES } from "@/utils/config";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";
import Delete from "@/UI/delete";

import icon_warning from '@public/warning.svg'

import style from './style.module.scss'

type Props = {
    submit: (data: {input_text: CreateWorks['input_text']}) => void
    canSubmit: boolean,
    handleEnoughBalance: ()=>void,
    handleRegistration: ()=>void
};

export default function FormMain({ submit, canSubmit, handleEnoughBalance, handleRegistration }: Props) {

    const [characterCount, setCharacterCount] = useState(0);

    const [userState, _setUserState] = useContext(ContextUser)

    const isCient = useIsClient()

    const [maxCharacterCount, setMaxCharacterCount] = useState(5000)

    const {
        register,
        formState: { touchedFields, isValid, errors, },
        handleSubmit,
        getValues,
        watch,
        setValue,
        trigger,
    } = useForm<{input_text: CreateWorks['input_text']}>({
        resolver: yupResolver(SchemaTextArea),
        mode: 'onBlur',
        context: { maxCharacterCount },
    });

    useEffect(() => {
        setCharacterCount(getValues('input_text')?.length || 0);
        if (getValues('input_text').length !== 0) {
            localStorage.setItem('textareaValue', getValues('input_text'))
        }
    }, [watch('input_text')]);

    useEffect(()=>{
        if (isCient && window.localStorage.getItem('textareaValue')){
            setValue('input_text', String(localStorage.getItem('textareaValue')))
            trigger('input_text')
        }
    }, [isCient])

    useEffect(()=>{
        if (userState?.id) {
            // setMaxCharacterCount(Math.floor(userState.balance / PRICE) > 200? Math.floor(userState.balance / PRICE) + 200 : 200)
            setMaxCharacterCount(5000)
        }
    }, [userState])

    const buttonCallback = () => {
        if(!isValid){
            if (!userState?.id) {
                return handleRegistration()
            }
            else{
                return handleEnoughBalance()
            }
        }
        else return undefined
    }

    return (
        <form id={'mainForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            <TextArea
                placeholder={'Вставьте или введите сюда текст, можно озвучить до 5 000 символов'}
                touched={touchedFields['input_text']}
                {...register('input_text', { required: true })}
            />
            <div className={style.form__control}>
                <div className={style.form__control__wrapper}>
                    {characterCount > maxCharacterCount && (
                        <Image {...icon_warning} alt="Вы ввели более 5000 символов" />
                    )}
                    <p className={style.form__control__character}>
                        <span>Символов</span> {characterCount.toLocaleString('ru')}/{maxCharacterCount.toLocaleString('ru')}
                    </p>
                    <div className={style.form__control__delete}>
                        <Delete callback={() => setValue('input_text', '')}>
                            <p>Очистить</p>
                        </Delete>
                    </div>
                </div>
                <Button 
                    type={isValid? 'submit' : 'button'} 
                    callback={buttonCallback} 
                    isActive={canSubmit && (characterCount < maxCharacterCount && Boolean(getValues('input_text')))}
                >Озвучить</Button>
            </div>
        </form>
    );
}
