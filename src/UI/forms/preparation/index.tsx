'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ContextUser } from "@/utils/context";
import { useIsClient } from "@/utils/hooks";
import { SchemaPreparationGPT } from "@/utils/config/yupShemes";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";
import Delete from "@/UI/delete";

import style from './style.module.scss'
import { DecipherMode } from "@/app/preparation/page";
import { PreparationGPTForm } from "@/utils/interface/Forms";

type Props = {
    submit: (data: PreparationGPTForm) => void,
    setDecipherMode: (mode: DecipherMode)=>void,
    preparationResult?: string
};

export default function FormPreparationGPT({ submit, setDecipherMode, preparationResult }: Props) {

    const { userInfo } = useContext(ContextUser)

    const isCient = useIsClient()

    const {
        register,
        formState: { touchedFields, isValid, errors, },
        handleSubmit,
        getValues,
        watch,
        setValue,
        trigger
    } = useForm<PreparationGPTForm>({
        resolver: yupResolver(SchemaPreparationGPT),
        mode: 'onBlur',
    });

    const buttonHover = (mode: DecipherMode) => {
        return setDecipherMode(mode)
    }

    useEffect(() => {
        if (getValues('input_text').length !== 0) {
            if (userInfo?.id) {
                localStorage.setItem(`preparationGPTValue_${userInfo?.id}`, getValues('input_text'))
            }
            else localStorage.setItem('preparationGPTValue_default', getValues('input_text'))
        }
    }, [watch('input_text'), userInfo]);

    useEffect(()=>{
        if (isCient){
            if (userInfo?.id) {
                if (window.localStorage.getItem(`preparationGPTValue_${userInfo?.id}`)) {
                    setValue('input_text', String(localStorage.getItem(`preparationGPTValue_${userInfo?.id}`)), {shouldDirty: true, shouldTouch: true, shouldValidate: true})
                }
            }
            else if (window.localStorage.getItem(`preparationGPTValue_default`)) {
                setValue('input_text', String(localStorage.getItem('preparationGPTValue_default')), {shouldDirty: true, shouldTouch: true, shouldValidate: true})
            }
            trigger()
        }
    }, [isCient, userInfo])

    return (
        <form id={'mainForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            {/* <div className={style.form__wrapper}>
                <TextArea
                    placeholder={'Вставьте или введите сюда текст для подготовки'}
                    touched={touchedFields['input_text']}
                    {...register('input_text', { required: true })}
                />
                <TextArea
                    name='preparationResult'
                    placeholder='Результат подготовки'
                    value={preparationResult}
                    touched
                />
            </div> */}
            <TextArea
                placeholder={'Вставьте или введите сюда текст для подготовки'}
                touched={touchedFields['input_text']}
                {...register('input_text', { required: true })}
            />
            <div className={style.form__control}>
                <div className={style.form__control__wrapper}>
                    <div className={style.form__control__delete}>
                        <Delete callback={() => setValue('input_text', '')}>
                            <p>Очистить</p>
                        </Delete>
                    </div>
                </div>
                <div className={style.form__control__buttons}>
                    <Button
                        type={'submit'}
                        onMouseEnter={()=>buttonHover('numbers')}
                        isActive={Boolean(getValues('input_text'))}
                    >Расшифровать числительные</Button>
                    <Button
                        type={'submit'}
                        onMouseEnter={()=>buttonHover('abbreviations')}
                        isActive={Boolean(getValues('input_text'))}
                    >Расшифровать сокращения</Button>
                </div>
            </div>
        </form>
    );
}
