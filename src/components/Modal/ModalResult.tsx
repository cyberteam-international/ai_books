import { useContext } from 'react';
import Link from 'next/link';

import { ResponseWork } from '@/utils/interface';
import { ENDPOINTS, ROUTES } from '@/utils/config';
import { ContextUser } from '@/utils/context';

import Delete from '@UI/delete';
import Button from '@UI/button';
import { PlayerModal } from '@UI/audioPlayer';
import DownloadFile from '../DownloadFile';

import style from './style.module.scss'


type Props = {
    data: ResponseWork,
    closeModal: () => void,
    handleChangeAudioName: (newName: string) => void
}

export const ModalResult = ({ data, closeModal, handleChangeAudioName }: Props) => {

    const { userInfo } = useContext(ContextUser)

    const removeHandler = () => {
        ENDPOINTS.WORK.DELETE_WORK(data.id)
        .then(res => {
            if (res.status === 200) {
                closeModal()
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div className={style.modal__result}>
            <p className={style.modal__title}>Результат</p>
            {data && <PlayerModal handleChangeAudioName={handleChangeAudioName} data={data} />}
            <div className={style.modal__result__options}>
                {userInfo?.id && (
                    <Delete callback={removeHandler}>
                        <p>Удалить</p>
                    </Delete>
                )}
                {userInfo?.id ? (
                    <Button>
                        <DownloadFile textName={data.input_text} fileName={data.completed_file}>Скачать</DownloadFile>
                    </Button>
                ) : (
                    <div className={style.modal__result__options__registration}>
                        <p className={style.modal__result__options__registration__title}>Для сохранения аудио нужно пройти регистрацию</p>
                        <Button className={style.modal__result__options__registration__button}><Link href={ROUTES.REGISTRATION}>Регистрация</Link></Button>
                    </div>
                )}
            </div>
        </div>

    );
}
