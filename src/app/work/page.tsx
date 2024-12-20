'use client'

import {useCallback, useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import {useWindowWidth} from '@react-hook/window-size'
import {AxiosError, AxiosResponse} from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'

import {ENDPOINTS, LANGUAGES, VOICES} from '@utils/config'
import {useIsClient} from '@/utils/hooks'
import {ContextUser} from '@/utils/context'

import {CreateWorks, DecipherMode, Languages, ResponsesHistory, ResponseWork, Voices} from '@utils/interface'

import {
	ModalMessage,
	ModalResult,
	ModalWarningEnoughBalance,
	ModalWarningRegistration,
	ModalGoLogin,
	ModalWrapper
} from '@/components/Modal'
import Select from '@UI/select'
import FormMain from '@UI/forms/main'
import Rules from '@components/work/Rules'
import Loader from '@UI/loader'

// import abbreviations_img from '@public/decipher_abbreviations.svg'
// import numbers_img from '@public/decipher_numbers.svg'
import reset from '@public/reset.svg'

import style from './style.module.scss'
import {UseFreeGeneration} from "@utils/hooks/useFreeGeneration";
import {UseFreeGpt} from "@utils/hooks/useFreeGpt";
import {MyVoice} from "@utils/interface/MyVoice";
import WorkSettings, {SettingsDefault} from "@components/work/WorkSettings";
import {ModalCreateVoice} from "@components/Modal/ModalCreateVoice";
import {useGETVoices} from "@utils/hooks/useSwrGET";
import { useSearchParams } from 'next/navigation'

export default function PageWork() {
	const defaultMyVoice: MyVoice = {
		title: "Мои голоса",
		inputValue: "Мои голоса"
	}

	const [language, setLanguage] = useState<Languages>(LANGUAGES[0]);
	const [settings, setSettings] = useState<SettingsDefault>({});
	const [voiceArray, setVoiceArray] = useState<Voices[]>(VOICES);
	const [voice, setVoice] = useState<Voices>(VOICES[0]);
	const [myVoice, setMyVoice] = useState<MyVoice>(defaultMyVoice);
	const {getFreeGeneration, addFreeGeneration, maxFreeGeneration} = UseFreeGeneration();
	const {getFreeGpt, addFreeGpt, maxFreeGpt} = UseFreeGpt();
	const myVoicesData = useGETVoices();

	const [modalGoLoginOpen, setModalGoLoginOpen] = useState<boolean>(false);
	const [modalCreateVoiceOpen, setModalCreateVoiceOpen] = useState<boolean>(false);
	const [modalResultOpen, setModalResultOpen] = useState<boolean>(false);
	const [modalEnoughBalanceOpen, setModalEnoughBalanceOpen] = useState<boolean>(false);
	const [modalRegistrationOpen, setModalRegistrationOpen] = useState<boolean>(false);
	const [completeMessage, setCompleteMessage] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);

	const [requestPaymentLength, setRequestPaymentLength] = useState(0);

	const [responseData, setResponseData] = useState<ResponseWork>();

	const [valueBeforeDecipher, setValueBeforeDecipher] = useState<string>();
	const [value, setValue] = useState<string>();

	const [decipherMode, setDecipherMode] = useState<DecipherMode>();

	const {userInfo, mutate} = useContext(ContextUser);

	const start = useSearchParams().has('start');

	const isClient = useIsClient();

	const windowWidth = useWindowWidth();

	const decipherOption: DecipherMode[] = [
		{
			title: 'Расшифровать аббревиатуры',
			inputValue: 'Расшифровать аббревиатуры',
			value: 'abbreviations'
		},
		{
			title: 'Расшифровать числительные',
			inputValue: 'Расшифровать числительные',
			value: 'numbers'
		},
	]

	const submit = (data: { input_text: CreateWorks['input_text'] }) => {
		if (value) {
			setLoading(true)
			setCompleteMessage('')

			ENDPOINTS.WORK.CREATE_WORK({
				...data,
				lang: language.value as string,
				voice: myVoice.value ? myVoice.value : voice.value as string,
				is_my_voice: !!myVoice.value,
				settings: settings,
				n: myVoice.value ? true : getFreeGeneration() >= maxFreeGeneration
			})
				.then(async (res: AxiosResponse<ResponseWork>) => {
					setResponseData(res.data)
					setLoading(false)
					setModalResultOpen(true)
					if (userInfo?.id) {
						await mutate();
						setCompleteMessage('Аудио будет доступно в личном кабинете 10 дней')
					}

					if(!myVoice.value) {
						if (value.length <= 200) {
							if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
								const freeGeneration = (getFreeGeneration() + 1)

								if(freeGeneration <= maxFreeGeneration) {
									addFreeGeneration()
									setCompleteMessage(`Вы можете бесплатно озвучить еще ${maxFreeGeneration - freeGeneration} аудио из ${maxFreeGeneration} за сутки`)
								}
							}
						}
					}
				})
				.catch((err: AxiosError) => {
					if(err && err.response && err.response?.status === 406) {
						setCompleteMessage("Мы не можем озвучить ваш текст! \nОбнаружен контент противоречащий правилам сервиса. Пожалуйста, убедитесь, что ваш контент соответствует нашим требованиям.</br> </br> <a target='_blank' href='/rules'>Подробнее</a>")
					}
					console.error(err)
					setLoading(false)
				})
		}
	}

	const handleRemoveClose = () => {
		setCompleteMessage(`Аудиозапись "${responseData?.name}" удалена`)
		setModalResultOpen(false);
	}

	const handleEnoughBalance = () => {
		return setModalEnoughBalanceOpen(true);
	}

	const handleRegistration = () => {
		return setModalRegistrationOpen(true);
	}

	const handleChangeAudioName = (newName: string) => {
		setCompleteMessage('');
		setCompleteMessage(`Имя успешно изменено на ${newName}`);
	}

	const handleDecipher_abbreviations = () => {
		if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
			const freeGpt = (getFreeGpt() + 1);

			if (freeGpt > maxFreeGpt) {
				setCompleteMessage(`Вы исчерпали лимит бесплатной подготовки текста за сутки`)
				return
			}
		}

		if (value) {
			if (value.length >= 200) {
				setCompleteMessage(`Вы можете подготовить текст длиной не более 200 символов`)
				return;
			}

			setLoading(true);

			ENDPOINTS.GPT.REMOVE_ABBREVIATIONS(value)
				.then((res: AxiosResponse<{ text: string }>) => {
					setLoading(false);
					setValueBeforeDecipher(value);
					setValue(res.data.text);

					if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
						const freeGpt = (getFreeGpt() + 1);

						addFreeGpt();
						setCompleteMessage(`Вы можете подготовть текст еще ${maxFreeGpt - freeGpt} из ${maxFreeGpt} раз за сутки`);
					}
				})
		}
	}

	const handleDecipher_numbers = () => {
		if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
			const freeGpt = (getFreeGpt() + 1)
			if (freeGpt > maxFreeGpt) {
				setCompleteMessage(`Вы исчерпали лимит бесплатной подготовки текста за сутки`)
				return
			}
		}


		if (value) {
			if (value.length >= 200) {
				setCompleteMessage(`Вы можете подготовить текст длиной не более 200 символов`)
				return;
			}

			setLoading(true)
			ENDPOINTS.GPT.REMOVE_NUMBERS(value)
				.then((res: AxiosResponse<{ text: string }>) => {
					setLoading(false)
					setValueBeforeDecipher(value)
					setValue(res.data.text)

					if (userInfo && !userInfo.is_admin && !userInfo.is_editor || !userInfo) {
						const freeGpt = (getFreeGpt() + 1)

						addFreeGpt()
						setCompleteMessage(`Вы можете подготовть текст еще ${maxFreeGpt - freeGpt} из ${maxFreeGpt} раз за сутки`)
					}
				})
		}

	}

	const handleReset = () => {
		if (valueBeforeDecipher) {
			setValue(valueBeforeDecipher);
			setValueBeforeDecipher(undefined);
			setDecipherMode({
				title: 'Выберите преобработку',
				inputValue: 'Выберите преобработку',
			});
		}

	}

	function onSubmitCreateVoice() {
		setCompleteMessage('Пожалуйста подождите. Голос обрабатывается');
		setModalCreateVoiceOpen(false);

		setTimeout(() => {
			myVoicesData.mutate().then((data) => {
				console.log('mutate', data);

				setCompleteMessage('Голос успешно создан.');
			}).catch(() => {
				setCompleteMessage('Ошибка. Попробуйте позже');
			})
		}, 500)
	}

	useEffect(() => {
		if (isClient) {
			if (userInfo?.id) {
				if (window.localStorage.getItem(`textareaValue_${userInfo?.id}`)) {
					setValue(String(localStorage.getItem(`textareaValue_${userInfo?.id}`)))
				}
			} else if (window.localStorage.getItem(`textareaValue_default`)) {
				setValue(String(localStorage.getItem('textareaValue_default')))
			}
		}
	}, [isClient, userInfo])

	useEffect(() => {
		if (language) {
			const currentVoiceArray = [...VOICES].filter((item) => item.language === language.value);
			setVoiceArray(currentVoiceArray);
			setVoice(currentVoiceArray[0]);
		}
	}, [language]);

	useEffect(() => {
		if(! userInfo && start) {
			setModalGoLoginOpen(true);
			setModalCreateVoiceOpen(false);
		} else if(start) {
			setModalCreateVoiceOpen(true);
			setModalGoLoginOpen(false);
		}
	}, [start, userInfo]);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		const paymentId = Cookies.get('payment_id');
		if (paymentId) {
			intervalId = setInterval(() => {
				if (requestPaymentLength < 30) {
					ENDPOINTS.PAYMENT.GET_PAYMENT_ID(paymentId)
						.then((res: AxiosResponse<ResponsesHistory>) => {
							console.log(res.data);
							setCompleteMessage('');
							setCompleteMessage(`Вы пополнили счет на ${res.data.amount}₽`);
							Cookies.remove('payment_id');
							clearInterval(intervalId);
						})
						.catch((err: any) => {
							console.log('error', err);
							setRequestPaymentLength((prev) => prev + 1);
						});
				} else {
					clearInterval(intervalId);
				}
			}, 3000);

		}

		return () => {
			clearInterval(intervalId);
		};

	}, [Cookies.get('payment_id'), requestPaymentLength]);

	useEffect(() => {
		if (value && value.length > 0) {
			if (!decipherMode?.value) {
				setDecipherMode({
					title: 'Подготовка текста',
					inputValue: 'Подготовка текста',
				})
			}
		} else setDecipherMode({
			title: 'Подготовка текста',
			inputValue: 'Подготовка текста',
		})
	}, [value])

	useEffect(() => {
		if (decipherMode?.value === 'numbers') {
			handleDecipher_numbers()
		} else if (decipherMode?.value === 'abbreviations') {
			handleDecipher_abbreviations()
		}
	}, [decipherMode])

	useEffect(() => {
		setSettings({})
	}, [voice, myVoice])

	return (
		<>
			<main
				className={clsx(style.main, 'container', ((modalGoLoginOpen || modalEnoughBalanceOpen || modalResultOpen || modalRegistrationOpen || modalCreateVoiceOpen) || loading) && 'modal')}>
				<div className={style.main__options}>
					<Select
						options={LANGUAGES}
						value={language}
						onChange={(data) => {
							setLanguage((data as Languages))
							setMyVoice(defaultMyVoice)
						}}
						type={'languages'}
						inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
						disabled={myVoice.value !== undefined}
					/>
					<Select
						options={voiceArray}
						value={voice}
						onChange={(data) => {
							setVoice((data as unknown as Voices))
							setMyVoice(defaultMyVoice)
						}}
						type={'voices'}
						inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
						disabled={myVoice.value !== undefined}
					/>
					<Select
						options={myVoicesData?.data?.map((r: any) => ({
							title: r.name,
							inputValue: r.name,
							value: r.voice_id,
						})) || []}
						value={myVoice}
						onChange={(data) => {
							setMyVoice((data as MyVoice))
						}}
						type={'banks'}
						inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
						addButton={() => {
							setModalCreateVoiceOpen(true)
						}}
						isAuth={true}
						isLoading={myVoicesData?.isLoading}
					/>
					{language.value === 'ru-RU' && (
						<Select
							options={decipherOption}
							value={decipherMode}
							onChange={(data) => {
								if (value) {
									setDecipherMode((data as DecipherMode))
								} else {
									setCompleteMessage('')
									setCompleteMessage('Для подготовки введите текст')
								}
							}}
							type={'banks'}
							inputStyle={isClient && windowWidth < 768 ? 'withForm' : 'default'}
						/>
					)}
				</div>
				<div className={style.main__wrapper}>
					<FormMain
						submit={submit}
						handleRegistration={handleRegistration}
						handleEnoughBalance={handleEnoughBalance}
						canSubmit={language.value && voice.value ? true : false}
						valueBeforeDecipherState={[valueBeforeDecipher, setValueBeforeDecipher]}
						valueState={[value, setValue]}
						isMyVoice={!!myVoice.value}
						freeGeneration={getFreeGeneration()}
					>
						{<>
							{(language.inputValue === 'ru-Ru' || valueBeforeDecipher) && (
								<div className={style.main__rules__buttons}>
									<button className={style.main__rules__buttons__item} type="button"
											onClick={handleReset}>
										<p>Сбросить</p>
										<Image {...reset} alt={'reset'}/>
									</button>
								</div>
							)}
						</>}
					</FormMain>
					{isClient && (
						<div className={style.main__rules}>
							<WorkSettings voice={voice} myVoice={myVoice} onSettings={(_settings) => {
								setSettings(_settings)
							}}/>
						</div>
					)}
				</div>
			</main>
			{loading && (
				<Loader/>
			)}
			<ModalWrapper state={[modalGoLoginOpen, setModalGoLoginOpen]} styles={{maxWidth: '520px', padding: '50px'}}>
				<ModalGoLogin/>
			</ModalWrapper>
			<ModalWrapper state={[modalCreateVoiceOpen, setModalCreateVoiceOpen]}>
				<ModalCreateVoice onSubmit={onSubmitCreateVoice}/>
			</ModalWrapper>
			<ModalWrapper state={[modalEnoughBalanceOpen, setModalEnoughBalanceOpen]}>
				<ModalWarningEnoughBalance/>
			</ModalWrapper>
			<ModalWrapper state={[modalRegistrationOpen, setModalRegistrationOpen]}>
				<ModalWarningRegistration/>
			</ModalWrapper>
			<ModalWrapper state={[modalResultOpen, setModalResultOpen]}>
				{responseData && <ModalResult handleChangeAudioName={handleChangeAudioName} data={responseData} closeModal={() => handleRemoveClose()}/>}
			</ModalWrapper>
			<ModalMessage message={completeMessage} setMesage={setCompleteMessage}/>
		</>
	)
}