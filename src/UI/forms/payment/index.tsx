'use client'

import { useEffect, useState } from "react";
import { ChangeHandler } from "react-hook-form";
import { AxiosResponse } from "axios";
import Cookies from 'js-cookie'

import { ResponsePayment } from "@/utils/interface/Responses";

import Select from "@UI/select";
import Input from "@UI/input";
import Button from "@UI/button";
import CheckBox from "@/UI/checkbox";
import FormMobile from "./FormMobile";
import FormBank from "./FormBank";
import { ModalMessage } from "@/components/Modal";

import { SchemaPaymentAmountValue } from "@utils/config/yupShemes";

import { BANKS, BANKS_BULLETS, ENDPOINTS, PRICE, ROUTES } from "@utils/config";
import { Banks, PaymentForm } from "@utils/interface";

import style from './style.module.scss'

type Props = {};

export default function FormPayment({ }: Props) {

	const onlyNumberReg = /^\d+$/

	const [paymentMethod, setPaymentMethod] = useState<Banks>()
	const [amountValue, setAmountValue] = useState<number>()
	const [amountError, setAmountError] = useState<string>()
	const [amountTouched, setAmountTouched] = useState<boolean>(false)
	const [formValid, setFormValid] = useState<boolean>(false)
	const [completeMessage, setCompleteMessage] = useState<string>()
	const [agreePolicy, setAgreePolicy] = useState<boolean>(true)

	const setAmountBullets = () => {
		return BANKS_BULLETS.map((item, index) => {
			return (
				<p
					key={index}
					className={style.form__amount__bullets__item}
					onClick={() => {
						setAmountValue(item);
						setAmountTouched(true);
						setAmountError('')
					}}
				>{item.toLocaleString('ru')} <span>₽</span></p>
			)
		})
	}

	const amountChangeHandler: ChangeHandler = (event) => {
		return new Promise((resolve, reject) => {
			if (onlyNumberReg.test(event.target.value) || event.target.value === '') {
				setAmountValue(event.target.value)
				setAmountTouched(true)
				SchemaPaymentAmountValue.validate(amountValue)
					.then(() => setAmountError(''))
					.catch((error: { message: string }) => setAmountError(error.message))
			}
			resolve(true)
		})
	};

	const agreePolicyChangeHandler: ChangeHandler = (event) => { 
		return new Promise((resolve, reject) => {
			setAgreePolicy(event.target.checked)
		})
	}

	const amountBlurHandler: ChangeHandler = (event) => {
		return new Promise((resolve, reject) => {
			setAmountTouched(true)
			setAmountValue(event.target.value)
			resolve(true)
			SchemaPaymentAmountValue.validate(amountValue)
				.then(() => setAmountError(''))
				.catch((error: { message: string }) => setAmountError(error.message))
		})
	};

	const submit = (data?: PaymentForm['FormMobile']) => {
		console.log(data);
		if (paymentMethod) {
			ENDPOINTS.PAYMENT.SET_PAYMENT(
				{
					payment_type: paymentMethod.value,
					payment_phone: data?.phone?? undefined,
					amount_value: String(amountValue),
					amount_currency: "RUB"
	
				}
			)
			.then((res: AxiosResponse<ResponsePayment>)=>{
				Cookies.set('payment_id', res.data.id, {secure: true})
				// window.location.href = res.data.link
				window.open(res.data.link, '_blank');
			})
		}
		
	};

	useEffect(()=>{
		if (paymentMethod && paymentMethod?.value !== 'yoo_money') {
			if (agreePolicy && amountTouched && !amountError) {
				setFormValid(true)
			}
		}
	}, [paymentMethod, agreePolicy, amountError])

	return (
		<>
			<div className={style.form}>
				<div className={style.form__wrapper}>
					<Select
						value={paymentMethod}
						onChange={(data) => setPaymentMethod((data as Banks))}
						placeholder="Выберите способ"
						options={BANKS}
						type={"banks"}
					/>
					<div className={style.form__amount}>
						<Input
							touched={amountTouched}
							name='amount'
							type="text"
							value={amountValue}
							onChange={amountChangeHandler}
							onBlur={amountBlurHandler}
							error={amountError}
							placeholder="Сумма пополнения"
						>
							{amountValue && <span className={style.form__amount__сurrency}>₽</span>}
						</Input>
						<div className={style.form__amount__bullets}>{setAmountBullets()}</div>
					</div>
					{/* {paymentMethod?.value === 'bank' && <FormBank onSubmit={submit} setValid={setFormValid} />} */}
					{paymentMethod?.value === 'yoo_money' && <FormMobile onSubmit={submit} setValid={setFormValid} />}
					<Button
						type="submit"
						id="paymentForm"
						isActive={formValid && agreePolicy}
						callback={paymentMethod?.value !== 'yoo_money'? submit : undefined}
					>
						<p>Пополнить</p>
						{amountValue &&
							<p className={style.form__submit_amount}>
								~{Math.floor(amountValue / PRICE).toLocaleString('ru-RU')} символов
							</p>
						}
					</Button>
					<CheckBox name="agreePolicy" value={agreePolicy} onChange={agreePolicyChangeHandler}>
						<p className={style.form__checkbox}>Я соглашаюсь с <a href={ROUTES.POLICY}>политикой конфиденциальности</a> и <a href={ROUTES.PUBLIC_OFFER}>договором офреты</a></p>
					</CheckBox>
				</div>
			</div>
			<ModalMessage message={completeMessage} />
		</>
	);
}
