'use client'

import { useEffect, useState } from "react";
import { ChangeHandler } from "react-hook-form";

import Select from "@UI/select";
import Input from "@UI/input";
import Button from "@UI/button";
import FormMobile from "./FormMobile";
import FormBank from "./FormBank";

import { SchemaPaymentAmountValue } from "@utils/config/yupShemes";
import { SelectProps } from "@utils/interface";

import { amountOptions, selectOptions } from "./data";

import style from './style.module.scss'

type Props = {};

export default function FormPayment({ }: Props) {

	const onlyNumberReg = /^\d+$/

	const [paymentMethod, setPaymentMethod] = useState<SelectProps['value']>()
	const [amountValue, setAmountValue] = useState<number>()
	const [amountError, setAmountError] = useState<string>()
	const [amountTouched, setAmountTouched] = useState<boolean>(false)

	const setAmountBullets = () => {
		return amountOptions.map((item, index) => {
			return (
				<p
					key={index}
					className={style.form__amount__bullets__item}
					onClick={() => setAmountValue(item)}
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
		})
	};

	useEffect(()=>{
		if (amountTouched) {
			SchemaPaymentAmountValue.validate(amountValue)
			.then(()=>setAmountError(''))
			.catch((error:{message: string})=>setAmountError(error.message))	
		}
	}, [amountValue, amountTouched])
	
	return (
		<div className={style.form}>
			<div className={style.form__wrapper}>
				<Select
					value={paymentMethod}
					onChange={setPaymentMethod}
					placeholder="Выберите способ"
					options={selectOptions}
				/>
				{paymentMethod?.type === 'bank' && <FormBank/>}
				{paymentMethod?.type === 'mobile' && <FormMobile/>}
			</div>
			<div className={style.form__wrapper}>
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
				<div className={style.form__submit}>
					<Button type="submit" id="paymentForm">Пополнить</Button>
					{amountValue && 
						<p>~{Math.floor(amountValue / 0.00299914995).toLocaleString('ru-RU')} символов</p>
					}
				</div>
			</div>
		</div>
	);
}
