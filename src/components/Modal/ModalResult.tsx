import { ResponseWork } from '@/utils/interface';

import { ENDPOINTS } from '@/utils/config';

import Delete from '@UI/delete';
import Button from '@UI/button';
import { PlayerModal } from '@UI/audioPlayer';

import style from './style.module.scss'

type Props = {
    data: ResponseWork,
    closeModal: () => void
}

export const ModalResult = ({ data, closeModal }: Props) => {

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
                <Delete callback={removeHandler}>
                    <p>Удалить</p>
                </Delete>
                <Button callback={() => console.log('ModalResult скачать')}>Скачать</Button>
            </div>
        </div>

    );
}
