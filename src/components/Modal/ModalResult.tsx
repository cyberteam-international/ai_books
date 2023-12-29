import { useContext } from 'react';

import { ResponseWork } from '@/utils/interface';
import { ENDPOINTS } from '@/utils/config';
import { ContextUser } from '@/utils/context';

import Delete from '@UI/delete';
import Button from '@UI/button';
import { PlayerModal } from '@UI/audioPlayer';
import DownloadFile from '../DownloadFile';

import style from './style.module.scss'


type Props = {
    data: ResponseWork,
    closeModal: () => void
}

export const ModalResult = ({ data, closeModal }: Props) => {

    const [userState, _setUserState] = useContext(ContextUser)

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
            {data && <PlayerModal data={data} />}
            <div className={style.modal__result__options}>
                {userState?.id && (
                    <Delete callback={removeHandler}>
                        <p>Удалить</p>
                    </Delete>
                )}
                <Button callback={() => console.log('ModalResult скачать')}>
                    <DownloadFile fileName={data.completed_file}>Скачать</DownloadFile>
                </Button>
            </div>
        </div>

    );
}
