'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useWindowWidth } from '@react-hook/window-size'

import { ModalMessage, ModalResult, ModalWarningEnoughBalance, ModalWrapper } from '@/components/Modal'
import Select from '@UI/select'
import FormMain from '@UI/forms/main'
import Rules from '@components/main/Rules'
import Loader from '@UI/loader'

import { LANGUAGES, VOICES } from '@utils/config'
import { useIsClient } from '@/utils/hooks'
import { Languages, MainForm, Voices } from '@utils/interface'

import style from './style.module.scss'

export default function PageHome() {

	const [language, setLanguage] = useState<Languages>(LANGUAGES[0])
	const [voice, setVoice] = useState<Voices>(VOICES[0])
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [completeMessage, setCompleteMessage] = useState<string>()

	const isClient = useIsClient()

	const windowWidth = useWindowWidth()

	useEffect(() => {
		console.log(language)
		console.log(voice)
	}, [language, voice])

	const submit = (data: MainForm) => {
		console.log({
			...data,
			language: language.value,
			voice: voice.value
		});
		setLoading(true)
	};

	useEffect(()=>{
		if (loading) {
			const timeout = setTimeout(()=>{
				setModalOpen(true)
				setLoading(false)
				setCompleteMessage('Аудио будет доступно в личном кабинете 10 дней')
			}, 3000)
		}
	}, [loading])

	return (
		<>
			<main className={clsx(style.main, 'container', (modalOpen || loading) && 'modal')}>
				<div className={style.main__options}>
					<Select
						options={LANGUAGES}
						value={language}
						onChange={(data) => setLanguage((data as Languages))}
						type={'languages'}
						inputStyle={isClient && windowWidth < 768? 'withForm': 'default'}
					/>
					<Select
						options={VOICES}
						value={voice}
						onChange={(data) => setVoice((data as unknown as Voices))}
						type={'voices'}
						inputStyle={isClient && windowWidth < 768? 'withForm': 'default'}
					/>
				</div>
				{isClient && windowWidth < 768 && (
					<div className={style.main__wrapper}>
						<Rules/>
					</div>
					
				)}
				<div className={style.main__wrapper}>
					<FormMain submit={submit} canSubmit={language.value && voice.value? true : false}/>
					{isClient && windowWidth > 768 && (
						<Rules />
					)}
				</div>
			</main>
			{loading && (
				<Loader/>
			)}
			{/* <ModalWrapper state={[modalOpen, setModalOpen]}>
				<ModalWarningEnoughBalance/>
			</ModalWrapper> */}
			<ModalWrapper state={[modalOpen, setModalOpen]}>
				<ModalResult/>
			</ModalWrapper>
			<ModalMessage message={completeMessage}/>
		</>
	)
}
