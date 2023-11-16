'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { LANGUAGES } from '@utils/config'
import { Languages } from '@utils/interface'

import Select from '@UI/select'
import FormMain from '@UI/forms/main'
import Rules from '@components/main/Rules'

import style from './style.module.scss'

export default function PageHome() {

	const [language, setLanguage] = useState<Languages>(LANGUAGES[0])
	const [voice, setVoice] = useState<Languages>(LANGUAGES[0])

	useEffect(()=>{
		console.log(language)
		console.log(voice)
	}, [language, voice])

	return (
		<main className={clsx(style.main, 'container')}>
			<div className={style.main__options}>
				<Select
					options={LANGUAGES}
					value={language}
					onChange={(data)=>setLanguage((data as Languages))}
					imgVisible
					styleInput={false}
				/>
				<Select
					options={LANGUAGES}
					value={voice}
					onChange={(data)=>setVoice((data as Languages))}
					imgVisible
					styleInput={false}
				/>
			</div>
			<div className={style.main__wrapper}>
				<FormMain language={language} voice={voice}/>
				<Rules/>
			</div>
		</main>
	)
}
