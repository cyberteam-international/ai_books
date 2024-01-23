import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

import { PaymentForm } from "@utils/interface";
import { SchemaPaymentBank } from "@utils/config/yupShemes";

import Input from "@UI/input";

import style from './forms.module.scss'

type Props = {
    setValid: (val: boolean)=>void,
    onSubmit: (data: PaymentForm['FormBank'])=>void
};

export default function FormBank({ setValid, onSubmit }: Props) {

    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
    } = useForm<PaymentForm['FormBank']>({
        resolver: yupResolver(SchemaPaymentBank),
        mode: 'onBlur',
    });

    useEffect(()=>{
        setValid(isValid)
    }, [isValid])

    return (
        <form id={'paymentForm'} className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="Номер карты"
                touched={touchedFields['card_number']}
                error={errors['card_number']?.message}
                {...register('card_number', { required: true })}
            ></Input>
            <div className={style.form__wrapper}>
                <Input
                    placeholder="ММ"
                    touched={touchedFields['month']}
                    error={errors['month']?.message}
                    {...register('month', { required: true })}
                />
                <Input
                    placeholder="ГГ"
                    touched={touchedFields['year']}
                    error={errors['year']?.message}
                    {...register('year', { required: true })}
                />
                <Input
                    placeholder="CVV"
                    touched={touchedFields['cvv']}
                    error={errors['cvv']?.message}
                    {...register('cvv', { required: true })}
                />
            </div>
        </form>
    );
}
