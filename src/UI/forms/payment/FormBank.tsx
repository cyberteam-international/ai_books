import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PaymentForm } from "@utils/interface";
import { SchemaPaymentBank } from "@utils/config/yupShemes";

import Input from "@UI/input";

import style from './forms.module.scss'
import { useEffect } from "react";

type Props = {
    setValid: (val: boolean)=>void
};

export default function FormBank({ setValid }: Props) {

    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
    } = useForm<PaymentForm['FormBank']>({
        resolver: yupResolver(SchemaPaymentBank),
        mode: 'all',
    });

    const submit = (data: PaymentForm['FormBank']) => {
        console.log(data);
    };

    useEffect(()=>{
        setValid(isValid)
    }, [isValid])

    return (
        <form id={'paymentForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            <Input
                placeholder="Номер карты"
                touched={touchedFields['card_number']}
                error={errors['card_number']?.message}
                {...register('card_number', { required: true })}
            ></Input>
            <div className={style.form__wrapper}>
                <Input
                    placeholder="ММ / ГГ"
                    touched={touchedFields['day_year']}
                    error={errors['day_year']?.message}
                    {...register('day_year', { required: true })}
                ></Input>
                <Input
                    placeholder="CVV"
                    touched={touchedFields['cvv']}
                    error={errors['cvv']?.message}
                    {...register('cvv', { required: true })}
                ></Input>
            </div>
        </form>
    );
}
