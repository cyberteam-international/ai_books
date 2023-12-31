'use client'

import { useState } from "react";
import { ChangeHandler } from "react-hook-form";

import Select from "@UI/select";
import Input from "@UI/input";
import Button from "@UI/button";
import FormMobile from "./FormMobile";
import FormBank from "./FormBank";

import { SchemaPaymentAmountValue } from "@utils/config/yupShemes";

import { BANKS, BANKS_BULLETS } from "@utils/config";
import { Banks } from "@utils/interface";

import style from './style.module.scss'
import { ModalMessage } from "@/components/Modal";

type Props = {};

export default function FormPayment({ }: Props) {

	const onlyNumberReg = /^\d+$/

	const [paymentMethod, setPaymentMethod] = useState<Banks>()
	const [amountValue, setAmountValue] = useState<number>()
	const [amountError, setAmountError] = useState<string>()
	const [amountTouched, setAmountTouched] = useState<boolean>(false)
	const [formValid, setFormValid] = useState<boolean>(false)
	const [completeMessage, setCompleteMessage] = useState<string>()

	const setAmountBullets = () => {
		return BANKS_BULLETS.map((item, index) => {
			return (
				<p
					key={index}
					className={style.form__amount__bullets__item}
					onClick={() => {
						setAmountValue(item);
						setAmountTouched(true);
					}}
				>{item.toLocaleString('ru')} <span>₽</span></p>
			)
		})
	}

	const amountChangeHandler: ChangeHandler = (event) => {
		return new Promise((resolve, reject) => {
			if (onlyNumberReg.test(event.target.value) || event.target.value === '') {
				setAmountValue(event.target.value)
			}
			resolve(true)
		})
	};

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

	const submit = (data: object) => {
		console.log(data);
		setCompleteMessage('')
		setCompleteMessage(`Оплата прошла успешно, вы пополнили счет на ${amountValue}`)
	};

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
					{paymentMethod?.value === 'bank' && <FormBank onSubmit={submit} setValid={setFormValid} />}
					{paymentMethod?.value === 'mobile' && <FormMobile onSubmit={submit} setValid={setFormValid} />}
					<Button
						type="submit"
						id="paymentForm"
						isActive={formValid}
					>
						<p>Пополнить</p>
						{amountValue &&
							<p className={style.form__submit_amount}>
								~{Math.floor(amountValue / 0.00299914995).toLocaleString('ru-RU')} символов
							</p>
						}
					</Button>
				</div>
			</div>
			<ModalMessage message={completeMessage} />
		</>
	);
}
