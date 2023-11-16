import { useForm } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { Languages, MainForm } from "@utils/interface";
import { SchemaMain } from "@utils/config/yupShemes";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";

import icon_trash from '@public/icon_trash.svg'

import style from './style.module.scss'

type Props = {
    language: Languages
    voice: Languages
};

export default function FormMain({ language, voice }: Props) {

    const [characterCount, setCharacterCount] = useState(0);

    const {
        register,
        formState: { touchedFields },
        handleSubmit,
        getValues,
        watch,
        setValue,
    } = useForm<MainForm>({
        resolver: yupResolver(SchemaMain),
        mode: 'all',
    });

    const submit = (data: MainForm) => {
        console.log({
            ...data,
            language: language.value,
            voice: voice.value
        });
    };

    useEffect(() => {
        if (getValues('data')?.length > 5000) {
            setValue('data', getValues('data').slice(0, 5000))
        }
        setCharacterCount(getValues('data')?.length || 0);
    }, [watch('data')]);

    return (
        <form id={'mainForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            <TextArea
                touched={touchedFields['data']}
                {...register('data', { required: true })}
            />
            <div className={style.form__control}>
                <div className={style.form__control__wrapper}>
                    <p className={style.form__control__character}>
                        <span>Символов</span> {characterCount.toLocaleString('ru')}/5 000
                    </p>
                    <div className={style.form__control__reset} onClick={()=>setValue('data', '')}>
                        <Image {...icon_trash} alt='reset textarea'/>
                        <p>Очистить</p>
                    </div>
                </div>
                <Button type="submit">Озвучить</Button>
            </div>
        </form>
    );
}
