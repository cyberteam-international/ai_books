import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { PaymentForm } from "@utils/interface";
import { SchemaPaymentMobile } from "@utils/config/yupShemes";

import Input from "@UI/input";

import style from './forms.module.scss'

type Props = {
    setValid: (val: boolean)=>void,
    onSubmit: (data: PaymentForm['FormMobile'])=>void
};

export default function FormMobile({ setValid, onSubmit }: Props) {

    const {
        register,
        formState: { errors, touchedFields, isValid },
        handleSubmit,
    } = useForm<PaymentForm['FormMobile']>({
        resolver: yupResolver(SchemaPaymentMobile),
        mode: 'onBlur',
    });

    // const submit = (data: PaymentForm['FormMobile']) => {
    //     console.log(data);
    // };

    useEffect(()=>{
        setValid(isValid)
    }, [isValid])

    return (
        <form id={'paymentForm'} className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="Номер телефона"
                touched={touchedFields['phone']}
                error={errors['phone']?.message}
                {...register('phone', { required: true })}
            ></Input>
        </form>
    );
}
