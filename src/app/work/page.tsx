'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useWindowWidth } from '@react-hook/window-size'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

import { ENDPOINTS, LANGUAGES, VOICES } from '@utils/config'
import { useIsClient } from '@/utils/hooks'
import { Languages, CreateWorks, Voices, ResponseWork } from '@utils/interface'

import { ModalMessage, ModalResult, ModalWarningEnoughBalance, ModalWrapper } from '@/components/Modal'
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
	const [completeMessage, setCompleteMessage] = useState<string>()
	const [loading, setLoading] = useState<boolean>(false)

	const [responseData, setRresponseData] = useState<ResponseWork>()

	const isClient = useIsClient()

	const windowWidth = useWindowWidth()


	const submit = (data: { input_text: CreateWorks['input_text'] }) => {
		if (Cookies.get('token')) {
			setLoading(true)
			ENDPOINTS.WORK.CREATE_WORK({
				...data,
				lang: language.value as string,
				voice: voice.value as string
			})
			.then((res: AxiosResponse<ResponseWork>) => {
				console.log(res.data)
				setRresponseData(res.data)
				setLoading(false)
				setModalResultOpen(true)
				setCompleteMessage('Аудио будет доступно в личном кабинете 10 дней')
			})
			.catch(err => {
				console.error(err)
			})
		}
		else setModalEnoughBalanceOpen(true)
	};

	const handleRemoveClose = () => {
		setCompleteMessage(`Аудиозапись "${responseData?.name}" с id:${responseData?.id} удалена`)
		setModalResultOpen(false)
	}

	useEffect(() => {
		console.log('language', language)
		console.log('voice', voice)
	}, [language, voice])

	useEffect(() => {
		if (language) {
			const currentVoiceArray = [...VOICES].filter((item) => item.language === language.value)
			setVoiceArray(currentVoiceArray)
			setVoice(currentVoiceArray[0])
		}
	}, [language])

	return (
		<>
			<main className={clsx(style.main, 'container', ((modalEnoughBalanceOpen || modalResultOpen) || loading) && 'modal')}>
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
					<FormMain submit={submit} canSubmit={language.value && voice.value ? true : false} />
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
			<ModalWrapper state={[modalResultOpen, setModalResultOpen]}>
				{responseData && <ModalResult data={responseData} closeModal={()=>handleRemoveClose()}/>}
			</ModalWrapper>
			<ModalMessage message={completeMessage} />
		</>
	)
}
