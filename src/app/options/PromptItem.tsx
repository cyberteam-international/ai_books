'use client'

import { useState } from "react";
import { ChangeHandler } from "react-hook-form";

import { ResponseEnvironment } from "@/utils/interface/Responses";

import TextArea from "@/UI/textarea";
import Button from "@/UI/button";
import Input from "@/UI/input";

import style from './style.module.scss'

type Props = {
    item: ResponseEnvironment,
    submit: (data: ResponseEnvironment, message: string) => void
};

export default function PromptItem({ item, submit }: Props) {

    const [value, setValue] = useState<ResponseEnvironment['value']>(item.value);

    const onChange: ChangeHandler = async (e) => {
        setValue(e.target.value);
        return true;
    };

    const labelValue = {
        SPLIT_REQUEST_SYMBOLS: 'Разделить символы запроса',
        PRICE_PER_SYMBOL: 'Цена за символ',
        PRICE_PER_SYMBOL_COST: 'Стоимость за символ',
        GPT_DECODE_NUMBERS_PROMPT: 'Запрос GPT декодирования чисел',
        GPT_ABBREVIATIONS_PROMPT: 'Запрос GPT декодирования аббревиатур',
        GPT_PRICE_INPUT: 'Ввод цены GPT',
        GPT_PRICE_OUTPUT: 'Вывод цены GPT',
    }

    return (
        <div className={style.page__form__block}>
            <label htmlFor="abbreviations">{labelValue[item.key]}</label>
            {!Number(item.value) ? (
                <TextArea
                    placeholder={`Вставьте или введите сюда запрос для расшифровки числительных`}
                    touched
                    name={item.key}
                    value={value as string}
                    onChange={onChange}
                />
            ) : (
                <Input
                    name={item.key}
                    touched
                    type="number"
                    value={value}
                    onChange={onChange}
                />
            )}
            <Button 
                className={style.page__form__button} 
                callback={() => submit({ ...item, value: value }, `Параметр ${labelValue[item.key]} изменен`)}
                isActive={String(value).length > 0 && value !== item.value}
            >Изменить</Button>
        </div>
    )
}