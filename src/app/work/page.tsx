'use client'

import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useWindowWidth } from '@react-hook/window-size'
import { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import { ENDPOINTS, LANGUAGES, VOICES } from '@utils/config'
import { useIsClient } from '@/utils/hooks'
import { ContextUser } from '@/utils/context'

import { Languages, CreateWorks, Voices, ResponseWork, ResponsesHistory } from '@utils/interface'

import { ModalMessage, ModalResult, ModalWarningEnoughBalance, ModalWarningRegistration, ModalWrapper } from '@/components/Modal'
import Select from '@UI/select'
import FormMain from '@UI/forms/main'
import Rules from '@components/work/Rules'
import Loader from '@UI/loader'

import style from './style.module.scss'

export default function PageWork() {

	const [language, setLanguage] = useState<Languages>(LANGUAGES[0])
	const [voiceArray, setVoiceArray] = useState<Voices[]>(VOICES)
	const [voice, setVoice] = useState<Voices>(VOICES[0])

	const [modalResultOpen, setModalResultOpen] = useState<boolean>(false)
	const [modalEnoughBalanceOpen, setModalEnoughBalanceOpen] = useState<boolean>(false)
	const [modalRegistrationOpen, setModalRegistrationOpen] = useState<boolean>(false)
	const [completeMessage, setCompleteMessage] = useState<string>()
	const [loading, setLoading] = useState<boolean>(false)

	const [requestPaymentLength, setRequestPaymentLength] = useState(0)

	const [responseData, setResponseData] = useState<ResponseWork>()

	const { userInfo } = useContext(ContextUser)

	const isClient = useIsClient()

	const windowWidth = useWindowWidth()

	const submit = (data: { input_text: CreateWorks['input_text'] }) => {
		setLoading(true)
		setCompleteMessage('')
			ENDPOINTS.WORK.CREATE_WORK({
				...data,
				lang: language.value as string,
				voice: voice.value as string
			})
			.then((res: AxiosResponse<ResponseWork>) => {
				console.log(res.data)
				setResponseData(res.data)
				setLoading(false)
				setModalResultOpen(true)
				if (userInfo?.id) {
					setCompleteMessage('Аудио будет доступно в личном кабинете 10 дней')
				}
			})
			.catch((err: AxiosError) => {
				console.log(err)
				setCompleteMessage(err.message)
				setLoading(false)
			})
	};

	const handleRemoveClose = () => {
		setCompleteMessage(`Аудиозапись "${responseData?.name}" удалена`)
		setModalResultOpen(false)
	}

	const handleEnoughBalance = () => {
		return setModalEnoughBalanceOpen(true)
	}

	const handleRegistration = () => {
		return setModalRegistrationOpen(true)
	}

	const handleChangeAudioName = (newName: string) => {
		setCompleteMessage('')
		setCompleteMessage(`Имя успешно изменено на ${newName}`)
	}

	// useEffect(() => {
	// 	console.log('language', language)
	// 	console.log('voice', voice)
	// }, [language, voice])

	useEffect(() => {
		if (language) {
			const currentVoiceArray = [...VOICES].filter((item) => item.language === language.value)
			setVoiceArray(currentVoiceArray)
			setVoice(currentVoiceArray[0])
		}
	}, [language])

	useEffect(()=>{
		if (Cookies.get('payment_id') && requestPaymentLength < 100) {
			const paymentId = Cookies.get('payment_id')
			if (paymentId) {
				ENDPOINTS.PAYMENT.GET_PAYMENT_ID(paymentId)
				.then((res: AxiosResponse<ResponsesHistory>)=>{
					console.log(res.data);
					setCompleteMessage('')
					setCompleteMessage(`Вы пополнили счет на ${res.data.amount}₽`)
					setRequestPaymentLength(0)
					Cookies.remove('payment_id')
				})
				.catch((err)=> {
					console.log('error')
					setRequestPaymentLength((prev)=>prev+1)
				})
			}
			console.log(requestPaymentLength);
		}
	}, [requestPaymentLength])

	return (
		<>
			<main className={clsx(style.main, 'container', ((modalEnoughBalanceOpen || modalResultOpen || modalRegistrationOpen) || loading) && 'modal')}>
				<div className={style.main__options}>
					<Select
						options={LANGUAGES}
						value={language}
						onChange={(data) => setLanguage((data as Languages))}
						type={'languages'}
						inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
					/>
					<Select
						options={voiceArray}
						value={voice}
						onChange={(data) => setVoice((data as unknown as Voices))}
						type={'voices'}
						inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
					/>
				</div>
				{isClient && windowWidth < 768 && (
					<div className={style.main__wrapper}>
						<Rules />
					</div>

				)}
				<div className={style.main__wrapper}>
					<FormMain 
						submit={submit} 
						handleRegistration={handleRegistration} 
						handleEnoughBalance={handleEnoughBalance} 
						canSubmit={language.value && voice.value ? true : false} 
					/>
					{isClient && windowWidth > 768 && (
						<Rules />
					)}
				</div>
			</main>
			{loading && (
				<Loader />
			)}
			<ModalWrapper state={[modalEnoughBalanceOpen, setModalEnoughBalanceOpen]}>
				<ModalWarningEnoughBalance />
			</ModalWrapper>
			<ModalWrapper state={[modalRegistrationOpen, setModalRegistrationOpen]}>
				<ModalWarningRegistration />
			</ModalWrapper>
			<ModalWrapper state={[modalResultOpen, setModalResultOpen]}>
				{responseData && <ModalResult handleChangeAudioName={handleChangeAudioName} data={responseData} closeModal={()=>handleRemoveClose()}/>}
			</ModalWrapper>
			<ModalMessage message={completeMessage} />
		</>
	)
}
