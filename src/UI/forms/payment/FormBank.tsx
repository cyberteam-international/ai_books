import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PaymentForm } from "@utils/interface";
import { SchemaPaymentBank } from "@utils/config/yupShemes";

import Input from "@UI/input";

import style from './forms.module.scss'
import { useEffect } from "react";

type Props = {};

export default function FormBank({ }: Props) {

    const {
        register,
        formState: { errors, touchedFields },
        handleSubmit,
        getValues, 
        setValue,
        watch,
    } = useForm<PaymentForm['FormBank']>({
        resolver: yupResolver(SchemaPaymentBank),
        mode: 'all',
    });

    const submit = (data: PaymentForm['FormBank']) => {
        console.log(data);
    };

    return (
        <form id={'paymentForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            <Input
                label='Номер карты'
                placeholder="0000 0000 0000 0000"
                touched={touchedFields['card_number']}
                error={errors['card_number']?.message}
                {...register('card_number', { required: true })}
            ></Input>
            <div className={style.form__wrapper}>
                <Input
                    label='ММ / ГГ'
                    placeholder="ММ / ГГ"
                    touched={touchedFields['day_year']}
                    error={errors['day_year']?.message}
                    {...register('day_year', { required: true })}
                ></Input>
                <Input
                    label='CVV'
                    placeholder="000"
                    touched={touchedFields['cvv']}
                    error={errors['cvv']?.message}
                    {...register('cvv', { required: true })}
                ></Input>
            </div>
        </form>
    );
}
