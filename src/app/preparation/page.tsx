'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { ModalMessage } from '@/components/Modal'
import Rules from '@/components/work/Rules'
import Loader from '@/UI/loader'

import style from './style.module.scss'
import FormPreparationGPT from '@/UI/forms/preparation'
import { PreparationGPTForm } from '@/utils/interface/Forms'
import TextArea from '@/UI/textarea'

export type DecipherMode = 'numbers' | 'abbreviations'

export default function PreparationGPT() {

    const [loading, setLoading] = useState<boolean>(false)
    const [completeMessage, setCompleteMessage] = useState<string>()
    const [decipherMode, setDecipherMode] = useState<DecipherMode>()
    const [preparationResult, setPreparationResult] = useState<string>()

    const submit = (data: PreparationGPTForm) => {
        console.log('PreparationGPTForm', data)
        // setLoading(true)
    }

    return (
		<>
			<main className={clsx(style.preparation, 'container', loading && 'modal')}>
				<div className={style.preparation__wrapper}>
					<FormPreparationGPT
						submit={submit}
						setDecipherMode={setDecipherMode}
                        preparationResult={preparationResult}
					/>
                    <TextArea
                        name='preparationResult'
                        placeholder='Результат подготовки'
                        value={preparationResult}
                        touched
                    />
				</div>
			</main>
			{loading && (
				<Loader />
			)}
			<ModalMessage message={completeMessage} />
		</>
	)

} 