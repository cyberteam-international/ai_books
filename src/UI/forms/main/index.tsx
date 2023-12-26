import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { CreateWorks } from "@utils/interface";
import { SchemaTextArea } from "@utils/config/yupShemes";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";
import Delete from "@/UI/delete";

import icon_warning from '@public/warning.svg'

import style from './style.module.scss'

type Props = {
    submit: (data: {input_text: CreateWorks['input_text']}) => void
    canSubmit: boolean
};

export default function FormMain({ submit, canSubmit }: Props) {

    const [characterCount, setCharacterCount] = useState(0);
    const maxCharacterCount = 5000;

    const {
        register,
        formState: { touchedFields, isValid, errors },
        handleSubmit,
        getValues,
        watch,
        setValue,
    } = useForm<{input_text: CreateWorks['input_text']}>({
        resolver: yupResolver(SchemaTextArea),
        mode: 'onBlur',
    });

    useEffect(() => {
        setCharacterCount(getValues('input_text')?.length || 0);
    }, [watch('input_text')]);

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
                        <span>Символов</span> {characterCount.toLocaleString('ru')}/{maxCharacterCount}
                    </p>
                    <Delete callback={() => setValue('input_text', '')}>
                        <p>Очистить</p>
                    </Delete>
                </div>
                <Button type="submit" isActive={Boolean(canSubmit && isValid)}>Озвучить</Button>
            </div>
        </form>
    );
}
