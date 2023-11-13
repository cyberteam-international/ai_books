import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { PaymentForm } from "@utils/interface";
import { SchemaPaymentMobile } from "@utils/config/yupShemes";

import Input from "@UI/input";

import style from './forms.module.scss'

type Props = {};

export default function FormMobile({ }: Props) {

    const {
        register,
        formState: { errors, touchedFields },
        handleSubmit,
        getValues, 
        setValue,
        watch,
    } = useForm<PaymentForm['FormMobile']>({
        resolver: yupResolver(SchemaPaymentMobile),
        mode: 'all',
    });

    const submit = (data: PaymentForm['FormMobile']) => {
        console.log(data);
    };

    return (
        <form id={'paymentForm'} className={style.form} onSubmit={handleSubmit(submit)}>
            <Input
                label='Номер телефона'
                placeholder=""
                touched={touchedFields['phone']}
                error={errors['phone']?.message}
                {...register('phone', { required: true })}
            ></Input>
        </form>
    );
}
