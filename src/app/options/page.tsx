'use client'

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { ResponseEnvironment } from '@/utils/interface/Responses';
import { ENDPOINTS } from '@/utils/config';

import PromptItem from './PromptItem';

import style from './style.module.scss'
import { ModalMessage } from '@/components/Modal';

type Props = {};

export default function PagePrompt({ }: Props) {

    const [environmentList, setEnvironmentList] = useState<ResponseEnvironment[]>()
    const [completeMessage, setCompleteMessage] = useState<string>()

    const submit = (data: ResponseEnvironment, message: string) => {
        console.log(data)
        ENDPOINTS.ENVIRONMENT.UPDATE(data).then(()=>{
            if (environmentList) {
                const newList = [...environmentList]
                const changeIndex = newList.findIndex((el)=>el.key === data.key)
                newList[changeIndex].value = data.value
                setEnvironmentList(newList)
                setCompleteMessage(message)
            }
        })
    }

    const setEnvList = () => {
        return environmentList?.map((item, index) => {
            return <PromptItem item={item} submit={submit} key={index}/>
        })
    }

    useEffect(() => {
        ENDPOINTS.ENVIRONMENT.GET_ALL().then((res) => {
            setEnvironmentList(res)
        })
    }, [])

    useEffect(() => {
        console.log(environmentList)
    }, [environmentList])

    return (
        <>
            <main className={clsx(style.page, 'container')}>
                <div className={style.page__form}>
                    <div className={style.page__form__wrapper}>
                        {setEnvList()}
                    </div>
                </div>
                <ModalMessage message={completeMessage} setMesage={setCompleteMessage} />
            </main>
        </>
    );
}
